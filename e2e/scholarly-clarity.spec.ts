import { test, expect } from "@playwright/test";
test("model explanation is readable and traceable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 393, height: 852 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4337/library/documents/who-deported-more/");
  await expect(
    page
      .getByText("Public explanation accompanying an author working paper", { exact: false })
      .first(),
  ).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await page
    .getByText("What is available: page, manuscript, data and code", { exact: true })
    .click();
  await expect(page.getByText(/No CSV or codebook/)).toBeVisible();
  await page.locator('a[href="#ice-reporting"]').first().click();
  await expect(page.locator("#ice-reporting")).toBeInViewport();
  await expect(page.locator("#ice-reporting a")).toHaveAttribute(
    "href",
    /iceAnnualReportFY2024.pdf#page=31/,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await context.close();
});
test("disclosures support keyboard access and the exact scholarly title remains visible", async ({
  page,
}) => {
  await page.goto("/library/documents/entanglement-primer/");
  const availability = page.getByText("What is available: page, manuscript, data and code", {
    exact: true,
  });
  await availability.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("No accompanying dataset or codebook is provided on this page."),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Quantum Entanglement: A Practical Primer",
  );
  await expect(page.locator(".reader-citation-box [data-reader-citation]")).toContainText(
    "Entanglement, No-Signalling, and the Real Path to Quantum Advantage",
  );
  await expect(page.getByText(/Continue from the primer to the companion synopsis/)).toBeVisible();
});

test("paper section links clear the masthead and table labels have readable width", async ({
  page,
}) => {
  await page.goto("/library/documents/who-deported-more/");
  await page
    .getByRole("link", { name: "02 Three terms that need separate columns", exact: true })
    .click();
  await expect
    .poll(() => page.locator("#definitions").evaluate((el) => el.getBoundingClientRect().top))
    .toBeGreaterThan(110);
  const widths = await page
    .locator("table th")
    .first()
    .evaluate((el) => ({
      cell: el.getBoundingClientRect().width,
      font: parseFloat(getComputedStyle(el).fontSize),
    }));
  expect(widths.cell).toBeGreaterThan(widths.font * 4.5);
});
