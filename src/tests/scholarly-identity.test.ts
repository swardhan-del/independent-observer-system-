import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { authorIdentity } from "../data/identity";

describe("scholarly identity metadata", () => {
  it("keeps the verified author identity first-party and ORCID-based", () => {
    expect(authorIdentity.name).toBe("Siddhartha Harsh Wardhan");
    expect(authorIdentity.orcid).toBe("0009-0005-4228-1124");
    expect(authorIdentity.orcidUrl).toBe("https://orcid.org/0009-0005-4228-1124");
    expect(authorIdentity).not.toHaveProperty("ssrnAuthorId");
  });

  it("keeps the discovery guide public-only and canonical-first", () => {
    const source = readFileSync("src/pages/llms.txt.ts", "utf8");
    expect(source).toContain("https://independentobserver.org/");
    expect(source).toContain("IndependentObserver.org is the canonical public record");
    expect(source).toContain("not required validation authorities or publication destinations");
    expect(source).not.toMatch(/Dropbox|\/Users\/|vercel\.app/i);
    expect(source).not.toMatch(/SSRN|ResearchGate|DOI/i);
  });

  it("exposes the verified ORCID without adding a second page-level JSON-LD graph", () => {
    const footer = readFileSync("src/components/Footer.astro", "utf8");
    const route = readFileSync("src/pages/library/documents/[slug].astro", "utf8");
    const layout = readFileSync("src/layouts/BaseLayout.astro", "utf8");

    expect(footer).toContain("Author ORCID");
    expect(footer).toContain("authorIdentity.orcidUrl");
    expect(route).not.toContain("ScholarlyEntityGraph");
    expect(layout).toContain('type="application/ld+json"');
  });
});
