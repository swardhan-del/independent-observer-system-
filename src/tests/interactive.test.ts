import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = join(process.cwd(), "src");
const header = readFileSync(join(sourceRoot, "components/Header.astro"), "utf8");
const search = readFileSync(join(sourceRoot, "components/SiteSearch.astro"), "utf8");
const filter = readFileSync(join(sourceRoot, "components/ContentFilter.astro"), "utf8");
const card = readFileSync(join(sourceRoot, "components/EditorialCard.astro"), "utf8");
const series = readFileSync(join(sourceRoot, "pages/series/index.astro"), "utf8");

describe("interactive preview tools", () => {
  it("ships browser-local site search without a collection endpoint", () => {
    expect(header).toContain("<SiteSearch />");
    expect(search).toContain("data-search-open");
    expect(search).toContain("data-search-results");
    expect(search).toContain("Search runs in your browser");
    expect(search).not.toMatch(/fetch\s*\(/);
  });

  it("ships accessible client-side filters for editorial previews", () => {
    expect(filter).toContain('aria-pressed="true"');
    expect(filter).toContain("data-filter-query");
    expect(filter).toContain("data-filter-empty");
    expect(filter).toContain("data-filter-reset");
    expect(filter).toContain("URLSearchParams");
    expect(filter).toContain("replaceState");
    expect(card).toContain("data-filter-card");
    expect(card).toContain("data-search-text");
    expect(series).toContain("data-filter-card");
  });

  it("keeps collection forms explicitly disabled until a privacy-safe service exists", () => {
    expect(readFileSync(join(sourceRoot, "pages/index.astro"), "utf8")).toContain(
      'aria-label="Newsletter preview"',
    );
    expect(readFileSync(join(sourceRoot, "pages/contact/index.astro"), "utf8")).toContain(
      "Preview only—this form does not transmit or store data.",
    );
  });
});
