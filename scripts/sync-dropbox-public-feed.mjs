import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourcePath =
  process.env.DROPBOX_SOURCE_PATH ?? "/Independent Observer desktop/Website Feed/approved";
const outputPath = resolve("src/data/dropbox-content.generated.ts");
const allowedStatuses = new Set(["Concept preview", "In editorial development"]);
const allowedKinds = new Set(["research", "documentary", "video", "series", "document"]);
const maxItems = 100;
const maxSections = 30;
const maxParagraphs = 20;
const maxSectionItems = 30;

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function readJson(url, options, label) {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) throw new Error(`${label} failed (${response.status}): ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

async function getAccessToken() {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: required("DROPBOX_REFRESH_TOKEN"),
    client_id: required("DROPBOX_APP_KEY"),
    client_secret: required("DROPBOX_APP_SECRET"),
  });
  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Dropbox token exchange failed (${response.status}).`);
  return JSON.parse(text).access_token;
}

async function listFolder(token) {
  const entries = [];
  let response = await readJson(
    "https://api.dropboxapi.com/2/files/list_folder",
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ path: sourcePath, recursive: false, include_deleted: false }),
    },
    "Dropbox folder listing",
  );
  entries.push(...response.entries);
  while (response.has_more) {
    response = await readJson(
      "https://api.dropboxapi.com/2/files/list_folder/continue",
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ cursor: response.cursor }),
      },
      "Dropbox folder pagination",
    );
    entries.push(...response.entries);
  }
  return entries;
}

async function downloadJson(token, path) {
  const response = await fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Dropbox-API-Arg": JSON.stringify({ path }),
    },
  });
  if (!response.ok) throw new Error(`Dropbox manifest download failed (${response.status}).`);
  return JSON.parse(await response.text());
}

