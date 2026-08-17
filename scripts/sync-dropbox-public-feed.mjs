import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_SOURCE_PATH = "/Independent Observer desktop/Website Feed/approved";
const OUTPUT_PATH = resolve("src/data/dropbox-content.generated.ts");
const ASSET_ROOT = resolve("public/dropbox-feed");
const MAX_ARTIFACT_BYTES = 95 * 1024 * 1024;
const ALLOWED_STATUSES = new Set(["Concept preview", "In editorial development"]);
const ALLOWED_KINDS = new Set(["research", "documentary"]);
const DOCUMENT_EXTENSIONS = new Set([".docx", ".pdf", ".pptx", ".md", ".txt"]);
const DOCUMENTARY_EXTENSIONS = new Set([".m4v", ".mov", ".mp4", ".webm"]);
const RELEASE_GATES = [
  "sourceVerified",
  "contentQualityChecked",
  "rightsAndProvenanceReviewed",
  "releaseApproved",
];
const RESTRICTED_PUBLIC_TEXT =
  /\b(?:medical(?:[-\s]+school)?|med[-\s]+school|medicine|personal|private)\b/i;

const requiredEnv = (name) => {
  if (!process.env[name]) throw new Error("Missing " + name);
  return process.env[name];
};

const request = async (url, init, label) => {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(label + " failed (" + response.status + ")");
  return response;
};

const authenticate = async () =>
  (
    await (
      await request(
        "https://api.dropboxapi.com/oauth2/token",
        {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: requiredEnv("DROPBOX_REFRESH_TOKEN"),
            client_id: requiredEnv("DROPBOX_APP_KEY"),
            client_secret: requiredEnv("DROPBOX_APP_SECRET"),
          }),
        },
        "Dropbox auth",
      )
    ).json()
  ).access_token;

const download = async (token, path, { allowMissing = false } = {}) => {
  const response = await fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
      "Dropbox-API-Arg": JSON.stringify({ path }),
    },
  });
  if (!response.ok) {
    if (allowMissing && response.status === 409) return null;
    throw new Error("Dropbox download failed (" + response.status + ")");
  }
  return Buffer.from(await response.arrayBuffer());
};

