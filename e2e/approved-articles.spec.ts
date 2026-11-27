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
  await page.locator(".article-contents summary").click();
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
    page.locator("#article-follow-updates").getByRole("link", {
      name: "Subscribe free on Substack ↗",
      exact: true,
    }),
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
  await expect(page.locator("#article-disclosures + p")).toContainText(
    "The author declares no conflicts of interest.",
  );
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

test("a phone reader can reach the text, sources and citation without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/research/the-last-human-workforce/`);
  const body = page.locator("#article-text");
  const record = page.locator("#publication-record");
  const bodyBox = await body.boundingBox();
  const recordBox = await record.boundingBox();
  expect(bodyBox!.y).toBeLessThan(844 * 1.5);
  expect(bodyBox!.y).toBeLessThan(recordBox!.y);
  await page.getByRole("link", { name: "Read the article ↓", exact: true }).click();
  await expect(page).toHaveURL(/#article-text$/);
  await expect(page.locator("#paragraph-1")).toBeInViewport();
  await page.getByRole("link", { name: "Check the sources", exact: true }).click();
  await expect(page.locator("#article-sources")).toBeInViewport();
  await page.getByRole("link", { name: "Citation and publication record", exact: true }).click();
  await expect(record).toBeInViewport();
  const citationToggle = record.locator("summary");
  await citationToggle.focus();
  await page.keyboard.press("Enter");
  await expect(record.locator("details")).toHaveAttribute("open", "");
  await expect(record.locator("details p")).toContainText(
    "https://independentobserver.org/research/the-last-human-workforce/",
  );
  const signup = page.locator("#article-follow-updates");
  await expect(signup.getByRole("link")).toHaveCount(1);
  await expect(signup.getByRole("link")).toHaveAttribute(
    "href",
    "https://independentobserver.substack.com/subscribe?simple=true",
  );
  await page.goto(`${baseURL}/governance/#conflicts-of-interest`);
  await expect(page.locator("#conflicts-of-interest + p")).toContainText(
    "The author declares no conflicts of interest.",
  );
  await expect(page.getByRole("heading", { name: "Use of AI tools", exact: true })).toHaveCount(0);
  await context.close();
});
