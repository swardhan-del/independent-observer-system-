import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APPROVED_SOURCE_PATH = "/Independent Observer desktop/Website Feed/approved";
const OUTPUT_PATH = resolve("src/data/dropbox-content.generated.ts");
const MAX_ARTIFACT_BYTES = 95 * 1024 * 1024;
const ALLOWED_STATUSES = new Set(["Concept preview", "In editorial development"]);
const ALLOWED_KINDS = new Set(["research", "documentary", "video", "series", "document"]);
const ALLOWED_CATEGORY_TERMS = [
  "history",
  "econom",
  "law",
  "politic",
  "institution",
  "science",
  "technolog",
  "energy",
  "ai",
  "media",
  "governance",
  "accountability",
  "civic",
  "geopolitic",
  "education",
  "research",
  "documentary",
  "public",
  "labor",
  "work",
  "space",
];
const RELEASE_GATES = [
  "sourceVerified",
  "contentQualityChecked",
  "rightsAndProvenanceReviewed",
  "releaseApproved",
];
const SOURCE_TYPES = {
  ".docx": "docx",
  ".pdf": "pdf",
  ".pptx": "pptx",
  ".md": "text",
  ".txt": "text",
  ".m4v": "video",
  ".mov": "video",
  ".mp4": "video",
  ".webm": "video",
};
const RESTRICTED_PUBLIC_TEXT =
  /(?:\b(?:medical(?:[-\s]+school)?|med[-\s]+school|medicine|personal|private|password|token|credential|secret|raw research|unpublished|legal evidence|private records?|private messages?|personal information|student[ -]?(?:records?|data|information)|medical[ -]?records?|administrative[ -]?(?:records?|data|information)|court exhibits?|evidence (?:files?|packets?|folders?)|raw (?:evidence|files?))\b|\/Users\/|\/private\/|(?:https?:\/\/)?(?:www\.)?dropbox\.com\/)/i;

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function readJson(url, options, label) {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) throw new Error(`${label} failed (${response.status}).`);
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
  if (!response.ok) throw new Error(`Dropbox token exchange failed (${response.status}).`);
  return (await response.json()).access_token;
}

async function listFolder(token) {
  const entries = [];
  let response = await readJson(
    "https://api.dropboxapi.com/2/files/list_folder",
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        path: APPROVED_SOURCE_PATH,
        recursive: false,
        include_deleted: false,
      }),
    },
    "Approved Dropbox folder listing",
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
      "Approved Dropbox folder pagination",
    );
    entries.push(...response.entries);
  }
  return entries;
}

async function download(token, path, label) {
  const response = await fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Dropbox-API-Arg": JSON.stringify({ path }),
    },
  });
  if (!response.ok) throw new Error(`${label} failed (${response.status}).`);
  return Buffer.from(await response.arrayBuffer());
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

function cleanPublicText(value, field, maxLength) {
  const text = cleanText(value, field, maxLength);
  if (RESTRICTED_PUBLIC_TEXT.test(text)) {
    throw new Error(`${field} contains restricted public text.`);
  }
  return text;
}

function validateCategory(category, field) {
  const normalized = category.toLocaleLowerCase();
  if (!ALLOWED_CATEGORY_TERMS.some((term) => normalized.includes(term))) {
    throw new Error(`${field} is outside the allowed public categories.`);
  }
  return category;
}

export function validateSourceDeclaration(source, kind, field) {
  if (!source || typeof source !== "object") throw new Error(`${field}.source is invalid.`);
  const relativePath = cleanText(source.relativePath, `${field}.source.relativePath`, 300);
  const sha256 = cleanText(source.sha256, `${field}.source.sha256`, 64).toLowerCase();
  const expectedType = cleanText(
    source.expectedType,
    `${field}.source.expectedType`,
    20,
  ).toLowerCase();
  const extension = extname(relativePath).toLowerCase();
  const filename = relativePath.split("/").at(-1);
  if (
    !filename ||
    relativePath.startsWith("/") ||
    relativePath.includes("\\") ||
    relativePath.split("/").some((part) => !part || part === "." || part === "..") ||
    !/^[a-f0-9]{64}$/.test(sha256) ||
    !Number.isInteger(source.size) ||
    source.size < 1 ||
    source.size > MAX_ARTIFACT_BYTES ||
    SOURCE_TYPES[extension] !== expectedType ||
    (kind === "video" && expectedType !== "video") ||
    (kind !== "video" && expectedType === "video") ||
    RESTRICTED_PUBLIC_TEXT.test(filename)
  ) {
    throw new Error(`${field}.source is invalid.`);
  }
  return { relativePath, sha256, size: source.size, expectedType, extension };
}

