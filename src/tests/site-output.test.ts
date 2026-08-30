import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { publicDocumentItems } from "../data/documents";
import { seriesItems } from "../data/series";
import { volumeReels } from "../data/video-reels";
import { slugify } from "../lib/slugs";

const distRoot = join(process.cwd(), "dist");
const routes = [
  { route: "/", file: "index.html" },
  { route: "/series/", file: "series/index.html" },
  ...seriesItems.map((entry) => ({
    route: `/series/${slugify(entry.title)}/`,
    file: `series/${slugify(entry.title)}/index.html`,
  })),
  { route: "/library/", file: "library/index.html" },
  { route: "/research/", file: "research/index.html" },
  { route: "/documentaries/", file: "documentaries/index.html" },
  { route: "/videos/", file: "videos/index.html" },
  { route: "/about/", file: "about/index.html" },
  { route: "/contact/", file: "contact/index.html" },
  { route: "/start/", file: "start/index.html" },
  { route: "/start-here/", file: "start-here/index.html" },
  { route: "/publication-operating-system/", file: "publication-operating-system/index.html" },
  { route: "/whats-new/", file: "whats-new/index.html" },
  { route: "/review/regrowing-humanity/", file: "review/regrowing-humanity/index.html" },
  { route: "/topics/", file: "topics/index.html" },
  { route: "/topics/history/", file: "topics/history/index.html" },
  { route: "/topics/politics/", file: "topics/politics/index.html" },
  { route: "/topics/economics/", file: "topics/economics/index.html" },
  { route: "/topics/law/", file: "topics/law/index.html" },
  { route: "/topics/science/", file: "topics/science/index.html" },
  { route: "/topics/technology/", file: "topics/technology/index.html" },
  ...publicDocumentItems.map((entry) => ({
    route: `/library/documents/${entry.id}/`,
    file: `library/documents/${entry.id}/index.html`,
  })),
] as const;
const sitemapRoutes = routes
  .filter(({ route }) => !["/start-here/", "/review/regrowing-humanity/"].includes(route))
  .map(({ route }) => route);

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
    expect(existsSync(join(distRoot, "feed.atom.xml"))).toBe(true);
    expect(existsSync(join(distRoot, "404.html"))).toBe(true);
  });

  it("builds one playable MP4 preview for every volume", () => {
    const html = readOutput("videos/index.html");

    expect(tags(html, "video")).toHaveLength(volumeReels.length);
    for (const reel of volumeReels) {
      const mediaPath = join(distRoot, reel.mediaUrl.replace(/^\//, ""));
      expect(existsSync(mediaPath), `${reel.mediaUrl} was not copied to dist`).toBe(true);
      expect(readFileSync(mediaPath).subarray(4, 8).toString()).toBe("ftyp");
      expect(html).toContain(reel.title);
      expect(html).toContain(reel.mediaUrl);
    }
  });

  it("explains what each catalogue volume represents", () => {
    const html = readOutput("series/index.html");
    expect(html).toContain("Volume I is the method foundation");
    expect(html).toContain("Volume II is the power inquiry");
    expect(html).toContain("Volume III is the social-citizenship inquiry");
    expect(html).toContain("Volume IV is the capability inquiry");
    expect(html).toContain("visible release boundaries");
  });

  it("explains the connected four-volume arc in the site footer", () => {
    const html = readOutput("index.html");

    expect(html).toContain("connected four-volume inquiry into how public life is made");
    expect(html).toContain("Volume I establishes the method");
    expect(html).toContain("Volume II follows that method into sovereignty");
    expect(html).toContain("Volume III asks who carries the cost of work");
    expect(html).toContain(
      "Volume IV tests whether science, infrastructure, and artificial intelligence",
    );
    expect(html).toContain("what futures people can actually govern");
  });

  it("publishes an honest empty release log until an owner-approved release exists", () => {
    const html = readOutput("whats-new/index.html");
    expect(html).toContain("The release log is intentionally empty.");
    expect(html).toContain("six current candidates remain awaiting human release");
  });

  it("makes the reviewed public literature visible on the homepage", () => {
    expect(homeHtml).toContain("The literature behind the inquiry.");
    expect(homeHtml).toContain("9 public SSRN reading copies");
    expect(homeHtml).toContain("Who Deported More?");
    expect(homeHtml).toContain("The Double Tax on Time");
    expect(homeHtml).toContain("SSRN preprint");
    expect(homeHtml).not.toContain("/Independent Observer desktop/");
  });

  it("places the verified Volume I SSRN papers in the public preview", () => {
    const html = readOutput("series/independent-observer/index.html");

    expect(html).toContain("How to read Volume I");
    expect(html).toContain("Capital Amplification and the Myth of Equal Opportunity");
    expect(html).toContain("From Plato to Chomsky: Democracy, Mass Manipulation");
    expect(html).toContain("Three Volume I papers currently have matched public SSRN records");
    expect(html).toContain("36 downloads and 137 abstract views");
    expect(html).toContain("not quality scores, citations, endorsements, or peer review");
    expect(html).toContain("Papers already posted on SSRN.");
    expect(html).toContain("A Systems-Centered Manifesto on Automation");
    expect(html).toContain("The Illusion of Equality");
    expect(html).toContain("Why it matters to Volume I.");
    expect(html).toContain("Other files marked");
    expect(html).not.toContain('id="featured-preprints-title"');
  });

  it("renders Volume I's expanded source-taxonomy research map", () => {
    const html = readOutput("library/index.html");

    expect(html).toContain("From Plato to Chomsky: Democracy, Mass Manipulation");
    expect(html).toContain("Study the Wall: Social Injustice, Institutional Power");
    expect(html).toContain("The Death of Evidentiary Patience: Race, Social Media");
    expect(html).toContain("Reputation Debt: How Public Contempt Creates Future Cooperation Costs");
    expect(html).toContain("The Security of Memory: State Funerals, Political Legacies");
    expect(html).toContain("The Silent Archivist: Lawful Documentation and Deferred Disclosure");
    expect(html).toContain("V-Dem, Worldwide Governance Indicators, aid, and administrative data");
    expect(html).toContain("not public SSRN reading copies or publication approvals");
  });

  it("renders the History hub's research-grounded overview", () => {
    const html = readOutput("topics/history/index.html");

    expect(html).toContain("History is a way to trace how colonization, industrialization");
    expect(html).toContain("History on this site is treated as an active system");
    expect(html).toContain("From Colonization to China’s Rise");
    expect(html).toContain("state funerals, structural literacy, and institutional memory");
    expect(html).toContain("underlying drafts remain unlinked and unpublished");
  });

  it("renders the linked four-volume spine on the History hub", () => {
    const html = readOutput("topics/history/index.html");

    expect(html).toContain("One project, four connected volumes.");
    expect(html).toContain("Independent Observer");
    expect(html).toContain("The Empire Beneath Democracy");
    expect(html).toContain("Managed Decline");
    expect(html).toContain("The Last Human Workforce");
    expect(html).toContain("Public entry points");
    expect(html).toContain("The Wardhan Tax Doctrine");
    expect(html).toContain("The Autonomous Illusion");
  });

  it("renders Volume II's four research families and four principles in Public Preview", () => {
    const html = readOutput("series/the-empire-beneath-democracy/index.html");

    expect(html).toContain("Four paper families. Four principles.");
    expect(html).toContain("Democracy, institutions, and party power");
    expect(html).toContain("Immigration, citizenship, and border");
    expect(html).toContain("Civil rights, carceral state, and legal power");
    expect(html).toContain("Empire, geopolitics, and sovereignty");
    expect(html).toContain("Formal democracy is not the same as usable power.");
    expect(html).toContain("Definitions are part of evidence.");
    expect(html).toContain("Sovereignty is relational and material.");
    expect(html).toContain("Enforcement reveals how power is organized.");
    expect(html).toContain("public editorial synthesis");
  });

  it("renders Volume III's descriptive research map in the public library", () => {
    const html = readOutput("library/index.html");

    expect(html).toContain("fragmented service, platform, and data work");
    expect(html).toContain("From Pockets to Portfolios: Terry v. Ohio");
    expect(html).toContain("The Economics of Color: How De-industrialization");
    expect(html).toContain("Welfare, Wealthfare, and Social Control in Advanced Democracies");
    expect(html).toContain("The Administrative University: Bureaucratic Expansion");
    expect(html).toContain(
      "Hours to Ownership: Why the AI Industrial Revolution Rewires Inequality",
    );
    expect(html).toContain("The Perception Proxy: From Factory Collapse to Podcast Rage");
    expect(html).toContain("Provides a central Volume III bridge");
    expect(html).toContain("not public SSRN reading copies or publication approvals");
  });

  it("renders Volume IV's interdisciplinary research map in the public library", () => {
    const html = readOutput("library/index.html");

    expect(html).toContain("usable human capability");
    expect(html).toContain("When Real Science Becomes Science Fiction");
    expect(html).toContain("Quantum Computing, Antimatter, and the Next Energy Revolution");
    expect(html).toContain("Entanglement, No-Signalling, and the Real Path to Quantum Advantage");
    expect(html).toContain("The Rival the West Built");
    expect(html).toContain("Regrowing Humanity: How Robotic Limbs");
    expect(html).toContain("Environmental Instability, Developmental Timing");
    expect(html).toContain("Mind Hive Horizons");
    expect(html).toContain("ADHD in a Cage");
    expect(html).toContain("The Last Human Workforce: Automation, AI");
    expect(html).toContain("Neuroprosthetics and embodied capability");
    expect(html).toContain("not public SSRN reading copies or publication approvals");
  });

  it("keeps internal archive-provider and chatbot language out of public pages", () => {
    for (const { file } of routes) {
      const html = readOutput(file);
      expect(html).not.toMatch(/dropbox/i);
      expect(html).not.toMatch(/chatbot|chat bot/i);
    }
  });

  it("keeps the staged Evidence Lab noindex and outside release discovery", () => {
    const html = readOutput("review/regrowing-humanity/index.html");
    expect(metaContent(html, "name", "robots")).toBe("noindex,follow");
    expect(html).toContain("Awaiting human release");
    expect(readOutput("sitemap.xml")).not.toContain("/review/regrowing-humanity/");
    expect(readOutput("feed.xml")).not.toContain("Regrowing Humanity");
  });

  it("keeps Atom empty until a real release is recorded", () => {
    const atom = readOutput("feed.atom.xml");
    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(atom).not.toContain("<entry>");
  });

  it("hosts the exact owner-provided operating-system DOCX", () => {
    const documentPath = join(
      distRoot,
      "documents/independent-observer-publication-operating-system-2026.docx",
    );
    expect(existsSync(documentPath)).toBe(true);
    expect(readFileSync(documentPath).subarray(0, 2).toString()).toBe("PK");
    expect(readOutput("publication-operating-system/index.html")).toContain(
      "Download the original DOCX",
    );
  });

  it("keeps the legacy Start Here route out of indexing and points it to the current route", () => {
    const html = readOutput("start-here/index.html");
    expect(metaContent(html, "name", "robots")).toBe("noindex,follow");
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain(`href="${basePath}start/"`);
    expect(canonical(html)).toBe(new URL(sitePathForTest("/start/"), homeCanonical).href);
  });

  it("publishes security.txt without a private contact address", () => {
    const security = readOutput(".well-known/security.txt");
    expect(security).toContain("Contact: https://independentobserver.org/contact/");
    expect(security).toContain(
      "Canonical: https://independentobserver.org/.well-known/security.txt",
    );
    expect(security).not.toMatch(/@/);
  });

  it("shows a document's actual volume and public reading-copy stack", () => {
    const html = readOutput("library/documents/wardhan-tax-doctrine-ssrn/index.html");

    expect(html).toContain("Volume III publication context");
    expect(html).toContain("Volume III · Managed Decline");
    expect(html).toContain("Managed Decline");
    expect(html).toContain(
      "Volume III’s inquiry into labor markets, welfare, taxation, and administrative access",
    );
    expect(html).toContain("Public reading copies in this volume");
    expect(html).toContain("The Wardhan Tax Doctrine");
    expect(html).toContain(
      "The Wardhan Tax Doctrine asks whether the tax system can recognize time spent acquiring skills",
    );
    expect(html).toContain(
      "not enacted law, an official revenue score, or individualized tax advice",
    );
    expect(html).toContain("Current document");
    expect(html).not.toContain("curated public reading copy assembled from the matching Dropbox");
    expect(html).not.toContain("/Independent Observer desktop/");
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
    expect(robots).toMatch(/^(?:Allow: \/|Disallow: \/)$/m);
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

  it("keeps RSS empty until an owner-approved release exists", () => {
    const feed = readOutput("feed.xml");
    const itemBlocks = [...feed.matchAll(/<item>[\s\S]*?<\/item>/g)].map((match) => match[0]);

    expect(itemBlocks).toHaveLength(0);
    expect(feed).toContain('<rss version="2.0">');
    expect(feed).not.toContain("Status: ");
  });

  it.each(routes)("keeps essential structure on $route", ({ file, route }) => {
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
      route === "/" || route === "/topics/" || route.startsWith("/library/documents/") ? 3 : 2,
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
    expect(serialized).toContain("Independent Observer");
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
