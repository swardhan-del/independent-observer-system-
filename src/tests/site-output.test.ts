import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const distRoot = join(process.cwd(), "dist");
const routes = [
  { route: "/", file: "index.html" },
  { route: "/series/", file: "series/index.html" },
  { route: "/library/", file: "library/index.html" },
  { route: "/research/", file: "research/index.html" },
  { route: "/documentaries/", file: "documentaries/index.html" },
  { route: "/videos/", file: "videos/index.html" },
  { route: "/about/", file: "about/index.html" },
  { route: "/contact/", file: "contact/index.html" },
] as const;
const sitemapRoutes = routes.map(({ route }) => route);

function readOutput(relativePath: string) {
  return readFileSync(join(distRoot, relativePath), "utf8");
}

function tags(html: string, name: string) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function attribute(tag: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return tag.match(new RegExp(`\\b${escaped}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];
}

function metaContent(html: string, attributeName: "name" | "property", value: string) {
  const tag = tags(html, "meta").find((candidate) => attribute(candidate, attributeName) === value);
  return tag ? attribute(tag, "content") : undefined;
}

function canonical(html: string) {
  const tag = tags(html, "link").find((candidate) => attribute(candidate, "rel") === "canonical");
  return tag ? attribute(tag, "href") : undefined;
}
function sitemapLink(html: string) {
  const tag = tags(html, "link").find((candidate) => attribute(candidate, "rel") === "sitemap");
  return tag ? attribute(tag, "href") : undefined;
}

function jsonLd(html: string) {
  return tags(html, "script")
    .filter((tag) => attribute(tag, "type") === "application/ld+json")
    .map((tag) => {
      const start = html.indexOf(tag) + tag.length;
      const end = html.indexOf("</script>", start);
      return JSON.parse(html.slice(start, end));
    });
}

function ids(html: string) {
  return tags(html, "[a-z][a-z0-9-]*")
    .map((tag) => attribute(tag, "id"))
    .filter((value): value is string => Boolean(value));
}

function fileForPath(pathname: string, basePath: string) {
  expect(pathname.startsWith(basePath)).toBe(true);
  const relativePath = decodeURIComponent(pathname.slice(basePath.length)).replace(/^\/+/, "");
  return relativePath && !relativePath.endsWith("/")
    ? join(distRoot, relativePath)
    : join(distRoot, relativePath, "index.html");
}

function jpegDimensions(image: Buffer) {
  let offset = 2;
  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);

  while (offset < image.length) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = image[offset + 1];
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;

    const segmentLength = image.readUInt16BE(offset);
    if (startOfFrameMarkers.has(marker)) {
      return {
        height: image.readUInt16BE(offset + 3),
        width: image.readUInt16BE(offset + 5),
      };
    }
    offset += segmentLength;
  }

  throw new Error("The social image does not contain JPEG dimensions.");
}

describe("built website", () => {
  it("builds every public route", () => {
    for (const { file } of routes) expect(existsSync(join(distRoot, file))).toBe(true);
  });

  it("builds robots, sitemap, and 404 output", () => {
    expect(existsSync(join(distRoot, "robots.txt"))).toBe(true);
    expect(existsSync(join(distRoot, "sitemap.xml"))).toBe(true);
    expect(existsSync(join(distRoot, "404.html"))).toBe(true);
  });

  const homeHtml = readOutput("index.html");
  const homeCanonical = canonical(homeHtml);
  if (!homeCanonical) throw new Error("The home page is missing its canonical URL.");
  const publicOrigin = new URL(homeCanonical).origin;
  const basePath = new URL(homeCanonical).pathname;

  it("publishes a crawlable robots file with the configured sitemap URL", () => {
    const robots = readOutput("robots.txt");
    const sitemapUrl = new URL("sitemap.xml", homeCanonical).href;

    expect(robots).toMatch(/^User-agent: \*$/m);
    expect(robots).toMatch(/^Allow: \/$/m);
    expect(robots).toContain(`Sitemap: ${sitemapUrl}`);
  });

  it("lists each canonical public route exactly once in the sitemap", () => {
    const sitemap = readOutput("sitemap.xml");
    expect(sitemap).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    const expected = sitemapRoutes.map(
      (route) => new URL(sitePathForTest(route), homeCanonical).href,
    );

    expect(locations).toHaveLength(expected.length);
    for (const url of expected) {
      expect(url).toMatch(/^https:\/\//);
      expect(locations.filter((location) => location === url)).toHaveLength(1);
    }
    expect(locations.some((location) => location.endsWith("/404/"))).toBe(false);
  });

  it.each(routes)("keeps essential structure on $route", ({ file }) => {
    const html = readOutput(file);
    const pageIds = ids(html);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    if (!main) throw new Error(`${file} is missing its main landmark.`);
    const headings = [...main.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));

    expect(html).toMatch(/<html\b[^>]*\blang=["']en["']/i);
    expect(tags(html, "header")).toHaveLength(1);
    expect(tags(html, "main")).toHaveLength(1);
    expect(tags(html, "footer")).toHaveLength(1);
    expect(tags(html, "h1")).toHaveLength(1);
    expect(tags(html, "main")[0]).toMatch(/\bid=["']main-content["']/i);
    expect(html).toMatch(
      /<a\b[^>]*class=["'][^"']*skip-link[^"']*["'][^>]*href=["']#main-content["']/i,
    );
    expect(tags(html, "nav").filter((tag) => Boolean(attribute(tag, "aria-label")))).toHaveLength(
      2,
    );
    expect(new Set(pageIds).size).toBe(pageIds.length);
    expect(headings[0]).toBe(1);

    for (let index = 1; index < headings.length; index += 1) {
      expect(headings[index]).toBeLessThanOrEqual(headings[index - 1] + 1);
    }
  });

  it.each(routes)("provides absolute social metadata on $route", ({ file }) => {
    const html = readOutput(file);
    const pageCanonical = canonical(html);
    const openGraphUrl = metaContent(html, "property", "og:url");
    const openGraphImage = metaContent(html, "property", "og:image");
    const twitterImage = metaContent(html, "name", "twitter:image");

    expect(pageCanonical).toMatch(/^https:\/\//);
    expect(openGraphUrl).toBe(pageCanonical);
    expect(openGraphImage).toBe(twitterImage);
    expect(openGraphImage).toMatch(/^https:\/\/.*\.(?:png|jpe?g)$/i);
    expect(metaContent(html, "property", "og:image:type")).toBe("image/jpeg");
    expect(metaContent(html, "property", "og:image:width")).toBe("1200");
    expect(metaContent(html, "property", "og:image:height")).toBe("630");
    expect(metaContent(html, "property", "og:image:alt")).toBeTruthy();
    expect(metaContent(html, "name", "twitter:card")).toBe("summary_large_image");
    expect(metaContent(html, "name", "twitter:image:alt")).toBeTruthy();
    expect(metaContent(html, "name", "description")).toBeTruthy();
    expect(sitemapLink(html)).toBe(new URL("sitemap.xml", publicOrigin + basePath).href);
    expect(html).toMatch(/<title>[^<]+<\/title>/i);

    const imagePath = fileForPath(new URL(openGraphImage!).pathname, basePath);
    expect(existsSync(imagePath)).toBe(true);
  });

  it.each(routes)("provides valid page-specific JSON-LD on $route", ({ file }) => {
    const html = readOutput(file);
    const pageCanonical = canonical(html);
    const documents = jsonLd(html);

    expect(documents).toHaveLength(1);
    const serialized = JSON.stringify(documents[0]);
    expect(serialized).toContain("The Independent Observer");
    const graph = documents[0]["@graph"];
    expect(graph.some((item: { "@type": string }) => item["@type"] === "WebSite")).toBe(true);
    expect(
      graph.some(
        (item: { "@type": string; url?: string }) =>
          item["@type"] === "WebPage" && item.url === pageCanonical,
      ),
    ).toBe(true);
    const breadcrumb = graph.find(
      (item: { "@type": string }) => item["@type"] === "BreadcrumbList",
    );
    if (file === "index.html") {
      expect(breadcrumb).toBeUndefined();
    } else {
      expect(breadcrumb?.itemListElement).toEqual([
        { "@type": "ListItem", position: 1, name: "Home", item: publicOrigin + basePath },
        {
          "@type": "ListItem",
          position: 2,
          name: expect.any(String),
          item: pageCanonical,
        },
      ]);
    }
  });

  it("uses a valid 1200 by 630 JPEG social image", () => {
    const imageUrl = metaContent(homeHtml, "property", "og:image");
    if (!imageUrl) throw new Error("The home page is missing its Open Graph image.");
    const imagePath = fileForPath(new URL(imageUrl).pathname, basePath);
    const image = readFileSync(imagePath);

    expect(image.subarray(0, 3).toString("hex")).toBe("ffd8ff");
    expect(jpegDimensions(image)).toEqual({ width: 1200, height: 630 });
  });

  it.each(routes)("keeps every internal link valid on $route", ({ file }) => {
    const html = readOutput(file);
    const pageCanonical = canonical(html);
    if (!pageCanonical) throw new Error(`${file} is missing its canonical URL.`);

    for (const tag of tags(html, "a")) {
      const href = attribute(tag, "href");
      if (!href) continue;
      const target = new URL(href, pageCanonical);
      if (target.origin !== publicOrigin) continue;

      const targetFile = fileForPath(target.pathname, basePath);
      expect(existsSync(targetFile), `${file} links to missing ${target.pathname}`).toBe(true);

      if (target.hash) {
        const targetIds = ids(readFileSync(targetFile, "utf8"));
        expect(targetIds, `${href} points to a missing fragment`).toContain(
          decodeURIComponent(target.hash.slice(1)),
        );
      }
    }
  });

  it("builds an accessible, non-indexable 404 page with valid internal links", () => {
    const html = readOutput("404.html");
    const pageCanonical = canonical(html);
    if (!pageCanonical) throw new Error("The 404 page is missing its canonical URL.");

    expect(tags(html, "h1")).toHaveLength(1);
    expect(metaContent(html, "name", "robots")).toBe("noindex,follow");

    for (const tag of tags(html, "a")) {
      const href = attribute(tag, "href");
      if (!href || href.startsWith("#")) continue;
      const target = new URL(href, pageCanonical);
      if (target.origin !== publicOrigin) continue;
      expect(existsSync(fileForPath(target.pathname, basePath))).toBe(true);
    }
  });
});

function sitePathForTest(route: string) {
  return route.replace(/^\//, "");
}
