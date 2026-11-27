import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import {
  articles,
  channels,
  channelCopy,
  destinations,
  mediaIndex,
  type Channel,
} from "./packages";
import { monthlyReport } from "./reporting";
import { type GrowthStore } from "./store";
import { renderScorecard } from "../growth-scorecard.mjs";

const esc = (value: unknown) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
const same = (a: string, b: string) =>
  Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const style = `body{margin:0;background:#f5f3ed;color:#142c40;font:17px/1.6 system-ui}main{max-width:1100px;margin:auto;padding:24px}h1,h2,h3{line-height:1.2}nav{display:flex;gap:16px;flex-wrap:wrap}a{color:#184f70}section,article,details{background:white;border:1px solid #cbd1d6;border-radius:8px;padding:18px;margin:18px 0;overflow-wrap:anywhere}summary{cursor:pointer;font-weight:700}pre{white-space:pre-wrap;font:inherit}textarea{box-sizing:border-box;width:100%;min-height:160px;font:inherit;padding:10px}input,button{font:inherit;max-width:100%;min-height:44px;box-sizing:border-box}button{padding:8px 16px;cursor:pointer}label{display:block;margin:10px 0}input[type=checkbox]{min-width:24px;vertical-align:middle}td,th{padding:10px;text-align:left;border-bottom:1px solid #ccd3d9}table{border-collapse:collapse;width:100%}.table{overflow-x:auto}.warning{border-left:5px solid #a54d12;padding:14px;background:#fff2de}:focus-visible{outline:3px solid #ab5815;outline-offset:3px}@media(max-width:450px){main{padding:12px}section,article,details{padding:12px}h1{font-size:1.8rem}}`;
