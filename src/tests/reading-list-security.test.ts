import { describe, expect, it } from "vitest";
import {
  isSafeInternalHref,
  parseReadingListImport,
  parseStoredReadingList,
  MAX_READING_LIST_IMPORT_BYTES,
} from "../lib/reading-list";

const safeRecord = {
  id: "research-1",
  title: "A public reading item",
  href: "/library/public-reading/",
  type: "library",
  savedAt: "2026-08-28T00:00:00.000Z",
  status: "published",
  tag: "research",
};

describe("reading-list import boundary", () => {
  it("accepts bounded, same-site public routes", () => {
    expect(isSafeInternalHref("/library/public-reading/?section=1#top")).toBe(true);
    expect(isSafeInternalHref("/research/topic/")).toBe(true);
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,alert(1)",
    "//evil.example/",
    "/%2f%2fevil.example/",
    "/\\evil.example/",
    "/library/../private/",
    "https://evil.example/",
    "/library/%5c%5cevil/",
  ])("rejects unsafe href %s", (href) => {
    expect(isSafeInternalHref(href)).toBe(false);
  });

  it("requires the import schema and strips metadata before storage", () => {
    expect(parseReadingListImport(JSON.stringify([safeRecord]))).toEqual([
      { id: "research-1", title: "A public reading item", href: "/library/public-reading/" },
    ]);
    expect(
      parseReadingListImport(JSON.stringify([{ ...safeRecord, href: "javascript:alert(1)" }])),
    ).toBeNull();
    expect(parseReadingListImport(JSON.stringify([{ ...safeRecord, tag: "\u0000" }]))).toBeNull();
  });

  it("caps input by UTF-8 bytes and stored records", () => {
    expect(parseReadingListImport("x".repeat(MAX_READING_LIST_IMPORT_BYTES + 1))).toBeNull();
    expect(
      parseStoredReadingList(JSON.stringify([{ id: "x", title: "safe", href: "/library/x/" }])),
    ).toEqual([{ id: "x", title: "safe", href: "/library/x/" }]);
  });
});
