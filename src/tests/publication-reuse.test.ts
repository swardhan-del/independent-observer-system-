import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { greenPublications } from "../data/green-publications";
import { pendingReuseNotice, publicationReuse } from "../lib/publication-reuse";

describe("publication reuse rights", () => {
  const license = "CC BY-NC-ND 4.0";

  it.each([
    { rightsReviewed: false, productionReleased: false },
    { rightsReviewed: false, productionReleased: true },
    { rightsReviewed: true, productionReleased: false },
    { rightsReviewed: undefined, productionReleased: true },
    { rightsReviewed: true, productionReleased: undefined },
  ])("withholds a licence when either approval gate is absent: %j", (state) => {
    const reuse = publicationReuse({ license, ...state });
    expect(reuse.reuseNotice).toBe(pendingReuseNotice);
    expect(JSON.parse(JSON.stringify({ license: reuse.schemaLicense }))).not.toHaveProperty(
      "license",
    );
  });

  it("preserves the stated licence after rights review and release", () => {
    expect(publicationReuse({ license, rightsReviewed: true, productionReleased: true })).toEqual({
      schemaLicense: license,
      reuseNotice: license,
    });
  });

  it("does not invent terms when a released record has no licence", () => {
    expect(
      publicationReuse({ license: " ", rightsReviewed: true, productionReleased: true }),
    ).toEqual({ schemaLicense: undefined, reuseNotice: pendingReuseNotice });
  });

  it.each(greenPublications)(
    "keeps HTML and Article metadata consistent for $slug",
    (publication) => {
      const html = readFileSync(
        join(process.cwd(), "dist", "research", publication.slug, "index.html"),
        "utf8",
      );
      const article = [
        ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
      ]
        .map((match) => JSON.parse(match[1]))
        .find((schema) => schema["@type"] === "Article");
      expect(article).toBeDefined();
      if (publication.productionReleased && publication.rightsReviewed) {
        expect(article.license).toBe(publication.license);
        expect(html).toContain(publication.license);
        expect(html).not.toContain(pendingReuseNotice);
      } else {
        expect(article).not.toHaveProperty("license");
        expect(html).toContain(pendingReuseNotice);
        expect(html).not.toContain(publication.license);
        expect(html).toContain('content="noindex,follow"');
        expect(article).not.toHaveProperty("datePublished");
      }
    },
  );
});
