import { test, expect } from "@playwright/test";

test("library starts with manageable results and reveals all matching papers", async ({ page }) => {
  await page.goto("/library/");
  const cards = page.locator("[data-library-paper-card]:visible");
  await expect(cards).toHaveCount(6);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(height).toBeLessThan(10000);
  await page.getByRole("button", { name: "Show more papers" }).click();
  await expect(cards).toHaveCount(12);
  await page.getByRole("searchbox", { name: "Search papers", exact: true }).fill("deported");
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText("How to Compare Deportation Statistics");
  await page.reload();
  await expect(cards).toHaveCount(1);
  await page.getByRole("searchbox", { name: "Search papers", exact: true }).fill("zzzzzz");
  await expect(page.locator("[data-library-paper-empty]")).toBeVisible();
});

test("mobile readers reach substance before metadata and citation controls", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/library/documents/who-deported-more/");
  const positions = await page.evaluate(() => ({
    paragraph: document.querySelector(".reader-section p")!.getBoundingClientRect().top,
    actions: document.querySelector(".reader-actions")!.getBoundingClientRect().top,
    details: document.querySelector(".reader-sidebar")!.getBoundingClientRect().top,
  }));
  expect(positions.paragraph).toBeLessThan(positions.actions);
  expect(positions.paragraph).toBeLessThan(positions.details);
  expect(positions.paragraph).toBeLessThan(1200);
  await expect(page.getByRole("link", { name: "Follow on Substack" })).toBeVisible();
});

test("library links remain accessible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4337/library/");
  expect(await page.locator("[data-library-paper-card]:visible").count()).toBeGreaterThan(6);
  await context.close();
});
