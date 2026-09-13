import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  parseLastArticle,
  parseLastVisit,
  isNewSinceLastVisit,
  recordLastArticle,
  readLastArticle,
  lastArticleStorageKey,
} from "../lib/reading-history";

describe("reading-history: parsing is defensive against corrupt/malicious storage", () => {
  it("rejects non-JSON, non-object, and missing-field values", () => {
    expect(parseLastArticle(null)).toBeUndefined();
    expect(parseLastArticle("not json")).toBeUndefined();
    expect(parseLastArticle("42")).toBeUndefined();
    expect(parseLastArticle("{}")).toBeUndefined();
    expect(parseLastArticle(JSON.stringify({ id: "x" }))).toBeUndefined();
  });

  it("rejects an href that is not a safe same-site path", () => {
    const base = { id: "x", title: "X", visitedAt: 1 };
    expect(
      parseLastArticle(JSON.stringify({ ...base, href: "https://evil.example/" })),
    ).toBeUndefined();
    expect(parseLastArticle(JSON.stringify({ ...base, href: "//evil.example/" }))).toBeUndefined();
    expect(
      parseLastArticle(JSON.stringify({ ...base, href: "javascript:alert(1)" })),
    ).toBeUndefined();
  });

  it("accepts a well-formed entry", () => {
    const value = JSON.stringify({
      id: "x",
      title: "X",
      href: "/library/documents/x/",
      visitedAt: 5,
    });
    expect(parseLastArticle(value)).toEqual({
      id: "x",
      title: "X",
      href: "/library/documents/x/",
      visitedAt: 5,
    });
  });

  it("parses a last-visit timestamp or returns undefined for garbage", () => {
    expect(parseLastVisit(null)).toBeUndefined();
    expect(parseLastVisit("not-a-number")).toBeUndefined();
    expect(parseLastVisit("12345")).toBe(12345);
  });
});

describe("isNewSinceLastVisit", () => {
  it("is false with no recorded last visit (first-ever visit)", () => {
    expect(isNewSinceLastVisit("2026-09-01", undefined)).toBe(false);
  });

  it("is true only for dates after the last visit", () => {
    const lastVisit = Date.parse("2026-09-01T00:00:00Z");
    expect(isNewSinceLastVisit("2026-09-02", lastVisit)).toBe(true);
    expect(isNewSinceLastVisit("2026-08-01", lastVisit)).toBe(false);
  });

  it("is false for an unparseable date", () => {
    expect(isNewSinceLastVisit("not-a-date", Date.now())).toBe(false);
  });
});

describe("recordLastArticle / readLastArticle (browser-only convenience)", () => {
  function fakeLocalStorage() {
    const store = new Map<string, string>();
    return {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    };
  }

  beforeEach(() => {
    vi.stubGlobal("window", { localStorage: fakeLocalStorage() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("records and reads back the last article, keyed off a versioned storage key", () => {
    recordLastArticle(
      "who-deported-more",
      "Who Deported More?",
      "/library/documents/who-deported-more/",
    );
    const raw = window.localStorage.getItem(lastArticleStorageKey);
    expect(raw).toBeTruthy();
    const last = readLastArticle("/some-other-page/");
    expect(last?.id).toBe("who-deported-more");
    expect(last?.title).toBe("Who Deported More?");
  });

  it("does not recommend the page the reader is already on", () => {
    recordLastArticle(
      "who-deported-more",
      "Who Deported More?",
      "/library/documents/who-deported-more/",
    );
    expect(readLastArticle("/library/documents/who-deported-more/")).toBeUndefined();
  });

  it("returns undefined when nothing has been recorded yet", () => {
    expect(readLastArticle("/anything/")).toBeUndefined();
  });
});
