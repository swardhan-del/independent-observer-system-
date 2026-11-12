import { test, expect } from "@playwright/test";
import { curatedResearchPreviews } from "../src/data/curated-research-previews";

test("new Volume II and IV directions have readable previews and return paths", async ({
  page,
}) => {
  for (const entry of curatedResearchPreviews) {
    const response = await page.goto(entry.href);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.title);
    await expect(page.locator(".preview-status")).toHaveText(entry.status);
    await expect(page.locator("main")).toContainText(entry.sourceNote!);
    await expect(
      page.getByRole("heading", { name: `How it connects to ${entry.volume}` }),
    ).toBeVisible();
    for (const link of entry.relatedLinks)
      await expect(page.locator(`main a[href$="${link.href}"]`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    await page.getByRole("link", { name: `Back to ${entry.volume} research` }).press("Enter");
    await expect(page.locator("#recent-research-directions")).toBeVisible();
    await expect(
      page.locator(`[data-curated-research-card] a[href$="${entry.href}"]`),
    ).toBeVisible();
  }
});

test("the map finds the new family and opens it with the keyboard", async ({ page }) => {
  await page.goto("/library/taxonomy/");
  await page
    .getByRole("searchbox", { name: "Find a paper or subject" })
    .fill("political independence");
  await expect(page.locator("[data-entry]:visible")).toHaveCount(1);
  const link = page
    .locator("[data-entry]:visible")
    .getByRole("link", { name: "Open the research preview" });
  await link.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The Cost of Political Independence",
  );
});

test("curated volume links remain usable without JavaScript", async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/series/the-last-human-workforce/#recent-research-directions`);
  await page
    .locator("[data-curated-research-card]")
    .getByRole("link", { name: "AI and the First Rung of Economic Opportunity" })
    .press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AI and the First Rung of Economic Opportunity",
  );
  await expect(page.locator("main")).toContainText("research brief and proposed episode");
  await context.close();
});
