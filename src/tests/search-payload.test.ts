import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { searchItems } from "../data/search-index";
import { rankSearchEntries, type SearchEntry } from "../lib/search";
import { decodeSearchIndex, encodeSearchIndex } from "../lib/search-payload";

describe("compact search payload", () => {
  it("restores every shipped field and keeps the legacy array available", () => {
    const legacy = readFileSync("dist/search-index.json", "utf8");
    const packed = readFileSync("dist/search-index-v1.json", "utf8");
    const entries = JSON.parse(legacy);
    expect(Array.isArray(entries)).toBe(true);
    expect(decodeSearchIndex(JSON.parse(packed))).toEqual(entries);
    expect(decodeSearchIndex(entries)).toEqual(entries);
    expect(Buffer.byteLength(packed)).toBeLessThan(Buffer.byteLength(legacy));
  });

  it("preserves empty and missing fields, Unicode, topics and dictionary reference zero", () => {
    const entries: SearchEntry[] = [
      {
        id: "same",
        title: "same",
        description: "Café — 東京",
        category: "",
        status: "same",
        type: "Research",
        href: "/example/",
        topics: ["same", "東京"],
        searchText: "",
        volume: "Volume IV",
      },
    ];
    expect(decodeSearchIndex(JSON.parse(JSON.stringify(encodeSearchIndex(entries))))).toEqual(
      entries,
    );
    const payload = encodeSearchIndex(entries);
    payload.rows[0][0] = -1;
    expect(() => decodeSearchIndex(payload)).toThrow("Invalid search index");
    payload.rows[0][0] = payload.strings.length;
    expect(() => decodeSearchIndex(payload)).toThrow("Invalid search index");
    expect(() => decodeSearchIndex({ ...payload, version: 2 })).toThrow("Invalid search index");
    expect(() => decodeSearchIndex({ version: 1, strings: [], rows: [[null]] })).toThrow();
  });

  it("preserves results, ranking and matched fields for cross-volume reader queries", () => {
    const shipped = decodeSearchIndex(
      JSON.parse(readFileSync("dist/search-index-v1.json", "utf8")),
    );
    const result = (entries: SearchEntry[], query: string) =>
      rankSearchEntries(entries, query).map(({ id, score, matchedFields }) => ({
        id,
        score,
        matchedFields,
      }));
    for (const query of [
      "AI work",
      "foreign affiliates",
      "moral emotional",
      "quantum advantage",
      "working paper",
      "research map entry",
      "computed tomography",
      "Factories Return but Do the Jobs",
      "labor compensation",
      "PERM",
      "Sputnik",
      "manifesto",
      "independent observer",
      "A timeline is not yet an explanation",
    ]) {
      expect(result(shipped, query), query).toEqual(result(searchItems, query));
    }
    const legacy: SearchEntry[] = JSON.parse(readFileSync("dist/search-index.json", "utf8"));
    for (const filters of [
      { type: "Podcast" },
      { volume: "Volume IV" },
      { topic: "Economics" },
      { status: "Author working paper" },
      { type: "Research", topic: "Technology" },
    ]) {
      expect(rankSearchEntries(shipped, "", filters)).toEqual(
        rankSearchEntries(legacy, "", filters),
      );
    }
  });
});
