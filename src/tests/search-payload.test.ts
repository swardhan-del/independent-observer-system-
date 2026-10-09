import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { searchItems } from "../data/search-index";
import { rankSearchEntries, type SearchEntry } from "../lib/search";

describe("compact search payload", () => {
  it("preserves results, ranking and matched fields for cross-volume reader queries", () => {
    const shipped: SearchEntry[] = JSON.parse(readFileSync("dist/search-index.json", "utf8"));
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
    ]) {
      expect(result(shipped, query), query).toEqual(result(searchItems, query));
    }
  });
});
