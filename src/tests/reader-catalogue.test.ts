import { describe, it, expect } from "vitest";
import {
  publicPaperCatalogue,
  recentArticles,
  articleQuestions,
  paperQuestions,
} from "../data/reader-catalogue";
import { readingMinutes } from "../data/reader-presentation";
import { matchesReadingMode, readingMode } from "../lib/reading-filter";

describe("reader catalogue boundaries", () => {
  it("lists unique public papers with a question and text-based reading time", () => {
    expect(publicPaperCatalogue).toHaveLength(29);
    expect(new Set(publicPaperCatalogue.map((p) => p.id)).size).toBe(publicPaperCatalogue.length);
    for (const paper of publicPaperCatalogue) {
      expect(paperQuestions[paper.id]).toMatch(/\?$/);
      expect(readingMinutes(paper)).toBeGreaterThan(0);
    }
  });
  it("estimates the enhanced reader rather than its shorter source synopsis", () => {
    expect(readingMinutes(publicPaperCatalogue.find((p) => p.id === "who-deported-more")!)).toBe(4);
  });
  it("keeps previews out of recent releases and sorts actual publication dates", () => {
    expect(recentArticles).toHaveLength(5);
    expect(recentArticles.every((p) => p.productionReleased && articleQuestions[p.slug])).toBe(
      true,
    );
    const dates = recentArticles.map((p) => p.publicationDate);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(recentArticles.map((p) => p.slug)).not.toContain("regrowing-humanity");
  });
  it("keeps five-minute reads out of under-five and rejects unknown modes", () => {
    expect(matchesReadingMode(4, "short")).toBe(true);
    expect(matchesReadingMode(5, "short")).toBe(false);
    expect(matchesReadingMode(5, "long")).toBe(true);
    expect(matchesReadingMode(4, "long")).toBe(false);
    expect(matchesReadingMode(4, "listen")).toBe(false);
    expect(readingMode("invalid")).toBe("all");
  });
});
