import { test, expect } from "@playwright/test";

test("the reshoring analysis is reachable through the collection and its sources", async ({
  page,
}) => {
  await page.goto("/collections/ai-work-and-infrastructure/");
  await expect(page.locator(".collection-reading > li")).toHaveCount(3);
  await page.getByRole("link", { name: "Factories Return but Do the Jobs", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Factories Return but Do the Jobs",
  );
  await expect(page.locator(".article-status")).toHaveText("Published article");
  await page.getByRole("link", { name: "Source 1 for paragraph 5", exact: true }).click();
  await expect(page.locator("#source-1")).toBeInViewport();
  await expect(page.locator("#source-1 > a").first()).toHaveAttribute(
    "href",
    "https://www.nber.org/papers/w27538",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
