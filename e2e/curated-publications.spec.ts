import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

const previews = [
  "/research/from-plato-to-chomsky-civic-capacity/",
  "/research/formation-through-struggle/",
  "/research/civil-rights-realignment-party-sorting/",
  "/research/welfare-queen-tax-cut-policy-visibility/",
  "/research/party-switch-realignment-polarization/",
];

test("first five curated adaptations stay noindex and expose evidence roles", async ({ page }) => {
  for (const route of previews) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator(".article-status")).toContainText("formal release pending");
    await expect(page.getByRole("heading", { name: "Evidence explorer" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Cite this Independent Observer version" }),
    ).toBeVisible();
    expect(await page.locator("[data-evidence-item]").count()).toBeGreaterThanOrEqual(4);
  }
});

test("evidence explorer filters claims without hiding the source boundary", async ({ page }) => {
  await page.goto(previews[0]);
  await page.getByRole("button", { name: "Limitation" }).click();
  await expect(page.locator("[data-evidence-item]:visible")).toHaveCount(1);
  await expect(page.locator("[data-evidence-status]")).toContainText("Showing 1 evidence note");
  await expect(page.getByRole("heading", { name: "Sources and notes" })).toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator("[data-evidence-item]:visible")).toHaveCount(5);
});

test("research citation tools export the first-party canonical record", async ({ page }) => {
  await page.goto(previews[0]);
  await expect(page.getByText(/IndependentObserver\.org is the canonical record/)).toBeVisible();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download BibTeX" }).click();
  const download = await downloadEvent;
  const contents = await readFile((await download.path())!, "utf8");
  expect(contents).toContain(
    "https://independentobserver.org/research/from-plato-to-chomsky-civic-capacity/",
  );
  expect(contents).toContain("formal release pending");
  expect(contents).not.toContain("ResearchGate");
});

test("research catalogue treats external platforms as archival mirrors", async ({ page }) => {
  await page.goto("/research/");
  await expect(
    page.getByText(/Canonical record: this Independent Observer page/).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Archived external mirror ↗" }).first(),
  ).toBeVisible();
});

test("publication ledger distinguishes source-audited previews from releases", async ({ page }) => {
  await page.goto("/publication-ledger/");
  await expect(page.getByRole("heading", { name: "Publication and review ledger" })).toBeVisible();
  await expect(page.getByText("Source-audited preview", { exact: true })).toHaveCount(5);
  await expect(page.getByText("Formal releases").locator("..")).toContainText("0");
});
