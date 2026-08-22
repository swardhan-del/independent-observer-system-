import { resolve } from "node:dns/promises";

const domain = (process.env.CUSTOM_DOMAIN || "independentobserver.org")
  .trim()
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const origin = `https://${domain}`;
const hosts = [domain, `www.${domain}`];
const requiredPaths = ["/", "/robots.txt", "/sitemap.xml", "/feed.xml"];
const failures = [];

function fail(message) {
  failures.push(message);
}

async function checkDns(host) {
  try {
    const addresses = await resolve(host);
    console.log(`DNS OK  ${host} -> ${addresses.join(", ")}`);
  } catch (error) {
    fail(`DNS failed for ${host}: ${error.code || error.message}`);
  }
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const text = await response.text();
    console.log(`HTTP ${response.status} ${url} -> ${response.url}`);
    return { response, text };
  } catch (error) {
    fail(`Request failed for ${url}: ${error.message}`);
    return null;
  }
}

for (const host of hosts) {
  await checkDns(host);
}

for (const host of hosts) {
  const result = await checkUrl(`https://${host}/`);
  if (result && result.response.status !== 200) {
    fail(`Homepage for ${host} returned HTTP ${result.response.status}`);
  }
  if (result && !/<title>Independent Observer<\/title>/i.test(result.text)) {
    fail(`Homepage for ${host} is missing the Independent Observer title`);
  }
}

const routeResults = new Map();
for (const pathname of requiredPaths) {
  const result = await checkUrl(`${origin}${pathname}`);
  routeResults.set(pathname, result);
  if (result && result.response.status !== 200) {
    fail(`${pathname} returned HTTP ${result.response.status}`);
  }
}

const homepage = routeResults.get("/");
if (homepage) {
  const canonical = homepage.text.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i,
  )?.[1];
  if (canonical !== `${origin}/`) {
    fail(`Homepage canonical is ${canonical || "missing"}; expected ${origin}/`);
  }
}

const robots = routeResults.get("/robots.txt")?.text || "";
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail("robots.txt does not point to the custom-domain sitemap");
}

const sitemap = routeResults.get("/sitemap.xml")?.text || "";
if (!sitemap.includes(origin)) {
  fail("sitemap.xml does not contain the custom public origin");
}

if (failures.length > 0) {
  console.error("\nCustom-domain preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(
    "\nRegister the domain, attach both apex and www to the existing Vercel project, wait for DNS/HTTPS, then rerun this check.",
  );
  process.exit(1);
}

console.log(
  `\nCustom-domain preflight passed for ${origin}. DNS, HTTPS, routes, canonical metadata, robots, and sitemap are aligned.`,
);
