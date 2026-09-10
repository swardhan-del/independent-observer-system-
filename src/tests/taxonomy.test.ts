import { describe, expect, it } from "vitest";
import { taxonomyEntries, taxonomyVolumes } from "../../plugins/library-content/taxonomy";
describe("four volume research taxonomy", () => {
  it("contains unique anchored entries for every volume", () => {
    expect(taxonomyEntries.length).toBeGreaterThan(40);
    expect(new Set(taxonomyEntries.map((e) => e.id)).size).toBe(taxonomyEntries.length);
    for (const volume of taxonomyVolumes)
      expect(taxonomyEntries.some((e) => e.volume === volume)).toBe(true);
  });
  it("keeps private archive metadata out of reader records", () => {
    for (const entry of taxonomyEntries) {
      expect(entry.title.trim().length).toBeGreaterThan(5);
      expect(entry.summary.trim().length).toBeGreaterThan(30);
      expect(entry.id).toMatch(/^[a-z0-9-]+$/);
      expect(JSON.stringify(entry)).not.toMatch(
        /ns:\d+|\/Users\/|CloudStorage|\.codex_work|\.docx|\.pdf|swardhan1@/i,
      );
      if (entry.href) expect(entry.href).toMatch(/^\/(library|research|series)\//);
    }
  });
});
