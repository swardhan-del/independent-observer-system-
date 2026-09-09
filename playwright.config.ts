import { defineConfig, devices } from "@playwright/test";
const previewPort = Number(process.env.PLAYWRIGHT_PORT ?? 4337);
const previewUrl = `http://127.0.0.1:${previewPort}`;
export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: previewUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${previewPort} --ignore-lock`,
    env: { ASTRO_PREVIEW_BACKGROUND: "1" },
    url: previewUrl,
    reuseExistingServer: !process.env.CI,
  },
});
