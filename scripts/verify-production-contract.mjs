const siteUrl = new URL(process.env.SITE_URL ?? "https://independentobserver.org");
const expectedRouteCount = Number(process.env.EXPECTED_INDEXABLE_ROUTES ?? "52");
const failures = [];
const pages = new Map();

if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("SITE_URL must contain only an origin.");
}

async function fetchText(url, options = {}) {
  try {
    const response = await fetch(url, { redirect: "manual", ...options });
    const text = await response.text();
    return { response, text };
  } catch (error) {
    failures.push(`${url}: request failed (${error.message})`);
    return { response: null, text: "" };
  }
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
      match[1].toLowerCase(),
      match[2] ?? match[3] ?? "",
    ]),
  );
}

function pageLabel(url) {
  return new URL(url).pathname || "/";
}

const sitemapUrl = new URL("sitemap.xml", siteUrl);
const sitemapResult = await fetchText(sitemapUrl);
if (!sitemapResult.response || sitemapResult.response.status !== 200) {
  failures.push(
    `sitemap: expected 200, received ${sitemapResult.response?.status ?? "no response"}`,
  );
}
const sitemapUrls = [...sitemapResult.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = [...new Set(sitemapUrls)];
if (uniqueSitemapUrls.length !== sitemapUrls.length) failures.push("sitemap: duplicate locations");
if (uniqueSitemapUrls.length !== expectedRouteCount) {
  failures.push(`sitemap: expected ${expectedRouteCount} URLs, found ${uniqueSitemapUrls.length}`);
}
if (!uniqueSitemapUrls.every((url) => new URL(url).origin === siteUrl.origin)) {
  failures.push("sitemap: every location must use SITE_URL origin");
}

for (const url of uniqueSitemapUrls) {
  const result = await fetchText(url);
  pages.set(url, result);
  if (!result.response || result.response.status !== 200) {
    failures.push(
      `${pageLabel(url)}: expected 200, received ${result.response?.status ?? "no response"}`,
    );
    continue;
  }
  const contentType = result.response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html"))
    failures.push(`${pageLabel(url)}: not HTML (${contentType})`);
  const canonicalTags = tags(result.text, "link").filter(
    (tag) => attributes(tag).rel === "canonical",
  );
  const h1Count = tags(result.text, "h1").length;
  if (canonicalTags.length !== 1)
    failures.push(`${pageLabel(url)}: expected one canonical, found ${canonicalTags.length}`);
  if (canonicalTags.length === 1 && attributes(canonicalTags[0]).href !== url) {
    failures.push(`${pageLabel(url)}: canonical does not match the sitemap URL`);
  }
  if (h1Count !== 1) failures.push(`${pageLabel(url)}: expected one H1, found ${h1Count}`);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(result.text)) {
    failures.push(`${pageLabel(url)}: sitemap page is noindex`);
  }
  for (const script of result.text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = attributes(`<script ${script[1]}>`);
    if (attrs.type !== "application/ld+json") continue;
    try {
      JSON.parse(script[2]);
    } catch (error) {
      failures.push(`${pageLabel(url)}: invalid JSON-LD (${error.message})`);
    }
  }
}

const internalUrls = new Set();
for (const result of pages.values()) {
  for (const tag of tags(result.text, "a").concat(tags(result.text, "link"))) {
    const href = attributes(tag).href;
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
      continue;
    const target = new URL(href, siteUrl);
    if (target.origin === siteUrl.origin) internalUrls.add(target.href);
  }
}
for (const url of internalUrls) {
  const result = await fetchText(url);
  if (!result.response || ![200, 301, 302, 307, 308].includes(result.response.status)) {
    failures.push(
      `internal link ${new URL(url).pathname}: received ${result.response?.status ?? "no response"}`,
    );
  }
}

for (const [path, expectedStatus] of [
  ["/index.html", [301, 308]],
  ["/about", [301, 308]],
  ["/security.txt", [301, 308]],
  ["/start-here/", [301, 308]],
]) {
  const result = await fetchText(new URL(path, siteUrl));
  if (!result.response || !expectedStatus.includes(result.response.status)) {
    failures.push(
      `${path}: expected permanent redirect, received ${result.response?.status ?? "no response"}`,
    );
  }
}

const robots = await fetchText(new URL("robots.txt", siteUrl));
if (!robots.response || robots.response.status !== 200) failures.push("robots.txt: expected 200");
if (!robots.text.includes(sitemapUrl.href)) failures.push("robots.txt: sitemap URL missing");

const security = await fetchText(new URL(".well-known/security.txt", siteUrl));
if (!security.response || security.response.status !== 200)
  failures.push("security.txt: expected 200");
if (!/^Contact:\s+\S+/m.test(security.text)) failures.push("security.txt: Contact is missing");
if (!/^Policy:\s+\S+/m.test(security.text)) failures.push("security.txt: Policy is missing");

const buildInfo = await fetchText(new URL("build-info.json", siteUrl));
if (!buildInfo.response || buildInfo.response.status !== 200) {
  failures.push("build-info.json: expected 200");
} else {
  try {
    const parsed = JSON.parse(buildInfo.text);
    if (parsed.project !== "independent-observer")
      failures.push("build-info.json: project mismatch");
    if (typeof parsed.commitSha !== "string" || !parsed.commitSha)
      failures.push("build-info.json: commitSha missing");
    if (typeof parsed.buildTimestamp !== "string" || !parsed.buildTimestamp)
      failures.push("build-info.json: buildTimestamp missing");
  } catch (error) {
    failures.push(`build-info.json: invalid JSON (${error.message})`);
  }
}

const missingProbe = await fetchText(new URL("/__codex-production-contract-missing__/", siteUrl));
if (!missingProbe.response || missingProbe.response.status !== 404) {
  failures.push(
    `404 route: expected 404, received ${missingProbe.response?.status ?? "no response"}`,
  );
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Production contract passed: ${uniqueSitemapUrls.length} sitemap routes, ${internalUrls.size} internal links, redirects, security.txt, build-info, and 404 verified.`,
  );
}
