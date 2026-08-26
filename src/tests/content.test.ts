import { describe, expect, it } from "vitest";
import { documentaryItems, researchItems, topics, videoItems } from "../data/content";
import { dropboxDocumentItems, dropboxFeedItems } from "../data/dropbox-content.generated";
import { publicDocumentItems } from "../data/documents";
import { ssrnPreprintDocuments } from "../data/ssrn";
import { seriesItems } from "../data/series";
import { publicLibrarySnapshot } from "../data/public-library";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";

describe("editorial preview data", () => {
  it("keeps all sample work clearly labeled as unfinished", () => {
    const items = [...researchItems, ...documentaryItems, ...videoItems];
    expect(items.length).toBeGreaterThan(0);
    expect(
      items.every((item) => item.status.includes("preview") || item.status.includes("development")),
    ).toBe(true);
  });

  it("provides all six core topic categories", () => {
    expect(topics.map((topic) => topic.name)).toEqual([
      "History",
      "Politics",
      "Economics",
      "Law",
      "Science",
      "Technology",
    ]);
  });

  it("keeps the Dropbox-derived series roadmap preview-only", () => {
    expect(seriesItems).toHaveLength(4);
    expect(seriesItems.map((item) => item.volume)).toEqual([
      "Volume I",
      "Volume II",
      "Volume III",
      "Volume IV",
    ]);
    expect(
      seriesItems.every(
        (item) => item.status.includes("preview") || item.status.includes("development"),
      ),
    ).toBe(true);
  });

  it("gives The Autonomous Illusion a substantive, still-preview-safe brief", () => {
    const entry = researchItems.find((item) => item.title === "The Autonomous Illusion");
    expect(entry?.description).toContain("compute, energy, data, maintenance");
    expect(entry?.detailLead).toContain("physical infrastructure");
    expect(entry?.detailSections).toHaveLength(3);
    expect(entry?.status).toBe("Concept preview");
  });

  it("keeps automated Dropbox items within the public-safe status contract", () => {
    expect(
      dropboxFeedItems.every(
        (item) => item.status.includes("preview") || item.status.includes("development"),
      ),
    ).toBe(true);
  });

  it("publishes only structured document sections", () => {
    expect(publicDocumentItems.length).toBeGreaterThan(0);
    expect(
      publicDocumentItems.every(
        (entry) =>
          entry.sourceLabel.length > 0 &&
          entry.sections.length > 0 &&
          entry.sections.every(
            (section) =>
              section.id.length > 0 &&
              section.heading.length > 0 &&
              ((section.paragraphs?.length ?? 0) > 0 || (section.items?.length ?? 0) > 0),
          ),
      ),
    ).toBe(true);
    expect(
      dropboxDocumentItems.every(
        (entry) => entry.sections.length > 0 && entry.sourceLabel.length > 0,
      ),
    ).toBe(true);
  });

  it("keeps SSRN-linked preprints ranked by public usage signals and clearly labeled", () => {
    expect(ssrnPreprintDocuments.length).toBeGreaterThanOrEqual(5);
    expect(ssrnPreprintDocuments[0]?.id).toBe("who-deported-more-ssrn");
    expect(ssrnPreprintDocuments.every((entry) => entry.status === "SSRN preprint")).toBe(true);
    expect(
      ssrnPreprintDocuments.every(
        (entry) =>
          entry.sourceUrl?.includes("papers.ssrn.com") &&
          entry.metrics?.downloads !== undefined &&
          entry.metrics?.abstractViews !== undefined,
      ),
    ).toBe(true);
    expect(ssrnPreprintDocuments.some((entry) => entry.title.includes("Who Deported More"))).toBe(
      true,
    );
    expect(
      ssrnPreprintDocuments.find((entry) => entry.id === "who-deported-more-ssrn")?.researchGateUrl,
    ).toContain("researchgate.net/publication/396491871");
    expect(
      ssrnPreprintDocuments.find((entry) => entry.id === "disconnected-hearts-ssrn")
        ?.researchGateUrl,
    ).toContain("researchgate.net/publication/397333270");
  });
});

describe("public library data", () => {
  it("keeps the Dropbox-derived archive summary public-safe", () => {
    expect(libraryVolumeGuides).toHaveLength(4);
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Public volume summaries")?.value,
    ).toBe("4");
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Raw archive files published")
        ?.value,
    ).toBe("0");
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Hosted operating standards")
        ?.value,
    ).toBe("1");
    expect(
      publicLibrarySnapshot.areas.every((area) => area.privateCount.includes("private archive")),
    ).toBe(true);
  });
});
