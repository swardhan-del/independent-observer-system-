import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { dropboxDocumentItems, dropboxFeedItems } from "../data/dropbox-content.generated";

function publicBuildFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? publicBuildFiles(path)
      : /\.(?:html|xml|js|css)$/i.test(entry.name)
        ? [path]
        : [];
  });
}

describe("public privacy boundary", () => {
  it("keeps the generated Dropbox feed fail-closed", () => {
    expect(dropboxFeedItems).toEqual([]);
    expect(dropboxDocumentItems).toEqual([]);
  });

  it("does not place private paths, credentials, or restricted records in the build", () => {
    const output = publicBuildFiles(join(process.cwd(), "dist"))
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");
    expect(output).not.toMatch(/\/Users\/|dropbox\.com\//i);
    expect(output).not.toMatch(/DROPBOX_(?:APP|REFRESH|SOURCE)|(?:api|refresh)[_-]?token/i);
    expect(output).not.toMatch(/Semmelweis|court packets?|medical records?|student records?/i);
    expect(output).not.toMatch(/test fixture|internal prompt|AI chat log/i);
  });
});
