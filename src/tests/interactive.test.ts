import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rankSearchEntries, normalizeSearchText } from "../lib/search";
import { migrateReadingList, sortReadingList } from "../lib/reading-list";
import { relatedRecords } from "../lib/related";

const sourceRoot = join(process.cwd(), "src");
const header = readFileSync(join(sourceRoot, "components/Header.astro"), "utf8");
const search = readFileSync(join(sourceRoot, "components/SiteSearch.astro"), "utf8");
const filter = readFileSync(join(sourceRoot, "components/ContentFilter.astro"), "utf8");
const card = readFileSync(join(sourceRoot, "components/EditorialCard.astro"), "utf8");
const readingList = readFileSync(join(sourceRoot, "components/ReadingList.astro"), "utf8");
const layout = readFileSync(join(sourceRoot, "layouts/BaseLayout.astro"), "utf8");
const series = readFileSync(join(sourceRoot, "pages/series/index.astro"), "utf8");
const reader = readFileSync(join(sourceRoot, "components/DocumentReader.astro"), "utf8");
const evidence = readFileSync(join(sourceRoot, "components/EvidenceLayer.astro"), "utf8");
const detail = readFileSync(join(sourceRoot, "components/EditorialDetail.astro"), "utf8");

describe("interactive preview tools", () => {
  it("ships browser-local site search without a collection endpoint", () => {
    expect(header).toContain("<SiteSearch />");
    expect(search).toContain("data-search-open");
    expect(search).toContain("data-search-results");
    expect(search).toContain("Search runs in your browser");
    expect(search).not.toMatch(/fetch\s*\(/);
    expect(search).toContain("ArrowDown");
    expect(search).toContain("data-search-filter");
    expect(search).toContain("highlightTokens");
  });

  it("ships accessible client-side filters for editorial previews", () => {
    expect(filter).toContain('aria-pressed="true"');
    expect(filter).toContain("data-filter-query");
    expect(filter).toContain("data-filter-empty");
    expect(filter).toContain("data-filter-reset");
    expect(filter).toContain("URLSearchParams");
    expect(filter).toContain("replaceState");
    expect(card).toContain("data-filter-card");
    expect(card).toContain("data-search-text");
    expect(series).toContain("data-filter-card");
  });

  it("keeps collection forms explicitly disabled until a privacy-safe service exists", () => {
    expect(readFileSync(join(sourceRoot, "pages/index.astro"), "utf8")).toContain(
      'aria-label="Newsletter preview"',
    );
    expect(readFileSync(join(sourceRoot, "pages/contact/index.astro"), "utf8")).toContain(
      "Preview only—this form does not transmit or store data.",
    );
  });

  it("ships a browser-local reading list without an account or collection endpoint", () => {
    expect(layout).toContain("<ReadingList />");
    expect(card).toContain("data-reading-toggle");
    expect(readingList).toContain("data-reading-open");
    expect(readingList).toContain("localStorage");
    expect(readingList).not.toMatch(/fetch\s*\(/);
    expect(readingList).toContain("data-reading-export");
    expect(readingList).toContain("io:reading-list-updated");
    expect(readingList).toContain("Recommended public previews");
    expect(readingList).toContain("Highest-download matched SSRN preprints");
    expect(readingList).toContain("Books and volumes in development");
    expect(readingList).toContain("data-reading-save-all");
    expect(readingList).toContain("researchGateUrl");
  });

  it("ranks AI by token boundaries and controlled synonyms", () => {
    const entries = [
      {
        id: "ai",
        title: "AI and the workforce",
        category: "Technology",
        description: "Automation and employment.",
        status: "Preview",
        type: "Research" as const,
        href: "/ai/",
      },
      {
        id: "said",
        title: "Public claims",
        category: "History",
        description: "A record said to matter.",
        status: "Preview",
        type: "Research" as const,
        href: "/claims/",
      },
    ];
    const results = rankSearchEntries(entries, "AI");
    expect(results[0]?.id).toBe("ai");
    expect(results.some((result) => result.id === "said")).toBe(false);
    expect(normalizeSearchText("Élite’s Institutions")).toBe("elites institutions");
  });

  it("supports type/topic/status/volume filters and deterministic related content", () => {
    const entries = [
      {
        id: "a",
        title: "Automation",
        category: "Technology",
        description: "",
        status: "Concept preview",
        type: "Research" as const,
        href: "/a/",
        topics: ["Technology"],
        volume: "Volume IV",
      },
      {
        id: "b",
        title: "Welfare",
        category: "Political Economy",
        description: "",
        status: "Concept preview",
        type: "Research" as const,
        href: "/b/",
        topics: ["Economics"],
        volume: "Volume III",
      },
    ];
    expect(
      rankSearchEntries(entries, "technology", {
        type: "Research",
        topic: "Technology",
        volume: "Volume IV",
      }).map((entry) => entry.id),
    ).toEqual(["a"]);
    expect(relatedRecords({ ...entries[0], id: "current" }, entries, 1)[0]?.id).toBe("a");
  });

  it("migrates legacy reading-list items, handles malformed storage, and sorts locally", () => {
    const legacy = JSON.stringify([{ id: "one", title: "One", href: "/one/" }]);
    const migrated = migrateReadingList(legacy);
    expect(migrated[0]).toMatchObject({ id: "one", status: "unread" });
    expect(migrateReadingList("not json")).toEqual([]);
    expect(
      sortReadingList(
        [...migrated, { ...migrated[0], id: "two", title: "Two", savedAt: 1 }],
        "title",
      ).map((item) => item.title),
    ).toEqual(["One", "Two"]);
  });

  it("provides reader and evidence-layer primitives with no-JavaScript content", () => {
    expect(reader).toContain("data-reader-progress");
    expect(reader).toContain("data-copy-section-link");
    expect(reader).toContain("reader-limitations");
    expect(reader).toContain("data-reader-download-citation");
    expect(evidence).toContain('aria-pressed="true"');
    expect(evidence).toContain("The full text remains visible");
  });

  it("exposes SSRN provenance and usage signals without inventing ratings", () => {
    expect(reader).toContain("Open SSRN record");
    expect(reader).toContain("SSRN signal");
    expect(readFileSync(join(sourceRoot, "pages/research/index.astro"), "utf8")).toContain(
      "Public SSRN-linked articles",
    );
    expect(readFileSync(join(sourceRoot, "pages/series/[slug].astro"), "utf8")).toContain(
      "featuredDocuments",
    );
  });

  it("supports richer concept briefs without changing their publication status", () => {
    expect(detail).toContain("detailLead");
    expect(detail).toContain("detailSections");
    expect(detail).toContain('aria-label="Research brief"');
    expect(detail).toContain("detail-section-index");
  });
});
