import { describe, expect, it } from "vitest";
import { documentaryItems, researchItems, topics, videoItems } from "../data/content";

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
});
