import { access } from "node:fs/promises";
import { resolve } from "node:path";

const retiredPublicDocument = resolve(
  "public/documents/independent-observer-publication-operating-system-2026.docx",
);

try {
  await access(retiredPublicDocument);
  throw new Error(
    `Retired internal document must not be publicly served: ${retiredPublicDocument}`,
  );
} catch (error) {
  if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
    throw error;
  }
}

console.log(
  "Public publication boundary verified: retired internal document is not in public assets.",
);
