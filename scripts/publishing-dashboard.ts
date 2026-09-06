import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import { publicPublicationRegistry } from "../src/data/publication-registry";
import { publicDocumentItems } from "../src/data/documents";
import { exportCitation } from "../src/lib/citations";
const port = Number(process.env.DASHBOARD_PORT ?? 4323);
const origin = `http://127.0.0.1:${port}`;
const escape = (value: unknown) =>
  String(value ?? "").replace(
    /[<>&"']/g,
    (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[char]!,
  );
const checkedAt = new Date().toISOString();
let checks: { name: string; conclusion?: string; state?: string; status?: string }[] = [];
let release = "GitHub status unavailable. Run gh auth status and refresh this dashboard.";
try {
  const pr = JSON.parse(
    execFileSync(
      "gh",
      [
        "pr",
        "view",
        "36",
        "-R",
        "swardhan-del/independent-observer-system-",
        "--json",
        "headRefOid,state,reviewDecision,mergeStateStatus,statusCheckRollup",
      ],
      { encoding: "utf8", timeout: 15000, stdio: ["ignore", "pipe", "ignore"] },
    ),
  );
  release = `PR #36: ${pr.state} · ${pr.reviewDecision || "no review decision"} · ${pr.mergeStateStatus} · ${pr.headRefOid}`;
  checks = pr.statusCheckRollup ?? [];
} catch {
  /* Shown as unavailable; never represented as passing. */
}
let production = "Production unavailable";
try {
  const response = await fetch("https://independentobserver.org/build-info.json", {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error();
  const build = await response.json();
  production = `Production commit: ${build.commitSha || "MISSING"}. Built: ${build.buildTimestamp ?? "unknown"}`;
} catch {
  /* Shown as unavailable. */
}
let links: { url: string; status: string }[] = [];
if (process.argv.includes("--check-links")) {
  const urls = [
    ...new Set(
      publicDocumentItems
        .flatMap((item) => [
          item.researchGateUrl,
          ...(item.citations ?? []).map((citation) => citation.url),
        ])
        .filter((url): url is string => Boolean(url?.startsWith("https://"))),
    ),
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(6000),
      });
      links.push({
        url,
        status: response.ok
          ? `Accessible (${response.status})`
          : [403, 405, 429].includes(response.status)
            ? `Manual review (${response.status})`
            : `Check source (${response.status})`,
      });
    } catch {
      links.push({ url, status: "Could not verify; manual review needed" });
    }
  }
}
const queue = publicPublicationRegistry.filter(
  (item) => item.releaseDecision === "awaiting_human_release",
);
const missing = publicDocumentItems.filter((item) => !exportCitation(item, "bib"));
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Publishing desk — local</title><style>body{max-width:1100px;margin:40px auto;padding:0 24px;font:17px/1.6 system-ui;background:#f7f5ef;color:#10243a}h1,h2{line-height:1.2}section{background:white;border:1px solid #ccc;padding:24px;margin:24px 0;overflow-wrap:anywhere}td,th{padding:12px;text-align:left;border-bottom:1px solid #ddd}table{width:100%;border-collapse:collapse}small{color:#42546a}</style><h1>Publishing desk</h1><p>Private local view. Updated ${escape(checkedAt)}. Restart the command to refresh.</p><section><h2>Release and deployment</h2><p>${escape(release)}</p><p>${escape(production)}</p><ul>${checks.map((check) => `<li>${escape(check.name ?? "Vercel")}: ${escape(check.conclusion ?? check.state ?? check.status ?? "unknown")}</li>`).join("")}</ul></section><section><h2>${queue.length} candidates awaiting release</h2><p>Approved text or rights review alone does not authorize publication. These are the current recorded gates.</p><table><tr><th>Title</th><th>Status</th><th>Rights</th><th>External verification</th></tr>${queue.map((item) => `<tr><td>${escape(item.title)}</td><td>${escape(item.releaseDecision)}</td><td>${escape(item.rightsDecision)}</td><td>${escape(item.externalVerification)}</td></tr>`).join("")}</table></section><section><h2>${missing.length} records need citation metadata</h2><ul>${missing.map((item) => `<li>${escape(item.title)} — ${!item.author ? "author missing; " : ""}${!item.publicationDate ? "publication date missing" : "date needs review"}</li>`).join("") || "<li>All public records have exportable citation metadata.</li>"}</ul></section><section><h2>Source links</h2><p>${links.length ? "Live checks are a snapshot; access restrictions do not establish a broken source." : "Run npm run dashboard -- --check-links to check external sources. Links have not been checked in this snapshot."}</p><ul>${links.map((link) => `<li>${escape(link.status)} — ${escape(link.url)}</li>`).join("")}</ul></section></html>`;
if (process.argv.includes("--check")) {
  console.log(
    JSON.stringify(
      {
        checkedAt,
        queueCount: queue.length,
        missingMetadata: missing.length,
        release,
        production,
        links,
      },
      null,
      2,
    ),
  );
} else {
  const server = createServer((request, response) => {
    if (
      request.headers.host !== `127.0.0.1:${port}` ||
      (request.headers.origin && request.headers.origin !== origin)
    ) {
      response.writeHead(403).end();
      return;
    }
    if (request.url !== "/" || request.method !== "GET") {
      response.writeHead(404).end();
      return;
    }
    response
      .writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
      })
      .end(html);
  });
  server.listen(port, "127.0.0.1", () => console.log(`Publishing desk: ${origin} (local only)`));
}
