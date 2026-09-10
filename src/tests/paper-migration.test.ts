import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { paperDocuments } from "../data/papers";

const retiredPlatformToken = ["ss", "rn"].join("");

function htmlFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

describe("author paper migration", () => {
  it("keeps paper files private while publishing source-reviewed synopses", () => {
    expect(paperDocuments).toHaveLength(21);
    expect(
      paperDocuments.every(
        (paper) =>
          paper.status === "Author working paper" &&
          paper.sourceLabel === "Author-controlled source · selected public synopsis" &&
          paper.sourceFingerprintSha256?.length === 64 &&
          paper.sections.some((section) => section.id === "publication-boundary"),
      ),
    ).toBe(true);
    expect(JSON.stringify(paperDocuments).toLocaleLowerCase()).not.toContain(retiredPlatformToken);
  });

  it("publishes only verified ResearchGate records and preserves two review holds", () => {
    const linked = paperDocuments.filter((paper) => paper.researchGateUrl);
    const held = paperDocuments.filter((paper) => !paper.researchGateUrl);

    expect(linked).toHaveLength(19);
    expect(
      linked.every((paper) =>
        paper.researchGateUrl?.startsWith("https://www.researchgate.net/publication/"),
      ),
    ).toBe(true);
    expect(held.map((paper) => paper.id)).toEqual([
      "latino-irony",
      "children-left-behind-after-a-war",
    ]);
  });

  it("keeps legacy redirects and navigation free of the retired platform", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));
    const legacyRedirects = config.redirects.filter((redirect: { source: string }) =>
      redirect.source.toLocaleLowerCase().includes(retiredPlatformToken),
    );

    expect(legacyRedirects).toHaveLength(21);
    expect(
      legacyRedirects.every(
        (redirect: { destination: string; permanent: boolean }) =>
          redirect.permanent &&
          !redirect.destination.toLocaleLowerCase().includes(retiredPlatformToken),
      ),
    ).toBe(true);

    for (const file of htmlFiles(join(process.cwd(), "dist"))) {
      const html = readFileSync(file, "utf8").toLocaleLowerCase();
      // Faithful manuscript editions may retain historical platform mentions in author prose.
      // Navigation, metadata, and all outgoing links must still satisfy the migration.
      const outsideManuscript = html.replace(
        /<div class="manuscript-text"[^>]*>[\s\S]*?<\/div>/g,
        "",
      );
      expect(outsideManuscript, file).not.toContain(retiredPlatformToken);
      for (const href of html.matchAll(/href=["']([^"']+)["']/g))
        expect(href[1], file).not.toContain(retiredPlatformToken);
    }
  });
});
