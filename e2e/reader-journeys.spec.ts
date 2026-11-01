import { test, expect } from "@playwright/test";
for (const javaScriptEnabled of [true, false]) {
  test(`justice reading path preserves availability with JavaScript ${javaScriptEnabled ? "on" : "off"}`, async ({
    browser,
    baseURL,
    viewport,
  }, testInfo) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport });
    const page = await context.newPage();
    await page.goto(`${baseURL}/start/#justice-to-capacity`);
    const path = page.locator("#justice-to-capacity");
    await expect(
      path.getByRole("heading", { name: "Law, time and public capacity" }),
    ).toBeVisible();
    await expect(path.locator("ol > li")).toHaveCount(4);
    await expect(path).toContainText("not a measured national estimate");
    await expect(path).toContainText("Start with Terry v. Ohio");
    await expect(path).toContainText("PDF) and Rodriguez v. United States");
    await expect
      .poll(() =>
        page.locator("#justice-path-title").evaluate((heading) => {
          const header = document.querySelector(".site-header");
          return (
            heading.getBoundingClientRect().top >= (header?.getBoundingClientRect().bottom ?? 0)
          );
        }),
      )
      .toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    const links = await path
      .locator("ol a")
      .evaluateAll((items) => items.map((item) => (item as HTMLAnchorElement).href));
    if (javaScriptEnabled) {
      await path.screenshot({
        path: testInfo.outputPath("justice-path.png"),
        animations: "disabled",
      });
    }
    await path.locator("ol a").first().focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Independent Observer Method",
    );
    for (const [index, id, volume] of [
      [1, "paper-human-rights-policing-doctrine-and-hidden-taxation", "Volume II"],
      [2, "paper-from-pockets-to-portfolios", "Volume III"],
    ] as const) {
      await page.goto(links[index]);
      const record = page.locator(`#${id}`);
      await expect(record).toBeVisible();
      await expect(record).toHaveAttribute("data-volume", volume);
      await expect(record.locator(".entry-status")).toHaveText("Research-map entry");
      await expect(
        record.locator('a[href*="/library/documents/"], a[href*="/library/manuscripts/"]'),
      ).toHaveCount(0);
    }
    await page.goto(links[3]);
    await expect(page.locator("[data-document-reader]")).toBeVisible();
    await expect(page.locator("main")).toContainText("The paper is a policy proposal");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    await context.close();
  });
}

