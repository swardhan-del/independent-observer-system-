import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { recentResearch } from "../data/recent-research";
import { researchPreviews } from "../data/research-previews";
import { researchReadingCopies } from "../data/research-reading-copies";
import { searchItems } from "../data/search-index";
import { rankSearchEntries } from "../lib/search";
import { seriesItems } from "../data/series";
import { slugify } from "../lib/slugs";

const htmlFor = (route: string) => readFileSync(join("dist", route, "index.html"), "utf8");
describe("dated research discovery and complete web essays", () => {
  it("lists every existing family once in date order without changing source release status", () => {
    expect(recentResearch).toHaveLength(researchPreviews.length);
    expect(new Set(recentResearch.map((e) => e.familyId)).size).toBe(researchPreviews.length);
    expect(recentResearch.map((e) => e.updatedDate)).toEqual(
      recentResearch
        .map((e) => e.updatedDate)
        .sort()
        .reverse(),
    );
    expect(recentResearch.filter((e) => e.readingCopy)).toHaveLength(2);
    const latest = htmlFor("/latest/");
    for (const entry of recentResearch) {
      expect(entry.manuscriptReleased).toBe(false);
      expect(latest.split(`data-recent-research="${entry.id}"`)).toHaveLength(2);
      expect(latest).toContain(`datetime="${entry.updatedDate}"`);
    }
    expect(latest.indexOf('id="recent-research"')).toBeLessThan(
      latest.indexOf('id="latest-releases-title"'),
    );
  });
  it("provides developed arguments, resolvable citation anchors and honest review scope", () => {
    for (const [id, copy] of Object.entries(researchReadingCopies)) {
      const entry = researchPreviews.find((e) => e.id === id)!;
      const html = htmlFor(entry.href);
      expect(
        copy.sections
          .flatMap((s) => s.paragraphs)
          .join(" ")
          .split(/\s+/).length,
      ).toBeGreaterThan(850);
      expect(copy.sections.length).toBeGreaterThanOrEqual(6);
      expect(new Set(copy.sections.map((s) => s.id)).size).toBe(copy.sections.length);
      expect(html).toContain('id="reading-copy"');
      expect(html).toContain("Public reading copy · working essay");
      expect(html).toContain("has not been externally peer reviewed");
      expect(html).toContain('name="robots" content="noindex,follow"');
      expect(html).not.toMatch(
        /dropbox\.com|\/Users\/|ns:\d+|citation_pdf_url|"@type":"ScholarlyArticle"/,
      );
      for (const section of copy.sections) {
        expect(html).toContain(`id="reading-${section.id}"`);
        for (const source of section.sourceIds ?? []) {
          expect(copy.sources.some((s) => s.id === source)).toBe(true);
          expect(html).toContain(`id="reading-source-${source}"`);
          expect(html).toContain(`href="#reading-source-${source}"`);
        }
      }
      for (const source of copy.sources) {
        expect(source.scope.length).toBeGreaterThan(50);
        expect(new URL(source.url).protocol).toBe("https:");
        expect(html).toContain(source.url);
      }
      for (const file of ["sitemap.xml", "feed.xml", "feed.atom.xml"])
        expect(readFileSync(join("dist", file), "utf8")).not.toContain(entry.href);
      expect(searchItems.filter((e) => e.href.endsWith(entry.href))).toHaveLength(1);
    }
    expect(
      rankSearchEntries(searchItems, "relational practical electoral").some((e) =>
        e.href.endsWith("/the-cost-of-political-independence/"),
      ),
    ).toBe(true);
  });
  it("puts valid navigation before the long overview on every volume page", () => {
    for (const item of seriesItems) {
      const html = htmlFor(`/series/${slugify(item.title)}/`);
      const nav = html.match(/<div[^>]*id="volume-navigation"[\s\S]*?<\/div>/)?.[0] ?? "";
      expect(nav).toContain('aria-current="page"');
      expect(nav).toContain(`aria-label="${item.volume} page sections"`);
      for (const [, anchor] of nav.matchAll(/href="#([^"]+)"/g))
        expect(html).toContain(`id="${anchor}"`);
      expect(html.indexOf('id="volume-navigation"')).toBeLessThan(
        html.indexOf('id="volume-overview"'),
      );
      if (["Volume II", "Volume IV"].includes(item.volume))
        expect(html.indexOf('id="recent-research-directions"')).toBeLessThan(
          html.indexOf('id="volume-overview"'),
        );
    }
  });
});
