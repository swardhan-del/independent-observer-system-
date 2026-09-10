import { test, expect } from "@playwright/test";

test("reader vocabulary, keyboard links, filters and history preserve discovery", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("[data-search-open]").click();
  const input = page.locator("[data-search-input]");
  await input.fill("deportation");
  const first = page.locator("[data-search-result]").first();
  await expect(first).toHaveAttribute("href", /who-deported-more/);
  await input.press("ArrowDown");
  await expect(first).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-search-open]")).toBeFocused();
  await page.locator("[data-search-open]").click();
  await expect(input).toHaveValue("deportation");
  await page.locator('[data-search-filter="type"]').selectOption("Topic");
  await input.fill("Who Deported More");
  await expect(page.getByRole("button", { name: "Clear filters", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(first).toContainText("Who Deported More");
  await input.fill("Who Deported More");
  await input.press("Enter");
  await expect(page).toHaveURL(/who-deported-more/);
  await page.goBack();
  await page.locator("[data-search-open]").click();
  await expect(input).toHaveValue("Who Deported More");
});

test("global search never consumes research or topic page filter parameters", async ({ page }) => {
  const cases = [
    "/research/?q=migration&volume=Volume%20II",
    "/topics/?q=democracy&volume=Volume%20II",
  ];

  for (const path of cases) {
    await page.goto("/");
    await page.evaluate(() => sessionStorage.removeItem("io:search"));
    await page.goto(path);
    const before = new URL(page.url());
    expect(before.searchParams.get("q")).toBeTruthy();
    expect(before.searchParams.get("volume")).toBeTruthy();

    await page.locator("[data-search-open]").click();
    const input = page.locator("[data-search-input]");
    await expect(input).toHaveValue("");
    await input.fill("deportation");
    await page.keyboard.press("Escape");

    let current = new URL(page.url());
    expect(current.searchParams.get("q")).toBe(before.searchParams.get("q"));
    expect(current.searchParams.get("volume")).toBe(before.searchParams.get("volume"));

    await page.reload();
    current = new URL(page.url());
    expect(current.searchParams.get("q")).toBe(before.searchParams.get("q"));
    expect(current.searchParams.get("volume")).toBe(before.searchParams.get("volume"));
    await page.locator("[data-search-open]").click();
    await expect(page.locator("[data-search-input]")).toHaveValue("deportation");
    await page.keyboard.press("Escape");
  }
});

test("library uses the same reader vocabulary and retains a crawlable paper link", async ({
  page,
}) => {
  await page.goto("/library/");
  await page.getByRole("searchbox", { name: "Search papers", exact: true }).fill("deportation");
  const cards = page.locator("[data-library-paper-card]:visible");
  await expect(cards).toHaveCount(1);
  await expect(cards.locator("h3 a")).toHaveAttribute("href", /who-deported-more/);
  await page.reload();
  await expect(cards).toHaveCount(1);
});

test("saved reading toggles are synchronized before the first lazy click", async ({ page }) => {
  await page.goto("/research/");
  const toggle = page.locator("[data-reading-toggle]").first();
  const savedItem = await toggle.evaluate((button) => ({
    id: (button as HTMLButtonElement).dataset.readingId!,
    title: (button as HTMLButtonElement).dataset.readingTitle!,
    href: (button as HTMLButtonElement).dataset.readingHref!,
    type: (button as HTMLButtonElement).dataset.readingType,
    savedAt: Date.now(),
    status: "unread" as const,
  }));
  await page.evaluate((item) => {
    localStorage.setItem("independent-observer:reading-list:v2", JSON.stringify([item]));
  }, savedItem);
  await page.reload();

  const restoredToggle = page.locator("[data-reading-toggle]").first();
  await expect(restoredToggle).toHaveText("Saved");
  await expect(restoredToggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-reading-count]")).toHaveText("1");

  await restoredToggle.click();
  await expect(restoredToggle).toHaveText("Save");
  await expect(restoredToggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("[data-reading-count]")).toHaveText("0");
});

test("mobile contents precede article text and source tables remain in the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/library/documents/who-deported-more/");
  await expect(page.locator("h1")).toHaveText(
    "Who Deported More? A Guide to Comparing Deportation Statistics",
  );
  await expect(page.locator(".reader-byline")).toContainText("Author working paper");
  const contents = page.locator(".reader-contents");
  await expect(contents).toBeVisible();
  expect(await contents.evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(844);
  await contents.locator("summary").click();
  await contents.getByRole("link", { name: "Three terms that need separate columns" }).click();
  await expect(page).toHaveURL(/#definitions$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await expect(page.locator(".reader-table-wrap")).toHaveAttribute("tabindex", "0");
});

test("contact offers a selectable message when copying is unavailable and does not send", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Clipboard blocked");
        },
      },
    }),
  );
  await page.goto("/contact/?page=%2Flibrary%2Fdocuments%2Fwho-deported-more%2F");
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") requests.push(request.url());
  });
  await page.locator("#contact-disclosure").check();
  await page.getByRole("button", { name: "Copy message", exact: true }).click();
  const fallback = page.locator("#contact-copy-fallback");
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveValue(/who-deported-more/);
  await expect(page.locator("[data-contact-inquiry-status]")).toContainText(
    "Nothing has been sent",
  );
  await page.getByRole("button", { name: "Copy email address", exact: true }).click();
  await expect(fallback).toHaveValue("swardhan1@icloud.com");
  expect(requests).toEqual([]);
});

test("contact reports successful copying without requiring a redundant reply address", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => {} } }),
  );
  await page.goto("/contact/");
  await page
    .locator("#contact-topic")
    .selectOption({ label: "Other Independent Observer question" });
  await page.locator("#contact-message").fill("Test draft for local verification only.");
  await page.locator("#contact-disclosure").check();
  await page.getByRole("button", { name: "Copy message", exact: true }).click();
  await expect(page.locator("[data-contact-inquiry-status]")).toContainText("Message copied");
  await expect(page.locator("#contact-copy-fallback")).not.toBeVisible();
});

test("homepage distinguishes listening, playable reels and following", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Watch preview reels", exact: true }).click();
  await expect(page).toHaveURL(/videos\/#volume-reel-previews-title/);
  await expect(page.locator("video").first()).toBeVisible();
  await page.goto("/#follow-updates");
  await expect(page.locator("#follow-updates")).toBeVisible();
  await expect(
    page.locator("#follow-updates").getByRole("link", { name: "Follow on Substack" }),
  ).toHaveAttribute("href", "https://substack.com/@independentobserver");
});
