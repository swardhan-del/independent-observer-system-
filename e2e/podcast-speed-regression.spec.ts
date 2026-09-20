import { test, expect } from "@playwright/test";

for (const entryPoint of ["resume", "transcript"] as const) {
  test(`podcast retains the selected speed when first loading through ${entryPoint}`, async ({
    page,
  }) => {
    if (entryPoint === "resume") {
      await page.addInitScript(() =>
        localStorage.setItem(
          "io-listening-progress-v1",
          JSON.stringify({ "episode-01": { position: 42, updated: 1 } }),
        ),
      );
    }
    await page.goto("/podcast/");
    const episode = page.locator("#episode-01");
    const audio = episode.locator("audio");
    const speed = episode.locator("[data-podcast-speed]");
    expect(await audio.evaluate((element: HTMLAudioElement) => element.readyState)).toBe(0);
    await speed.selectOption("1.25");
    if (entryPoint === "resume") {
      await episode.locator("[data-podcast-resume]").click();
    } else {
      await episode.locator("summary").click();
      await episode.locator("[data-transcript-seek]").first().click();
    }
    await expect
      .poll(() => audio.evaluate((element: HTMLAudioElement) => element.currentTime))
      .toBeGreaterThan(entryPoint === "resume" ? 42.5 : 0.5);
    await expect(speed).toHaveValue("1.25");
    expect(await audio.evaluate((element: HTMLAudioElement) => element.playbackRate)).toBe(1.25);
  });
}
