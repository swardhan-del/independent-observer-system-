import { test, expect } from "@playwright/test";
test("taxonomy supports volume filters search reset and stable paper links", async ({ page }) => {
  await page.goto("/library/taxonomy/");
  const entries = page.locator("[data-entry]");
  const total = await entries.count();
  expect(total).toBeGreaterThan(40);
  await expect(page.locator("main")).toHaveCount(1);
  await page.getByLabel("Volume", { exact: true }).selectOption("Volume IV");
  await expect(page.locator("[data-entry]:visible").first()).toHaveAttribute(
    "data-volume",
    "Volume IV",
  );
  expect(await page.locator('[data-entry][data-volume="Volume I"]:visible').count()).toBe(0);
  await page.getByLabel("Find a paper or subject").fill("zzznomatchingresearchzzz");
  await expect(page.locator("[data-empty]")).toBeVisible();
  await expect(page.locator("#taxonomy-count")).toContainText("0 of");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator("[data-entry]:visible")).toHaveCount(total);
  await page.getByLabel("Find a paper or subject").fill("quantum");
  expect(await page.locator("[data-entry]:visible").count()).toBeGreaterThan(0);
  const first = page.locator("[data-entry]:visible").first();
  const id = await first.getAttribute("id");
  await first.locator("h4 a").click();
  await expect(page).toHaveURL(new RegExp("#" + id + "$"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test("all taxonomy entries remain readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    (process.env.PLAYWRIGHT_PORT
      ? "http://127.0.0.1:" + process.env.PLAYWRIGHT_PORT
      : "http://127.0.0.1:4337") + "/library/taxonomy/",
  );
  expect(await page.locator("[data-entry]:visible").count()).toBeGreaterThan(40);
  await expect(page.getByRole("heading", { name: "Volume IV", exact: true })).toBeVisible();
  await context.close();
});
