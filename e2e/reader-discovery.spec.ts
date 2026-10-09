import { test, expect } from "@playwright/test";

test("released articles and draft previews have distinct reading actions", async ({ page }) => {
  await page.goto("/library/");
  const shelf = page.locator('section[aria-labelledby="green-publications-title"]');
  await expect(shelf).toContainText("4 released articles and 2 research previews");
  const released = shelf.locator("article").filter({ hasText: "Released article" });
  await expect(released).toHaveCount(4);
  for (const card of await released.all()) {
    await expect(card.getByRole("link", { name: "Read article →", exact: true })).toBeAttached();
    await expect(card.getByRole("link", { name: "Read preview →", exact: true })).toHaveCount(0);
  }
  const previews = shelf.locator("article").filter({ hasText: "Preview-only article" });
  await expect(previews).toHaveCount(2);
  for (const card of await previews.all()) {
    await expect(card.getByRole("link", { name: "Read preview →", exact: true })).toBeAttached();
  }
});

test("selected podcast speed survives the first transcript jump and media load", async ({
  page,
}) => {
  await page.goto("/podcast/");
  const episode = page.locator("#episode-01");
  await episode.locator("[data-podcast-speed]").selectOption("1.5");
  await episode.locator("summary").click();
  await episode.locator("[data-transcript-seek]").nth(1).click();
  await expect
    .poll(() =>
      episode
        .locator("audio")
        .evaluate((audio: HTMLAudioElement) => audio.readyState >= 1 && audio.currentTime > 0),
    )
    .toBe(true);
  expect(
    await episode.locator("audio").evaluate((audio: HTMLAudioElement) => ({
      rate: audio.playbackRate,
      defaultRate: audio.defaultPlaybackRate,
    })),
  ).toEqual({ rate: 1.5, defaultRate: 1.5 });
  await expect(episode.locator("[data-podcast-speed]")).toHaveValue("1.5");
});
