import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { ssrnPreprintDocuments } from "../data/ssrn";
import { seriesItems } from "../data/series";

const sourceRoot = join(process.cwd(), "src");
const libraryPage = readFileSync(join(sourceRoot, "pages/library/index.astro"), "utf8");
const contentBlocks = readFileSync(
  join(sourceRoot, "components/LibraryContentBlocks.astro"),
  "utf8",
);

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
        (guide) => guide.coreIdeas.length >= 3 && guide.topicSlugs.length >= 2,
      ),
    ).toBe(true);
    expect(
      libraryVolumeGuides.every((guide) =>
        seriesItems.some((item) => item.volume === guide.volume),
      ),
    ).toBe(true);
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

  it("wires the library page to the progressive volume filter block", () => {
    expect(libraryPage).toContain("<LibraryContentBlocks />");
    expect(libraryPage).not.toContain("Three public summaries.");
    expect(contentBlocks).toContain("data-library-volume-filter");
    expect(contentBlocks).toContain("Public SSRN shelf");
    expect(contentBlocks).toContain("Core ideas");
    expect(contentBlocks).toContain("window.history.replaceState");
  });
});
