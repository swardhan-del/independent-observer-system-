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

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function outputForUrl(url) {
  const pathname = decodeURIComponent(url.pathname);
  let relativePath;
  if (pathname.startsWith(fallbackBase)) {
    relativePath = pathname.slice(fallbackBase.length);
  } else if (url.origin === productionOrigin && pathname.startsWith("/")) {
    relativePath = pathname.slice(1);
  } else {
    return null;
  }

  if (!relativePath) return join(dist, "index.html");
  return relativePath.endsWith("/")
    ? join(dist, relativePath, "index.html")
    : join(dist, relativePath);
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
for (const pathname of htmlFiles) {
  const html = readFileSync(pathname, "utf8");
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["']noindex,follow["']/i.test(html)) {
    failures.push(`${relative(dist, pathname)}: missing noindex fallback directive`);
  }
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (canonical && !canonical.startsWith(`${productionOrigin}/`)) {
    failures.push(`${relative(dist, pathname)}: fallback canonical is not the custom domain`);
  }
  if (canonical?.startsWith(forbiddenProductionBase)) {
    failures.push(
      `${relative(dist, pathname)}: fallback canonical leaked the GitHub Pages repository base path`,
    );
  }

  for (const tag of tags(html, "a")) {
    const href = attribute(tag, "href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }
    const target = new URL(href, canonical || productionOrigin);
    if (target.origin !== productionOrigin) continue;
    const output = outputForUrl(target);
    if (!output || !existsSync(output)) {
      failures.push(`${relative(dist, pathname)}: unresolved fallback navigation ${href}`);
      continue;
    }
    if (target.hash && output.endsWith(".html")) {
      const targetHtml = readFileSync(output, "utf8");
      const fragment = decodeURIComponent(target.hash.slice(1));
      if (
        !new RegExp(
          `\\bid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
        ).test(targetHtml)
      ) {
        failures.push(`${relative(dist, pathname)}: unresolved fragment ${href}`);
      }
    }
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
if (!/^User-agent: \*\nDisallow: \/$/m.test(robots)) {
  failures.push("robots.txt: fallback must disallow crawling");
}
if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
  failures.push("robots.txt: sitemap discovery must remain on the production root");
}

const sitemap = existsSync(join(dist, "sitemap.xml"))
  ? readFileSync(join(dist, "sitemap.xml"), "utf8")
  : "";
for (const location of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  if (!location[1].startsWith(`${productionOrigin}/`) || location[1].startsWith(forbiddenProductionBase)) {
    failures.push(`sitemap.xml: invalid canonical location ${location[1]}`);
  }
}

if (failures.length) {
  console.error("GitHub Pages fallback verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(
  "GitHub Pages fallback is noindex, custom-canonical, crawl-disallowed, repository-base navigable, and free of repository-base canonical leakage.",
);
