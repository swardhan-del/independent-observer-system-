import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import {
  parseManifest,
  validateArtifact,
  validateSourceDeclaration,
} from "./sync-dropbox-public-feed.mjs";

const gates = {
  sourceVerified: true,
  contentQualityChecked: true,
  rightsAndProvenanceReviewed: true,
  releaseApproved: true,
};

const approvedManifest = () => ({
  schemaVersion: 2,
  approvedForWebsite: true,
  releaseGates: { ...gates },
  items: [
    {
      id: "sample-item",
      kind: "research",
      title: "A verified public document",
      category: "Public inquiry",
      description: "A description suitable for the public catalog.",
      status: "Concept preview",
      source: {
        relativePath: "documents/example.txt",
        sha256: "0".repeat(64),
        size: 128,
        expectedType: "text",
      },
    },
  ],
});

const sourceFor = (bytes, relativePath = "documents/example.txt", expectedType = "text") => ({
  relativePath,
  sha256: createHash("sha256").update(bytes).digest("hex"),
  size: bytes.length,
  expectedType,
  extension: relativePath.slice(relativePath.lastIndexOf(".")),
});

describe("Dropbox public-feed contract", () => {
  it("requires schema v2, explicit website approval, and every release gate", () => {
    expect(parseManifest(approvedManifest()).feedItems).toHaveLength(1);
    for (const key of Object.keys(gates)) {
      const manifest = approvedManifest();
      manifest.releaseGates[key] = false;
      expect(() => parseManifest(manifest)).toThrow("Manifest schema or release gates failed");
    }
    const unapproved = approvedManifest();
    unapproved.approvedForWebsite = false;
    expect(() => parseManifest(unapproved)).toThrow("Manifest schema or release gates failed");
  });

  it("rejects unsafe source paths and restricted public metadata", () => {
    const pathManifest = approvedManifest();
    pathManifest.items[0].source.relativePath = "../example.txt";
    expect(() => parseManifest(pathManifest)).toThrow("source is invalid");

    const metadataManifest = approvedManifest();
    metadataManifest.items[0].description = "Private material";
    expect(() => parseManifest(metadataManifest)).toThrow("restricted public text");
  });

  it("validates public source declarations and artifact hashes", () => {
    const bytes = Buffer.from("A public-safe text artifact.");
    const source = sourceFor(bytes);
    expect(() => validateSourceDeclaration(source, "research", "items[0]")).not.toThrow();
    expect(() => validateArtifact(source, bytes, "items.sample.source")).not.toThrow();
    expect(() =>
      validateArtifact(source, Buffer.alloc(bytes.length, 66), "items.sample.source"),
    ).toThrow("SHA-256");
    expect(() => validateSourceDeclaration({ ...source, size: 0 }, "research", "items[0]")).toThrow(
      "source is invalid",
    );
  });

  it("checks supported document and media container signatures", () => {
    const pdf = Buffer.from("%PDF-1.7\npublic\n%%EOF");
    expect(() =>
      validateArtifact(sourceFor(pdf, "documents/example.pdf", "pdf"), pdf, "pdf"),
    ).not.toThrow();
    const docx = Buffer.concat([
      Buffer.from([80, 75, 3, 4]),
      Buffer.from("[Content_Types].xmlword/document.xml"),
    ]);
    expect(() =>
      validateArtifact(sourceFor(docx, "documents/example.docx", "docx"), docx, "docx"),
    ).not.toThrow();
    const pptx = Buffer.concat([
      Buffer.from([80, 75, 3, 4]),
      Buffer.from("[Content_Types].xmlppt/presentation.xml"),
    ]);
    expect(() =>
      validateArtifact(sourceFor(pptx, "documents/example.pptx", "pptx"), pptx, "pptx"),
    ).not.toThrow();
    const webm = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x01]);
    expect(() =>
      validateArtifact(sourceFor(webm, "videos/example.webm", "video"), webm, "webm"),
    ).not.toThrow();
  });

  it("rejects malformed or restricted artifacts", () => {
    const badPdf = Buffer.from("not a PDF");
    expect(() =>
      validateArtifact(sourceFor(badPdf, "documents/example.pdf", "pdf"), badPdf, "pdf"),
    ).toThrow("PDF container");
    const privateText = Buffer.from("Private material");
    expect(() => validateArtifact(sourceFor(privateText), privateText, "text")).toThrow(
      "text quality",
    );
  });

  it("preserves reviewed structured documents without publishing raw artifacts", () => {
    const manifest = approvedManifest();
    manifest.items = [
      {
        id: "reviewed-document",
        kind: "document",
        title: "A reviewed public document",
        category: "Research desk",
        description: "A public-safe reading copy.",
        status: "Concept preview",
        sourceLabel: "Reviewed public source",
        source: {
          relativePath: "documents/example.txt",
          sha256: "0".repeat(64),
          size: 128,
          expectedType: "text",
        },
        sections: [{ id: "overview", heading: "Overview", paragraphs: ["Reviewed text only."] }],
      },
    ];
    const result = parseManifest(manifest);
    expect(result.documentItems[0].sections[0].id).toBe("overview");
    expect(result.feedItems).toHaveLength(0);
    expect(JSON.stringify(result)).not.toContain("assetPath");
  });

  it("rejects restricted text in every structured public field", () => {
    const fields = [
      ["sourceLabel", "Private source"],
      ["sourceModified", "Private record"],
      ["readingTime", "Private notes"],
    ];
    for (const [field, value] of fields) {
      const manifest = approvedManifest();
      if (field === "readingTime") manifest.items[0][field] = value;
      else {
        manifest.items = [
          {
            id: "reviewed-document",
            kind: "document",
            title: "A reviewed public document",
            category: "Research desk",
            description: "A public-safe reading copy.",
            status: "Concept preview",
            sourceLabel: "Reviewed public source",
            source: {
              relativePath: "documents/example.txt",
              sha256: "0".repeat(64),
              size: 128,
              expectedType: "text",
            },
            sections: [
              { id: "overview", heading: "Overview", paragraphs: ["Reviewed text only."] },
            ],
          },
        ];
        manifest.items[0][field] = value;
      }
      expect(() => parseManifest(manifest)).toThrow("restricted public text");
    }

    for (const location of ["heading", "paragraphs", "items"]) {
      const manifest = approvedManifest();
      manifest.items = [
        {
          id: "reviewed-document",
          kind: "document",
          title: "A reviewed public document",
          category: "Research desk",
          description: "A public-safe reading copy.",
          status: "Concept preview",
          sourceLabel: "Reviewed public source",
          source: {
            relativePath: "documents/example.txt",
            sha256: "0".repeat(64),
            size: 128,
            expectedType: "text",
          },
          sections: [{ id: "overview", heading: "Overview", paragraphs: ["Reviewed text only."] }],
        },
      ];
      if (location === "heading") manifest.items[0].sections[0].heading = "Private heading";
      if (location === "paragraphs")
        manifest.items[0].sections[0].paragraphs = ["Private paragraph"];
      if (location === "items") manifest.items[0].sections[0].items = ["Private item"];
      expect(() => parseManifest(manifest)).toThrow("restricted public text");
    }
  });

  it("requires provenance and an allowed status for every item", () => {
    const missingSource = approvedManifest();
    delete missingSource.items[0].source;
    expect(() => parseManifest(missingSource)).toThrow("source is required");

    const missingStatus = approvedManifest();
    delete missingStatus.items[0].status;
    expect(() => parseManifest(missingStatus)).toThrow("status is not allowed");
  });
});
