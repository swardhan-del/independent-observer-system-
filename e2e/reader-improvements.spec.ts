import { test, expect } from "@playwright/test";
import { releasedGreenPublications } from "../src/data/green-publications";
import { researchReleaseQueue } from "../src/data/publication-registry";

test("subject choices reach released articles without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  for (const path of ["/", "/start/"]) {
    await page.goto(`${baseURL}${path}`);
    const choices = page.getByRole("navigation", { name: "Choose an investigation" });
    await expect(choices.locator("li")).toHaveCount(3);
    const links = await choices
      .locator('a[href*="/research/"]')
      .evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
    expect(new Set(links).size).toBe(3);
    for (const url of links) {
      await page.goto(url);
      await expect(page.locator(".article-status")).toHaveText("Published article");
      await expect(page.locator(".article-question")).toContainText("The question:");
      await page.getByRole("link", { name: "Limitations", exact: true }).click();
      await expect(page.locator("#article-limitations")).toBeInViewport();
    }
  }
  await context.close();
});

for (const article of releasedGreenPublications) {
  test(`${article.slug} has a topic route, search result and inspectable evidence`, async ({
    page,
  }) => {
    const route = `/research/${article.slug}/`;
    const record = researchReleaseQueue.find((item) => item.canonicalRoute === route)!;
    const topic = record.topics.find((topic) =>
      ["History", "Politics", "Economics", "Law", "Science", "Technology"].includes(topic),
    )!;
    await page.goto(`/topics/${topic.toLowerCase()}/`);
    const releasedShelf = page.getByRole("region", { name: `${topic}: released articles` });
    await expect(releasedShelf.locator(`a[href="${route}"]`).first()).toBeVisible();
    await expect(releasedShelf).not.toContainText("Preview-only article");
    await page.locator("[data-search-open]").click();
    await page.locator("[data-search-input]").fill(article.title);
    const result = page.locator(`[data-search-result][href="${route}"]`);
    await expect(result).toBeVisible();
    await result.click();
    await expect(page.locator(".article-byline")).toContainText(article.author);
    await expect(page.locator(".article-dates")).toContainText(article.publicationDate);
    await page.getByRole("link", { name: "Sources and notes", exact: true }).click();
    await expect(page.locator("#article-sources")).toBeInViewport();
    await expect(page.locator('li[id^="source-"]')).toHaveCount(article.sourceNotes.length);
    await expect(page.locator("#article-limitations + p")).not.toBeEmpty();
    await expect(page.locator(".article-related a").first()).toBeVisible();
    await expect(page.locator("#article-follow-updates")).toContainText("corrections and updates");
  });
}

test("released reading saves and resumes through the existing local tools", async ({ page }) => {
  await page.goto("/research/the-last-human-workforce/");
  await page.locator(".research-article [data-reading-toggle]").click();
  await expect(page.locator(".research-article [data-reading-toggle]")).toHaveText("Saved");
  await page.goto("/");
  await expect(page.locator("[data-continue-reading-link]")).toHaveAttribute(
    "href",
    "/research/the-last-human-workforce/",
  );
  await page.getByRole("link", { name: "Find your saved reading →" }).click();
  await page.locator("#saved-reading-list").click();
  await expect(page.locator("[data-reading-items] a")).toHaveAttribute(
    "href",
    "/research/the-last-human-workforce/",
  );
  await page.locator("[data-reading-close]").click();
  await page.reload();
  await expect(page.locator("[data-reading-count]")).toHaveText("1");
});

test("subject choices and evidence remain readable at 320px and enlarged text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of [
    "/",
    "/start/",
    "/topics/economics/",
    "/research/the-last-human-workforce/",
  ]) {
    await page.goto(path);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  }
});
