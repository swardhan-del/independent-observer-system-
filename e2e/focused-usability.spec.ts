import { test, expect } from "@playwright/test";

test("homepage offers bounded choices and mobile header leaves room to read", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await expect(page.locator("[data-home-reading]")).toHaveCount(3);
  const dimensions = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    overflow: document.documentElement.scrollWidth > innerWidth,
    header: document.querySelector(".site-header")!.getBoundingClientRect().height,
    readingPosition: getComputedStyle(document.querySelector(".reading-list-tools")!).position,
  }));
  expect(dimensions.overflow).toBe(false);
  expect(dimensions.height).toBeLessThan(isMobile ? 7500 : 4500);
  if (isMobile) expect(dimensions.header).toBeLessThan(140);
  expect(dimensions.readingPosition).toBe("static");
  await page.locator("[data-reading-open]").click();
  await expect(page.locator("#reading-list-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  if (isMobile) {
    await page.locator(".mobile-nav summary").click();
    await page.locator(".mobile-nav").getByRole("link", { name: "Read", exact: true }).click();
  } else {
    await page.locator(".desktop-nav").getByRole("link", { name: "Read", exact: true }).click();
  }
  await expect(page).toHaveURL(/\/library\/$/);
});

test("readable search statuses filter the existing index and preserve old links", async ({
  page,
}) => {
  await page.goto("/?status=Author%20working%20paper");
  await page.locator("[data-search-open]").click();
  await expect(page.locator("#site-search-dialog")).toBeVisible();
  await expect(page.locator('[data-search-filter="status"]')).toHaveValue("Working-paper summary");
  await page.locator("[data-search-input]").fill("Who Deported More");
  await expect(page.locator("[data-search-result]").first()).toContainText("Who Deported More");
  await expect(page.locator("[data-search-result]").first()).toContainText("Working-paper summary");
});
