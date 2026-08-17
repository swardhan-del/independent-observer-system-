import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourcePath =
  process.env.DROPBOX_SOURCE_PATH ?? "/Independent Observer desktop/Website Feed/approved";
const outputPath = resolve("src/data/dropbox-content.generated.ts");
const allowedStatuses = new Set(["Concept preview", "In editorial development"]);
const allowedKinds = new Set(["research", "documentary", "video", "series"]);
const excludedTopicPattern = /\\b(?:medical(?:\\s+school)?|med\\s+school|medicine|personal|private)\\b/i;
const maxItems = 100;

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

function assertPublicTopic(value, field) {
  if (excludedTopicPattern.test(value)) {
    throw new Error(
      `${field} contains excluded medical, personal-life, or private-topic language.`,
    );
  }
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
  return manifest.items
    .map((item, index) => {
      const prefix = `items[${index}]`;
      const id = cleanText(item?.id, `${prefix}.id`, 80);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new Error(`${prefix}.id must be lowercase kebab-case.`);
      }
      if (ids.has(id)) throw new Error(`Duplicate Dropbox item id: ${id}`);
      ids.add(id);
      if (!allowedKinds.has(item?.kind)) throw new Error(`${prefix}.kind is not allowed.`);
      if (!allowedStatuses.has(item?.status)) throw new Error(`${prefix}.status is not allowed.`);
      const result = {
        id,
        kind: item.kind,
        title: cleanText(item.title, `${prefix}.title`, 160),
        category: cleanText(item.category, `${prefix}.category`, 100),
        description: cleanText(item.description, `${prefix}.description`, 800),
        status: item.status,
      };
      for (const field of ["title", "category", "description"]) {
        assertPublicTopic(result[field], `${prefix}.${field}`);
      }
      if (item.readingTime !== undefined) {
        result.readingTime = cleanText(item.readingTime, `${prefix}.readingTime`, 80);
      }
      return result;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

function render(items) {
  const serialized = JSON.stringify(items, null, 2);
  return `import type { EditorialStatus } from "./content";\n\n/** Generated by scripts/sync-dropbox-public-feed.mjs. */\nexport type DropboxFeedItem = {\n  id: string;\n  kind: "research" | "documentary" | "video" | "series";\n  title: string;\n  category: string;\n  description: string;\n  status: EditorialStatus;\n  readingTime?: string;\n};\n\nexport const dropboxFeedItems: DropboxFeedItem[] = ${serialized};\n`;
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
console.log(`Validated ${data.length} Dropbox website-feed item(s); manifest digest ${digest}.`);
