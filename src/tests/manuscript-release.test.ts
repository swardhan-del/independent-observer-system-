import { describe, expect, it } from "vitest";
import {
  manuscriptReleaseAuthorizations,
  isManuscriptAuthorizedForRelease,
} from "../data/manuscript-release-registry";
import { manuscripts } from "../../plugins/library-content/manuscripts";
import { canonicalRouteRegistry } from "../data/route-registry";
import { searchItems } from "../data/search-index";
import { archiveFamilyIds } from "../data/family-registry";
import { topics } from "../data/content";
import { citationDate } from "../lib/citations";
import { taxonomyEntries } from "../../plugins/library-content/taxonomy";

describe("manuscript release authorization is fail-closed", () => {
  it("treats an unrecorded manuscript slug as not authorized", () => {
    expect(isManuscriptAuthorizedForRelease("no-such-manuscript-slug")).toBe(false);
  });

  it("keeps every authorization record fully attributed, not silent or empty", () => {
    expect(manuscriptReleaseAuthorizations.length).toBeGreaterThan(0);
    for (const record of manuscriptReleaseAuthorizations) {
      expect(record.manuscriptSlug.length).toBeGreaterThan(0);
      expect(record.edition.length).toBeGreaterThan(0);
      expect(record.authorizedBy.length).toBeGreaterThan(0);
      expect(record.authorizedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(record.authorizationNote.length).toBeGreaterThan(20);
    }
  });

  it("only makes a manuscript route indexable when its slug has a matching authorization", () => {
    for (const entry of manuscripts) {
      const route = canonicalRouteRegistry.find(
        (candidate) => candidate.source === "manuscripts" && candidate.route.includes(entry.slug),
      );
      expect(route).toBeDefined();
      expect(route!.indexable).toBe(isManuscriptAuthorizedForRelease(entry.slug));
    }
  });

  it("keeps the release-approval gate independent of the unrelated candidate preview queue", () => {
    // This registry must never share a mechanism with sixCandidateReleaseQueue
    // in publication-registry.ts, whose own test locks every record to
    // releaseDecision: "awaiting_human_release".
    expect(manuscriptReleaseAuthorizations.every((record) => !("releaseDecision" in record))).toBe(
      true,
    );
  });
});

describe("manuscript metadata fixes", () => {
  it("attaches the manuscript route to its stable archive family", () => {
    const manuscriptRoutes = canonicalRouteRegistry.filter(
      (candidate) => candidate.source === "manuscripts",
    );
    expect(manuscriptRoutes.length).toBeGreaterThan(0);
    for (const route of manuscriptRoutes) {
      expect(route.familyId).toBeTruthy();
    }
    expect(
      manuscriptRoutes.some(
        (route) => route.familyId === archiveFamilyIds.independentObserverMethod,
      ),
    ).toBe(true);
  });

  it("labels full manuscripts distinctly from working-paper summaries in search", () => {
    const manuscriptEntries = searchItems.filter((entry) => entry.id.startsWith("manuscript:"));
    expect(manuscriptEntries.length).toBeGreaterThan(0);
    for (const entry of manuscriptEntries) {
      expect(entry.status).not.toBe("Author working paper");
      expect(entry.status).not.toBe("Working-paper summary");
    }
  });

  it("gives every manuscript at least one valid site topic so topic filters can find it", () => {
    const topicNames = new Set(topics.map((topic) => topic.name));
    const manuscriptEntries = searchItems.filter((entry) => entry.id.startsWith("manuscript:"));
    for (const entry of manuscriptEntries) {
      expect(entry.topics && entry.topics.length).toBeGreaterThan(0);
      for (const topic of entry.topics ?? []) {
        expect(topicNames.has(topic), `${topic} is not a recognized site topic`).toBe(true);
      }
    }
  });

  it("carries each manuscript's own taxonomy branch into search, not a fixed category", () => {
    // Codex P2 finding on PR #51: a hardcoded category dropped a promoted
    // manuscript out of its taxonomy branch for search-category matching.
    const manuscriptEntries = searchItems.filter((entry) => entry.id.startsWith("manuscript:"));
    for (const entry of manuscripts) {
      const taxonomyEntry = taxonomyEntries.find((candidate) => candidate.id === entry.taxonomyId);
      const searchEntry = manuscriptEntries.find(
        (candidate) => candidate.id === `manuscript:${entry.slug}`,
      );
      expect(searchEntry).toBeDefined();
      if (taxonomyEntry) {
        expect(searchEntry?.category).toBe(taxonomyEntry.branch);
      }
    }
  });

  it("stores Quiet Wealth's exact source date in a format the citation parser accepts", () => {
    // Codex P2 finding on PR #51: citationDate() only accepts YYYY-MM-DD or
    // "D Month YYYY". Quiet Wealth's source gives an exact day ("September
    // 28, 2025"), so that day should not be silently dropped from
    // citation_publication_date / Schema.org datePublished. Manifesto and
    // Reputation Debt give only a month and year in their source text (no
    // day to preserve), so citationDate() correctly returns null for those
    // and they are not asserted here.
    const quietWealth = manuscripts.find((entry) => entry.slug === "quiet-wealth");
    expect(citationDate(quietWealth?.sourceDate)).toBe("2025-09-28");
  });
});

describe("Quiet Wealth and Reputation Debt reading editions apply the requested cleanup", () => {
  const quietWealth = manuscripts.find((entry) => entry.slug === "quiet-wealth");
  const reputationDebt = manuscripts.find((entry) => entry.slug === "reputation-debt");

  it("integrates both editions with their release authorizations recorded", () => {
    expect(quietWealth).toBeDefined();
    expect(reputationDebt).toBeDefined();
    expect(isManuscriptAuthorizedForRelease("quiet-wealth")).toBe(true);
    expect(isManuscriptAuthorizedForRelease("reputation-debt")).toBe(true);
  });

  it("removes the unfilled ORCID placeholder and submission-metadata appendix from Quiet Wealth", () => {
    // Checked against the manuscript body only: the edition note legitimately
    // names what it removed, so it is excluded from this assertion on purpose.
    const bodyText = JSON.stringify(quietWealth?.blocks).toLocaleLowerCase();
    const frontMatterText = JSON.stringify(quietWealth?.frontMatter).toLocaleLowerCase();
    expect(bodyText).not.toContain("insert here");
    expect(frontMatterText).not.toContain("insert here");
    expect(bodyText).not.toContain("appendix a");
    expect(bodyText).not.toContain("conflict-of-interest statement");
    expect(quietWealth?.editionNote.length).toBeGreaterThan(20);
  });

  it("removes the trailing distribution score and editing offer from Reputation Debt", () => {
    // Checked against the manuscript body only: the edition note legitimately
    // names what it removed, so it is excluded from this assertion on purpose.
    const bodyText = JSON.stringify(reputationDebt?.blocks).toLocaleLowerCase();
    expect(bodyText).not.toContain("distribution score");
    expect(bodyText).not.toContain("shorter ssrn-optimized");
    expect(bodyText).not.toContain("i can also reprint");
    expect(reputationDebt?.editionNote.length).toBeGreaterThan(20);
  });

  it("keeps a source-text fingerprint for both editions so the original extraction stays traceable", () => {
    for (const entry of [quietWealth, reputationDebt]) {
      expect(entry?.sourceTextSha256).toMatch(/^[0-9a-f]{64}$/);
    }
  });
});
