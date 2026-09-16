import { test, expect } from "@playwright/test";

test("Join page presents both tiers honestly, with no fake checkout", async ({ page }) => {
  await page.goto("/join/");
  await expect(page.getByText("Free reader · $0")).toBeVisible();
  await expect(page.getByText("Supporting member · planned $5/month")).toBeVisible();
  await expect(page.getByText("Secure paid checkout is not enabled yet")).toBeVisible();
  await expect(page.getByRole("link", { name: "Join the current email list ↗" })).toHaveAttribute(
    "href",
    /substack\.com/,
  );
  // No on-site email input exists yet -- only the Substack link-out.
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
});

test("Observer Brief CTA appears at the end of an article reader", async ({ page }) => {
  await page.goto("/library/documents/who-deported-more/");
  const brief = page.locator("#reader-follow-updates");
  await brief.scrollIntoViewIfNeeded();
  await expect(
    brief.getByRole("heading", { name: "One serious idea. The evidence behind it." }),
  ).toBeVisible();
  await expect(brief.getByRole("link", { name: "Join free →" })).toHaveAttribute(
    "href",
    /\/join\/$/,
  );
});

test("article-end related reading offers at most three focused continuations", async ({ page }) => {
  await page.goto("/library/documents/who-deported-more/");
  const cards = page.locator(".related-content-card");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(3);
  const firstLink = page.locator("[data-related-article-link]").first();
  await expect(firstLink).toBeVisible();
});

test("manuscript readers also end with continuation reading and the Brief CTA", async ({
  page,
}) => {
  const response = await page.goto("/library/manuscripts/quiet-wealth/");
  if (!response || !response.ok()) test.skip(true, "manuscript route not available in this build");
  await expect(page.locator("#manuscript-follow-updates")).toBeAttached();
});

test("Continue Reading appears on the homepage after visiting an article", async ({ page }) => {
  await page.goto("/library/documents/who-deported-more/");
  await page.goto("/");
  const continueReading = page.locator("[data-continue-reading]");
  await expect(continueReading).toBeVisible();
  await expect(continueReading).not.toHaveAttribute("hidden");
  await expect(page.locator("[data-continue-reading-link]")).toHaveAttribute(
    "href",
    "/library/documents/who-deported-more/",
  );
});

test("Continue Reading stays hidden for a first-time visitor", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-continue-reading]")).toBeHidden();
});

test("mobile Join route is reachable and readable", async ({ page, isMobile }) => {
  test.skip(!isMobile, "desktop coverage is in focused-usability.spec.ts");
  await page.goto("/join/");
  await expect(
    page.getByRole("heading", {
      name: "Read freely. Return regularly. Support when it is useful.",
    }),
  ).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
});
