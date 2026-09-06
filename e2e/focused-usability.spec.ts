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
  await page.locator('[data-search-filter="status"]').selectOption("");
  expect(new URL(page.url()).searchParams.has("status")).toBe(false);
  await page.reload();
  await page.locator("[data-search-open]").click();
  await expect(page.locator('[data-search-filter="status"]')).toHaveValue("");
});

test("desktop More links are clickable outside the masthead", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mobile uses the expanded menu");
  await page.goto("/");
  await page.locator(".more-navigation > summary").click();
  const contact = page.locator(".more-navigation-links").getByRole("link", { name: "Contact" });
  await contact.click();
  await expect(page).toHaveURL(/\/contact\/$/);
});

test("global search preserves the catalogue's filters across reload", async ({ page }) => {
  await page.goto("/series/?status=concept%20preview");
  const activeFilter = page.locator('button[data-catalogue-status="concept preview"]');
  await expect(activeFilter).toHaveAttribute("aria-pressed", "true");
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("Who Deported More");
  await page.locator('[data-search-filter="status"]').selectOption("Working-paper summary");
  await expect(page.locator("[data-search-result]").first()).toBeVisible();
  expect(new URL(page.url()).searchParams.get("status")).toBe("concept preview");
  expect(new URL(page.url()).searchParams.get("search-status")).toBe("Working-paper summary");
  await page.reload();
  await expect(activeFilter).toHaveAttribute("aria-pressed", "true");
});

test("sound can be paused after resizing to mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/");
  const sound = page.locator("[data-ambient-sound-toggle]");
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 393, height: 852 });
  await expect(sound).toBeVisible();
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "false");
});

test("article version details open for printing and restore afterwards", async ({ page }) => {
  await page.goto("/research/borrowed-labor/");
  const details = page.locator(".article-version");
  await expect(details).not.toHaveAttribute("open");
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await expect(details).toHaveAttribute("open");
  await expect(details).toContainText("Factual cutoff");
  await expect(details).toContainText("not in the production release feed");
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(details).not.toHaveAttribute("open");
});
