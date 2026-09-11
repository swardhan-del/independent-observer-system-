import { test, expect } from "@playwright/test";
test("research map opens the full method paper with complete section navigation", async ({
  page,
}) => {
  await page.goto("/library/taxonomy/");
  const entry = page.locator("#paper-manifesto-of-a-destiny-the-independent-observer-method");
  await entry.getByRole("link", { name: "Read the full working paper" }).click();
  await expect(page).toHaveURL(/\/library\/manuscripts\/manifesto-of-a-destiny\//);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Manifesto of a Destiny: The Independent Observer Method",
  );
  expect((await page.locator(".manuscript-text").innerText()).length).toBeGreaterThan(20000);
  const contents = page.getByRole("navigation", { name: "Manuscript contents" });
  await contents.getByRole("link", { name: "References", exact: true }).click();
  await expect(page.getByRole("heading", { name: "References", exact: true })).toBeInViewport();
  await expect(page.locator(".manuscript-text")).toContainText("Suggested citation");
  await expect(page.locator(".manuscript-text")).toContainText(
    "Supplement A: Institutional Trust as Infrastructure",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("research map opens the Reputation Debt and Quiet Wealth reading editions", async ({
  page,
}) => {
  await page.goto("/library/taxonomy/");

  const reputationDebt = page.locator("#paper-reputation-debt");
  await reputationDebt.getByRole("link", { name: "Read the full working paper" }).click();
  await expect(page).toHaveURL(/\/library\/manuscripts\/reputation-debt\//);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Reputation Debt");
  await expect(page.locator(".manuscript-text")).toContainText("Closed-Door Penalty");
  await expect(page.locator(".manuscript-text")).not.toContainText("Distribution score");
  await expect(page.locator(".manuscript-text")).not.toContainText("I can also reprint");

  await page.goto("/library/taxonomy/");
  const quietWealth = page.locator("#paper-quiet-wealth-as-risk-management");
  await quietWealth.getByRole("link", { name: "Read the full working paper" }).click();
  await expect(page).toHaveURL(/\/library\/manuscripts\/quiet-wealth\//);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Quiet Wealth as Risk Management",
  );
  await expect(page.locator(".manuscript-text")).toContainText("Operating Code");
  await expect(page.locator(".manuscript-text")).not.toContainText("insert here");
  await expect(page.locator(".manuscript-text")).not.toContainText("Appendix A");
});