function cleanText(value, field, maxLength) {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${field} must be non-empty text.`);
  const text = value.trim();
  if (text.length > maxLength) throw new Error(`${field} exceeds ${maxLength} characters.`);
  if (/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) {
    throw new Error(`${field} contains markup or control characters.`);
  }
  return text;
}

function validateManifest(manifest) {
  if (manifest?.schemaVersion !== 1)
    throw new Error("The Dropbox manifest must use schemaVersion 1.");
  if (manifest.approvedForWebsite !== true) {
    throw new Error("The Dropbox manifest is not marked approvedForWebsite: true.");
  }
  if (!Array.isArray(manifest.items) || manifest.items.length > maxItems) {
    throw new Error(`The Dropbox manifest must contain 1-${maxItems} items.`);
  }

  const ids = new Set();
  const feedItems = [];
  const documentItems = [];

  for (const [index, item] of manifest.items.entries()) {
    const prefix = `items[${index}]`;
    const id = cleanText(item?.id, `${prefix}.id`, 80);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      throw new Error(`${prefix}.id must be lowercase kebab-case.`);
    }
    if (ids.has(id)) throw new Error(`Duplicate Dropbox item id: ${id}`);
    ids.add(id);
    if (!allowedKinds.has(item?.kind)) throw new Error(`${prefix}.kind is not allowed.`);

    if (item.kind === "document") {
      if (!Array.isArray(item.sections) || item.sections.length === 0) {
        throw new Error(`${prefix}.sections must contain at least one section.`);
      }
      if (item.sections.length > maxSections) {
        throw new Error(`${prefix}.sections exceeds ${maxSections} sections.`);
      }
      const sections = item.sections.map((section, sectionIndex) => {
        const sectionPrefix = `${prefix}.sections[${sectionIndex}]`;
        const sectionId = cleanText(section?.id, `${sectionPrefix}.id`, 80);
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sectionId)) {
          throw new Error(`${sectionPrefix}.id must be lowercase kebab-case.`);
        }
        const paragraphs = section.paragraphs ?? [];
        const sectionItems = section.items ?? [];
        if (!Array.isArray(paragraphs) || paragraphs.length > maxParagraphs) {
          throw new Error(`${sectionPrefix}.paragraphs is invalid or too long.`);
        }
        if (!Array.isArray(sectionItems) || sectionItems.length > maxSectionItems) {
          throw new Error(`${sectionPrefix}.items is invalid or too long.`);
        }
        if (paragraphs.length === 0 && sectionItems.length === 0) {
          throw new Error(`${sectionPrefix} must contain paragraphs or items.`);
        }
        const result = {
          id: sectionId,
          heading: cleanText(section.heading, `${sectionPrefix}.heading`, 160),
        };
        if (paragraphs.length > 0) {
          result.paragraphs = paragraphs.map((paragraph, paragraphIndex) =>
            cleanText(paragraph, `${sectionPrefix}.paragraphs[${paragraphIndex}]`, 4000),
          );
        }
        if (sectionItems.length > 0) {
          result.items = sectionItems.map((sectionItem, itemIndex) =>
            cleanText(sectionItem, `${sectionPrefix}.items[${itemIndex}]`, 500),
          );
        }
        return result;
      });
      documentItems.push({
        id,
        title: cleanText(item.title, `${prefix}.title`, 160),
        category: cleanText(item.category, `${prefix}.category`, 100),
        description: cleanText(item.description, `${prefix}.description`, 800),
        sourceLabel: cleanText(item.sourceLabel, `${prefix}.sourceLabel`, 120),
        ...(item.sourceModified !== undefined
          ? { sourceModified: cleanText(item.sourceModified, `${prefix}.sourceModified`, 80) }
          : {}),
        sections,
      });
      continue;
    }

    if (!allowedStatuses.has(item?.status)) throw new Error(`${prefix}.status is not allowed.`);
    const result = {
      id,
      kind: item.kind,
      title: cleanText(item.title, `${prefix}.title`, 160),
      category: cleanText(item.category, `${prefix}.category`, 100),
      description: cleanText(item.description, `${prefix}.description`, 800),
      status: item.status,
    };
    if (item.readingTime !== undefined) {
      result.readingTime = cleanText(item.readingTime, `${prefix}.readingTime`, 80);
    }
    feedItems.push(result);
  }

  return {
    feedItems: feedItems.sort((a, b) => a.id.localeCompare(b.id)),
    documentItems: documentItems.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function render({ feedItems, documentItems }) {
  const serializedFeed = JSON.stringify(feedItems, null, 2);
  const serializedDocuments = JSON.stringify(documentItems, null, 2);
  return `import type { EditorialStatus } from "./content";\nimport type { PublicDocument } from "./documents";\n\n/** Generated by scripts/sync-dropbox-public-feed.mjs. */\nexport type DropboxFeedItem = {\n  id: string;\n  kind: "research" | "documentary" | "video" | "series";\n  title: string;\n  category: string;\n  description: string;\n  status: EditorialStatus;\n  readingTime?: string;\n};\n\nexport type DropboxDocumentItem = PublicDocument;\n\nexport const dropboxFeedItems: DropboxFeedItem[] = ${serializedFeed};\nexport const dropboxDocumentItems: DropboxDocumentItem[] = ${serializedDocuments};\n`;
}

const token = await getAccessToken();
const entries = await listFolder(token);
const manifest = entries.find(
  (entry) => entry[".tag"] === "file" && entry.name === "manifest.json",
);
if (!manifest) {
  throw new Error(`No manifest.json found in approved Dropbox folder: ${sourcePath}`);
}

const data = validateManifest(
  await downloadJson(token, manifest.path_display ?? manifest.path_lower),
);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, render(data), "utf8");

const digest = createHash("sha256").update(JSON.stringify(data)).digest("hex");
console.log(
  `Validated ${data.feedItems.length} preview item(s) and ${data.documentItems.length} document(s); manifest digest ${digest}.`,
);
