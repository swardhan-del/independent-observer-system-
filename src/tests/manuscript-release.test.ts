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
});
