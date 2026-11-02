import { test, expect } from "@playwright/test";

test("home shows current releases, one catalogue count and a first-screen reading action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("[data-recent-article]")).toHaveCount(3);
  await expect(page.locator("[data-recent-article] time")).toHaveCount(3);
  await expect(page.locator("[data-recent-article]").first()).toContainText("Released article");
  await expect(
    page.getByRole("link", { name: /Explore all 29 author paper pages/ }),
  ).toBeAttached();
  const action = page.getByRole("link", { name: "Start reading · 4 min →", exact: true });
  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThan(844);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("reading filters combine with paper search and survive reload and history", async ({
  page,
}) => {
  await page.goto("/library/");
  await expect(page.locator("[data-released-card]:visible")).toHaveCount(5);
  const before = await page.evaluate(
    () =>
      document
        .querySelector("[data-released-reading]")!
        .compareDocumentPosition(document.querySelector("[data-library-paper-shelf]")!) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  );
  expect(before).toBeTruthy();
  await page.getByRole("button", { name: "Under 5 minutes", exact: true }).click();
  const times = await page
    .locator("[data-reading-minutes]:visible")
    .evaluateAll((nodes) => nodes.map((n) => Number(n.getAttribute("data-reading-minutes"))));
  expect(times.length).toBeGreaterThan(0);
  expect(times.every((n) => n < 5)).toBe(true);
  await page.getByRole("searchbox", { name: "Search papers", exact: true }).fill("deported");
  await expect(page.locator("[data-library-paper-card]:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Longer reads", exact: true }).click();
  await expect(page.locator("[data-library-paper-empty]")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Longer reads", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("searchbox", { name: "Search papers", exact: true })).toHaveValue(
    "deported",
  );
  await page.getByRole("button", { name: "Listen", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-listening-card]:visible")).toHaveCount(4);
  await expect(page.locator("[data-released-reading]")).toBeHidden();
  await expect(page.locator(".library-research-shelf")).toBeHidden();
  await page.goBack();
  await expect(page.getByRole("button", { name: "Longer reads", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "All reads", exact: true }).click();
  await expect(page.locator("[data-library-paper-card]:visible")).toHaveCount(1);
});

test("all reading remains available without JavaScript and previews stay separate", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/library/`);
  await expect(page.locator("[data-reading-controls]")).toBeHidden();
  await expect(page.locator("[data-released-card]:visible")).toHaveCount(5);
  await expect(page.locator("[data-library-paper-card]:visible")).toHaveCount(29);
  await expect(page.locator("[data-released-reading]")).not.toContainText("Regrowing Humanity");
  await expect(page.locator(".library-background")).toContainText("Preview-only article");
  await page.locator("[data-listening-shelf] summary").click();
  await expect(page.locator("[data-listening-card]:visible")).toHaveCount(4);
  await context.close();
});

test("join foregrounds free signup and labels the sample honestly", async ({ page }) => {
  await page.goto("/join/");
  await expect(
    page.getByRole("link", { name: "Subscribe free on Substack ↗", exact: true }),
  ).toHaveAttribute("href", "https://independentobserver.substack.com/subscribe?simple=true");
  await expect(page.getByText("An illustrative reading selection", { exact: false })).toBeVisible();
  await expect(page.locator(".join-supporting")).not.toHaveAttribute("open");
  await expect(page.locator(".sample-brief-list li")).toHaveCount(3);
});
