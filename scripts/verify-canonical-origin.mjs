import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const dist = process.env.CANONICAL_DIST_DIR || "dist";
const origin = (process.env.CANONICAL_ORIGIN || "https://independentobserver.org").replace(
  /\/$/,
  "",
);
const forbiddenHosts = /(?:https?:\/\/[^\s"'<>)]+\.)?(?:github\.io|vercel\.app)(?:[/:\s"'<)]|$)/i;
const urlFields = /(?:canonical|sitemap|feed|og:|twitter:|application\/ld\+json)[\s\S]{0,600}/gi;
const failures = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name);
    return entry.isDirectory() ? walk(pathname) : [pathname];
  });
}

if (!existsSync(dist)) failures.push(`Missing build directory: ${dist}`);
for (const pathname of walk(dist).filter((file) =>
  /\.(?:html|xml|txt|json|js|css|svg)$/i.test(file),
)) {
  const text = readFileSync(pathname, "utf8");
  const label = relative(dist, pathname);
  if (forbiddenHosts.test(text))
    failures.push(`${label}: forbidden github.io/vercel.app host found`);
  for (const field of text.matchAll(urlFields)) {
    if (forbiddenHosts.test(field[0]))
      failures.push(`${label}: forbidden host in metadata/feed field`);
  }
  if (/\.html$/i.test(pathname)) {
    const canonical = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
    if (canonical && !canonical.startsWith(origin))
      failures.push(`${label}: canonical outside ${origin}`);
  }
}

if (failures.length) {
  console.error("Canonical-origin verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Canonical-origin verification passed for ${origin}.`);
