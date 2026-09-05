import { describe, expect, it } from "vitest";
import {
  isSafeReadingHref,
  migrateReadingList,
  parseReadingList,
  readingListLegacyStorageKey,
  readingListStorageKey,
} from "../lib/reading-list";

describe("reading list security and migration", () => {
  it("keeps the v1 and v2 storage keys explicit", () => {
    expect(readingListLegacyStorageKey).toBe("independent-observer:reading-list:v1");
    expect(readingListStorageKey).toBe("independent-observer:reading-list:v2");
  });

  it("accepts only root-relative or credential-free HTTPS reading URLs", () => {
    expect(isSafeReadingHref("/research/example/")).toBe(true);
    expect(isSafeReadingHref("https://example.com/article")).toBe(true);

    for (const href of [
      "javascript:alert(1)",
      "data:text/html,unsafe",
      "http://example.com/article",
      "//example.com/article",
      "https://user:pass@example.com/article",
      "/safe\\..\\unsafe",
    ]) {
      expect(isSafeReadingHref(href)).toBe(false);
    }
  });

  it("drops unsafe hrefs from current-format imports", () => {
    const imported = JSON.stringify([
      {
        id: "safe",
        title: "Safe",
        href: "/research/safe/",
        savedAt: 1,
        status: "unread",
      },
      {
        id: "unsafe",
        title: "Unsafe",
        href: "javascript:alert(1)",
        savedAt: 2,
        status: "unread",
      },
    ]);

    expect(parseReadingList(imported).map((item) => item.id)).toEqual(["safe"]);
  });

  it("migrates safe v1 entries while rejecting executable legacy hrefs", () => {
    const legacy = JSON.stringify([
      { id: "legacy-safe", title: "Legacy safe", href: "/series/independent-observer/" },
      { id: "legacy-unsafe", title: "Legacy unsafe", href: "javascript:alert(1)" },
    ]);

    const migrated = migrateReadingList(legacy);
    expect(migrated).toHaveLength(1);
    expect(migrated[0]).toMatchObject({
      id: "legacy-safe",
      href: "/series/independent-observer/",
      status: "unread",
    });
  });
});
