import { describe, expect, it } from "vitest";
import { nextClearanceQueue } from "../data/clearance-queue";
import { publicPublicationRegistry, sixCandidateReleaseQueue } from "../data/publication-registry";
import { regrowingHumanitySources } from "../data/regrowing-humanity-evidence";

describe("publication release safety", () => {
  it("keeps exactly six candidates awaiting human release", () => {
    expect(sixCandidateReleaseQueue).toHaveLength(6);
    expect(sixCandidateReleaseQueue.map((record) => record.id)).toEqual([
      "regrowing-humanity",
      "the-independent-observer-method-candidate",
      "the-last-human-workforce-candidate",
      "the-server-as-a-furnace-candidate",
      "borrowed-labor-candidate",
      "democracys-achilles-heel-candidate",
    ]);
    expect(
      sixCandidateReleaseQueue.every(
        (record) =>
          record.status === "public_preview" &&
          record.releaseDecision === "awaiting_human_release" &&
          record.canonicalRoute === null &&
          record.verifiedExternalUrl === null &&
          !("releaseApproved" in record),
      ),
    ).toBe(true);
  });

  it("keeps the next clearance wave metadata-only", () => {
    expect(nextClearanceQueue).toHaveLength(12);
    expect(nextClearanceQueue.every((record) => record.manuscriptTextIncluded === false)).toBe(
      true,
    );
    expect(nextClearanceQueue.every((record) => record.publicRoute === null)).toBe(true);
    expect(
      nextClearanceQueue.every(
        (record) => record.releaseDecision === "item_level_clearance_required",
      ),
    ).toBe(true);
  });

  it("keeps author paper records distinct from release approval", () => {
    const authorPapers = publicPublicationRegistry.filter(
      (record) => record.status === "working_paper",
    );
    expect(authorPapers).toHaveLength(21);
    expect(authorPapers.every((record) => record.releaseDecision === "external_record_only")).toBe(
      true,
    );
    expect(
      authorPapers.every(
        (record) =>
          record.verifiedExternalUrl === null ||
          record.verifiedExternalUrl.startsWith("https://www.researchgate.net/publication/"),
      ),
    ).toBe(true);
    expect(authorPapers.filter((record) => record.verifiedExternalUrl)).toHaveLength(18);
  });

  it("keeps the repository registry public-safe", () => {
    const serialized = JSON.stringify(publicPublicationRegistry);
    expect(serialized).not.toMatch(/(?:dropbox|\.venv|site-packages|Users\/|CloudStorage)/i);
    expect(serialized).not.toMatch(/(?:refresh[_-]?token|api[_-]?key|private[_-]?path)/i);
    expect(
      publicPublicationRegistry.every((record) => record.provenanceFingerprint.length > 0),
    ).toBe(true);
  });

  it("keeps the Evidence Lab source explorer aligned with the reviewed 36-source package", () => {
    expect(regrowingHumanitySources).toHaveLength(36);
    expect(regrowingHumanitySources.filter((source) => source.kind === "scholarly")).toHaveLength(
      30,
    );
    expect(
      regrowingHumanitySources.filter((source) => source.kind === "institutional"),
    ).toHaveLength(6);
  });
});
