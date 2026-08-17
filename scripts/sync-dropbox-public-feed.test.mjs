import { describe, expect, it } from "vitest";

import { parseManifest, validateArtifact } from "./sync-dropbox-public-feed.mjs";

const approvedManifest = () => ({
  schemaVersion: 2,
  approvedForWebsite: true,
  releaseGates: {
    sourceVerified: true,
    contentQualityChecked: true,
    rightsAndProvenanceReviewed: true,
    releaseApproved: true,
  },
  items: [
    {
      id: "sample-item",
      kind: "research",
      title: "A verified public document",
      category: "Public inquiry",
      description: "A description suitable for the public catalog.",
      status: "Concept preview",
      source: {
        relativePath: "documents/example.pdf",
        sha256: "0".repeat(64),
        qualityChecked: true,
      },
    },
  ],
});

const artifact = (extension) => ({ id: "sample-item", source: { extension } });
const padded = (...parts) => Buffer.concat([...parts, Buffer.alloc(128)]);

describe("Dropbox public-feed contract", () => {
  it("requires an approved schema and every release gate", () => {
    expect(parseManifest(approvedManifest())).toHaveLength(1);
    const manifest = approvedManifest();
    manifest.releaseGates.releaseApproved = false;
    expect(() => parseManifest(manifest)).toThrow("Manifest schema or gates failed");
  });

  it("rejects unsafe source paths and restricted public metadata", () => {
    const pathManifest = approvedManifest();
    pathManifest.items[0].source.relativePath = "../example.pdf";
    expect(() => parseManifest(pathManifest)).toThrow("source invalid");

    const metadataManifest = approvedManifest();
    metadataManifest.items[0].description = "Private material";
    expect(() => parseManifest(metadataManifest)).toThrow("excluded");
  });

  it("checks document and documentary container signatures", () => {
    expect(() =>
      validateArtifact(artifact(".pdf"), padded(Buffer.from("%PDF-"), Buffer.from("%%EOF"))),
    ).not.toThrow();
    expect(() =>
      validateArtifact(
        artifact(".docx"),
        padded(Buffer.from([80, 75, 3, 4]), Buffer.from("[Content_Types].xmlword/document.xml")),
      ),
    ).not.toThrow();
    expect(() =>
      validateArtifact(
        artifact(".pptx"),
        padded(Buffer.from([80, 75, 3, 4]), Buffer.from("[Content_Types].xmlppt/presentation.xml")),
      ),
    ).not.toThrow();
    expect(() =>
      validateArtifact(artifact(".webm"), padded(Buffer.from([26, 69, 223, 163]))),
    ).not.toThrow();
    expect(() =>
      validateArtifact(artifact(".mp4"), padded(Buffer.alloc(4), Buffer.from("ftyp"))),
    ).not.toThrow();
  });

  it("rejects malformed or empty artifacts", () => {
    expect(() => validateArtifact(artifact(".pdf"), Buffer.from("not a PDF".repeat(20)))).toThrow(
      "PDF quality",
    );
    expect(() => validateArtifact(artifact(".txt"), Buffer.alloc(128))).toThrow("text quality");
  });
});
