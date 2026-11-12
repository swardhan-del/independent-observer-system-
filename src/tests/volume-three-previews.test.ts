import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { volumeThreePreviews, volumeThreePreviewStatus } from "../data/volume-three-previews";
import { volumeThreeResearchRecords } from "../data/volume-three-research";
import { taxonomyEntries } from "../../plugins/library-content/taxonomy";
import { searchItems } from "../data/search-index";
import { researchCatalogueRecords } from "../lib/research-catalogue";
import { canonicalRouteFor } from "../data/route-registry";
import { publicPaperCatalogue, recentArticles } from "../data/reader-catalogue";

const priorityIds = [
  "from-pockets-to-portfolios",
  "the-economics-of-color",
  "the-perception-proxy",
  "redistribution-and-working-class-prosperity",
  "status-incentives-and-boundary-expansion-in-u-s-racial-classification",
  "empire-without-bread",
  "illiterate-voters-corrupt-leaders",
  "economic-displacement-and-social-welfare",
];
const htmlFor = (route: string) => readFileSync(join("dist", route, "index.html"), "utf8");
const textOf = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

describe("Volume III linked research previews", () => {
  it("reconciles 28 unique map identities and the eight priority candidates", () => {
    expect(volumeThreePreviews).toHaveLength(28);
    expect(volumeThreePreviews.filter((entry) => entry.priority).map((entry) => entry.id)).toEqual(
      priorityIds,
    );
    for (const key of ["id", "taxonomyId", "href", "familyId"] as const)
      expect(new Set(volumeThreePreviews.map((entry) => entry[key])).size).toBe(28);
    expect(volumeThreePreviews.filter((entry) => entry.volume === "Volume III")).toHaveLength(27);
    expect(volumeThreePreviews.find((entry) => entry.id === "empire-without-bread")?.volume).toBe(
      "Volume II",
    );
    expect(volumeThreeResearchRecords.filter((entry) => entry.publicDocumentId)).toHaveLength(2);
    for (const entry of volumeThreePreviews) {
      expect(taxonomyEntries.filter((item) => item.id === entry.taxonomyId)).toEqual([
        expect.objectContaining({
          title: entry.title,
          href: entry.href,
          status: volumeThreePreviewStatus,
          volume: entry.volume,
        }),
      ]);
      expect(volumeThreeResearchRecords.find((item) => item.id === entry.id)?.previewHref).toBe(
        entry.href,
      );
      expect(entry.question).toMatch(/\?$/);
      expect(entry.evidenceNeeded.length).toBeGreaterThan(100);
      expect(entry.manuscriptReleased).toBe(false);
      expect(entry.related).toHaveLength(2);
      for (const id of entry.related) {
        expect(id).not.toBe(entry.id);
        expect(volumeThreePreviews.some((candidate) => candidate.id === id)).toBe(true);
      }
    }
  });
  it("reuses search and catalogue identities without inflating released-paper counts", () => {
    for (const entry of volumeThreePreviews) {
      expect(searchItems.filter((item) => item.href.endsWith(entry.href))).toHaveLength(1);
      expect(researchCatalogueRecords.filter((item) => item.href.endsWith(entry.href))).toEqual([
        expect.objectContaining({ kind: "Research preview", status: volumeThreePreviewStatus }),
      ]);
      expect(canonicalRouteFor(entry.href)).toMatchObject({
        indexable: false,
        familyId: entry.familyId,
      });
    }
    expect(publicPaperCatalogue).toHaveLength(29);
    expect(recentArticles).toHaveLength(5);
    expect(JSON.stringify(volumeThreePreviews)).not.toMatch(
      /dropbox|ns:\d+|\/Users\/|\.docx|\.pdf|swardhan1@|abstract_id=|ssrn\.com/i,
    );
  });
  it("builds all previews with honest status, working local links and no release metadata", () => {
    const excludedOutputs = ["sitemap.xml", "feed.xml", "feed.atom.xml"].map((path) =>
      readFileSync(join("dist", path), "utf8"),
    );
    const dossier = htmlFor("/series/managed-decline/");
    const taxonomy = htmlFor("/library/taxonomy/");
    expect((dossier.match(/data-volume-dossier-card/g) ?? []).length).toBe(30);
    for (const entry of volumeThreePreviews) {
      const html = htmlFor(entry.href);
      const text = textOf(html);
      expect(text).toContain(entry.title);
      expect(text).toContain(volumeThreePreviewStatus);
      expect(text).toContain(entry.question);
      expect(text).toContain(entry.evidenceNeeded);
      expect(text).toContain("Research direction, not a full paper.");
      expect(html).toMatch(/name="robots" content="noindex,follow"/);
      expect(html).not.toMatch(
        /"@type":"ScholarlyArticle"|citation_pdf_url|citation_publication_date/,
      );
      expect(html).not.toMatch(/dropbox\.com|ns:\d+|CloudStorage|\/Users\/|\.docx/i);
      expect(dossier).toContain(`id="research-${entry.id}"`);
      expect(dossier).toContain(entry.href);
      expect(taxonomy).toContain(entry.href);
      for (const output of excludedOutputs) expect(output).not.toContain(entry.href);
      for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
        const path = match[1].replace(/^\/independent-observer-system-/, "");
        if (path.endsWith("/"))
          expect(existsSync(join("dist", path, "index.html")), path).toBe(true);
      }
    }
  });
});
