import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { archiveFamilyIds, familyIdForKey } from "../data/family-registry";
import { archivePapers } from "../data/archive-navigation";
import { nextClearanceQueue } from "../data/clearance-queue";
import { paperDocuments } from "../data/papers";
import { previewGreenPublications } from "../data/green-publications";
import {
  assertUniquePublicTitles,
  assertUniqueRoutes,
  canonicalRouteRegistry,
  indexableRouteRegistry,
  normalizePublicTitle,
} from "../data/route-registry";
import { publicDocumentItems } from "../data/documents";
import { unresolvedPlacementDecisions } from "../data/placement-decisions";
import { relatedRecords } from "../lib/related";

const auditDirectory = join(
  process.cwd(),
  "docs/audits/independent-observer-redundancy-provenance-2026-09-01",
);

describe("redundancy and provenance controls", () => {
  it("keeps normalized public titles unique within each entity type", () => {
    const keys = indexableRouteRegistry.map(
      (record) => `${record.type}:${normalizePublicTitle(record.title)}`,
    );
    expect(new Set(keys).size).toBe(keys.length);
    expect(() => assertUniquePublicTitles(indexableRouteRegistry)).not.toThrow();
  });

  it("keeps the canonical route registry unique", () => {
    expect(() => assertUniqueRoutes(canonicalRouteRegistry)).not.toThrow();
    expect(new Set(canonicalRouteRegistry.map((record) => record.route)).size).toBe(
      canonicalRouteRegistry.length,
    );
  });

  it("resolves every public document to exactly one stable archive family", () => {
    expect(publicDocumentItems.every((document) => /^[A-Z0-9_-]+$/.test(document.familyId))).toBe(
      true,
    );
    expect(
      paperDocuments.every((document) => document.familyId === familyIdForKey(document.id)),
    ).toBe(true);
    expect(new Set(archivePapers.map((paper) => paper.familyId)).size).toBe(archivePapers.length);
    expect(
      [...previewGreenPublications, ...nextClearanceQueue].every((record) =>
        record.familyId.startsWith("IO-FAMILY-"),
      ),
    ).toBe(true);
  });

  it("treats title and controller-key variants as aliases, not new families", () => {
    expect(familyIdForKey("The Illusion of Equality")).toBe(archiveFamilyIds.illusionOfEquality);
    expect(familyIdForKey("empire-of-distraction")).toBe(archiveFamilyIds.empireOfDistraction);
    expect(familyIdForKey("The Empire of Distraction")).toBe(archiveFamilyIds.empireOfDistraction);
    expect(familyIdForKey("The Lottery of Luck")).toBe(archiveFamilyIds.lotteryOfLuck);
    expect(familyIdForKey("IO-V4-LAST-HUMAN-WORKFORCE")).toBe(archiveFamilyIds.lastHumanWorkforce);
  });

  it("keeps unresolved archive placement conflicts fail-closed", () => {
    const unresolved = [
      archiveFamilyIds.illusionOfEquality,
      archiveFamilyIds.empireOfDistraction,
      archiveFamilyIds.lotteryOfLuck,
    ];
    expect(Object.keys(unresolvedPlacementDecisions).sort()).toEqual([...unresolved].sort());
    for (const familyId of unresolved) {
      expect(unresolvedPlacementDecisions[familyId]).toMatchObject({
        status: "held",
        canonicalVolume: null,
        canonicalCategory: null,
        canonicalSubfolder: null,
        ownerApprovalRequired: true,
      });
      expect(
        paperDocuments.find((document) => document.familyId === familyId)?.placementDecision,
      ).toMatchObject({ status: "held", canonicalVolume: null });
    }
  });

  it("keeps every route from the live pre-change sitemap represented", () => {
    const beforeRoutes = readFileSync(join(auditDirectory, "live-sitemap-before.txt"), "utf8")
      .split(/\r?\n/)
      .map((route) => route.trim())
      .filter(Boolean);
    const localRoutes = new Set(canonicalRouteRegistry.map((record) => record.route));
    for (const route of beforeRoutes) {
      const pathname = new URL(route).pathname;
      expect(localRoutes.has(pathname)).toBe(true);
    }
  });

  it("disambiguates the distinct research entity without changing its compatible route", () => {
    const seriesHtml = readFileSync(
      join(process.cwd(), "dist/series/the-last-human-workforce/index.html"),
      "utf8",
    );
    const researchHtml = readFileSync(
      join(process.cwd(), "dist/research/the-last-human-workforce/index.html"),
      "utf8",
    );
    const disambiguatedTitle =
      "The Last Human Workforce: Task Bundles, Automation, and Transition Design";
    expect(seriesHtml).toContain("<h1>The Last Human Workforce</h1>");
    expect(researchHtml).toContain(`<title>${disambiguatedTitle} | Independent Observer</title>`);
    expect(researchHtml).toContain(`<h1>${disambiguatedTitle}</h1>`);
    expect(researchHtml).toContain(`property="og:title" content="${disambiguatedTitle}`);
    expect(researchHtml).toContain(`name="twitter:title" content="${disambiguatedTitle}`);
    expect(researchHtml).toContain(`"headline":"${disambiguatedTitle}"`);
    const canonical = researchHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (!canonical) throw new Error("Research preview is missing a canonical URL.");
    expect(new URL(canonical).origin).toBe("https://independentobserver.org");
    expect(new URL(canonical).pathname).toMatch(/\/research\/the-last-human-workforce\/$/);
    expect(normalizePublicTitle("The Last Human Workforce")).not.toBe(
      normalizePublicTitle(disambiguatedTitle),
    );
  });

  it("uses explicit stable relationships for related work", () => {
    const lastHuman = previewGreenPublications.find(
      (publication) => publication.familyId === archiveFamilyIds.lastHumanWorkforce,
    );
    const related = relatedRecords(
      {
        id: "last-human",
        familyId: lastHuman?.familyId,
        title: lastHuman?.title ?? "",
        description: "",
        category: "",
        href: "/research/the-last-human-workforce/",
        status: "preview",
        volume: lastHuman?.volume,
        relatedIds: lastHuman?.relatedPublicationIds,
      },
      previewGreenPublications.map((publication) => ({
        id: publication.candidateId,
        familyId: publication.familyId,
        title: publication.title,
        description: publication.standfirst,
        category: publication.topics[0] ?? "",
        href: `/research/${publication.slug}/`,
        status: publication.status,
        volume: publication.volume,
      })),
      3,
    );
    expect(related.map((record) => record.familyId)).toEqual(
      expect.arrayContaining([
        archiveFamilyIds.serverAsFurnace,
        archiveFamilyIds.regrowingHumanity,
      ]),
    );
  });

  it("does not serialize private source paths or raw source formats into public records", () => {
    const serialized = JSON.stringify({ publicDocumentItems, previewGreenPublications });
    expect(serialized).not.toMatch(/\/Users\/|Dropbox|\.codex_work|\.git\//i);
    expect(serialized).not.toMatch(
      /The_Last_Human_Workforce_IO_Volume_IV_KDP_Draft|SSRN_WP_Illusion_of_Equality|The Empire of Distraction \.docx/i,
    );
    expect(serialized).not.toMatch(/dropbox\.com|file:\/\//i);
  });
});