function page(body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Independent Observer — private growth desk</title><style>${style}</style></head><body><main>${body}</main></body></html>`;
}
export function renderDashboard(store: GrowthStore, csrf: string, message = "") {
  const rows = store.list(),
    active = rows.filter((r) => r.status !== "superseded");
  const report = monthlyReport(store);
  const hidden = (name: string, value: string) =>
    `<input type="hidden" name="${esc(name)}" value="${esc(value)}">`;
  const cards = active
    .map(
      (
        r,
      ) => `<article id="package-${r.id}"><h3>${esc(r.package.title)}</h3><p><b>${esc(r.status)}</b> · Revision ${r.id.slice(0, 12)}</p><p>${esc(r.package.source.attribution)}</p><p><a href="${esc(r.package.source.canonicalUrl)}" target="_blank" rel="noreferrer">Read the approved article</a></p>${r.gate.warnings.length ? `<div class="warning"><b>Source gate blocked</b><ul>${r.gate.warnings.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>` : "<p>Technical checks pass. Editorial source and derivative-rights review still required.</p>"}
    <details><summary>Claims, source checks and revision history</summary>${r.package.claims.map((c) => `<p><b>${esc(c.id)} — ${esc(c.kind)}${c.paragraph === null ? "" : ` — article paragraph ${c.paragraph + 1}`}</b></p><p>${esc(c.text)}</p><p>References: ${c.sourceIndexes.map((i) => esc(r.package.references[i].label)).join("; ") || "Author summary/limitation from the canonical article; no independent empirical finding claimed"}</p>`).join("")}${r.gate.links.map((l) => `<p>${esc(l.state)} · ${esc(l.status ?? "NO RESPONSE")} · ${esc(l.checkedAt)} · ${esc(l.url)}<br>${esc(l.reason)}</p>${l.state !== "ok" && l.url !== r.package.source.canonicalUrl ? `<form method="post" action="/action">${hidden("csrf", csrf)}${hidden("id", r.id)}${hidden("action", "verify-source")}${hidden("url", l.url)}<label>Original passage, date and support checked by owner<textarea name="note" minlength="20" maxlength="1000" required></textarea></label><button>Record manual source verification</button></form>` : ""}`).join("")}<pre>${esc(JSON.stringify(r.history, null, 2))}</pre></details>
    ${channels
      .map((channel) => {
        const copy = channelCopy(r.package, channel);
        return `<details><summary>${esc(channel)} · ${esc(r.decisions[channel]?.state ?? "awaiting review")}</summary><p>Suggested cadence: ${channel === "linkedin" ? "one post weekly, when approved" : channel === "substack" ? "one brief monthly, when approved" : channel === "youtube" ? "optional; no filming required" : "related-link and description suggestions"}. No publication is scheduled.</p><label>Copy-ready draft<textarea readonly aria-label="${esc(channel)} draft">${esc(copy)}</textarea></label>${channel === "linkedin" ? `<label>Concise alternative<textarea readonly aria-label="linkedin concise alternative">${esc(r.package.linkedin.concise)}</textarea></label>` : ""}<p><a href="/download?id=${r.id}&channel=${channel}">Download draft and provenance (JSON)</a>${channel === "youtube" ? ` · <a href="/captions?id=${r.id}">Estimated captions (SRT)</a>` : ""}</p>${channel === "youtube" ? `<p class="warning">Script prepared. Assets verified: NO. Rendering: NOT VERIFIED. Preview generated: NO. Editorial review: ${r.decisions.youtube?.state === "approved" ? "script/package only" : "NO"}. Approved for upload: NO. Published and verified: NOT VERIFIED.</p><pre>${esc(JSON.stringify({ scenes: r.package.youtube.scenes, missing: r.package.youtube.missing, timing: r.package.youtube.timing, thumbnailBrief: r.package.youtube.thumbnailBrief }, null, 2))}</pre>` : ""}
      <form method="post" action="/action">${hidden("csrf", csrf)}${hidden("id", r.id)}${hidden("channel", channel)}<label><input type="checkbox" name="sources"> I checked claims, numerical context, dates and attribution against originals</label><label><input type="checkbox" name="rights"> I authorize derivative reuse of this exact copy and selected assets</label><label><input type="checkbox" name="limitations"> Findings, interpretation and limitations remain accurate</label><label><input type="checkbox" name="publicOnly"> Only approved public evidence is included</label><label>Review note / rejection reason<textarea name="note" required maxlength="1000"></textarea></label><button name="action" value="approve">Approve ${esc(channel)} copy</button> <button name="action" value="reject">Reject ${esc(channel)} copy</button></form><p>Copy approval does not publish, send, upload or authorize a future automated post. Review the final composer separately.</p></details>`;
      })
      .join(
        "",
      )}<p>Existing editorial pilot: ${esc(r.package.existingPilot?.formats ?? "No existing pilot")}</p></article>`,
    )
    .join("");
  return page(
    `<p>INDEPENDENT OBSERVER · OWNER-ONLY LOCAL DESK</p><h1>Growth and distribution</h1><nav><a href="#overview">Overview</a><a href="#queue">Approval queue</a><a href="#library">Research library</a><a href="#media">Media</a><a href="#analytics">Analytics & Council</a></nav>${message ? `<p role="status" class="warning">${esc(message)}</p>` : ""}<section id="overview"><h2>Overview</h2><p>${active.length} active packages · ${active.filter((r) => r.status === "blocked").length} source warnings · ${store.jobs().filter((j) => j.state === "failed").length} failed jobs</p><p>Private storage stays outside Git and Dropbox. No publishing or tracking is enabled.</p><p>Proposed review budget: 10–20 minutes weekly. Review one LinkedIn draft, one monthly brief, and source warnings. Skip optional video when capacity is limited.</p><p>Preparation reuses existing Codex automation; publication dates remain recommendations.</p><details><summary>Jobs and recovery</summary><pre>${esc(JSON.stringify(store.jobs(), null, 2))}</pre><p>Run npm run growth -- prepare for this week's idempotent batch. Correct a failure then use prepare --retry (at most three attempts), or prepare --refresh for a deliberate fresh check. See docs/growth/OPERATING_GUIDE.md.</p></details></section><section id="queue"><h2>Approval queue</h2>${cards || "<p>No packages yet. Run npm run growth -- prepare.</p>"}</section><section id="library"><h2>Research library</h2>${articles.map((a) => `<p><b>${esc(a.shortTitle)}</b> · ${esc(a.version)} · ${a.productionReleased ? "owner released; eligible" : "preview; excluded"} · ${esc(a.publicationDate)}</p>`).join("")}<details><summary>Distribution and revision history</summary><pre>${esc(
      JSON.stringify(
        rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          status: r.status,
          decisions: r.decisions,
          history: r.history,
        })),
        null,
        2,
      ),
    )}</pre></details><h3>Destinations and connections</h3>${destinations.map((d) => `<p><b>${esc(d.platform)}: ${esc(d.status)}</b><br><a href="${esc(d.url)}" rel="noreferrer" target="_blank">${esc(d.url)}</a><br>${esc(d.capability)}</p>`).join("")}</section><section id="media"><h2>Reusable media index</h2><p>Public assets are indexed with hashes. Presence does not authorize derivative reuse. Podcast and concept reels require context and rights review; verified YouTube inventory is NOT VERIFIED.</p><details><summary>Graphics, audio, video previews and templates</summary><pre>${esc(JSON.stringify({ publicAssets: mediaIndex(), connectedEditorResources: store.resources() }, null, 2))}</pre></details></section><section id="analytics"><h2>Analytics and monthly Council</h2><p>${esc(report.quality.status)}. Target 8/10 has not been established.</p><p>No tracking is activated. Imports are owner-reported exports, not authenticated API results. Clicks are not confirmed subscribers.</p><p><a href="/report">Download private monthly report</a> · <a href="/scorecard">View aggregate scorecard</a></p><div class="table"><table><thead><tr><th>Measure</th><th>Evidence</th></tr></thead><tbody>${Object.entries(
      report.outcomes,
    )
      .map(
        ([k, v]) =>
          `<tr><th scope="row">${esc(k)}</th><td>${esc(typeof v === "string" ? v : `${v.value} · ${v.source} · ${v.observedAt} · OWNER-REPORTED`)}</td></tr>`,
      )
      .join(
        "",
      )}</tbody></table></div>${report.councilors.map((c) => `<p><b>${esc(c.role)}</b> — ${esc(c.finding)}</p>`).join("")}<details><summary>All 68 original assessment criteria</summary><div class="table"><table><thead><tr><th>Criterion</th><th>Before / current</th><th>Assessment</th></tr></thead><tbody>${report.criteria.map((c) => `<tr><th scope="row">${esc(c.criterion)}</th><td>${esc(c.baseline ?? "NOT VERIFIED")} / ${esc(c.current ?? "NOT VERIFIED")}</td><td>${esc(c.assessment)}</td></tr>`).join("")}</tbody></table></div></details></section>`,
  );
}

export function createDashboard(store: GrowthStore, port = 4323) {
  const token = randomBytes(32).toString("base64url"),
    session = randomBytes(32).toString("base64url"),
    csrf = randomBytes(32).toString("base64url");
  const host = `127.0.0.1:${port}`,
    origin = `http://${host}`;
  let failedLogins = 0;
  const server = createServer(async (request, response) => {
    const headers = {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin",
      "X-Frame-Options": "DENY",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
      "Content-Type": "text/html; charset=utf-8",
    };
    const send = (status: number, body = "", extra = {}) => {
      response.writeHead(status, { ...headers, ...extra }).end(body);
    };
    if (
      request.headers.host !== host ||
      (request.headers.origin && request.headers.origin !== origin) ||
      request.headers["sec-fetch-site"] === "cross-site"
    )
      return send(403, "Local origin required");
    const url = new URL(request.url ?? "/", origin);
    const authenticated = request.headers.cookie
      ?.split(";")
      .some((c) => same(c.trim(), `io_growth=${session}`));
    const formData = async () => {
      if (request.headers["content-type"] !== "application/x-www-form-urlencoded")
        throw Error("Expected a local form");
      let text = "";
      for await (const chunk of request) {
        text += chunk.toString();
        if (Buffer.byteLength(text) > 16000) throw Error("Request too large");
      }
      return new URLSearchParams(text);
    };
    try {
      if (url.pathname === "/unlock" && request.method === "POST") {
        const form = await formData();
        if (++failedLogins > 20 || !same(form.get("token") ?? "", token))
          return send(401, "Invalid owner token; restart desk if rate limited");
        failedLogins = 0;
        return send(303, "", {
          Location: "/",
          "Set-Cookie": `io_growth=${session}; HttpOnly; SameSite=Strict; Path=/`,
        });
      }
      if (!authenticated) {
        if (url.pathname !== "/" || request.method !== "GET")
          return send(401, "Owner authentication required");
        return send(
          200,
          page(
            '<h1>Unlock the local growth desk</h1><p>Use the owner token printed by npm run dashboard in your terminal. Private records require authentication.</p><form method="post" action="/unlock"><label>Owner token<input name="token" type="password" required autocomplete="off"></label><button>Unlock</button></form>',
          ),
        );
      }
      if (request.method === "POST" && url.pathname === "/action") {
        const form = await formData();
        if (!same(form.get("csrf") ?? "", csrf)) return send(403, "Invalid review token");
        const action = form.get("action");
        if (action === "verify-source")
          store.manualSource(form.get("id") ?? "", form.get("url") ?? "", form.get("note") ?? "");
        else if (action === "approve" || action === "reject")
          store.decide(
            form.get("id") ?? "",
            form.get("channel") as Channel,
            action === "approve" ? "approved" : "rejected",
            {
              sources: form.has("sources"),
              rights: form.has("rights"),
              limitations: form.has("limitations"),
              publicOnly: form.has("publicOnly"),
              note: form.get("note") ?? "",
            },
          );
        else return send(400, "Unknown action");
        return send(303, "", { Location: "/?saved=1#queue" });
      }
      if (request.method !== "GET") return send(405, "Method not allowed");
      if (url.pathname === "/")
        return send(
          200,
          renderDashboard(
            store,
            csrf,
            url.searchParams.has("saved") ? "Review recorded locally. Nothing was published." : "",
          ),
        );
      if (url.pathname === "/api/queue")
        return send(200, JSON.stringify(store.list()), { "Content-Type": "application/json" });
      if (url.pathname === "/scorecard") {
        const report = monthlyReport(store);
        const metrics = Object.fromEntries(
          [
            "searchClicks",
            "searchImpressions",
            "siteVisits",
            "engagedVisits",
            "returningVisits",
            "confirmedSubscribers",
            "newConfirmedSubscribers",
            "unsubscribes",
          ].flatMap((key) => {
            const value = report.outcomes[key];
            return value && typeof value === "object" ? [[key, value.value]] : [];
          }),
        );
        return send(
          200,
          renderScorecard(
            Array.isArray(report.reportingPeriod)
              ? {
                  periodStart: report.reportingPeriod[0],
                  periodEnd: report.reportingPeriod[1],
                  metrics,
                  sources: ["manual"],
                }
              : null,
          ),
        );
      }
      if (url.pathname === "/report")
        return send(200, JSON.stringify(monthlyReport(store), null, 2), {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="observer-monthly-report.json"',
        });
      if (url.pathname === "/download" || url.pathname === "/captions") {
        const row = store.get(url.searchParams.get("id") ?? "");
        if (row.status === "superseded") return send(409, "Superseded package");
        if (url.pathname === "/captions")
          return send(200, row.package.youtube.captionDraft, {
            "Content-Type": "application/x-subrip",
            "Content-Disposition": 'attachment; filename="captions.draft.srt"',
          });
        const channel = url.searchParams.get("channel") as Channel;
        if (!channels.includes(channel)) return send(400, "Unknown channel");
        return send(
          200,
          JSON.stringify(
            {
              status: row.decisions[channel]?.state ?? "DRAFT — NOT APPROVED",
              externalPublishing: "NOT AUTHORIZED",
              gate: row.gate,
              source: row.package.source,
              claims: row.package.claims,
              references: row.package.references,
              draft: row.package[channel],
            },
            null,
            2,
          ),
          {
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename="${channel}-draft.json"`,
          },
        );
      }
      return send(404, "Not found");
    } catch (error) {
      return send(
        400,
        page(
          `<h1>Review was not saved</h1><p>${esc(error instanceof Error ? error.message : "Invalid request")}</p><a href="/">Return to queue</a>`,
        ),
      );
    }
  });
  server.headersTimeout = 15000;
  server.requestTimeout = 20000;
  return { server, token, csrf, origin };
}
