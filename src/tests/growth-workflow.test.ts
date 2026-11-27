import { describe, expect, it, afterEach } from "vitest";
import { mkdtempSync, rmSync, statSync, symlinkSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { request as httpRequest } from "node:http";
import {
  articles,
  canonical,
  makePackage,
  verifyTraceability,
  repoRoot,
} from "../../scripts/growth/packages";
import { GrowthStore, privateDirectory } from "../../scripts/growth/store";
import {
  verifyPackage,
  publicAddress,
  publicUrl,
  type Inspector,
  type Gate,
} from "../../scripts/growth/verification";
import { monthlyReport, validateMetrics, saveMetrics } from "../../scripts/growth/reporting";
import { prepare, weekKey } from "../../scripts/growth/workflow";
import { createDashboard } from "../../scripts/growth/dashboard";

const cleanups: (() => void)[] = [];
afterEach(() => {
  for (const fn of cleanups.splice(0).reverse()) fn();
});
const article = articles.find((a) => a.slug === "the-last-human-workforce")!;
const fixtureInspector: Inspector = async (url) => ({
  url,
  state: "ok",
  status: 200,
  checkedAt: new Date().toISOString(),
  attempts: 1,
  reason: "TEST FIXTURE",
  body: `<link rel="canonical" href="${url}">${article.version} ${article.publicationDate} ${article.standfirst} ${article.paragraphs.join(" ")} ${article.limitations}`,
});
function setup() {
  const path = mkdtempSync(join(tmpdir(), "observer-growth-test-"));
  const store = new GrowthStore(path);
  cleanups.push(() => rmSync(path, { recursive: true, force: true }));
  cleanups.push(() => {
    try {
      store.close();
    } catch {
      /* already closed in persistence test */
    }
  });
  return { path, store };
}
async function seeded() {
  const result = setup();
  const p = makePackage(article);
  const gate = await verifyPackage(p, article, fixtureInspector);
  result.store.put(p, gate);
  return { ...result, p, gate };
}
const review = {
  sources: true,
  rights: true,
  limitations: true,
  publicOnly: true,
  note: "Test fixture only; not real editorial approval",
};

describe("approved-source distribution", () => {
  it("generates every released article and excludes both public previews", () => {
    for (const a of articles) {
      if (a.productionReleased) {
        const p = makePackage(a);
        expect(p.linkedin.post.length).toBeLessThanOrEqual(3000);
        expect(p.youtube.stages.approvedForUpload).toBe(false);
        expect(p.source.canonicalUrl).toBe(canonical(a));
      } else expect(() => makePackage(a)).toThrow(/released/);
    }
  });
  it("rejects a forged article, uncited numerical paragraph and changed derivative claim", () => {
    expect(() => makePackage({ ...article, standfirst: "Made up" })).toThrow(/modified/);
    expect(() => makePackage(article, 3)).toThrow(/source-linked/);
    const p = makePackage(article);
    p.linkedin.post += " Invented 99% result.";
    expect(() => verifyTraceability(p, article)).toThrow(/differs/);
  });
  it("has deterministic ids, exact claim excerpts, separate limits and a bounded caption draft", () => {
    const p = makePackage(article);
    expect(p.id).toBe(makePackage(article).id);
    expect(p.claims[1].text).toBe(article.paragraphs[p.claims[1].paragraph!]);
    expect(p.claims[1].sourceIndexes.length).toBeGreaterThan(0);
    expect(p.substack.limitations.text).toBe(article.limitations);
    expect(p.youtube.captionDraft).toMatch(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/);
    expect(p.youtube.captionDraft).not.toMatch(/\d{2}:\d{2}:\d{2}\.\d+,000/);
  });
  it("blocks a reachable page with the wrong canonical, edition or text", async () => {
    const p = makePackage(article);
    const gate = await verifyPackage(p, article, async (url) => ({
      ...(await fixtureInspector(url)),
      body: "Other article",
    }));
    expect(gate.ready).toBe(false);
    expect(gate.warnings.join()).toContain("canonical");
  });
  it("quarantines inaccessible sources rather than calling a 403 verified", async () => {
    const p = makePackage(article);
    const gate = await verifyPackage(p, article, async (url) =>
      url === canonical(article)
        ? fixtureInspector(url)
        : {
            url,
            state: "manual_required",
            status: 403,
            checkedAt: new Date().toISOString(),
            attempts: 1,
            reason: "TEST FIXTURE",
          },
    );
    expect(gate.ready).toBe(false);
    expect(gate.links[1].state).toBe("manual_required");
  });
  it("persists packages/decisions across restarts and deduplicates exact revisions", async () => {
    const { store, path, p, gate } = await seeded();
    store.decide(p.id, "linkedin", "approved", review);
    store.put(p, gate);
    expect(store.list()).toHaveLength(1);
    store.close();
    const reopened = new GrowthStore(path);
    cleanups.push(() => reopened.close());
    expect(reopened.get(p.id).decisions.linkedin?.state).toBe("approved");
    expect(reopened.get(p.id).package.youtube.stages.approvedForUpload).toBe(false);
  });
  it("requires rights and factual review and refuses stale or blocked approval", async () => {
    const { store, p, gate } = await seeded();
    expect(() => store.decide(p.id, "linkedin", "approved", { ...review, rights: false })).toThrow(
      /rights/,
    );
    store.put(p, { ...gate, checkedAt: "2020-01-01T00:00:00Z" });
    expect(() => store.decide(p.id, "linkedin", "approved", review)).toThrow(/Fresh/);
    store.put(p, { ...gate, ready: false, warnings: ["Broken source"] });
    expect(() => store.decide(p.id, "linkedin", "approved", review)).toThrow(/Fresh/);
    store.decide(p.id, "linkedin", "rejected", { ...review, rights: false });
    expect(store.get(p.id).decisions.linkedin?.state).toBe("rejected");
  });
  it("invalidates decisions on verification failure and supersedes alternate revisions", async () => {
    const { store, p, gate } = await seeded();
    store.decide(p.id, "linkedin", "approved", review);
    store.put(p, { ...gate, ready: false, warnings: ["Source changed"] });
    expect(store.get(p.id).decisions).toEqual({});
    const next = makePackage(article, 4);
    store.put(next, { ...gate, sourceHash: next.sourceHash });
    expect(store.get(p.id).status).toBe("superseded");
    expect(() => store.decide(p.id, "linkedin", "approved", review)).toThrow(/superseded/);
    expect(() => store.export(p.id, "linkedin")).toThrow(/Superseded/);
    store.put(p, gate);
    expect(store.get(p.id).status).toBe("awaiting_review");
    expect(store.get(p.id).decisions).toEqual({});
  });
  it("allows documented owner source corrections, never a canonical bypass", async () => {
    const { store, p, gate } = await seeded();
    const url = article.sourceNotes[0].href;
    const blocked: Gate = {
      ...gate,
      ready: false,
      warnings: [`Reference needs manual verification: ${article.sourceNotes[0].label}`],
      links: gate.links.map((l) =>
        l.url === url ? { ...l, state: "manual_required", status: 403 } : l,
      ),
    };
    store.put(p, blocked);
    expect(() => store.manualSource(p.id, canonical(article), review.note)).toThrow(
      /known inaccessible/,
    );
    expect(() => store.manualSource(p.id, url, "yes")).toThrow(/passage/);
    store.manualSource(p.id, url, "TEST FIXTURE: original paragraph, measure and date checked.");
    expect(store.get(p.id).gate.ready).toBe(true);
    expect(store.get(p.id).history.length).toBeGreaterThan(1);
  });
  it("exports drafts locally with provenance and no upload authorization", async () => {
    const { store, p } = await seeded();
    const file = store.export(p.id, "youtube");
    expect(JSON.parse(readFileSync(file, "utf8")).publishing).toContain("NOT AUTHORIZED");
    expect(statSync(file).mode & 0o077).toBe(0);
    expect(store.export(p.id, "youtube")).toBe(file);
  });
});

describe("automation and privacy", () => {
  it("prevents concurrent duplicate jobs across store connections and caps explicit retries", () => {
    const { path, store } = setup(),
      other = new GrowthStore(path);
    cleanups.push(() => other.close());
    expect(store.startJob("weekly")).toBe(true);
    expect(other.startJob("weekly")).toBe(false);
    store.finishJob("weekly", "failed");
    expect(() => other.startJob("weekly")).toThrow(/explicit retry/);
    expect(other.startJob("weekly", true)).toBe(true);
    other.finishJob("weekly", "failed");
    expect(store.startJob("weekly", true)).toBe(true);
    store.finishJob("weekly", "failed");
    expect(() => other.startJob("weekly", true)).toThrow(/three/);
  });
  it("runs an idempotent preparation and monthly report with no invented growth", async () => {
    const { store } = setup();
    expect((await prepare(store, { slug: article.slug, inspect: fixtureInspector })).prepared).toBe(
      1,
    );
    expect((await prepare(store, { slug: article.slug, inspect: fixtureInspector })).skipped).toBe(
      true,
    );
    const report = monthlyReport(store);
    expect(report.criteria).toHaveLength(68);
    expect(report.quality.targetReached).toBe(false);
    expect(report.outcomes.confirmedSubscribers).toBe("NOT VERIFIED");
    expect(report.queue.externalPublications).toContain("NOT VERIFIED");
    expect(weekKey(new Date("2026-11-22T23:30:00Z"))).toBe("2026-11-23");
  });
  it("rejects private/cloud/repository storage, including symlink escapes", () => {
    expect(() => privateDirectory(join(repoRoot, "private/growth"))).toThrow(/outside/);
    expect(() =>
      privateDirectory("/Users/siddharthawardhan/Library/CloudStorage/Dropbox/growth-test"),
    ).toThrow(/outside/);
    const { path } = setup();
    symlinkSync(repoRoot, join(path, "repo-link"));
    expect(() => privateDirectory(join(path, "repo-link/private"))).toThrow(/outside/);
  });
  it("rejects SSRF URLs and private/reserved addresses, including mapped IPv6", () => {
    for (const url of [
      "http://example.org",
      "https://127.0.0.1/",
      "https://user:pass@example.org",
      "https://example.org:444/",
      "https://host.local/",
    ])
      expect(() => publicUrl(url)).toThrow();
    for (const ip of [
      "127.0.0.1",
      "10.0.1.1",
      "169.254.169.254",
      "172.16.0.2",
      "192.168.1.1",
      "::1",
      "fc00::1",
      "::ffff:127.0.0.1",
    ])
      expect(publicAddress(ip)).toBe(false);
    expect(publicAddress("8.8.8.8")).toBe(true);
  });
  it("requires metric provenance, rejects PII and keeps click and subscriber measures separate", () => {
    const data = {
      periodStart: "2026-11-01",
      periodEnd: "2026-11-20",
      metrics: {
        searchClicks: {
          value: 7,
          source: "gsc",
          evidenceRef: "export-gsc-20261120",
          observedAt: "2026-11-20",
        },
      },
    };
    expect(validateMetrics(data).metrics.searchClicks?.value).toBe(7);
    expect(() => validateMetrics({ ...data, email: "private@example.org" })).toThrow(/Unknown/);
    expect(() =>
      validateMetrics({ ...data, metrics: { confirmedSubscribers: data.metrics.searchClicks } }),
    ).toThrow(/matching source/);
    expect(() => validateMetrics({ ...data, periodStart: "2026-02-31" })).toThrow(/period/);
    const { store } = setup();
    saveMetrics(store, data);
    const report = monthlyReport(store, "2026-11");
    expect(report.outcomes.confirmedSubscribers).toBe("NOT VERIFIED");
    expect(report.outcomes.searchClicks).toHaveProperty("value", 7);
  });
  it("protects APIs, exports, reports, mutations and DNS rebinding with owner auth", async () => {
    const { store, p } = await seeded();
    const { server, token, origin, csrf } = createDashboard(store, 4899);
    await new Promise<void>((r) => server.listen(4899, "127.0.0.1", r));
    try {
      for (const route of [
        "/api/queue",
        "/report",
        `/download?id=${p.id}&channel=linkedin`,
        `/captions?id=${p.id}`,
      ])
        expect((await fetch(origin + route)).status).toBe(401);
      const rebound = await new Promise<number>((resolve, reject) => {
        const req = httpRequest(origin, { headers: { Host: "attacker.example" } }, (res) => {
          res.resume();
          resolve(res.statusCode!);
        });
        req.on("error", reject);
        req.end();
      });
      expect(rebound).toBe(403);
      const login = await fetch(origin + "/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Origin: origin },
        body: new URLSearchParams({ token }),
        redirect: "manual",
      });
      const cookie = login.headers.get("set-cookie")!.split(";")[0];
      expect(login.headers.get("set-cookie")).toContain("HttpOnly; SameSite=Strict");
      expect((await fetch(origin + "/api/queue", { headers: { Cookie: cookie } })).status).toBe(
        200,
      );
      const form = {
        id: p.id,
        channel: "linkedin",
        action: "approve",
        note: review.note,
        sources: "on",
        rights: "on",
        limitations: "on",
        publicOnly: "on",
      };
      const headers = {
        Cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: origin,
      };
      expect(
        (
          await fetch(origin + "/action", {
            method: "POST",
            headers,
            body: new URLSearchParams(form),
          })
        ).status,
      ).toBe(403);
      expect(
        (
          await fetch(origin + "/action", {
            method: "POST",
            headers: { ...headers, Origin: "https://attacker.example" },
            body: new URLSearchParams({ ...form, csrf }),
          })
        ).status,
      ).toBe(403);
      expect(
        (
          await fetch(origin + "/publish", {
            method: "POST",
            headers,
            body: new URLSearchParams({ ...form, csrf }),
          })
        ).status,
      ).toBe(405);
      const saved = await fetch(origin + "/action", {
        method: "POST",
        headers,
        body: new URLSearchParams({ ...form, csrf }),
        redirect: "manual",
      });
      expect(saved.status).toBe(303);
      expect(store.get(p.id).decisions.linkedin?.state).toBe("approved");
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });
});
