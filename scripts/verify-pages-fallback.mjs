import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const dist = process.env.PAGES_DIST_DIR || "dist";
const productionOrigin = "https://independentobserver.org";
const fallbackBase = "/independent-observer-system-/";
const forbiddenProductionBase = `${productionOrigin}${fallbackBase}`;
const failures = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name);
    return entry.isDirectory() ? walk(pathname) : [pathname];
  });
}

for (const pathname of walk(dist).filter((file) => file.endsWith(".html"))) {
  const html = readFileSync(pathname, "utf8");
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["']noindex,follow["']/i.test(html)) {
    failures.push(`${pathname}: missing noindex fallback directive`);
  }
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (canonical && !canonical.startsWith(`${productionOrigin}/`)) {
    failures.push(`${pathname}: fallback canonical is not the custom domain`);
  }
  if (canonical?.startsWith(forbiddenProductionBase)) {
    failures.push(`${pathname}: fallback canonical leaked the GitHub Pages repository base path`);
  }
}

for (const pathname of walk(dist).filter((file) => /\.(?:html|xml|txt|json)$/i.test(file))) {
  const text = readFileSync(pathname, "utf8");
  if (text.includes(forbiddenProductionBase)) {
    failures.push(
      `${relative(dist, pathname)}: production discovery URL leaked the GitHub Pages repository base path`,
    );
  }
}

const robots = existsSync(join(dist, "robots.txt"))
  ? readFileSync(join(dist, "robots.txt"), "utf8")
  : "";
if (!/^User-agent: \*\nDisallow: \/$/m.test(robots))
  failures.push("robots.txt: fallback must disallow crawling");
if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
  failures.push("robots.txt: sitemap discovery must remain on the production root");
}

if (failures.length) {
  console.error("GitHub Pages fallback verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(
  "GitHub Pages fallback is noindex, custom-canonical, crawl-disallowed, and free of repository-base canonical leakage.",
);
