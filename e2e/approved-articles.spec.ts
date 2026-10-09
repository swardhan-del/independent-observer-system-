import { test, expect } from "@playwright/test";

test("a new reader can follow the AI collection and inspect a claim's source", async ({ page }) => {
  await page.goto("/start/");
  await page
    .getByRole("link", { name: "Explore AI, work and infrastructure →", exact: true })
    .click();
  await expect(page).toHaveURL(/\/collections\/ai-work-and-infrastructure\/$/);
  await page.getByRole("link", { name: "Read article →", exact: true }).first().click();
  await expect(page).toHaveURL(/\/research\/the-server-as-a-furnace\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Server as a Furnace");
  await expect(page.locator(".article-status")).toHaveText("Published article");
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeVisible();
  await page.getByRole("link", { name: "Source 1 for paragraph 2", exact: true }).click();
  await expect(page).toHaveURL(/#source-1$/);
  await expect(page.locator("#source-1")).toBeInViewport();
  await page.getByRole("link", { name: "Back to paragraph 2 ↑", exact: true }).click();
  await expect(page).toHaveURL(/#paragraph-2$/);
  await expect(page.locator("#paragraph-2")).toBeInViewport();
  await page
    .locator(".article-related")
    .getByRole("link", { name: /The Last Human Workforce/ })
    .click();
  await expect(page.locator("#workplace-evidence + p")).toContainText("5,172");
  await expect(page.locator("#workplace-evidence + p")).toContainText("15%");
  await expect(page.locator("#revision-history")).toBeAttached();
  await expect(
    page.locator("#article-follow-updates").getByRole("link", { name: "Join free →", exact: true }),
  ).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("published article metadata and citation destinations describe the final edition", async ({
  page,
}) => {
  await page.goto("/research/the-last-human-workforce/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://independentobserver.org/research/the-last-human-workforce/",
  );
  await expect(page.locator(".article-dates")).toContainText("2026-10-09");
  await expect(page.locator("#source-2 > a").first()).toHaveAttribute(
    "href",
    "https://doi.org/10.1093/qje/qjae044",
  );
  await expect(page.locator("#article-disclosures + p")).toContainText("AI assistance");
  const article = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((record) => record["@type"] === "Article"),
    );
  expect(article.datePublished).toBe("2026-10-09");
  expect(article.articleSection).toBe("Analysis");
});
