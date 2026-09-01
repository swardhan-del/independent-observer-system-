import { describe, expect, it } from "vitest";
import { archiveNavigation, archivePaperById, archivePapers } from "../data/archive-navigation";

const placements = archiveNavigation.flatMap((volume) =>
  volume.sections.flatMap((section) =>
    section.subfolders.flatMap((subfolder) =>
      subfolder.papers.map((placement) => ({ ...placement, volume: volume.volume })),
    ),
  ),
);

describe("archive navigation", () => {
  it("maps every listed placement to one canonical paper-family record", () => {
    expect(archivePapers.length).toBeGreaterThan(90);
    expect(placements.length).toBeGreaterThan(100);
    expect(placements.every((placement) => archivePaperById.has(placement.paperId))).toBe(true);
  });

  it("keeps a single primary placement for each paper family", () => {
    const primaryIds = placements
      .filter((placement) => placement.relationship === "primary")
      .map((placement) => placement.paperId);

    expect(new Set(primaryIds).size).toBe(primaryIds.length);
  });

  it("keeps local source paths, provider links, and private material outside the public map", () => {
    const serialized = JSON.stringify({ archivePapers, archiveNavigation });
    expect(serialized).not.toMatch(/dropbox|library\/cloudstorage|\/users\//i);
    expect(serialized).not.toMatch(
      /old drafts|duplicate review|submission package|restricted source/i,
    );
  });

  it("uses a forthcoming Volume V record rather than inventing a completed fifth volume", () => {
    const volumeV = archiveNavigation.find((volume) => volume.volume === "Volume V");
    expect(volumeV?.archiveTitle).toContain("Forthcoming");
    expect(
      volumeV?.sections
        .flatMap((section) => section.subfolders)
        .flatMap((subfolder) => subfolder.papers),
    ).toEqual([{ paperId: "education-rational-thinking", relationship: "primary" }]);
  });
});
