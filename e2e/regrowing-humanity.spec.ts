import { test, expect } from "@playwright/test";

for (const javaScriptEnabled of [true, false]) {
  test.describe(javaScriptEnabled ? "with JavaScript" : "without JavaScript", () => {
    test.use({ javaScriptEnabled });

    test("the held preview supports keyboard source reading and preserves print disclosures", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/research/regrowing-humanity/");
      await expect(page.locator(".article-status")).toHaveText(
        "Concept preview · publication pending",
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex,follow",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://independentobserver.org/research/regrowing-humanity/",
      );

      const contents = page.getByRole("navigation", { name: "On this page" });
      const evidence = contents.getByRole("link", { name: "What the human studies demonstrate" });
      await evidence.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#evidence-setting$/);
      await expect(page.locator("#evidence-setting")).toBeInViewport();
      await expect(page.locator("#paragraph-5")).toContainText("one participant with tetraplegia");

      const citation = page.getByRole("link", { name: "Source 1 for paragraph 5", exact: true });
      await citation.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#source-1$/);
      await expect(page.locator("#source-1")).toBeInViewport();
      await expect(page.locator("#source-1 > a").first()).toHaveAttribute(
        "href",
        "https://doi.org/10.1016/S0140-6736(12)61816-9",
      );
      await page.getByRole("link", { name: "Back to paragraph 5 ↑", exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#paragraph-5$/);
      await expect(page.locator("#paragraph-5")).toBeInViewport();

      await page.emulateMedia({ media: "print" });
      await expect(page.locator("#article-limitations + p")).toBeVisible();
      await expect(page.locator("#article-limitations + p")).toContainText(
        "small cohorts or specialized programs",
      );
      await expect(page.locator("#article-disclosures + p")).toBeVisible();
      await expect(page.locator("#article-disclosures + p")).toContainText("source edition");
      await expect(page.locator("#article-disclosures + p")).toContainText("AI assistance");
      await page.emulateMedia({ media: "screen" });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  });
}
