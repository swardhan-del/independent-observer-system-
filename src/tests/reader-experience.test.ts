import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { searchItems } from "../data/search-index";
import { rankSearchEntries, type SearchEntry } from "../lib/search";
import { paperDocuments } from "../data/papers";
import { displayTitle, readingMinutes, volumeDescriptions } from "../data/reader-presentation";
import { exportCitation } from "../lib/citations";
import { relatedRecords } from "../lib/related";

describe("reader vocabulary and evidence boundaries", () => {
  it.each([
    ["deportation", "document:who-deported-more"],
    ["Who Deported More", "document:who-deported-more"],
    ["immigration", "document:who-deported-more"],
    ["AI jobs", "document:a-systems-centered-manifesto"],
    ["automation", "document:a-systems-centered-manifesto"],
    ["technology and intimacy", "document:disconnected-hearts"],
    ["tax", "document:wardhan-tax-doctrine"],
    ["quantum entanglement", "document:entanglement-primer"],
    ["podcast", "podcast:1"],
  ])("%s surfaces an appropriate public entry near the top", (query, id) => {
    expect(
      rankSearchEntries(searchItems, query)
        .slice(0, 5)
        .map((entry) => entry.id),
    ).toContain(id);
  });

  it("ranks an exact title over incidental body matches and honors combined filters", () => {
    const base: SearchEntry = {
      id: "title",
      title: "Quantum Entanglement",
      description: "A primer",
      category: "Science",
      status: "Summary",
      type: "Research",
      href: "/primer/",
      topics: ["Science"],
      volume: "Volume IV",
    };
    const body = {
      ...base,
      id: "body",
      title: "Other research",
      searchText: "Quantum entanglement",
    };
    expect(rankSearchEntries([body, base], "quantum entanglement")[0].id).toBe("title");
    expect(
      rankSearchEntries([base], "quantum", {
        topic: "Science",
        volume: "Volume IV",
        type: "Research",
        status: "Summary",
      }),
    ).toHaveLength(1);
    expect(rankSearchEntries([base], "quantum", { volume: "Volume I" })).toHaveLength(0);
    expect(rankSearchEntries([base], "zzzzzz")).toHaveLength(0);
  });

  it("indexes public explanations but not archive provenance or private routes", () => {
    const entry = searchItems.find((item) => item.id === "document:who-deported-more")!;
    expect(entry.type).toBe("Research");
    expect(entry.format).toContain("Working-paper summary");
    expect(entry.searchText).toContain("Title 42");
    expect(entry.searchText).not.toMatch(/controller|source fingerprint|publication-boundary/i);
    expect(searchItems.every((item) => !/\/(private|review)\//.test(item.href))).toBe(true);
    expect(rankSearchEntries(searchItems, "Title 42")[0].id).toBe(entry.id);
  });

  it("shortens presentation without rewriting formal citations or release status", () => {
    const entry = paperDocuments.find((item) => item.id === "who-deported-more")!;
    expect(displayTitle(entry)).toBe("How to Compare Deportation Statistics");
    expect(exportCitation(entry, "bib")).toContain(entry.title);
    expect(entry.status).toBe("Author working paper");
    expect(Object.values(volumeDescriptions).every((description) => description.length < 180)).toBe(
      true,
    );
    expect(
      readingMinutes({
        ...entry,
        sections: [{ id: "body", heading: "Title", paragraphs: ["word ".repeat(440)] }],
      }),
    ).toBe(3);
  });

  it("does not recommend unrelated work merely because it shares a volume", () => {
    const current = {
      id: "one",
      title: "Intimacy",
      description: "",
      category: "Relationships",
      status: "Summary",
      href: "/one/",
      volume: "Volume IV",
    };
    expect(
      relatedRecords(current, [
        { ...current, id: "two", title: "Quantum computing", category: "Physics" },
      ]),
    ).toHaveLength(0);
  });
  it("keeps every sitemap title unique after editorial shortening", () => {
    const sitemap = readFileSync("dist/sitemap.xml", "utf8");
    const titles = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
      const path = new URL(match[1]).pathname;
      return readFileSync(`dist${path}index.html`, "utf8").match(/<title>(.*?)<\/title>/)![1];
    });
    expect(new Set(titles).size).toBe(titles.length);
  });
});
