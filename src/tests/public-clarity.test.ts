import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { publicDocumentItems } from "../data/documents";
import { whoDeportedMoreTitle } from "../data/public-titles";

const routes = [
  ["/", "dist/index.html", "Research institute — critical studies across power and society"],
  ["/about", "dist/about/index.html", "About the Independent Observer"],
  ["/library", "dist/library/index.html", "Public reading room"],
  ["/library/taxonomy", "dist/library/taxonomy/index.html", "Archive map"],
  ["/research", "dist/research/index.html", "Research & essays"],
  ["/series", "dist/series/index.html", "Publication catalogue"],
  ["/contact", "dist/contact/index.html", "Contact"],
  ["/governance", "dist/governance/index.html", "Governance"],
  ["/topics", "dist/topics/index.html", "Topics"],
  ["/documentaries", "dist/documentaries/index.html", "Documentary projects"],
  [
    "/documentaries/could-america-leave-nato",
    "dist/documentaries/could-america-leave-nato/index.html",
    "Could America Leave NATO?",
  ],
  [
    "/videos/why-evidence-alone-is-not-enough",
    "dist/videos/why-evidence-alone-is-not-enough/index.html",
    "Why Evidence Alone Is Not Enough",
  ],
  [
    "/videos/the-cost-of-looking-away",
    "dist/videos/the-cost-of-looking-away/index.html",
    "The Cost of Looking Away",
  ],
  [
    "/publication-operating-system",
    "dist/publication-operating-system/index.html",
    "Publication operating system",
  ],
  [
    "/library/documents/who-deported-more",
    "dist/library/documents/who-deported-more/index.html",
    whoDeportedMoreTitle,
  ],
] as const;

describe("public clarity", () => {
  for (const [route, path, marker] of routes) {
    test(`page-specific initial HTML: ${route}`, () => {
      const html = readFileSync(path, "utf8");
      expect(html).toContain(marker);
      expect(html).not.toContain('aria-label="Global reader utilities"');
      expect(html).not.toContain('id="reading-list-panel"');
      expect(html).not.toContain('class="search-panel"');
    });
  }
});

test("reader, citation, and structured metadata use one deliberate paper title", () => {
  const title = whoDeportedMoreTitle;
  const document = publicDocumentItems.find((item) => item.id === "who-deported-more");
  const html = readFileSync("dist/library/documents/who-deported-more/index.html", "utf8");
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
  expect(legacy).not.toContain("Master Publication Map");
  expect(legacy).not.toContain("Website Feed");
  expect(legacy).not.toContain("Ready to Publish");
  expect(sitemap).not.toContain("master-publication-map");
  expect(searchIndex).not.toContain("Master Publication Map");
  expect(home).not.toContain("Master Publication Map");
});

test("catalogue actions name their reader-facing destinations", () => {
  const html = readFileSync("dist/series/index.html", "utf8");
  expect(html).toContain("Open volume guide");
  expect(html).toContain("Read author working paper");
  expect(html).not.toContain(">Open paper</a>");
  expect(html).not.toContain(">Open volume</a>");
});

test("drawer fragments stay outside the public sitemap", () => {
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  expect(sitemap).not.toContain("/utilities/search/");
  expect(sitemap).not.toContain("/utilities/reading/");
});