export function validateArtifact(source, bytes, field) {
  if (bytes.length !== source.size) throw new Error(`${field} file size mismatch.`);
  if (createHash("sha256").update(bytes).digest("hex") !== source.sha256) {
    throw new Error(`${field} SHA-256 mismatch.`);
  }
  const hasZipSignature = bytes.subarray(0, 4).equals(Buffer.from([80, 75, 3, 4]));
  const contains = (value) => bytes.includes(Buffer.from(value));
  if (
    source.expectedType === "pdf" &&
    (bytes.subarray(0, 5).toString() !== "%PDF-" || !contains("%%EOF"))
  ) {
    throw new Error(`${field} PDF container check failed.`);
  }
  if (
    source.expectedType === "docx" &&
    (!hasZipSignature || !contains("[Content_Types].xml") || !contains("word/document.xml"))
  ) {
    throw new Error(`${field} DOCX container check failed.`);
  }
  if (
    source.expectedType === "pptx" &&
    (!hasZipSignature || !contains("[Content_Types].xml") || !contains("ppt/presentation.xml"))
  ) {
    throw new Error(`${field} PPTX container check failed.`);
  }
  if (source.expectedType === "text") {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (!text.trim() || RESTRICTED_PUBLIC_TEXT.test(text)) {
      throw new Error(`${field} text quality check failed.`);
    }
  }
  if (
    source.expectedType === "video" &&
    source.extension === ".webm" &&
    !bytes.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
  ) {
    throw new Error(`${field} WebM container check failed.`);
  }
  if (
    source.expectedType === "video" &&
    source.extension !== ".webm" &&
    bytes.subarray(4, 8).toString() !== "ftyp"
  ) {
    throw new Error(`${field} video container check failed.`);
  }
}

function validateSections(sections, field) {
  if (!Array.isArray(sections) || sections.length === 0 || sections.length > 30) {
    throw new Error(`${field}.sections is invalid.`);
  }
  return sections.map((section, sectionIndex) => {
    const sectionField = `${field}.sections[${sectionIndex}]`;
    const id = cleanText(section?.id, `${sectionField}.id`, 80);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`${sectionField}.id is invalid.`);
    const paragraphs = section.paragraphs ?? [];
    const items = section.items ?? [];
    if (!Array.isArray(paragraphs) || paragraphs.length > 20)
      throw new Error(`${sectionField}.paragraphs is invalid.`);
    if (!Array.isArray(items) || items.length > 30)
      throw new Error(`${sectionField}.items is invalid.`);
    if (paragraphs.length === 0 && items.length === 0) throw new Error(`${sectionField} is empty.`);
    const result = {
      id,
      heading: cleanPublicText(section.heading, `${sectionField}.heading`, 160),
    };
    if (paragraphs.length > 0)
      result.paragraphs = paragraphs.map((paragraph, index) =>
        cleanPublicText(paragraph, `${sectionField}.paragraphs[${index}]`, 4000),
      );
    if (items.length > 0)
      result.items = items.map((item, index) =>
        cleanPublicText(item, `${sectionField}.items[${index}]`, 500),
      );
    return result;
  });
}

