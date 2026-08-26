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
const catalogue = readFileSync(join(sourceRoot, "components/PublicationCatalogue.astro"), "utf8");
const reader = readFileSync(join(sourceRoot, "components/DocumentReader.astro"), "utf8");
const evidence = readFileSync(join(sourceRoot, "components/EvidenceLayer.astro"), "utf8");
const detail = readFileSync(join(sourceRoot, "components/EditorialDetail.astro"), "utf8");
const about = readFileSync(join(sourceRoot, "pages/about/index.astro"), "utf8");
const homepage = readFileSync(join(sourceRoot, "pages/index.astro"), "utf8");
const ssrn = readFileSync(join(sourceRoot, "data/ssrn.ts"), "utf8");
const homepageVolumeGuide = readFileSync(
  join(sourceRoot, "components/HomepageVolumeGuide.astro"),
  "utf8",
);
const videos = readFileSync(join(sourceRoot, "pages/videos/index.astro"), "utf8");
const documentaries = readFileSync(join(sourceRoot, "pages/documentaries/index.astro"), "utf8");

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
    expect(series).toContain("<PublicationCatalogue />");
    expect(catalogue).toContain("data-publication-catalogue");
    expect(catalogue).toContain("data-catalogue-query");
    expect(catalogue).toContain("data-catalogue-volume");
    expect(catalogue).toContain("data-catalogue-status");
    expect(catalogue).toContain("replaceState");
  });

  it("keeps collection forms explicitly disabled until a privacy-safe service exists", () => {
    expect(readFileSync(join(sourceRoot, "pages/index.astro"), "utf8")).toContain(
      'aria-label="Newsletter preview"',
    );
    expect(readFileSync(join(sourceRoot, "pages/contact/index.astro"), "utf8")).toContain(
      "Preview only—this form does not transmit or store data.",
    );
  });

  it("renders a visible public source trail and release boundary for annotated previews", () => {
    expect(detail).toContain("Public source trail");
    expect(detail).toContain("Evidence with a release boundary.");
    expect(detail).toContain('target="_blank"');
    expect(detail).toContain('rel="noreferrer"');
  });

  it("connects documentary planning to all four volume research signals", () => {
    expect(documentaries).toContain("What each volume is building.");
    expect(documentaries).toContain("Leading public signals in this volume");
    expect(documentaries).toContain("SSRN does not provide a reliable star-rating field");
    expect(documentaries).toContain("Research state:");
    expect(documentaries).toContain("Reading copy →");
    expect(documentaries).toContain("SSRN ↗");
  });

  it("presents the series as an official catalogue without collapsing editorial status", () => {
    expect(series).toContain('title="Publication Catalogue"');
    expect(series).not.toContain("review roadmap, not a publication catalogue");
    expect(series).toContain("catalogue record does not make a volume a finished publication");
    expect(catalogue).toContain("Official catalogue");
    expect(catalogue).toContain("Open investigative file");
    expect(catalogue).toContain("Connected public work");
    expect(catalogue).toContain("usage signal only");
    expect(catalogue).toContain("human approval gates");
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
    expect(reader).toContain('className="document-reader-hero"');
    expect(ssrn).toContain("Volume I is the method anchor for the Independent Observer");
    expect(ssrn).toContain(
      "the one Volume I paper currently represented by a matched public SSRN record",
    );
    expect(ssrn).toContain("began within the past year");
    expect(ssrn).toContain("open to discussion, empirical testing, and revision");
    expect(reader).not.toContain('class="reader-notice"');
    expect(reader).toContain("reader-limitations");
    expect(reader).toContain("data-reader-download-citation");
    expect(evidence).toContain('aria-pressed="true"');
    expect(evidence).toContain("The full text remains visible");
    expect(evidence).toContain("data-evidence-source");
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

  it("connects the About page to the Volume I method and public reading copy", () => {
    expect(about).toContain("Observe before you react.");
    expect(about).toContain('className="about-hero"');
    expect(about).toContain("time, resources, institutional access, and economic room");
    expect(about).toContain("Volume I · Method");
    expect(about).toContain("documented fact");
    expect(about).toContain("Charles Hamilton Houston");
    expect(about).toContain("independent-observer-volume-one-ssrn");
    expect(about).toContain("series/independent-observer");
    expect(about).toContain("Independent Observer is a connected four-volume inquiry.");
    expect(about).toContain("Volume II follows power through democracy, sovereignty, migration");
    expect(about).toMatch(
      /Volume III asks how work,\s+taxation, welfare, time, and social citizenship/,
    );
    expect(about).toContain("<TopicVolumeMap />");
  });

  it("explains Volume I observation and connects all four volumes to topic hubs", () => {
    expect(homepage).toContain(
      "Volume I begins with a practical philosophy: observation comes before reaction.",
    );
    expect(homepage).toMatch(/Volume II follows power\s+through sovereignty and institutions/);
    expect(homepage).toContain("<HomepageVolumeGuide />");
    expect(homepage).toContain("ssrnPreprintDocuments");
    expect(homepage).toContain("The public Volume I SSRN record reports");
    expect(homepage).toContain("source: volumeOneSource");
    expect(homepage).toContain("research published through SSRN, ResearchGate, and Zenodo");
    expect(homepage).toContain("new research, revisions, and evidence continue to develop here");
    expect(homepageVolumeGuide).toContain("Volume I establishes the method of observation");
    expect(homepageVolumeGuide).toContain("seriesItems.map");
    expect(homepageVolumeGuide).toContain("volumeTopicConnections[item.volume]");
    expect(homepageVolumeGuide).toContain("item.volume");
    expect(homepageVolumeGuide).toContain("topicPluginFor(slug)");
  });

  it("keeps video, reels, and survey pathways visibly preview-only", () => {
    expect(videos).toContain("Shorts &amp; reels");
    expect(videos).toContain("Independent Observer Survey");
    expect(videos).toContain("no responses, findings, or audience data are published here");
    expect(videos).toContain('id="independent-observer-survey"');
    expect(videos).toContain("Concept preview");
  });
});
