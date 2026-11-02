import { test, expect } from "@playwright/test";

test("search disclosure keeps mobile results visible and keyboard filters usable", async ({
  page,
  isMobile,
}, testInfo) => {
  if (isMobile) await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("[data-search-open]").click();
  const panel = page.locator("[data-search-filters]");
  const summary = panel.locator("summary");
  const input = page.locator("[data-search-input]");
  await expect(panel).toHaveJSProperty("open", !isMobile);
  await input.fill("Who Deported More");
  await expect(page.locator("[data-search-result]").first()).toBeInViewport({ ratio: 0.5 });
  await page.screenshot({ path: testInfo.outputPath("search-results.png") });

  if (!isMobile) await summary.click();
  await summary.focus();
  await page.keyboard.press("Tab");
  await expect(page.locator("[data-search-result]").first()).toBeFocused();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(panel).toHaveJSProperty("open", true);
  await page.keyboard.press("Tab");
  await expect(page.locator('[data-search-filter="type"]')).toBeFocused();
  await page.locator('[data-search-filter="type"]').selectOption("Topic");
  await expect(summary).toContainText("1 active");
  await summary.click();
  await expect(panel).toHaveJSProperty("open", false);
  await expect(summary).toContainText("1 active");
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(summary).not.toContainText("active");
  await expect(input).toBeFocused();
  await expect(page.locator("[data-search-result]").first()).toBeVisible();

  const browse = page.locator("#site-search-dialog .form-note a");
  await browse.focus();
  await page.keyboard.press("Tab");
  await expect(page.locator("[data-search-close]")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(browse).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-search-open]")).toBeFocused();
});

test("restored filters remain discoverable after reload", async ({ page }) => {
  await page.goto("/?search-q=Who%20Deported%20More&search-status=Working-paper%20summary");
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-search-filters]")).toHaveJSProperty("open", true);
  await expect(page.locator("[data-search-filter-count]")).toHaveText("· 1 active");
  await expect(page.locator("[data-search-result]").first()).toContainText("Who Deported More");
  await page.reload();
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-search-filters]")).toHaveJSProperty("open", true);
  await expect(page.locator('[data-search-filter="status"]')).toHaveValue("Working-paper summary");
  await expect(page.locator("[data-search-filter-count]")).toHaveText("· 1 active");
});
