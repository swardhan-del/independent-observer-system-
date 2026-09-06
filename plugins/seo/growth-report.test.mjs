import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const origin = "https://independentobserver.org";
const plan = JSON.parse(readFileSync(new URL("./growth-plan.json", import.meta.url), "utf8"));
function run({ blocked = false, noindex = false, wrongCanonical = false } = {}) {
  const temp = mkdtempSync(join(tmpdir(), "io-seo-test-"));
  const dist = join(temp, "build");
  mkdirSync(dist);
  for (const path of plan.priorityPaths) {
    const dir = join(dist, path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "index.html"),
      `<html><head><title>Page ${path}</title><meta name="description" content="Useful summary"><link rel="canonical" href="${wrongCanonical ? "https://example.org" : origin}${path}"><meta property="og:title" content="Page"><meta property="og:image" content="${origin}/og-cover.jpg"><script type="application/ld+json">{}</script>${noindex ? '<meta name="robots" content="noindex,follow">' : ""}</head><body>Summary</body></html>`,
    );
  }
  writeFileSync(
    join(dist, "robots.txt"),
    `User-agent: *\n${blocked ? "Disallow: /" : "Allow: /"}\nSitemap: ${origin}/sitemap.xml\n`,
  );
  writeFileSync(
    join(dist, "sitemap.xml"),
    `<urlset>${plan.priorityPaths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join("")}</urlset>`,
  );
  writeFileSync(join(dist, "feed.xml"), `<rss><channel><link>${origin}</link></channel></rss>`);
  writeFileSync(join(dist, "og-cover.jpg"), "fixture");
  const output = join(temp, "report.json");
  try {
    const result = spawnSync(
      process.execPath,
      [fileURLToPath(new URL("./growth-report.mjs", import.meta.url))],
      {
        env: { ...process.env, SEO_SITE_URL: origin, SEO_DIST_DIR: dist, SEO_REPORT_PATH: output },
        encoding: "utf8",
      },
    );
    return { code: result.status, report: JSON.parse(readFileSync(output, "utf8")) };
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
describe("production discovery report", () => {
  it("reads the reviewed plan while reporting an empty release feed honestly", () => {
    const { code, report } = run();
    expect(code).toBe(0);
    expect(report.growthPlan.objective).toBe(plan.objective);
    expect(report.warnings).toContain(
      "Release feed has no entries; do not treat draft previews as released papers",
    );
  });
  it("rejects a blocked production crawler", () => {
    const result = run({ blocked: true });
    expect(result.code).toBe(1);
    expect(result.report.failures).toContain("Production robots blocks all crawling");
  });
  it("rejects noindex sitemap entries", () => {
    const result = run({ noindex: true });
    expect(result.code).toBe(1);
    expect(result.report.failures.some((value) => value.includes("noindex"))).toBe(true);
  });
  it("rejects a canonical on another host", () => {
    const result = run({ wrongCanonical: true });
    expect(result.code).toBe(1);
    expect(result.report.failures.some((value) => value.includes("canonical disagree"))).toBe(true);
  });
});
