import { describe, expect, it } from "vitest";
import { documentaryItems, researchItems, topics, videoItems } from "../data/content";
import { dropboxDocumentItems, dropboxFeedItems } from "../data/dropbox-content.generated";
import { publicDocumentItems } from "../data/documents";
import { seriesItems } from "../data/series";
import { publicLibrarySnapshot } from "../data/public-library";

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
});

describe("public library data", () => {
  it("keeps the Dropbox-derived archive summary public-safe", () => {
    expect(publicLibrarySnapshot.volumes).toHaveLength(3);
    expect(
      publicLibrarySnapshot.stats.find((stat) => stat.label === "Raw files published")?.value,
    ).toBe("0");
    expect(
      publicLibrarySnapshot.areas.every((area) => area.privateCount.includes("private archive")),
    ).toBe(true);
  });
});
