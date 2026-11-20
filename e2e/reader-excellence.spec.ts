import { test, expect } from "@playwright/test";

test("published article offers accessible copy tools and canonical citation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as Window & { copiedText?: string }).copiedText = value;
        },
      },
    });
  });
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/research/the-last-human-workforce/");
  const record = page.locator(".publication-record");
  await record.getByRole("button", { name: "Copy citation" }).click();
  await expect(record.locator("[data-publication-feedback]")).toHaveText("Citation copied.");
  const citation = await page.evaluate(() => (window as Window & { copiedText?: string }).copiedText);
  expect(citation).toContain("Independent Observer");
  expect(citation).toContain("https://independentobserver.org/research/the-last-human-workforce/");
  await record.getByRole("button", { name: "Copy article link" }).click();
  await expect(record.locator("[data-publication-feedback]")).toHaveText("Article link copied.");
  expect(await page.evaluate(() => (window as Window & { copiedText?: string }).copiedText)).toBe(
    "https://independentobserver.org/research/the-last-human-workforce/",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test("copy failure does not claim success", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("permission denied"); } },
    });
  });
  await page.goto("/research/the-last-human-workforce/");
  const record = page.locator(".publication-record");
  await record.getByRole("button", { name: "Copy citation" }).click();
  await expect(record.locator("[data-publication-feedback]")).toContainText("Copy unavailable");
});

test("without JavaScript citation text remains accessible", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/research/the-last-human-workforce/`);
    const record = page.locator(".publication-record");
    await expect(record.getByRole("button", { name: "Copy citation" })).toBeHidden();
    await record.locator("summary").click();
    await expect(record).toContainText("Independent Observer");
    await expect(record).toContainText("https://independentobserver.org/research/the-last-human-workforce/");
  } finally {
    await context.close();
  }
});

test("first-read durations and honest newsletter FAQ work on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const choices = page.getByRole("navigation", { name: "Choose an investigation" });
  await expect(choices.locator(".entry-meta")).toHaveCount(3);
  await expect(choices.locator(".entry-meta").first()).toContainText("Released article");
  await page.goto("/join/");
  const faq = page.locator(".join-faq");
  await expect(faq.locator("details")).toHaveCount(4);
  await faq.getByText("Who receives my email address?").click();
  await expect(faq.getByText(/Substack, which handles the signup/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});
