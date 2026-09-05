import { defineConfig } from "astro/config";

const DEFAULT_SITE_URL = "https://independentobserver.org";

function normalizeSiteUrl(value) {
  const url = new URL(value);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("SITE_URL must use http or https.");
  }

  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      "SITE_URL must contain only the origin. Configure the deployment path with BASE_PATH.",
    );
  }

  return url.origin;
}

function normalizeBasePath(value) {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const normalized = trimmed.replace(/^\/+|\/+$/g, "");
  const segments = normalized.split("/");

  if (
    segments.some((segment) => !segment || segment === "." || segment === "..") ||
    normalized.includes("?") ||
    normalized.includes("#")
  ) {
    throw new Error("BASE_PATH must be a valid URL path.");
  }

  return `/${normalized}`;
}

const site = normalizeSiteUrl(process.env.SITE_URL ?? DEFAULT_SITE_URL);
const base = normalizeBasePath(process.env.BASE_PATH ?? "/");

export default defineConfig({
  output: "static",
  site,
  base,
  trailingSlash: "always",
});
