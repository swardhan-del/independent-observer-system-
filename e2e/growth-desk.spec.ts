import { test, expect } from "@playwright/test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GrowthStore } from "../scripts/growth/store";
import { articles, canonical, makePackage } from "../scripts/growth/packages";
import { verifyPackage } from "../scripts/growth/verification";
import { createDashboard } from "../scripts/growth/dashboard";

test.describe("private distribution review", () => {
  let store: GrowthStore, directory: string;
  let desk: ReturnType<typeof createDashboard>;
  test.beforeAll(async ({}, info) => {
    directory = mkdtempSync(join(tmpdir(), "observer-growth-browser-"));
    store = new GrowthStore(directory);
    const article = articles.find((a) => a.slug === "the-last-human-workforce")!;
    const draft = makePackage(article);
    const gate = await verifyPackage(draft, article, async (url) => ({
      url,
      state: "ok",
      status: 200,
      attempts: 1,
      reason: "BROWSER TEST FIXTURE; not a real source check",
      checkedAt: new Date().toISOString(),
      body: `<link rel="canonical" href="${canonical(article)}">${article.version} ${article.publicationDate} ${article.standfirst} ${article.paragraphs.join(" ")} ${article.limitations}`,
    }));
    store.put(draft, gate);
    const port = 4800 + info.workerIndex;
    desk = createDashboard(store, port);
    await new Promise<void>((r) => desk.server.listen(port, "127.0.0.1", r));
  });
  test.afterAll(async () => {
    await new Promise<void>((r) => desk?.server.close(() => r()));
    store?.close();
    rmSync(directory, { recursive: true, force: true });
  });
  test("unlocks, reviews exact copy, rejects incomplete approval and downloads protected drafts", async ({
    page,
    request,
  }, info) => {
    expect((await request.get(desk.origin + "/api/queue")).status()).toBe(401);
    expect((await request.get(desk.origin + "/report")).status()).toBe(401);
    await page.goto(desk.origin);
    await expect(page.getByRole("heading", { name: "Unlock the local growth desk" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("The Last Human Workforce");
    await page.getByLabel("Owner token").fill(desk.token);
    await page.getByRole("button", { name: "Unlock", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Growth and distribution", exact: true }),
    ).toBeVisible();
    const card = page.locator("article").first();
    const linkedin = card
      .locator("details")
      .filter({ has: page.locator("summary", { hasText: /^linkedin/ }) });
    await linkedin.locator("summary").click();
    await expect(linkedin.getByRole("textbox", { name: "linkedin draft" })).toHaveValue(
      /Acemoglu and Restrepo/,
    );
    await linkedin
      .getByLabel("Review note / rejection reason")
      .fill("BROWSER TEST FIXTURE — no real editorial approval");
    await linkedin.getByRole("button", { name: "Approve linkedin copy" }).click();
    await expect(page.getByRole("heading", { name: "Review was not saved" })).toBeVisible();
    await page.getByRole("link", { name: "Return to queue" }).click();
    const form = page
      .locator("article")
      .first()
      .locator("details")
      .filter({ has: page.locator("summary", { hasText: /^linkedin/ }) });
    await form.locator("summary").click();
    for (const label of [
      "I checked claims",
      "I authorize derivative",
      "Findings, interpretation",
      "Only approved public",
    ])
      await form.getByLabel(label, { exact: false }).check();
    await form
      .getByLabel("Review note / rejection reason")
      .fill("BROWSER TEST FIXTURE — owner source and rights check simulated");
    await form.getByRole("button", { name: "Approve linkedin copy" }).click();
    await expect(page.getByRole("status")).toHaveText(
      "Review recorded locally. Nothing was published.",
    );
    await expect(page.locator("article summary").filter({ hasText: /^linkedin/ })).toContainText(
      "approved",
    );
    const youtube = page
      .locator("article")
      .first()
      .locator("details")
      .filter({ has: page.locator("summary", { hasText: /^youtube/ }) });
    await youtube.locator("summary").click();
    await expect(youtube).toContainText("Approved for upload: NO");
    const download = page.waitForEvent("download");
    await youtube.getByRole("link", { name: "Estimated captions (SRT)" }).click();
    expect((await download).suggestedFilename()).toBe("captions.draft.srt");
    await page.screenshot({ path: info.outputPath("growth-desk.png"), fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(store.list()[0].decisions.linkedin?.state).toBe("approved");
    expect(store.list()[0].decisions.youtube).toBeUndefined();
  });
});
