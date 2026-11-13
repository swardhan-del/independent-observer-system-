import { test, expect } from "@playwright/test";
import { recentResearch } from "../src/data/recent-research";
import { seriesItems } from "../src/data/series";
import { slugify } from "../src/lib/slugs";

test("Latest exposes dated additions and complete reading copies", async ({ page }) => {
  await page.goto("/latest/");
  await expect(page.locator("[data-recent-research]")).toHaveCount(recentResearch.length);
  await page
    .locator('[data-recent-research="the-cost-of-political-independence"] a')
    .press("Enter");
  await expect(page.locator("#reading-copy")).toBeVisible();
  await expect(page).toHaveURL(/#reading-copy$/);
  await expect(page.locator("#reading-copy-title")).toBeInViewport();
  await page.getByRole("link", { name: "Sources and review scope", exact: true }).press("Enter");
  await expect(page.locator("#reading-sources")).toBeInViewport();
  await expect(page.locator("#reading-sources li")).toHaveCount(4);
});

test("each volume offers working jump links and a volume switcher", async ({ page }) => {
  for (const item of seriesItems) {
    await page.goto(`/series/${slugify(item.title)}/`);
    const nav = page.getByRole("navigation", { name: `${item.volume} page sections` });
    await nav.getByRole("link", { name: "Browse the research", exact: true }).press("Enter");
    const hash = new URL(page.url()).hash;
    await expect(page.locator(hash)).toBeInViewport();
    await expect(
      page
        .getByRole("navigation", { name: "Choose a research volume" })
        .locator('a[aria-current="page"]'),
    ).toHaveText(item.volume);
  }
});

test("320px reading, navigation and search remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/latest/");
  await page.locator('[data-recent-research="ai-and-the-first-rung"] a').press("Enter");
  await expect(page.locator("#reading-copy")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("relational practical electoral");
  const result = page.locator('[data-search-result][href$="/the-cost-of-political-independence/"]');
  await expect(result).toBeVisible();
  await result.press("Enter");
  await expect(page.locator("h1")).toHaveText("The Cost of Political Independence");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
});

test("atlas uses the wider reading area and preserves keyboard deep links", async ({
  page,
}, testInfo) => {
  await page.goto("/about/#about-volume-panel-volume-ii");
  const panel = page.locator("#about-volume-panel-volume-ii");
  await expect(panel).toBeVisible();
  expect(
    await panel
      .locator(".about-volume-panel-grid")
      .evaluate((e) => getComputedStyle(e).gridTemplateColumns.split(" ").length),
  ).toBe(1);
  if (testInfo.project.name === "desktop")
    expect((await panel.boundingBox())!.width).toBeGreaterThan(600);
  await page.locator("#about-volume-tab-volume-ii").press("End");
  await expect(page.locator("#about-volume-tab-volume-iv")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.reload();
  await expect(page.locator("#about-volume-panel-volume-iv")).toBeVisible();
  await expect(page.locator(".about-atlas-details")).toHaveJSProperty("open", true);
  await expect(page.locator(".mission-volume-role").first()).toHaveCSS("color", "rgb(63, 77, 92)");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
});

test("recent additions and reading copies work without JavaScript", async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/latest/`);
  await page.locator("#recent-research summary").click();
  await expect(page.locator("[data-recent-research]:visible")).toHaveCount(recentResearch.length);
  await page.locator('[data-recent-research="ai-and-the-first-rung"] a').press("Enter");
  await expect(page.locator("#reading-copy")).toBeVisible();
  await page.getByRole("link", { name: "Back to Volume IV research" }).press("Enter");
  await expect(page.locator("#recent-research-directions")).toBeInViewport();
  await context.close();
});
