import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const filePath = resolve(
  "public/documents/independent-observer-publication-operating-system-2026.docx",
);
const expectedSha256 = "07984db194983a9ac7f50c244c8a4afea7b4b810602bd9abfb4d309bab1445ed";
const bytes = await readFile(filePath);
const sha256 = createHash("sha256").update(bytes).digest("hex");

if (!bytes.subarray(0, 2).equals(Buffer.from("PK"))) {
  throw new Error("Publication operating system is not a ZIP-based DOCX container.");
}
if (sha256 !== expectedSha256) {
  throw new Error(`Publication operating system SHA-256 mismatch: ${sha256}`);
}

console.log(`Publication operating system verified: SHA-256 ${sha256}`);