const textField = (value, name, maxLength) => {
  if (
    typeof value !== "string" ||
    !(value = value.trim()) ||
    value.length > maxLength ||
    /[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
  )
    throw new Error(name + " invalid");
  return value;
};

const sourceDeclaration = (source, kind, name) => {
  if (!source || typeof source !== "object") throw new Error(name + ".source required");
  const relativePath = textField(source.relativePath, name + ".path", 300);
  const sha256 = textField(source.sha256, name + ".sha256", 64).toLowerCase();
  const extension = extname(relativePath).toLowerCase();
  const filename = relativePath.split("/").at(-1);
  if (
    !filename ||
    relativePath.startsWith("/") ||
    relativePath.includes("\\") ||
    relativePath.split("/").some((part) => !part || part === "." || part === "..") ||
    !/^[a-f0-9]{64}$/.test(sha256) ||
    source.qualityChecked !== true ||
    RESTRICTED_PUBLIC_TEXT.test(filename) ||
    !(kind === "research" ? DOCUMENT_EXTENSIONS : DOCUMENTARY_EXTENSIONS).has(extension)
  )
    throw new Error(name + ".source invalid");
  return { relativePath, sha256, extension, filename };
};

export const parseManifest = (manifest) => {
  if (
    manifest?.schemaVersion !== 2 ||
    !Array.isArray(manifest.items) ||
    !manifest.items.length ||
    manifest.items.length > 100 ||
    manifest.approvedForWebsite !== true ||
    !manifest.releaseGates ||
    RELEASE_GATES.some((gate) => manifest.releaseGates[gate] !== true)
  )
    throw new Error("Manifest schema or gates failed");

  const ids = new Set();
  return manifest.items
    .map((item, index) => {
      const name = "items[" + index + "]";
      const id = textField(item?.id, name + ".id", 80);
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
        ids.has(id) ||
        !ALLOWED_KINDS.has(item.kind) ||
        !ALLOWED_STATUSES.has(item.status)
      )
        throw new Error(name + " metadata invalid");
      ids.add(id);
      const normalized = {
        id,
        kind: item.kind,
        title: textField(item.title, name + ".title", 160),
        category: textField(item.category, name + ".category", 100),
        description: textField(item.description, name + ".description", 800),
        status: item.status,
        source: sourceDeclaration(item.source, item.kind, name),
      };
      if (item.readingTime !== undefined)
        normalized.readingTime = textField(item.readingTime, name + ".readingTime", 80);
      for (const field of ["title", "category", "description", "readingTime"])
        if (normalized[field] && RESTRICTED_PUBLIC_TEXT.test(normalized[field]))
          throw new Error(name + " excluded");
      return normalized;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
};

export const validateArtifact = (item, bytes) => {
  if (bytes.length < 100) throw new Error(item.id + " too small");
  if (bytes.length > MAX_ARTIFACT_BYTES) throw new Error(item.id + " too large");
  const extension = item.source.extension;
  const zipSignature = bytes.subarray(0, 4).equals(Buffer.from([80, 75, 3, 4]));
  const contains = (value) => bytes.includes(Buffer.from(value));
  if (extension === ".pdf" && (bytes.subarray(0, 5).toString() !== "%PDF-" || !contains("%%EOF")))
    throw new Error(item.id + " PDF quality");
  if (
    extension === ".docx" &&
    (!zipSignature || !contains("[Content_Types].xml") || !contains("word/document.xml"))
  )
    throw new Error(item.id + " DOCX quality");
  if (
    extension === ".pptx" &&
    (!zipSignature || !contains("[Content_Types].xml") || !contains("ppt/presentation.xml"))
  )
    throw new Error(item.id + " PPTX quality");
  if (extension === ".md" || extension === ".txt") {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (!text.trim() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text))
      throw new Error(item.id + " text quality");
    if (RESTRICTED_PUBLIC_TEXT.test(text)) throw new Error(item.id + " excluded");
  }
  if (extension === ".webm" && !bytes.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])))
    throw new Error(item.id + " WebM quality");
  if ([".mov", ".mp4", ".m4v"].includes(extension) && bytes.subarray(4, 8).toString() !== "ftyp")
    throw new Error(item.id + " MP4/MOV quality");
};

const assetDescriptor = (id, filename) => {
  const directory = resolve(ASSET_ROOT, id);
  const destination = resolve(directory, filename);
  if (!destination.startsWith(directory + sep)) throw new Error(id + " asset path invalid");
  return {
    directory,
    destination,
    publicPath: "/dropbox-feed/" + id + "/" + encodeURIComponent(filename),
  };
};

const run = async () => {
  const sourcePath = process.env.DROPBOX_SOURCE_PATH ?? DEFAULT_SOURCE_PATH;
  const token = await authenticate();
  const manifestBytes = await download(token, sourcePath + "/manifest.json", {
    allowMissing: true,
  });
  if (!manifestBytes) {
    console.log("No approved Dropbox manifest; nothing to publish.");
    return;
  }
  const manifest = JSON.parse(manifestBytes.toString("utf8"));
  const items = parseManifest(manifest);
  const validated = [];
  for (const item of items) {
    const bytes = await download(token, sourcePath + "/" + item.source.relativePath);
    if (createHash("sha256").update(bytes).digest("hex") !== item.source.sha256)
      throw new Error(item.id + " hash mismatch");
    validateArtifact(item, bytes);
    validated.push({ item, bytes, asset: assetDescriptor(item.id, item.source.filename) });
  }
  await rm(ASSET_ROOT, { recursive: true, force: true });
  for (const { bytes, asset } of validated) {
    await mkdir(asset.directory, { recursive: true });
    await writeFile(asset.destination, bytes);
  }
  const publicItems = validated.map(({ item, asset }) => {
    const { source, ...publicItem } = item;
    return { ...publicItem, assetPath: asset.publicPath };
  });
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    'import type { EditorialStatus } from "./content";\n\nexport type DropboxFeedItem={id:string;kind:"research"|"documentary"|"video"|"series";title:string;category:string;description:string;status:EditorialStatus;readingTime?:string;assetPath?:string};\n\nexport const dropboxFeedItems: DropboxFeedItem[] = ' +
      JSON.stringify(publicItems, null, 2) +
      ";\n",
  );
  console.log("Validated and staged " + items.length + " approved Dropbox item(s).");
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await run();