export function parseManifest(manifest) {
  if (
    manifest?.schemaVersion !== 2 ||
    !Array.isArray(manifest.items) ||
    manifest.items.length > 100 ||
    manifest.approvedForWebsite !== true ||
    !manifest.releaseGates ||
    RELEASE_GATES.some((gate) => manifest.releaseGates[gate] !== true)
  ) {
    throw new Error("Manifest schema or release gates failed.");
  }

  const ids = new Set();
  const feedItems = [];
  const documentItems = [];
  const sources = [];
  for (const [index, item] of manifest.items.entries()) {
    const field = `items[${index}]`;
    const id = cleanText(item?.id, `${field}.id`, 80);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id))
      throw new Error(`${field}.id is invalid or duplicated.`);
    ids.add(id);
    if (!ALLOWED_KINDS.has(item?.kind)) throw new Error(`${field}.kind is not allowed.`);
    if (!ALLOWED_STATUSES.has(item.status)) throw new Error(`${field}.status is not allowed.`);
    const title = cleanPublicText(item.title, `${field}.title`, 160);
    const category = validateCategory(
      cleanPublicText(item.category, `${field}.category`, 100),
      `${field}.category`,
    );
    const description = cleanPublicText(item.description, `${field}.description`, 800);
    if (!item.source) throw new Error(`${field}.source is required.`);
    const source = validateSourceDeclaration(item.source, item.kind, field);
    sources.push({ id, source });

    if (item.kind === "document") {
      const document = {
        id,
        title,
        category,
        description,
        sourceLabel: cleanPublicText(item.sourceLabel, `${field}.sourceLabel`, 120),
        ...(item.sourceModified !== undefined
          ? {
              sourceModified: cleanPublicText(item.sourceModified, `${field}.sourceModified`, 80),
            }
          : {}),
        sections: validateSections(item.sections, field),
      };
      documentItems.push(document);
      continue;
    }

    const feedItem = { id, kind: item.kind, title, category, description, status: item.status };
    if (item.readingTime !== undefined)
      feedItem.readingTime = cleanPublicText(item.readingTime, `${field}.readingTime`, 80);
    feedItems.push(feedItem);
  }
  return {
    feedItems: feedItems.sort((a, b) => a.id.localeCompare(b.id)),
    documentItems: documentItems.sort((a, b) => a.id.localeCompare(b.id)),
    sources,
  };
}

function render({ feedItems, documentItems }) {
  return `import type { EditorialStatus } from "./content";
import type { PublicDocument } from "./documents";

/** Generated by scripts/sync-dropbox-public-feed.mjs. */
export type DropboxFeedItem = {
  id: string;
  kind: "research" | "documentary" | "video" | "series";
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  readingTime?: string;
};

export type DropboxDocumentItem = PublicDocument;

export const dropboxFeedItems: DropboxFeedItem[] = ${JSON.stringify(feedItems, null, 2)};
export const dropboxDocumentItems: DropboxDocumentItem[] = ${JSON.stringify(documentItems, null, 2)};
`;
}

async function run() {
  if (process.env.DROPBOX_SOURCE_PATH && process.env.DROPBOX_SOURCE_PATH !== APPROVED_SOURCE_PATH) {
    throw new Error(`DROPBOX_SOURCE_PATH must equal ${APPROVED_SOURCE_PATH}.`);
  }
  const token = await getAccessToken();
  const entries = await listFolder(token);
  const manifestEntry = entries.find(
    (entry) => entry[".tag"] === "file" && entry.name === "manifest.json",
  );
  if (!manifestEntry) throw new Error(`No manifest.json found in ${APPROVED_SOURCE_PATH}.`);
  const manifest = JSON.parse(
    await download(
      token,
      manifestEntry.path_display ?? manifestEntry.path_lower,
      "Approved Dropbox manifest download",
    ),
  );
  const data = parseManifest(manifest);
  for (const { id, source } of data.sources) {
    const bytes = await download(
      token,
      `${APPROVED_SOURCE_PATH}/${source.relativePath}`,
      `${id} approved source download`,
    );
    validateArtifact(source, bytes, `items.${id}.source`);
  }
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, render(data), "utf8");
  const digest = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  console.log(
    `Validated ${data.feedItems.length} preview item(s) and ${data.documentItems.length} document(s); manifest digest ${digest}.`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await run();
