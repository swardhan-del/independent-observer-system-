import { describe, expect, it } from "vitest";
import { validatePublicationManifest } from "./publication-manifest.mjs";

const baseItem = {
  candidateId: "IO-TEST-APPROVED",
  slug: "approved-test-work",
  title: "Approved Test Work",
  shortTitle: "Approved Test",
  author: "Synthetic Test Author",
  volume: "Volume I",
  topics: ["History"],
  contentType: "research",
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
};

function manifest(item = {}) {
  return { schemaVersion: 3, items: [{ ...baseItem, ...item }] };
}

describe("publication manifest", () => {
  it("accepts a fully approved synthetic item", () => {
    expect(validatePublicationManifest(manifest(), { ownerId: "owner-test" }).items).toHaveLength(
      1,
    );
  });

  for (const [name, change] of [
    ["Red", { releaseApproved: false }],
    ["Legacy", { contentType: "document", releaseApproved: false }],
    ["unapproved", { releaseApproved: false }],
    ["duplicated", { candidateId: "IO-TEST-APPROVED" }],
    ["unknown", { contentType: "unknown" }],
    ["path-bearing", { publicAssetReferences: ["/private-fixture/work.docx"] }],
  ]) {
    it(`rejects ${name} records`, () => {
      const value =
        name === "duplicated"
          ? { schemaVersion: 3, items: [baseItem, { ...baseItem }] }
          : manifest(change);
      expect(() => validatePublicationManifest(value, { ownerId: "owner-test" })).toThrow();
    });
  }

  it("rejects owner mismatches and incomplete gates", () => {
    expect(() =>
      validatePublicationManifest(manifest({ approvedBy: "someone-else" }), {
        ownerId: "owner-test",
      }),
    ).toThrow();
    expect(() =>
      validatePublicationManifest(manifest({ privacyLegalSafetyReviewed: false }), {
        ownerId: "owner-test",
      }),
    ).toThrow();
  });

  it("rejects impossible nominal calendar dates", () => {
    expect(() =>
      validatePublicationManifest(manifest({ dateCreated: "2026-02-31" }), {
        ownerId: "owner-test",
      }),
    ).toThrow();
    expect(() =>
      validatePublicationManifest(manifest({ approvedAt: "2026-02-31T10:00:00Z" }), {
        ownerId: "owner-test",
      }),
    ).toThrow();
  });
});
