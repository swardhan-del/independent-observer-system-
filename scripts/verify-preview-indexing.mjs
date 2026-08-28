import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = process.env.PREVIEW_DIST_DIR || "dist";
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
    failures.push(`${pathname}: preview is missing noindex`);
  }
}
const robotsPath = join(dist, "robots.txt");
const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
if (!/^User-agent: \*\nDisallow: \/$/m.test(robots)) {
  failures.push("robots.txt: preview must disallow crawling");
}
if (failures.length) {
  console.error("Vercel preview indexing verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Vercel preview is globally noindex and crawl-disallowed.");
