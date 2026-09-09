import { test, expect } from "@playwright/test";
for (const width of [360, 390, 768, 1024])
  test(`public utilities and orientation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    const requests: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("request", (request) => requests.push(request.url()));
    await page.goto("/about/");
    await expect(page.locator("dialog")).toHaveCount(0);
    expect(requests.some((url) => /utilities|search-index/.test(url))).toBe(false);
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    await page.locator("[data-search-open]").click();
    const input = page.locator("[data-search-input]");
    await expect(input).toBeFocused();
    await input.fill("deportation");
    await expect(page.locator("[data-search-status]")).toContainText("result");
    await expect(page.locator("[data-search-status]")).toHaveAttribute("aria-live", "polite");
    await input.press("ArrowDown");
    await expect(page.locator("[data-search-result]").first()).toBeFocused();
    expect(page.url()).not.toContain("deportation");
    expect(requests.some((url) => url.includes("deportation"))).toBe(false);
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-search-open]")).toBeFocused();
    await expect(page.locator("#site-search-dialog")).not.toBeVisible();
    await page.locator("[data-reading-open]").click();
    await expect(page.locator("#reading-list-dialog")).toBeVisible();
    await page.locator("[data-reading-save-all]").click();
    await expect(page.locator("[data-reading-items] > li")).toHaveCount(9);
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-reading-open]")).toBeFocused();
    for (const path of ["/library/", "/contact/", "/series/"]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true);
      await expect(page.locator("h1")).toHaveCount(1);
    }
    await page.goto("/contact/");
    await expect(page.locator("[data-copy-address]")).toBeVisible();
    expect(errors).toEqual([]);
  });
test("lazy drawer download failure is announced and retry works", async ({ page }) => {
  await page.goto("/library/");
  await page.route("**/utilities/search/", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-site-search] [data-drawer-error]")).toBeVisible();
  await page.unroute("**/utilities/search/");
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-search-input]")).toBeFocused();
});
