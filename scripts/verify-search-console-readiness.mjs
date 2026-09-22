import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const dist = process.env.GSC_DIST_DIR || "dist";
const siteUrl = new URL(process.env.GSC_SITE_URL || "https://independentobserver.org");
const origin = siteUrl.origin;
const expectedVerificationToken =
  process.env.GSC_VERIFICATION_TOKEN || "h9n2JK0QDIRl9KrBpQMYsy-OECkmR3D5fkCBKdGLLW8";
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(pathname) {
  return readFileSync(pathname, "utf8");
}

function htmlFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(pathname) : pathname.endsWith(".html") ? [pathname] : [];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(name + "=[\\"']([^\\"']*)", "i"))?.[1] ?? "";
}

function hasNoindex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

function canonicalFor(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? "";
}

function routePathFor(label) {
  return label === "index.html" ? "/" : "/" + label.replace(/\/index\.html$/, "") + "/";
}

if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  fail("GSC_SITE_URL must contain only an origin.");
}

if (!existsSync(dist)) {
  fail("Build directory not found: " + dist);
}

const robotsPath = join(dist, "robots.txt");
if (!existsSync(robotsPath)) {
  fail("robots.txt is missing.");
} else {
  const robots = read(robotsPath);
  if (!robots.includes(origin + "/sitemap.xml")) {
    fail("robots.txt does not point to the canonical sitemap.");
  }
  const blocksAllPaths = robots.split(/\r?\n/).some((line) => {
    const rule = line.replace(/#.*/, "").trim();
    return /^Disallow:\s*\/(?:\*)?\s*$/i.test(rule);
  });
  if (blocksAllPaths) {
    fail("robots.txt blocks the production site from crawling.");
  }
}

const sitemapPath = join(dist, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  fail("sitemap.xml is missing.");
}

const sitemapUrls = existsSync(sitemapPath)
  ? [...read(sitemapPath).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  : [];
if (sitemapUrls.length === 0) {
  fail("sitemap.xml contains no URLs.");
}
if (new Set(sitemapUrls).size !== sitemapUrls.length) {
  fail("sitemap.xml contains duplicate URLs.");
}

for (const url of sitemapUrls) {
  try {
    const parsed = new URL(url);
    if (parsed.origin !== origin) fail("sitemap URL uses a noncanonical origin: " + url);
    if (parsed.search || parsed.hash) fail("sitemap URL must not contain a query or fragment: " + url);
    if (!parsed.pathname.endsWith("/")) fail("sitemap URL is not trailing-slash canonical: " + url);
    const relativePath = parsed.pathname.replace(/^\//, "");
    const outputPath = relativePath === "" ? join(dist, "index.html") : join(dist, relativePath, "index.html");
    if (!existsSync(outputPath)) {
      fail("sitemap URL has no built page: " + url);
      continue;
    }
    const page = read(outputPath);
    if (hasNoindex(page)) {
      fail("sitemap page is noindex: " + url);
    }
    const canonical = canonicalFor(page);
    if (canonical !== url) {
      fail("sitemap URL does not match its page canonical: " + url);
    }
  } catch {
    fail("sitemap contains an invalid URL: " + url);
  }
}

const homepagePath = join(dist, "index.html");
if (!existsSync(homepagePath)) {
  fail("Built homepage is missing.");
} else {
  const homepage = read(homepagePath);
  const verificationTags =
    homepage.match(/<meta\b[^>]*name=["']google-site-verification["'][^>]*>/gi) ?? [];
  const token = verificationTags.length === 1 ? attribute(verificationTags[0], "content") : "";
  if (verificationTags.length !== 1 || token !== expectedVerificationToken) {
    fail("Homepage must contain the expected Google site-verification token.");
  }
}

for (const pathname of htmlFiles(dist)) {
  const label = relative(dist, pathname);
  const html = read(pathname);
  const noindex = hasNoindex(html);
  const canonical = canonicalFor(html);
  const routeUrl = new URL(routePathFor(label), origin).href;
  if (noindex) {
    if (sitemapUrls.includes(routeUrl)) {
      fail(label + ": sitemap-listed page is noindex.");
    }
    continue;
  }
  if (!canonical) {
    fail(label + ": canonical link is missing.");
  } else if (!canonical.startsWith(origin)) {
    fail(label + ": canonical points outside " + origin + ".");
  }
}

if (failures.length) {
  console.error("Google Search Console readiness check failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}

console.log(
  "Google Search Console readiness passed: " +
    sitemapUrls.length +
    " sitemap URLs and " +
    htmlFiles(dist).length +
    " HTML files checked for " +
    origin +
    ".",
);

