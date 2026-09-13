import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { authorIdentity } from "../data/identity";
import { scholarlyIdentityFor } from "../data/scholarly-identifiers";

describe("scholarly identity metadata", () => {
  it("keeps the verified author identifiers", () => {
    expect(authorIdentity.name).toBe("Siddhartha Harsh Wardhan");
    expect(authorIdentity.orcid).toBe("0009-0005-4228-1124");
    expect(authorIdentity.ssrnAuthorId).toBe("7768604");
  });

  it("keeps verified paper identifiers", () => {
    expect(scholarlyIdentityFor("who-deported-more")).toMatchObject({
      doi: "10.2139/ssrn.5495878",
      ssrnAbstractId: "5495878",
    });
    expect(scholarlyIdentityFor("wardhan-tax-doctrine")).toMatchObject({
      doi: "10.2139/ssrn.5477606",
      ssrnAbstractId: "5477606",
    });
  });

  it("keeps the discovery guide public-only", () => {
    const source = readFileSync("src/pages/llms.txt.ts", "utf8");
    expect(source).toContain("https://independentobserver.org/");
    expect(source).not.toMatch(/Dropbox|\/Users\/|vercel\.app/i);
  });

  it("renders the identity components on document routes", () => {
    const route = readFileSync("src/pages/library/documents/[slug].astro", "utf8");
    expect(route).toContain("ScholarlyEntityGraph");
    expect(route).toContain("ScholarlyIdentityPanel");
  });
});
