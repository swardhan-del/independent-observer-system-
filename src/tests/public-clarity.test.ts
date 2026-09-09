import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
const routes = [
  "",
  "about",
  "library",
  "research",
  "series",
  "contact",
  "governance",
  "library/documents/who-deported-more",
];
for (const route of routes)
  test(`page-specific initial HTML: /${route}`, () => {
    const html = readFileSync(`dist/${route ? route + "/" : ""}index.html`, "utf8");
    expect(html).not.toMatch(
      /<dialog|data-search-results|reading-list-recommendation-card|Recommended public previews/,
    );
    expect(html).toContain("data-search-open");
    expect(html).toMatch(/<noscript><a href="[^"]*library\//);
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    expect(html).toContain('id="main-content" tabindex="-1"');
    expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
    expect(html).not.toMatch(
      /review deployment|production publication remains separate|owner approval required|Placement held|GitHub Actions opens a review PR|No automatic publishing plugin/,
    );
    for (const token of [
      'rel="canonical"',
      'name="description"',
      'property="og:title"',
      'property="og:description"',
      "application/ld+json",
    ])
      expect(html).toContain(token);
    const graph = JSON.parse(
      html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)![1],
    )["@graph"];
    expect(graph.find((item: any) => item["@type"] === "Person").name).toBe(
      "Siddhartha Harsh Wardhan",
    );
  });
test("one deportation title and verified date across metadata and citation", () => {
  const html = readFileSync("dist/library/documents/who-deported-more/index.html", "utf8");
  const title = "Who Deported More? A Guide to Comparing Deportation Statistics";
  expect(html).toContain(`<title>${title}</title>`);
  expect(html).toContain(`<h1>${title}</h1>`);
  expect(html).toContain(`property="og:title" content="${title}"`);
  expect(html).toContain(`name="citation_title" content="${title}"`);
  const article = JSON.parse(
    html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)![1],
  )["@graph"].find((item: any) => item["@type"] === "ScholarlyArticle");
  expect(article.headline).toBe(title);
  expect(article.datePublished).toBe("2025-10-13");
  expect(article.mainEntityOfPage["@id"]).toMatch(/who-deported-more\/#webpage$/);
  expect(article.author["@id"]).toMatch(/#author$/);
  expect(article).not.toHaveProperty("dateModified");
});
test("drawer fragments stay outside the public sitemap", () => {
  expect(readFileSync("dist/sitemap.xml", "utf8")).not.toContain("/utilities/");
  for (const path of ["search", "reading/default", "reading/catalogue"]) {
    const fragment = readFileSync(`dist/utilities/${path}/index.html`, "utf8");
    expect(fragment).toContain('<meta name="robots" content="noindex,follow"');
    expect(fragment).toContain("<dialog");
  }
});
