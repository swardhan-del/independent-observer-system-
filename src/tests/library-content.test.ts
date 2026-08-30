import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { publicLibrarySnapshot } from "../data/public-library";
import { ssrnPreprintDocuments } from "../data/ssrn";
import { seriesItems } from "../data/series";
import { volumeResearchMap } from "../data/volume-research";

const sourceRoot = join(process.cwd(), "src");
const libraryPage = readFileSync(join(sourceRoot, "pages/library/index.astro"), "utf8");
const contentBlocks = readFileSync(
  join(sourceRoot, "components/LibraryContentBlocks.astro"),
  "utf8",
);
const researchShelf = readFileSync(
  join(sourceRoot, "components/LibraryResearchShelf.astro"),
  "utf8",
);
const siteSearch = readFileSync(join(sourceRoot, "components/SiteSearch.astro"), "utf8");

describe("library content blocks", () => {
  it("covers each roadmap volume with core ideas and topic lenses", () => {
    expect(libraryVolumeGuides.map((guide) => guide.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      libraryVolumeGuides.every(
        (guide) =>
          guide.importance.length > 0 &&
          guide.coreIdeas.length >= 3 &&
          guide.topicSlugs.length >= 2,
      ),
    ).toBe(true);
    expect(
      libraryVolumeGuides.every((guide) =>
        seriesItems.some((item) => item.volume === guide.volume),
      ),
    ).toBe(true);
  });

  it("keeps the source-taxonomy research map separate from public SSRN records", () => {
    const volumeOne = libraryVolumeGuides.find((guide) => guide.volume === "Volume I");
    const volumeTwo = libraryVolumeGuides.find((guide) => guide.volume === "Volume II");

    expect(volumeOne?.researchPapers.map((paper) => paper.title)).toEqual([
      "Manifesto of a Destiny: The Independent Observer Method",
      "Capital Amplification and the Myth of Equal Opportunity",
      "Quiet Wealth as Risk Management",
      "The Attention Infrastructure Gap: Why Some Police Shootings Become National Symbols While Others Disappear",
    ]);
    expect(volumeTwo?.researchPapers.map((paper) => paper.title)).toEqual([
      "Democracy’s Achilles’ Heel: Institutional Incentives and Political Outcomes",
      "Civil Rights Realignment and Party Sorting in the United States: From Reconstruction to Contemporary Populism",
      "Human Rights, Policing Doctrine, and Hidden Taxation in Modern U.S. Governance",
      "The Welfare Queen and the Tax Cut: Racialized Dependency Politics and the Fragmentation of the American Working Class",
      "Empire’s Mirror: Foreign Lobbying, Concentrated Wealth, and Imperial Self-Understanding in the United States",
    ]);
    expect(
      libraryVolumeGuides.find((guide) => guide.volume === "Volume III")?.researchPapers,
    ).toEqual([]);
    expect(
      libraryVolumeGuides.find((guide) => guide.volume === "Volume IV")?.researchPapers,
    ).toEqual([]);
    expect(researchShelf).toContain("Source-taxonomy research map");
    expect(researchShelf).toContain("not public SSRN reading copies or publication approvals");
  });

  it("maps public SSRN preprints to the correct volume without changing their status", () => {
    expect(ssrnPreprintDocuments.every((entry) => entry.status === "SSRN preprint")).toBe(true);
    expect(
      libraryVolumeGuides.every((guide) =>
        ssrnPreprintDocuments.some((entry) => entry.volume === guide.volume),
      ),
    ).toBe(true);
    expect(
      ssrnPreprintDocuments.every(
        (entry) =>
          entry.sourceUrl?.includes("papers.ssrn.com") && entry.metrics?.downloads !== undefined,
      ),
    ).toBe(true);
  });

  it("describes the public archive and its four scholarly volume boundaries", () => {
    expect(libraryPage).not.toContain("drawn from a reviewed Dropbox export");
    expect(libraryPage).toContain("source-led social-science papers");
    expect(libraryPage).toContain("Volume I develops the philosophy and method");
    expect(libraryPage).toContain("Volume IV examines science, technology, AI");
    expect(libraryPage).toContain("academic discussion grounded in references");
    expect(publicLibrarySnapshot.note).toContain("SSRN records");
    expect(publicLibrarySnapshot.note).toContain("ResearchGate records");
  });

  it("wires the library page to the progressive volume filter block", () => {
    expect(libraryPage).toContain("<LibraryContentBlocks />");
    expect(libraryPage).toContain("<LibraryResearchShelf />");
    expect(libraryPage).not.toContain("Three public summaries.");
    expect(contentBlocks).toContain("data-library-volume-filter");
    expect(contentBlocks).toContain("Additional public SSRN shelf");
    expect(contentBlocks).toContain("Core ideas");
    expect(contentBlocks).toContain("Why this volume matters");
    expect(contentBlocks).toContain("Representative public paper");
    expect(contentBlocks).toContain("Highest current download signal in this volume");
    expect(contentBlocks).toContain("window.history.replaceState");
  });

  it("puts all four volumes and their matched papers into a first-class public shelf", () => {
    expect(researchShelf).toContain("Four-volume research shelf");
    expect(researchShelf).toContain("Follow the work by volume");
    expect(researchShelf).toContain("Core principles");
    expect(researchShelf).toContain("Highest current download signal");
    expect(researchShelf).toContain("not a quality score");
    expect(researchShelf).toContain("Public paper index");
    expect(researchShelf).toContain("data-library-paper-filter");
    expect(researchShelf).toContain("data-library-paper-query");
    expect(researchShelf).toContain("paperVolume");
    expect(researchShelf).toContain("paperQ");
    expect(researchShelf).toContain("replace(/[^\\p{L}\\p{N}]+/gu");
    expect(researchShelf).toContain("Open SSRN record");
    expect(researchShelf).toContain("Open ResearchGate record");
    expect(researchShelf).toContain("ResearchGate record");
    expect(researchShelf).not.toContain("releaseApproved = true");
  });

  it("keeps Volume I, II, and III public preprints in the local search index", () => {
    const firstThreeVolumes = ssrnPreprintDocuments.filter((entry) =>
      ["Volume I", "Volume II", "Volume III"].includes(entry.volume ?? ""),
    );
    expect(firstThreeVolumes).toHaveLength(7);
    expect(firstThreeVolumes.every((entry) => entry.sourceUrl)).toBe(true);
    expect(siteSearch).toContain("...publicDocumentItems.map");
    expect(siteSearch).toContain("SSRN preprint");
    expect(siteSearch).toContain("ResearchGate record");
    expect(siteSearch).toContain("Search public papers, work, fields, and volume guides");
  });

  it("makes the Volume III tax paper's placement and scope explicit", () => {
    const taxPaper = ssrnPreprintDocuments.find(
      (entry) => entry.id === "wardhan-tax-doctrine-ssrn",
    );
    const volumeThree = seriesItems.find((entry) => entry.volume === "Volume III");

    expect(taxPaper?.description).toContain("within Managed Decline");
    expect(taxPaper?.description).toContain("Volume I’s method foundation");
    expect(taxPaper?.description).toContain("Volume II’s sovereignty and institutional design");
    expect(volumeThree?.description).toContain("labor markets, licensing, welfare, taxation");
    expect(volumeThree?.description).toContain("health systems, and public visibility");
  });

  it("keeps the homepage volume guide linked to the public paper shelf", () => {
    const homepageVolumeGuide = readFileSync(
      join(sourceRoot, "components/HomepageVolumeGuide.astro"),
      "utf8",
    );
    expect(homepageVolumeGuide).toContain("public ");
    expect(homepageVolumeGuide).toContain("in this volume");
    expect(homepageVolumeGuide).toContain("library/documents/${paper.id}");
    expect(homepageVolumeGuide).toContain("SSRN usage signal only");
  });

  it("selects one public-safe paper signal for every volume", () => {
    expect(volumeResearchMap).toHaveLength(4);
    expect(volumeResearchMap.every((item) => item.papers.length > 0)).toBe(true);
    expect(new Set(volumeResearchMap.map((item) => item.papers[0]?.volume)).size).toBe(4);
    expect(volumeResearchMap.map((item) => item.papers[0]?.id)).toEqual([
      "the-illusion-of-equality-ssrn",
      "who-deported-more-ssrn",
      "wardhan-tax-doctrine-ssrn",
      "disconnected-hearts-ssrn",
    ]);
    expect(contentBlocks).not.toContain("highest-rated");
    expect(contentBlocks).toContain("not quality ratings");
  });
});