test("search downloads once on demand and finds podcast transcript passages", async ({ page }) => {
  const indexRequests: string[] = [];
  page.on("request", (request) => {
    if (/search-index(?:-v1)?\.json/.test(request.url())) indexRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  expect(indexRequests).toHaveLength(0);
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("A timeline is not yet an explanation");
  await expect(page.locator("[data-search-result]").first()).toContainText(
    "Observation Before Judgment",
  );
  expect(indexRequests).toHaveLength(1);
  expect(new URL(indexRequests[0]).search).toBe("");
  await page.locator("[data-search-close]").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#site-search-dialog")).not.toBeVisible();
  await expect(page.locator("[data-search-open]")).toBeFocused();
  await page.locator("[data-search-open]").click();
  expect(indexRequests).toHaveLength(1);
  await page.locator("[data-search-result]").first().click();
  await expect(page).toHaveURL(/podcast\/#episode-01/);
});
test("search failure is recoverable", async ({ page }) => {
  await page.route("**/search-index-v1.json", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.goto("/");
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-search-status]")).toContainText("could not load");
  await page.locator("[data-search-close]").click();
  await page.unroute("**/search-index-v1.json");
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("Managed Decline");
  await expect(page.locator("[data-search-result]").first()).toBeVisible();
});
test("invalid packed search can be retried and older page endpoints still work", async ({
  page,
}) => {
  await page.route("**/search-index-v1.json", (route) =>
    route.fulfill({ json: { version: 99, strings: [], rows: [] } }),
  );
  await page.goto("/");
  await page.locator("[data-search-open]").click();
  await expect(page.locator("[data-search-status]")).toContainText("could not load");
  await page.locator("[data-search-close]").click();
  await page.unroute("**/search-index-v1.json");
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("Factories Return but Do the Jobs");
  await expect(page.locator("[data-search-result]").first()).toContainText("Factories Return");
  await page.reload();
  await page.locator("[data-site-search]").evaluate((root) => {
    root.setAttribute("data-index-url", "/search-index.json");
  });
  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-input]").fill("A timeline is not yet an explanation");
  await expect(page.locator("[data-search-result]").first()).toContainText(
    "Observation Before Judgment",
  );
});
test("reading journey, citations and contextual correction work", async ({ page }) => {
  await page.goto("/start/#reading-journeys");
  const journey = page.locator("#journey-method");
  await expect(journey.locator("ol li")).toHaveCount(3);
  await journey.locator("ol a").first().click();
  await expect(page.locator("[data-document-reader]")).toBeVisible();
  const ris = page.getByRole("link", { name: "Download RIS" });
  const response = await page.request.get((await ris.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("TY  - GEN");
  await page.locator("[data-reader-correction]").click();
  await expect(page.locator("#contact-topic")).toHaveValue("Public reading copy or correction");
  await expect(page.locator("#contact-message")).toHaveValue(
    /Page: https:\/\/independentobserver\.org\/library\/documents\/independent-observer-volume-one\//,
  );
});
test("podcast resumes real media, filters transcript and forgets progress", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "io-listening-progress-v1",
      JSON.stringify({ "episode-01": { position: 42, updated: 1 } }),
    ),
  );
  await page.goto("/podcast/");
  const episode = page.locator("#episode-01");
  await expect(episode.locator("[data-podcast-resume]")).toContainText("0:42");
  await episode.locator("[data-podcast-resume]").click();
  await expect
    .poll(() => episode.locator("audio").evaluate((audio: HTMLAudioElement) => audio.currentTime))
    .toBeGreaterThan(42.5);
  await episode.locator("audio").evaluate((audio: HTMLAudioElement) => audio.pause());
  await episode.locator("summary").click();
  await episode.locator("[data-transcript-query]").fill("A timeline is not yet an explanation");
  await expect(episode.locator("[data-transcript-paragraph]:visible")).toHaveCount(1);
  await episode.locator("[data-transcript-paragraph]:visible button").click();
  await expect
    .poll(() => episode.locator("audio").evaluate((audio: HTMLAudioElement) => audio.currentTime))
    .toBeGreaterThan(1);
  await episode.locator("[data-podcast-reset]").click();
  await expect(episode.locator("[data-podcast-resume]")).toBeHidden();
});
test("storage restrictions preserve playback and transcripts", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.goto("/podcast/");
  await expect(page.locator("#episode-01 [data-podcast-status]")).toContainText("cannot be saved");
  await page.locator("#episode-01 summary").click();
  await expect(page.locator("#episode-01 [data-transcript-paragraph]").first()).toBeVisible();
});
test("mobile routes have no horizontal overflow or browser exceptions", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/start/",
    "/podcast/",
    "/whats-new/",
    "/library/documents/independent-observer-volume-one/",
  ]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    await expect(page.locator("h1")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
test("no JavaScript still exposes research, transcript and citations", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/podcast/`);
  await page.locator("#episode-01 summary").click();
  await expect(page.locator("#episode-01 [data-transcript-paragraph]").first()).toBeVisible();
  await page.goto(`${baseURL}/library/documents/independent-observer-volume-one/`);
  await expect(page.getByRole("link", { name: "Download BibTeX" })).toBeVisible();
  await context.close();
});

test("saved reading item survives closing the list and reloading", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-reading-open]").click();
  const recommendation = page.locator("[data-reading-toggle]").first();
  await recommendation.click();
  await expect(page.locator("[data-reading-count]")).toHaveText("1");
  await page.locator("[data-reading-close]").click();
  await page.reload();
  await page.locator("[data-reading-open]").click();
  await expect(page.locator("[data-reading-items] li")).toHaveCount(1);
  await page.locator("[data-reading-items] a").first().click();
  await expect(page.locator("[data-document-reader]")).toBeVisible();
});

test("reading journey heading clears the sticky masthead", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Start with a question" }).click();
  await expect(page).toHaveURL(/start\/#reading-journeys/);
  await expect(page.locator("#reading-journeys-title")).toBeVisible();
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const heading = document.querySelector("#reading-journeys-title")!.getBoundingClientRect();
        const header = document.querySelector(".site-header")!.getBoundingClientRect();
        return heading.top - header.bottom;
      }),
    )
    .toBeGreaterThanOrEqual(0);
});
