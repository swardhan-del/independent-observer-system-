import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import originalTaxonomy from "../../plugins/library-content/taxonomy.generated.json";
import { taxonomyEntries } from "../../plugins/library-content/taxonomy";
import { curatedResearchPreviews, curationPreviewStatus } from "../data/curated-research-previews";
import { researchPreviews } from "../data/research-previews";
import { familyIdForKey } from "../data/family-registry";
import { researchCatalogueRecords } from "../lib/research-catalogue";
import { searchItems } from "../data/search-index";
import { canonicalRouteFor } from "../data/route-registry";
import { publicPaperCatalogue, recentArticles } from "../data/reader-catalogue";

const expected = [
  "the-cost-of-political-independence",
  "the-illusion-of-permanence",
  "the-civilizational-mirror",
  "who-is-america-for",
  "ideology-military-necessity-and-the-indian-legion",
  "ai-and-the-first-rung",
];
const htmlFor = (route: string) => readFileSync(join("dist", route, "index.html"), "utf8");
const textOf = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

describe("12 November curation across other volumes", () => {
  it("adds six absent families and groups the overlapping mandate drafts", () => {
    expect(curatedResearchPreviews.map((entry) => entry.id)).toEqual(expected);
    expect(curatedResearchPreviews.filter((entry) => entry.volume === "Volume II")).toHaveLength(5);
    expect(curatedResearchPreviews.filter((entry) => entry.volume === "Volume IV")).toHaveLength(1);
    expect(researchPreviews).toHaveLength(34);
    expect(taxonomyEntries).toHaveLength(originalTaxonomy.length + 6);
    expect(new Set(researchPreviews.map((entry) => entry.familyId)).size).toBe(34);
    expect(new Set(researchPreviews.map((entry) => entry.href)).size).toBe(34);
    for (const entry of curatedResearchPreviews) {
      expect(originalTaxonomy.some((item) => item.id === entry.taxonomyId)).toBe(false);
      expect(originalTaxonomy.some((item) => familyIdForKey(item.title) === entry.familyId)).toBe(
        false,
      );
      expect(taxonomyEntries.filter((item) => item.id === entry.taxonomyId)).toHaveLength(1);
      expect(
        researchCatalogueRecords.filter((item) => item.familyId === entry.familyId),
      ).toHaveLength(1);
      expect(searchItems.filter((item) => item.href.endsWith(entry.href))).toHaveLength(1);
      expect(entry.sourceNote).toBeTruthy();
      expect(entry.question.endsWith("?")).toBe(true);
      expect(entry.manuscriptReleased).toBe(false);
      expect(canonicalRouteFor(entry.href)).toMatchObject({
        indexable: false,
        familyId: entry.familyId,
      });
    }
    expect(familyIdForKey("The Two-Year Pendulum")).toBe(
      familyIdForKey("The Illusion of Permanence"),
    );
    expect(familyIdForKey("America for Americans")).toBe(familyIdForKey("Who Is America For?"));
    expect(familyIdForKey("AI and the First Rung of Economic Opportunity")).toBe(
      familyIdForKey("ai-and-the-first-rung"),
    );
    expect(curatedResearchPreviews.some((entry) => entry.id === "the-two-year-pendulum")).toBe(
      false,
    );
    expect(publicPaperCatalogue).toHaveLength(29);
    expect(recentArticles).toHaveLength(5);
  });

  it("builds honest previews with volume discovery, valid anchors and no release metadata", () => {
    const excluded = ["sitemap.xml", "feed.xml", "feed.atom.xml"].map((path) =>
      readFileSync(join("dist", path), "utf8"),
    );
    const map = htmlFor("/library/taxonomy/");
    for (const entry of curatedResearchPreviews) {
      const html = htmlFor(entry.href);
      const text = textOf(html);
      expect(text).toContain(entry.title);
      expect(text).toContain(curationPreviewStatus);
      expect(text).toContain(entry.question);
      expect(text).toContain(entry.evidenceNeeded);
      expect(text).toContain(entry.sourceNote);
      expect(text).toContain(`How it connects to ${entry.volume}`);
      expect(text).toContain(`Back to ${entry.volume} research`);
      expect(text).toContain("Research direction, not a full paper.");
      expect(html).toMatch(/name="robots" content="noindex,follow"/);
      expect(html).not.toMatch(
        /"@type":"ScholarlyArticle"|citation_pdf_url|citation_publication_date|dropbox\.com|ns:\d+|CloudStorage|\/Users\/|\.docx|ssrn\.com/i,
      );
      expect(map).toContain(`id="${entry.taxonomyId}"`);
      expect(map).toContain(entry.href);
      expect(htmlFor(entry.backHref.split("#")[0])).toContain(entry.href);
      for (const output of excluded) expect(output).not.toContain(entry.href);
      for (const link of [...entry.relatedLinks, { href: entry.backHref }]) {
        const [route, anchor] = link.href.split("#");
        expect(existsSync(join("dist", route, "index.html")), link.href).toBe(true);
        if (anchor) expect(htmlFor(route), link.href).toContain(`id="${anchor}"`);
      }
      for (const topic of entry.topics) expect(html).toContain(`/topics/${topic.toLowerCase()}/`);
    }
    expect(
      htmlFor("/series/the-empire-beneath-democracy/").match(/data-curated-research-card/g) ?? [],
    ).toHaveLength(5);
    expect(
      htmlFor("/series/the-last-human-workforce/").match(/data-curated-research-card/g) ?? [],
    ).toHaveLength(1);
    expect(htmlFor("/series/managed-decline/")).not.toContain("data-curated-research-card");
  });
});
