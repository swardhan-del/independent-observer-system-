import { describe, it, expect } from "vitest";
import { escapeHtml, renderScorecard, validateInput } from "../../scripts/growth-scorecard.mjs";
describe("offline aggregate-only growth scorecard", () => {
  it("treats missing data as NOT VERIFIED", () => {
    const html = renderScorecard(null);
    expect(html).toContain("NOT VERIFIED");
    expect(html).toContain("noindex,nofollow");
  });
  it("calculates CTR from matched totals", () => {
    expect(
      renderScorecard({
        periodStart: "2026-11-01",
        periodEnd: "2026-11-20",
        metrics: { searchClicks: 10, searchImpressions: 200 },
      }),
    ).toContain("5.00%");
  });
  it("rejects PII-shaped or unknown keys", () => {
    expect(() =>
      validateInput({
        periodStart: "2026-11-01",
        periodEnd: "2026-11-20",
        email: "private@example.com",
      }),
    ).toThrow(/Unrecognized/);
  });
  it("rejects free-text topics and invalid integers", () => {
    const x = { periodStart: "2026-11-01", periodEnd: "2026-11-20" };
    expect(() => validateInput({ ...x, topics: [{ topic: "<script>", visits: 1 }] })).toThrow(
      /topics/,
    );
    expect(() => validateInput({ ...x, metrics: { siteVisits: -1 } })).toThrow(/nonnegative/);
  });
  it("escapes HTML and rejects invalid dates", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
    expect(() => validateInput({ periodStart: "2026-02-31", periodEnd: "2026-03-01" })).toThrow(
      /valid/,
    );
  });
});
