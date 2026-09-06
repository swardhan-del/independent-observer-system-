import { describe, expect, it } from "vitest";

import { parseManifest } from "./sync-dropbox-public-feed.mjs";

const releaseGates = {
  sourceVerified: true,
  contentQualityChecked: true,
  rightsAndProvenanceReviewed: true,
  releaseApproved: true,
};

function approvedItem(contentType) {
  return {
    id: `content-type-${contentType}`,
    candidateId: `IO-CONTENT-TYPE-${contentType.toUpperCase()}`,
    slug: `content-type-${contentType}`,
    shortTitle: `Content type ${contentType}`,
    author: "Synthetic Test Author",
    volume: "Volume I",
    topics: ["Public inquiry"],
    contentType,
    version: "v1",
    dateCreated: "2026-08-01",
    dateModified: "2026-08-02",
    controllerSha256: "a".repeat(64),
    sourceVerified: true,
    contentQualityChecked: true,
    rightsAndProvenanceReviewed: true,
    privacyLegalSafetyReviewed: true,
    accessibilityChecked: true,
    releaseApproved: true,
    approvedBy: "owner-test",
    approvedAt: "2026-08-03T10:00:00Z",
    license: "all-rights-reserved",
    citationStatus: "verified",
    downloadAllowed: false,
    publicAssetReferences: [],
    title: `A verified ${contentType} item`,
    category: "Public inquiry",
    description: "A description suitable for the public catalog.",
    status: "Concept preview",
    source: {
      relativePath: contentType === "video" ? "videos/example.mp4" : "documents/example.txt",
      sha256: "0".repeat(64),
      size: 128,
      expectedType: contentType === "video" ? "video" : "text",
    },
  };
}

function manifestWith(item) {
  return {
    schemaVersion: 3,
    approvedForWebsite: true,
    releaseGates: { ...releaseGates },
    items: [item],
  };
}

describe("schema-v3 contentType compatibility", () => {
  it("accepts a contentType-only video as a feed item and validates it as video", () => {
    process.env.PUBLICATION_OWNER_ID = "owner-test";
    const item = approvedItem("video");
    expect(item.kind).toBeUndefined();

    const result = parseManifest(manifestWith(item));

    expect(result.feedItems).toHaveLength(1);
    expect(result.feedItems[0].kind).toBe("video");
    expect(result.documentItems).toHaveLength(0);
    expect(result.sources[0].source.expectedType).toBe("video");
  });

  it("routes a contentType-only document to structured documents rather than the public feed", () => {
    process.env.PUBLICATION_OWNER_ID = "owner-test";
    const item = {
      ...approvedItem("document"),
      sourceLabel: "Reviewed public source",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: ["Reviewed public text only."],
        },
      ],
    };
    expect(item.kind).toBeUndefined();

    const result = parseManifest(manifestWith(item));

    expect(result.feedItems).toHaveLength(0);
    expect(result.documentItems).toHaveLength(1);
    expect(result.documentItems[0].id).toBe("content-type-document");
    expect(result.sources[0].source.expectedType).toBe("text");
  });
});
