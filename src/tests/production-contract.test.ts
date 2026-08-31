import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { canonicalRouteRegistry, indexableRouteRegistry } from "../data/route-registry";

const distRoot = join(process.cwd(), "dist");
const origin = "https://independentobserver.org";

function routeToFile(route: string) {
  if (route === "/") return join(distRoot, "index.html");
  return join(distRoot, route.replace(/^\//, ""), "index.html");
}

function attributes(tag: string) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
      match[1].toLowerCase(),
      match[2] ?? match[3] ?? "",
    ]),
  );
}

function tags(html: string, tagName: string) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function readOutput(route: string) {
  return readFileSync(routeToFile(route), "utf8");
}

describe("production route contract", () => {
  const homeHtml = readOutput("/");
  const homeCanonical = attributes(
    tags(homeHtml, "link").find((tag) => attributes(tag).rel === "canonical") ?? "",
  ).href;
  const basePath = homeCanonical ? new URL(homeCanonical).pathname : "/";

  function routeUrl(route: string) {
    return new URL(`${basePath}${route === "/" ? "" : route.slice(1)}`, origin).href;
  }

  function outputPath(pathname: string) {
    const relativePath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
    if (!relativePath) return join(distRoot, "index.html");
    if (relativePath.endsWith("/")) return join(distRoot, relativePath, "index.html");
    return join(distRoot, relativePath);
  }

  it("keeps the canonical route registry unique and the intended public set at 52", () => {
    expect(new Set(canonicalRouteRegistry.map((record) => record.route)).size).toBe(
      canonicalRouteRegistry.length,
    );
    expect(indexableRouteRegistry).toHaveLength(58);
    expect(indexableRouteRegistry.every((record) => record.indexable)).toBe(true);
  });

  it("builds every registered route and excludes explicit noindex records from the sitemap", () => {
    for (const record of canonicalRouteRegistry) {
      if (record.type === "utility") {
        expect(existsSync(join(distRoot, "build-info.json"))).toBe(true);
      } else {
        expect(existsSync(routeToFile(record.route)), record.route).toBe(true);
      }
    }

    const sitemap = readFileSync(join(distRoot, "sitemap.xml"), "utf8");
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    const expected = indexableRouteRegistry.map((record) => routeUrl(record.route));
    expect(locations).toEqual(expected);
    expect(sitemap).not.toContain("/start-here/");
    expect(sitemap).not.toContain("/review/regrowing-humanity/");
    expect(sitemap).not.toContain("/build-info.json");
  });

  it("requires one canonical, one H1, and valid JSON-LD on every built HTML page", () => {
    for (const record of canonicalRouteRegistry.filter((item) => item.type !== "utility")) {
      const html = readOutput(record.route);
      const canonical = tags(html, "link").filter((tag) => attributes(tag).rel === "canonical");
      expect(canonical, record.route).toHaveLength(1);
      expect(attributes(canonical[0]).href, record.route).toBe(
        routeUrl(record.canonicalRoute ?? record.route),
      );
      expect(tags(html, "h1"), record.route).toHaveLength(1);
      for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        const scriptAttributes = attributes(`<script ${script[1]}>`);
        if (scriptAttributes.type !== "application/ld+json") continue;
        expect(() => JSON.parse(script[2]), record.route).not.toThrow();
      }
    }
  });

  it("keeps internal links and fragments resolvable in the static output", () => {
    const htmlFiles = canonicalRouteRegistry
      .filter((record) => record.type !== "utility")
      .map((record) => ({ route: record.route, html: readOutput(record.route) }));
    const htmlByPath = new Map(htmlFiles.map(({ route, html }) => [route, html]));

    for (const { route, html } of htmlFiles) {
      for (const tag of tags(html, "a").concat(tags(html, "link"))) {
        const href = attributes(tag).href;
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
          continue;
        const target = new URL(href, `${origin}${route}`);
        if (target.origin !== origin || target.pathname.startsWith("/_astro/")) continue;
        const file = outputPath(target.pathname);
        expect(existsSync(file), `${route} -> ${href} (${relative(distRoot, file)})`).toBe(true);
        if (target.hash && htmlByPath.has(target.pathname)) {
          const id = decodeURIComponent(target.hash.slice(1));
          expect(htmlByPath.get(target.pathname), `${route} -> ${href}`).toContain(`id="${id}"`);
        }
      }
    }
  });

  it("keeps the deployed CSP strict and aligned with built inline scripts", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));
    const headers = config.headers.flatMap(
      (entry: { headers: { key: string; value: string }[] }) => entry.headers,
    );
    const csp = headers.find(
      (header: { key: string }) => header.key === "Content-Security-Policy",
    )?.value;
    expect(csp).toBeTruthy();
    expect(csp).not.toContain("'unsafe-inline'");
    expect(csp).toContain("img-src 'self' data:");
    expect(csp).not.toContain("img-src 'self' data: https:");
    expect(
      headers.find((header: { key: string }) => header.key === "Access-Control-Allow-Origin")
        ?.value,
    ).toBe("https://independentobserver.org");

    const allowedHashes = new Set(csp?.match(/'sha256-[^']+'/g) ?? []);
    for (const record of canonicalRouteRegistry.filter((item) => item.type !== "utility")) {
      const html = readOutput(record.route);
      for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        const scriptAttributes = attributes(`<script ${script[1]}>`);
        if (scriptAttributes.type === "application/ld+json") continue;
        const hash = `'sha256-${createHash("sha256").update(script[2]).digest("base64")}'`;
        expect(allowedHashes, `${record.route} inline script`).toContain(hash);
      }
      expect(html).not.toMatch(/<style\b|\sstyle=["']/i);
    }
  });
});
