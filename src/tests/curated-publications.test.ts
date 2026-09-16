import { describe, expect, it } from "vitest";
import { curatedPublications } from "../data/curated-publications";
import { publicationLedger } from "../data/publication-ledger";

const expectedSlugs = [
  "from-plato-to-chomsky-civic-capacity",
  "formation-through-struggle",
  "civil-rights-realignment-party-sorting",
  "welfare-queen-tax-cut-policy-visibility",
  "party-switch-realignment-polarization",
];

describe("source-audited curated publication batch", () => {
  it("contains exactly the first five distinct work families", () => {
    expect(curatedPublications).toHaveLength(5);
    expect(curatedPublications.map((item) => item.slug)).toEqual(expectedSlugs);
    expect(new Set(curatedPublications.map((item) => item.familyId)).size).toBe(5);
  });

  it("keeps the five adaptations fail-closed for formal release", () => {
    expect(curatedPublications.every((item) => item.sourceVerified)).toBe(true);
    expect(curatedPublications.every((item) => item.accessibilityReviewed)).toBe(true);
    expect(curatedPublications.every((item) => item.productionReleased === false)).toBe(true);
    expect(curatedPublications.every((item) => item.rightsReviewed === false)).toBe(true);
  });

  it("separates evidence roles and exposes only public source URLs", () => {
    for (const item of curatedPublications) {
      expect(new Set(item.evidence.map((entry) => entry.kind))).toEqual(
        new Set(["documented", "interpretation", "proposition", "limitation"]),
      );
      expect(item.sourceNotes.length).toBeGreaterThanOrEqual(2);
      expect(item.sourceNotes.every((source) => /^https:\/\//.test(source.href))).toBe(true);
      expect(JSON.stringify(item)).not.toMatch(/Dropbox|\.codex_work|\/Users\//i);
    }
  });

  it("adds the batch to the publication ledger as source-audited previews", () => {
    for (const slug of expectedSlugs) {
      const item = curatedPublications.find((candidate) => candidate.slug === slug)!;
      const ledger = publicationLedger.find((entry) => entry.id === item.candidateId);
      expect(ledger?.status).toBe("Source-audited preview");
      expect(ledger?.route).toBe(`/research/${slug}/`);
    }
  });
});
