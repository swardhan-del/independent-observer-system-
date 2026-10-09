import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  websiteFeedReadingDocuments,
  websiteFeedReadingLinks,
} from "../data/website-feed-reading-2026-09-18";
import { publicDocumentItems } from "../data/documents";
import { familyIdForKey } from "../data/family-registry";
import { taxonomyEntries } from "../../plugins/library-content/taxonomy";
import { volumeResearchMap } from "../data/volume-research";
import { researchCatalogueRecords } from "../lib/research-catalogue";
import { archivePaperById } from "../data/archive-navigation";

describe("six curated Website Feed reading pages", () => {
  it("expands exactly six existing taxonomy entries without creating duplicate families", () => {
    expect(websiteFeedReadingDocuments).toHaveLength(6);
    for (const { id, taxonomyId } of websiteFeedReadingLinks) {
      const doc = websiteFeedReadingDocuments.find((item) => item.id === id)!;
      const matches = taxonomyEntries.filter((item) => item.id === taxonomyId);
      expect(matches).toHaveLength(1);
      expect(matches[0].href).toBe(`/library/documents/${id}/`);
      expect(matches[0].volume).toBe(doc.volume);
      expect(publicDocumentItems.filter((item) => item.familyId === doc.familyId)).toHaveLength(1);
      expect(
        researchCatalogueRecords.filter((item) => item.familyId === doc.familyId),
      ).toHaveLength(1);
      expect(
        volumeResearchMap.find((volume) => volume.volume === doc.volume)?.papers,
      ).toContainEqual(doc);
    }
    expect(familyIdForKey("quantum-computing-antimatter-and-the-next-energy-revolution")).toBe(
      familyIdForKey("quantum-antimatter"),
    );
    expect(familyIdForKey("empire-s-mirror")).toBe(familyIdForKey("empires-mirror"));
    expect(familyIdForKey("the-fear-circuit")).toBe(familyIdForKey("fear-circuit"));
    expect(familyIdForKey("sanctioned-capital-and-the-american-opportunity-myth")).toBe(
      familyIdForKey("sanctioned-capital"),
    );
    expect(familyIdForKey("how-command-states-finance-power")).toBe(
      familyIdForKey("command-economies"),
    );
  });

  it("keeps every bounded reading discoverable across archive, library and topic filters", () => {
    const archiveIds = [
      "empires-mirror",
      "fear-circuit",
      "sanctioned-capital",
      "command-economies",
      "when-real-science-fiction",
      "quantum-antimatter",
    ];
    for (const id of archiveIds) {
      expect(archivePaperById.get(id)?.href).toMatch(/^\/library\/documents\//);
      expect(archivePaperById.get(id)?.status).not.toBe("Publication pending");
    }
    const quantum = researchCatalogueRecords.find(
      (record) => record.id === "paper:quantum-computing-antimatter-and-the-next-energy-revolution",
    );
    expect(quantum?.topics).toContain("Science");
    expect(quantum?.topics).toContain("Technology");
  });

  it("keeps evidence anchors, honest review boundaries and private-source exclusions", () => {
    for (const doc of websiteFeedReadingDocuments) {
      expect(doc.status).toBe("Author working paper");
      expect(doc.reviewScope?.independentReview).toContain("No independent scholarly peer review");
      expect(doc.sections.some((section) => section.id === "publication-boundary")).toBe(true);
      expect(doc.summaryEvidence!.length).toBeGreaterThan(0);
      const evidenceIds = doc.summaryEvidence!.map((source) => source.id);
      for (const section of doc.sections) {
        for (const id of section.evidenceIds ?? []) expect(evidenceIds).toContain(id);
      }
      for (const source of doc.summaryEvidence!) expect(source.url).toMatch(/^https:\/\//);
      for (const family of doc.relatedIds ?? [])
        expect(publicDocumentItems.some((item) => item.familyId === family)).toBe(true);
      expect(JSON.stringify(doc)).not.toMatch(
        /ns:\d+|dropbox\.com|\/Users\/|\.docx|\.codex_work|AJBH|Semmelweis/i,
      );
    }
    const fear = JSON.stringify(
      websiteFeedReadingDocuments.find((doc) => doc.id === "the-fear-circuit"),
    );
    expect(fear).toContain("scientific review");
    expect(fear).toContain("untested");
  });

  it("builds readable canonical pages and discovery links without claiming full-manuscript release", () => {
    const search = readFileSync("dist/search-index.json", "utf8");
    const sitemap = readFileSync("dist/sitemap.xml", "utf8");
    const taxonomy = readFileSync("dist/library/taxonomy/index.html", "utf8");
    const library = readFileSync("dist/library/index.html", "utf8");
    for (const doc of websiteFeedReadingDocuments) {
      const route = `/library/documents/${doc.id}/`;
      const html = readFileSync(`dist${route}index.html`, "utf8");
      expect((html.match(/<h1(?:\s|>)/g) ?? []).length).toBe(1);
      expect(html).toContain("citation_title");
      expect(html).toContain("Publication boundary");
      expect(search).toContain(route);
      expect(sitemap).toContain(route);
      expect(taxonomy).toContain(route);
      expect(library).toContain(route);
    }
  });
});
