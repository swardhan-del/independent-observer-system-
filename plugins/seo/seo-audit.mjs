import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = process.env.SEO_DIST_DIR || "dist";
const siteUrl = (process.env.SEO_SITE_URL || "https://independentobserver.org").replace(/\/$/, "");
const requiredFiles = ["robots.txt", "sitemap.xml", "feed.xml", "og-cover.jpg"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name);
    return entry.isDirectory() ? walk(pathname) : [pathname];
  });
}

function read(pathname) {
  return readFileSync(pathname, "utf8");
}

if (!existsSync(distDir)) {
  fail("Build directory not found: " + distDir);
}

for (const file of requiredFiles) {
  if (!existsSync(join(distDir, file))) {
    fail("Missing required public file: " + file);
  }
}

const htmlFiles = walk(distDir).filter((pathname) => pathname.endsWith(".html"));

for (const pathname of htmlFiles) {
  const html = read(pathname);
  const label = relative(distDir, pathname);

  for (const [name, pattern] of [
    ["title", /<title>[^<]+<\/title>/i],
    ["meta description", /<meta[^>]+name=["']description["'][^>]+content=/i],
    ["canonical", /<link[^>]+rel=["']canonical["'][^>]+href=/i],
    ["Open Graph title", /property=["']og:title["']/i],
    ["Open Graph image", /property=["']og:image["']/i],
    ["JSON-LD", /application\/ld\+json/i]
  ]) {
    if (!pattern.test(html)) {
      fail(label + ": missing " + name);
    }
  }

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (canonical && !canonical.startsWith(siteUrl)) {
    fail(label + ": canonical is outside " + siteUrl + ": " + canonical);
  }

  const publicLeakPatterns = [
    /\/Users\//i,
    /\/private\/tmp/i,
    /dropbox[^"']*\/(?:lockbox|private|secrets?)/i,
    /(?:refresh[_ -]?token|client[_ -]?secret|api[_ -]?key|password)\s*[:=]/i
  ];

  for (const pattern of publicLeakPatterns) {
    if (pattern.test(html)) {
      fail(label + ": public-leakage pattern matched " + pattern);
    }
  }
}

if (existsSync(join(distDir, "feed.xml"))) {
  const feed = read(join(distDir, "feed.xml"));
  if (!feed.includes("<rss") || !feed.includes(siteUrl)) {
    fail("feed.xml: missing RSS markup or approved public origin");
  }
}

if (failures.length > 0) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("SEO audit passed: " + htmlFiles.length + " HTML files checked in " + distDir);
console.log("Public origin: " + siteUrl);
