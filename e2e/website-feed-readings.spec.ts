import { test, expect } from "@playwright/test";
import { websiteFeedReadingLinks } from "../src/data/website-feed-reading-2026-09-18";

for (const { id, taxonomyId } of websiteFeedReadingLinks) {
  test(`curated reading is reachable and readable: ${id}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/library/taxonomy/");
    await page.locator(`#${taxonomyId} a[href="/library/documents/${id}/"]`).click();
    await expect(page).toHaveURL(new RegExp(`/library/documents/${id}/$`));
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "Publication boundary", exact: true }),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText("Author working paper");
    await expect(page.locator('meta[name="citation_title"]')).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
