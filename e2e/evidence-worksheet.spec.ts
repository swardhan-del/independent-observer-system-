import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("reader can export their own evidence without submitting or persisting notes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/start/#evidence-worksheet");
  await page.getByRole("button", { name: "Download notes (.txt)" }).click();
  await expect(page.locator("[data-worksheet-status]")).toContainText("Add a claim");
  const marker = "Personal claim <script>not executable</script>";
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url() + (request.postData() ?? "")));
  await page.getByLabel("The claim", { exact: true }).fill(marker);
  await page.getByLabel("Observed", { exact: true }).fill("A record dated 2026-09-06.");
  await page.getByLabel("Still unknown", { exact: true }).fill("Alternative explanations.");
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download notes (.txt)" }).click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toBe("independent-observer-evidence-notes.txt");
  const notes = await readFile((await download.path())!, "utf8");
  expect(notes).toContain(marker);
  expect(notes).toContain("Alternative explanations.");
  expect(notes).toContain("Source trail\nNot recorded");
  expect(requests.join("\n")).not.toContain("Personal claim");
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage })),
  ).not.toContain("Personal claim");
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await expect(page.locator(".worksheet-print-note").first()).toHaveText(marker);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("worksheet remains writable when JavaScript is disabled", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/start/#evidence-worksheet");
  await page.getByLabel("The claim", { exact: true }).fill("Offline reasoning");
  await expect(page.getByLabel("The claim", { exact: true })).toHaveValue("Offline reasoning");
  await expect(page.locator("[data-worksheet-actions]")).toBeHidden();
  await context.close();
});
