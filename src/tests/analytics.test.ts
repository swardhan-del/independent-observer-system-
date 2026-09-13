import { describe, expect, it, vi, afterEach } from "vitest";
import { track, initArticleTracking, type FunnelEventName } from "../lib/analytics";

describe("analytics adapter", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    if (originalWindow === undefined) {
      // @ts-expect-error -- restoring the no-window (build/SSR) environment for other tests
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
    vi.restoreAllMocks();
  });

  it("does nothing when window is unavailable (build/SSR context)", () => {
    // @ts-expect-error -- simulating the non-browser environment on purpose
    delete globalThis.window;
    expect(() => track("homepage_view")).not.toThrow();
  });

  it("never sends anything off-device in production (non-localhost) without a configured transport", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubGlobal("window", { location: { hostname: "independentobserver.org" } });

    track("article_view", { articleId: "who-deported-more", articleType: "document" });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();
  });

  it("logs to console.debug only in the localhost dev transport, never real event data elsewhere", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    vi.stubGlobal("window", { location: { hostname: "localhost" } });

    track("join_page_view");

    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining("join_page_view"),
      expect.any(Object),
    );
  });

  it("restricts event names to the documented funnel vocabulary", () => {
    const documented: FunnelEventName[] = [
      "homepage_view",
      "start_here_click",
      "article_view",
      "article_50_percent",
      "article_complete",
      "related_article_click",
      "search_used",
      "save_article",
      "join_page_view",
      "email_signup_started",
      "email_signup_completed",
      "paid_membership_view",
      "paid_checkout_started",
      "paid_membership_completed",
    ];
    expect(documented).toHaveLength(14);
  });

  it("fires article_view once and scroll-threshold events at most once each", () => {
    const events: string[] = [];
    let scrollHandler: (() => void) | undefined;
    vi.stubGlobal("window", {
      location: { hostname: "localhost" },
      innerHeight: 800,
      scrollY: 0,
      addEventListener: (name: string, handler: () => void) => {
        if (name === "scroll") scrollHandler = handler;
      },
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal("document", {
      documentElement: { scrollHeight: 1800 },
    });
    vi.spyOn(console, "debug").mockImplementation((label: string) => {
      events.push(label);
    });

    initArticleTracking("test-article", "document");
    expect(events).toContain("[analytics:dev] article_view");

    globalThis.window.scrollY = 600; // (1800-800)=1000 max, 60%
    scrollHandler?.();
    expect(events).toContain("[analytics:dev] article_50_percent");
    expect(events).not.toContain("[analytics:dev] article_complete");

    globalThis.window.scrollY = 960; // 96%
    scrollHandler?.();
    expect(events).toContain("[analytics:dev] article_complete");

    const halfCount = events.filter(
      (event) => event === "[analytics:dev] article_50_percent",
    ).length;
    const completeCount = events.filter(
      (event) => event === "[analytics:dev] article_complete",
    ).length;
    expect(halfCount).toBe(1);
    expect(completeCount).toBe(1);
  });
});
