import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { paperDocuments } from "../data/papers";
import { whoDeportedMoreTitle } from "../data/public-titles";
const routes = [
  "",
  "about",
  "library",
  "library/taxonomy",
  "research",
  "series",
  "contact",
  "governance",
  "topics",
  "documentaries",
  "documentaries/could-america-leave-nato",
  "videos/why-evidence-alone-is-not-enough",
  "videos/the-cost-of-looking-away",
  "publication-operating-system",
  "library/documents/who-deported-more",
];
const publicWorkflowLanguage =
  /review deployment|production publication remains separate|owner approval required|placement held|GitHub Actions opens a review PR|no automatic publishing plugin|human release gate|held for release|human release approval|awaiting human release|production release feed|production release|release review|release decision|publication approval|approved source-feed|source feed|source-taxonomy|site build|private workspace|workflow will validate|pull request for review|cloud-state verification|dated author approval|hosting-provider review tools|permanent internal standard|controller manuscript|internal volume.*reconciliation|legacy internal volume|Dropbox-backed|public-safe audit|public audit/i;
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
    expect(html).not.toMatch(publicWorkflowLanguage);
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
    const person = graph.find((item: any) => item["@type"] === "Person");
    expect(person.name).toBe("Siddhartha Harsh Wardhan");
    expect(person.url).toMatch(/\/about\/$/);
  });
test("reader, citation, and structured metadata use one deliberate paper title", () => {
  const html = readFileSync("dist/library/documents/who-deported-more/index.html", "utf8");
  const title = whoDeportedMoreTitle;
  const document = paperDocuments.find((item) => item.id === "who-deported-more");
  expect(document?.title).toBe(title);
  expect(document?.citations?.[0]?.citation).toBe(`Harsh Wardhan, Siddhartha, ${title} (2025).`);
  expect(html).toContain(`<title>${title}</title>`);
  expect(html).toContain(`<h1>${title}</h1>`);
  expect(html).toContain(`property="og:title" content="${title}"`);
  expect(html).toContain(`name="citation_title" content="${title}"`);
  expect(html).toContain(`data-reader-title="${title}"`);
  expect(html).toContain(`Harsh Wardhan, Siddhartha, ${title} (2025).`);
  expect(html).toContain(
    'name="citation_abstract_html_url" content="https://independentobserver.org/library/documents/who-deported-more/"',
  );
  expect(html).toContain(
    'name="citation_keywords" content="Demography &amp; Migration, Volume II, deportation statistics, immigration enforcement, removals, returns, Title 42"',
  );
  const article = JSON.parse(
    html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)![1],
  )["@graph"].find((item: any) => item["@type"] === "ScholarlyArticle");
  expect(article.headline).toBe(title);
  expect(article.datePublished).toBe("2025-10-13");
  expect(article.dateModified).toBe("2026-09-13");
  expect(article.keywords).toEqual(
    expect.arrayContaining(["deportation statistics", "immigration enforcement", "Title 42"]),
  );
  expect(article.mainEntityOfPage["@id"]).toMatch(/who-deported-more\/#webpage$/);
  expect(article.author["@id"]).toMatch(/#author$/);
});
test("removes the internal publication document from public output and discovery", () => {
  const legacy = readFileSync("dist/publication-operating-system/index.html", "utf8");
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  const searchIndex = readFileSync("dist/search-index.json", "utf8");
  const home = readFileSync("dist/index.html", "utf8");
  const vercelConfig = JSON.parse(readFileSync("vercel.json", "utf8"));
  const documentPath = "dist/documents/independent-observer-publication-operating-system-2026.docx";

  expect(existsSync(documentPath)).toBe(false);
  expect(legacy).toContain('name="robots" content="noindex,follow"');
  expect(legacy).toContain('http-equiv="refresh"');
  expect(legacy).toContain("/governance/");
  expect(sitemap).not.toContain("/publication-operating-system/");
  expect(searchIndex).not.toContain("publication-operating-system");
  expect(home).not.toContain("Publication operating system");
  expect(home).not.toContain("Publication guide");
  expect(vercelConfig.redirects).toContainEqual({
    source: "/publication-operating-system/",
    destination: "/governance/",
    permanent: true,
  });
});
test("catalogue actions name their reader-facing destinations", () => {
  const library = readFileSync("dist/library/index.html", "utf8");
  const series = readFileSync("dist/series/index.html", "utf8");
  expect(library).toMatch(
    /href="[^"]*\/library\/documents\/who-deported-more\/"[^>]*>Who Deported More\? A Guide to Comparing Deportation Statistics/,
  );
  expect(library).toMatch(
    /href="[^"]*\/library\/documents\/who-deported-more\/"[^>]*>Read the public synopsis →/,
  );
  expect(library).not.toContain(
    "Read Who Deported More? A Guide to Comparing Deportation Statistics →",
  );
  expect(library).not.toContain("Open reader →");
  expect(series).not.toContain(">Open →<");
});
test("drawer fragments stay outside the public sitemap", () => {
  expect(readFileSync("dist/sitemap.xml", "utf8")).not.toContain("/utilities/");
  for (const path of ["search", "reading/default", "reading/catalogue"]) {
    const fragment = readFileSync(`dist/utilities/${path}/index.html`, "utf8");
    expect(fragment).toContain('<meta name="robots" content="noindex,follow"');
    expect(fragment).toContain("<dialog");
  }
});
