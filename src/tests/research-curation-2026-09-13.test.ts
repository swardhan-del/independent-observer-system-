import { describe, expect, it } from "vitest";
import { publicDocumentItems } from "../data/documents";
import { curatedResearchDocuments } from "../data/research-curation-2026-09-13";
import { volumeResearchMap } from "../data/volume-research";

describe("13 September research curation", () => {
  it("adds the two reviewed research synopses to public reading routes", () => {
    const ids = curatedResearchDocuments.map((entry) => entry.id);
    expect(ids).toEqual([
      "history-is-not-a-moral-certificate",
      "richer-republic-weaker-hegemon",
    ]);
    for (const id of ids) {
      const entry = publicDocumentItems.find((document) => document.id === id);
      expect(entry).toBeDefined();
      expect(entry?.status).toBe("Author working paper");
      expect(entry?.reviewScope?.independentReview).toContain(
        "No independent scholarly peer review",
      );
      expect(entry?.sections.some((section) => section.id === "publication-boundary")).toBe(
        true,
      );
    }
  });

  it("places the new research records in the correct volume maps", () => {
    expect(
      volumeResearchMap
        .find((volume) => volume.volume === "Volume II")
        ?.papers.map((paper) => paper.id),
    ).toContain("history-is-not-a-moral-certificate");
    expect(
      volumeResearchMap
        .find((volume) => volume.volume === "Volume III")
        ?.papers.map((paper) => paper.id),
    ).toContain("richer-republic-weaker-hegemon");
  });

  it("develops the deportation page with a methodology-first annotation layer", () => {
    const entry = publicDocumentItems.find((document) => document.id === "who-deported-more")!;
    const sectionIds = entry.sections.map((section) => section.id);
    expect(sectionIds).toEqual(
      expect.arrayContaining([
        "annotation-schema",
        "annotation-agency",
        "annotation-period",
        "headline-checklist",
      ]),
    );
    expect(
      entry.sections.find((section) => section.id === "annotation-schema")?.table?.rows,
    ).toHaveLength(6);
    expect(entry.updatedDate).toBe("13 September 2026");
    expect(entry.notes?.join(" ")).toContain(
      "does not add a new dataset or an administration ranking",
    );
  });
});
