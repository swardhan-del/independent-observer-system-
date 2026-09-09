import { test, expect } from "@playwright/test";
test("reading exercises, energy validation, notes and downloads", async ({ page }) => {
  await page.goto("/reading-tools/");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText("Put an argument to work.");
  await expect(main.locator(".tool-card")).toHaveCount(6);
  const workload = main.getByRole("spinbutton", { name: "Number of workloads" });
  await workload.fill("2000");
  await main.getByRole("button", { name: "Calculate hypothetical energy" }).click();
  await expect(main.locator("#energy-result")).toContainText("21,024");
  await workload.fill("0");
  await expect(main.locator("#energy-result")).not.toContainText("21,024");
  await main.getByRole("button", { name: "Calculate hypothetical energy" }).click();
  expect(await workload.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
  await workload.fill("1000");
  await main.locator("textarea").first().fill("My evidence note <script>sample</script>");
  const downloadEvent = page.waitForEvent("download");
  await main.getByRole("button", { name: "Download my notes" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("independent-observer-reading-notes.txt");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const text = Buffer.concat(chunks).toString("utf8");
  expect(text).toContain("My evidence note <script>sample</script>");
  expect(text).toContain("10,512");
  await main.getByRole("button", { name: "Clear notes and reset assumptions" }).click();
  await expect(main.locator("textarea").first()).toHaveValue("");
  await expect(workload).toHaveValue("1000");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  ).toBe(true);
});
test("existing readers retain their manuscript identity and gain worked examples", async ({
  page,
}) => {
  await page.goto("/library/documents/entanglement-primer/#worked-example");
  const main = page.locator("main");
  await expect(
    main.getByRole("heading", { name: "Can Alice send a message by flipping her qubit?" }),
  ).toBeVisible();
  await expect(main.locator("#worked-example")).toContainText("1/2");
  await expect(main).toContainText("Author working paper");
  await page.goto("/library/documents/wardhan-tax-doctrine/#balance-sheet-example");
  await expect(
    main.getByRole("heading", { name: "Worked example: cash is not the same as net wealth" }),
  ).toBeVisible();
  await expect(main.locator("#balance-sheet-example")).toContainText("80");
});
test("explanations remain readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/reading-tools/`);
  await expect(page.locator("main .tool-card")).toHaveCount(6);
  await expect(page.locator("main")).toContainText("Print this page to keep notes");
  await context.close();
});
