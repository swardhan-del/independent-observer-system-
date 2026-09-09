import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { expect, test } from "vitest";
const script = resolve("plugins/seo/seo-audit.mjs");
test("only exact noindex utility fragments are exempt from page metadata; privacy still applies", () => {
  const dir = mkdtempSync(join(tmpdir(), "io-seo-fragments-"));
  const write = (path, text) => {
    const full = join(dir, path);
    mkdirSync(resolve(full, ".."), { recursive: true });
    writeFileSync(full, text);
  };
  const run = () =>
    spawnSync(process.execPath, [script], {
      env: { ...process.env, SEO_DIST_DIR: dir },
      encoding: "utf8",
    });
  try {
    for (const file of ["robots.txt", "sitemap.xml", "og-cover.jpg"]) write(file, "fixture");
    write("feed.xml", "<rss>https://independentobserver.org</rss>");
    const fragment = '<meta name="robots" content="noindex,follow"><dialog></dialog>';
    write("utilities/search/index.html", fragment);
    expect(run().status).toBe(0);
    write("utilities/search/index.html", "<dialog></dialog>");
    expect(run().stderr).toContain("must contain a dialog and remain noindex");
    write("utilities/search/index.html", fragment + "/Users/private-example/");
    expect(run().stderr).toContain("public-leakage pattern matched");
    write("utilities/search/index.html", fragment);
    write("utilities/unexpected/index.html", fragment);
    expect(run().stderr).toContain("utilities/unexpected/index.html: missing title");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
