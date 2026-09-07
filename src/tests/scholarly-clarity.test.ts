import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { paperDocuments } from "../data/papers";
import { publicDocumentItems } from "../data/documents";
import { exportCitation } from "../lib/citations";
import { relatedRecords } from "../lib/related";
const model = paperDocuments.find((paper) => paper.id === "who-deported-more")!;
describe("scholarly clarity", () => {
  it("keeps manuscript status, taxonomy and exact citation title", () => {
    expect(model.status).toBe("Author working paper");
    expect(model.volume).toBe("Volume II");
    expect(model.category).toBe("Demography & Migration");
    expect(exportCitation(model, "bib")).toContain(model.title);
    expect(model.availability?.data).toContain("No CSV or codebook");
    expect(model.reviewScope?.independentReview).toContain("No independent scholarly review");
  });
  it("resolves every claim link to a unique primary source with a precise location", () => {
    const sources = model.summaryEvidence!;
    expect(new Set(sources.map((s) => s.id)).size).toBe(sources.length);
    for (const section of model.sections)
      for (const id of section.evidenceIds ?? []) {
        const source = sources.find((s) => s.id === id);
        expect(source).toBeDefined();
        expect(new URL(source!.url!).hostname).toMatch(/^(ohss\.dhs\.gov|www\.ice\.gov)$/);
        expect(source!.url).toContain("#page=");
      }
    expect(model.sections.find((s) => s.id === "example")?.paragraphs?.join(" ")).toContain(
      "hypothetical",
    );
    expect(model.sections.find((s) => s.id === "definitions")?.table?.rows).toHaveLength(3);
  });
  it("does not invent availability or review details for legacy non-paper records", () => {
    const legacy = publicDocumentItems.find((d) => d.id === "documentary-projects-print-capture")!;
    expect(legacy.availability).toBeUndefined();
    expect(legacy.reviewScope).toBeUndefined();
    const html = readFileSync(`dist/library/documents/${legacy.id}/index.html`, "utf8");
    expect(html).not.toContain("Independent scholarly review</dt>");
  });
  it("gives explicitly explained reading links priority over broad taxonomy matches", () => {
    const current = {
      ...model,
      href: "/",
      status: model.status!,
      relatedIds: Object.keys(model.relatedReadingReasons!),
    };
    const records = paperDocuments.map((d) => ({ ...d, href: "/", status: d.status! }));
    expect(relatedRecords(current, records)[0].id).toBe("latino-irony");
    const primer = paperDocuments.find((d) => d.id === "entanglement-primer")!;
    expect(
      relatedRecords(
        {
          ...primer,
          href: "/",
          status: primer.status!,
          relatedIds: Object.keys(primer.relatedReadingReasons!),
        },
        records,
      )[0].id,
    ).toBe("entanglement-foundations");
  });
});
