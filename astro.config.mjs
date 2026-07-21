import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  output: "static",
  site: "https://swardhan-del.github.io",
  base: isGitHubPages ? "/independent-observer-system-" : "/",
  trailingSlash: "always",
});
