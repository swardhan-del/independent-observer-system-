import { test, expect } from "@playwright/test";
import { volumeThreePreviews } from "../src/data/volume-three-previews";

test("Volume III previews work through search, keyboard and return links", async ({ page }) => {
  await page.goto("/series/managed-decline/#volume-three-research");
  await expect(page.locator("[data-volume-dossier-card]")).toHaveCount(30);
  const query = page.locator("[data-volume-dossier-query]");
  await query.fill("pockets portfolios");
  await expect(page.locator("[data-volume-dossier-card]:visible")).toHaveCount(1);
  await page.locator("[data-volume-dossier-card]:visible h3 a").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/library\/research\/from-pockets-to-portfolios\/$/);
  await expect(page.getByRole("heading", { name: "Evidence and limits" })).toBeVisible();
  await page.getByRole("link", { name: "Back to Volume III research" }).click();
  await expect(page.locator("#research-from-pockets-to-portfolios")).toBeVisible();
  await page.getByRole("button", { name: "Health systems", exact: true }).click();
  await expect(page.locator("[data-volume-dossier-card]:visible")).toHaveCount(4);
  await query.fill("no-such-paper-xyz");
  await expect(page.locator("[data-volume-dossier-empty]")).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(page.locator("[data-volume-dossier-card]:visible")).toHaveCount(4);
});

test("every preview and its related links are readable on desktop and mobile", async ({ page }) => {
  for (const entry of volumeThreePreviews) {
    const response = await page.goto(entry.href);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.title);
    await expect(page.locator(".preview-status")).toHaveText(entry.status);
    for (const id of entry.related)
      await expect(page.locator(`main a[href$="/library/research/${id}/"]`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  }
});

test("previews remain navigable without JavaScript", async ({ browser, baseURL, viewport }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/library/taxonomy/#paper-the-economics-of-color`);
  const link = page
    .locator("#paper-the-economics-of-color")
    .getByRole("link", { name: "Open the research preview" });
  // Exercise the native keyboard link with scripts disabled, including focus
  // and navigation, without relying on animation-frame click stability polling.
  await link.focus();
  await link.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Economics of Color");
  await expect(page.locator("main")).toContainText("The source manuscript remains under review");
  await context.close();
});
