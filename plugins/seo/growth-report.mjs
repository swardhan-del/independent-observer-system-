import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const dist = resolve(process.env.SEO_DIST_DIR || "dist");
const origin = new URL(process.env.SEO_SITE_URL || "https://independentobserver.org");
const plan = JSON.parse(readFileSync(new URL("./growth-plan.json", import.meta.url), "utf8"));
const output = resolve(process.env.SEO_REPORT_PATH || "seo-reports/latest.json");
if (output === dist || output.startsWith(dist + "/"))
  throw new Error("Keep operational reports outside the public build");
const audit = spawnSync(
  process.execPath,
  [fileURLToPath(new URL("./seo-audit.mjs", import.meta.url))],
  {
    encoding: "utf8",
  },
);
const failures = [];
const warnings = [];
if (audit.status !== 0) failures.push(audit.stderr || "Technical audit failed");
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urls.length) failures.push("Sitemap contains no discoverable URLs");
if (new Set(urls).size !== urls.length) failures.push("Sitemap contains duplicate URLs");
const titles = new Map();
const pages = urls.map((address) => {
  const url = new URL(address);
  if (url.origin !== origin.origin) {
    failures.push("Noncanonical sitemap origin: " + address);
    return { url: address };
  }
  const file = join(dist, url.pathname, "index.html");
  if (!existsSync(file)) {
    failures.push("Sitemap page missing from build: " + address);
    return { url: address };
  }
  const html = readFileSync(file, "utf8");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (canonical !== address) failures.push("Sitemap and canonical disagree: " + address);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  if (noindex) failures.push("Sitemap page is noindex in the production build: " + address);
  if (titles.has(title)) warnings.push("Duplicate title: " + address + " and " + titles.get(title));
  titles.set(title, address);
  return { url: address, title, indexableInBuild: !noindex };
});
const robots = readFileSync(join(dist, "robots.txt"), "utf8");
if (/^Disallow:\s*\/\s*$/m.test(robots)) failures.push("Production robots blocks all crawling");
if (!robots.includes(`Sitemap: ${origin.origin}/sitemap.xml`))
  failures.push("Canonical sitemap is not advertised in robots.txt");
for (const path of plan.priorityPaths) {
  if (!urls.includes(new URL(path, origin).href))
    failures.push("Priority public page missing from sitemap: " + path);
}
const releaseItems = [...readFileSync(join(dist, "feed.xml"), "utf8").matchAll(/<item[\s>]/g)]
  .length;
if (!releaseItems)
  warnings.push("Release feed has no entries; do not treat draft previews as released papers");
const report = {
  generatedAt: new Date().toISOString(),
  origin: origin.origin,
  technicalAuditPassed: audit.status === 0,
  productionDiscoveryPassed: failures.length === 0,
  sitemapUrl: new URL("/sitemap.xml", origin).href,
  pages,
  releaseItems,
  failures,
  warnings,
  growthPlan: plan,
  googleStatus:
    "Crawl eligibility checked locally. Google submission, indexing and traffic are not established by this report.",
};
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(
  `SEO growth report: ${output}; ${pages.length} sitemap pages; ${failures.length} failures; ${warnings.length} warnings`,
);
if (failures.length) process.exitCode = 1;
