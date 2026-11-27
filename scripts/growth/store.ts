import { DatabaseSync } from "node:sqlite";
import { mkdirSync, statSync, lstatSync, realpathSync, existsSync, writeFileSync } from "node:fs";
import { resolve, join, relative, isAbsolute, dirname } from "node:path";
import { homedir } from "node:os";
import {
  articles,
  channels,
  digest,
  repoRoot,
  requireReleased,
  verifyTraceability,
  channelCopy,
  type Channel,
  type DraftPackage,
} from "./packages";
import type { Gate } from "./verification";

export function privateDirectory(
  input = join(homedir(), "Library/Application Support/Independent Observer/growth"),
) {
  if (!isAbsolute(input)) throw Error("Private storage needs an absolute path");
  let ancestor = resolve(input);
  const missing: string[] = [];
  while (!existsSync(ancestor)) {
    missing.unshift(ancestor.slice(dirname(ancestor).length + 1));
    ancestor = dirname(ancestor);
  }
  const path = resolve(realpathSync(ancestor), ...missing);
  for (let parent = path; parent !== dirname(parent); parent = dirname(parent)) {
    if (existsSync(join(parent, ".git")))
      throw Error("Private storage must be outside every Git repository");
  }
  const inRepo = relative(realpathSync(repoRoot), path);
  if (
    !inRepo ||
    (inRepo !== ".." && !inRepo.startsWith(`../`) && !isAbsolute(inRepo)) ||
    /(?:^|\/)(?:Dropbox|CloudStorage|\.git)(?:\/|$)/i.test(path)
  )
    throw Error("Private storage must be outside the repository, Dropbox and cloud storage");
  if (existsSync(path) && lstatSync(resolve(input)).isSymbolicLink())
    throw Error("Private directory cannot be a symlink");
  mkdirSync(path, { recursive: true, mode: 0o700 });
  const info = statSync(path);
  if (
    !info.isDirectory() ||
    info.mode & 0o077 ||
    (typeof process.getuid === "function" && info.uid !== process.getuid())
  )
    throw Error("Private storage must be owned by you with mode 0700");
  return path;
}

export type QueueRecord = {
  id: string;
  slug: string;
  status: string;
  package: DraftPackage;
  gate: Gate;
  decisions: Partial<Record<Channel, { state: string; at: string; note: string }>>;
  history: unknown[];
};
export type Review = {
  sources: boolean;
  rights: boolean;
  limitations: boolean;
  publicOnly: boolean;
  note: string;
};

export class GrowthStore {
  db: DatabaseSync;
  directory: string;
  constructor(path?: string) {
    this.directory = privateDirectory(path);
    process.umask(0o077);
    const file = join(this.directory, "queue.sqlite");
    if (existsSync(file) && (lstatSync(file).isSymbolicLink() || statSync(file).mode & 0o077))
      throw Error("Unsafe database permissions or symlink");
    this.db = new DatabaseSync(file);
    this.db.exec(`PRAGMA busy_timeout=5000; PRAGMA journal_mode=DELETE; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS packages(id TEXT PRIMARY KEY, slug TEXT NOT NULL, status TEXT NOT NULL, package TEXT NOT NULL, gate TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS decisions(package_id TEXT NOT NULL REFERENCES packages(id), channel TEXT NOT NULL, state TEXT NOT NULL, at TEXT NOT NULL, note TEXT NOT NULL, PRIMARY KEY(package_id, channel));
      CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY, package_id TEXT, at TEXT NOT NULL, kind TEXT NOT NULL, detail TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS jobs(key TEXT PRIMARY KEY, state TEXT NOT NULL, attempts INTEGER NOT NULL, updated TEXT NOT NULL, error TEXT);
      CREATE TABLE IF NOT EXISTS reports(month TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS metrics(month TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS media_resources(url TEXT PRIMARY KEY, data TEXT NOT NULL);`);
  }
  close() {
    this.db.close();
  }
  transaction<T>(fn: () => T) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const value = fn();
      this.db.exec("COMMIT");
      return value;
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }
  event(id: string | null, kind: string, detail: unknown) {
    this.db
      .prepare("INSERT INTO events(package_id,at,kind,detail) VALUES(?,?,?,?)")
      .run(id, new Date().toISOString(), kind, JSON.stringify(detail));
  }
  put(p: DraftPackage, gate: Gate) {
    const article = articles.find((a) => a.slug === p.slug);
    if (!article || gate.sourceHash !== p.sourceHash) throw Error("Gate/source mismatch");
    verifyTraceability(p, article);
    return this.transaction(() => {
      this.db
        .prepare("UPDATE packages SET status='superseded' WHERE slug=? AND id<>?")
        .run(p.slug, p.id);
      const old = this.db.prepare("SELECT status FROM packages WHERE id=?").get(p.id);
      const status = gate.ready
        ? old?.status === "rejected"
          ? "rejected"
          : "awaiting_review"
        : "blocked";
      this.db
        .prepare(
          "INSERT INTO packages VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET gate=excluded.gate,status=excluded.status",
        )
        .run(p.id, p.slug, status, JSON.stringify(p), JSON.stringify(gate));
      if (!gate.ready || old?.status === "superseded")
        this.db.prepare("DELETE FROM decisions WHERE package_id=?").run(p.id);
      this.event(p.id, old ? "gate_refreshed" : "generated", {
        ready: gate.ready,
        warnings: gate.warnings,
      });
      return p.id;
    });
  }
  list(): QueueRecord[] {
    return this.db
      .prepare("SELECT * FROM packages ORDER BY rowid DESC")
      .all()
      .map((row) => {
        const p = JSON.parse(String(row.package)) as DraftPackage;
        const { id, ...body } = p;
        if (digest(body) !== id || id !== row.id) throw Error("Stored package integrity failed");
        const decisions = Object.fromEntries(
          this.db
            .prepare("SELECT * FROM decisions WHERE package_id=?")
            .all(String(row.id))
            .map((r) => [
              r.channel,
              { state: String(r.state), at: String(r.at), note: String(r.note) },
            ]),
        );
        return {
          id: String(row.id),
          slug: String(row.slug),
          status: String(row.status),
          package: p,
          gate: JSON.parse(String(row.gate)),
          decisions,
          history: this.db
            .prepare("SELECT at,kind,detail FROM events WHERE package_id=? ORDER BY id")
            .all(String(row.id)),
        };
      });
  }
  get(id: string) {
    const row = this.list().find((p) => p.id === id);
    if (!row) throw Error("Unknown package");
    return row;
  }
  decide(
    id: string,
    channel: Channel,
    decision: "approved" | "rejected",
    review: Review,
    now = new Date(),
  ) {
    if (!channels.includes(channel) || !["approved", "rejected"].includes(decision))
      throw Error("Invalid decision");
    if (!review.note?.trim() || review.note.length > 1000)
      throw Error("A bounded review note is required");
    return this.transaction(() => {
      const row = this.get(id);
      if (row.status === "superseded") throw Error("Source/package was superseded");
      const article = articles.find((a) => a.slug === row.slug);
      if (!article) throw Error("Source is missing");
      requireReleased(article);
      verifyTraceability(row.package, article);
      const age = now.getTime() - Date.parse(row.gate.checkedAt);
      if (
        decision === "approved" &&
        (!row.gate.ready || !Number.isFinite(age) || age < 0 || age > 7 * 86400000)
      )
        throw Error("Fresh passing source checks required before approval");
      if (
        decision === "approved" &&
        ![review.sources, review.rights, review.limitations, review.publicOnly].every(Boolean)
      )
        throw Error("Source, derivative rights, limitations and public-only review are required");
      // Video upload is deliberately not authorized by a script review.
      this.db
        .prepare(
          "INSERT INTO decisions VALUES(?,?,?,?,?) ON CONFLICT(package_id,channel) DO UPDATE SET state=excluded.state,at=excluded.at,note=excluded.note",
        )
        .run(id, channel, decision, now.toISOString(), review.note.trim());
      this.event(id, decision, {
        channel,
        review,
        scope:
          channel === "youtube"
            ? "script/package review only; upload NOT authorized"
            : "copy review only; external publication requires separate authorization",
      });
    });
  }
  manualSource(id: string, url: string, note: string) {
    if (note.trim().length < 20 || note.length > 1000)
      throw Error(
        "Record the original passage/date and why it supports the claim (20-1000 characters)",
      );
    return this.transaction(() => {
      const row = this.get(id);
      if (row.status === "superseded") throw Error("Superseded package");
      const link = row.gate.links.find((l) => l.url === url);
      if (!link || url === row.package.source.canonicalUrl || link.state === "ok")
        throw Error("Only a known inaccessible reference can receive owner verification");
      const label = row.package.references.find((s) => s.href === url)?.label;
      if (!label) throw Error("Unknown reference");
      row.gate.warnings = row.gate.warnings.filter(
        (s) => s !== `Reference needs manual verification: ${label}`,
      );
      link.reason = "Owner verified original passage; see private review history";
      link.state = "ok";
      row.gate.ready = row.gate.warnings.length === 0;
      this.db
        .prepare("UPDATE packages SET gate=?,status=? WHERE id=?")
        .run(JSON.stringify(row.gate), row.gate.ready ? "awaiting_review" : "blocked", id);
      this.event(id, "manual_source_verification", { url, note });
    });
  }
  startJob(key: string, retry = false, now = new Date()) {
    return this.transaction(() => {
      const job = this.db.prepare("SELECT * FROM jobs WHERE key=?").get(key);
      if (job?.state === "succeeded") return false;
      if (job?.state === "running" && now.getTime() - Date.parse(String(job.updated)) < 30 * 60000)
        return false;
      if (job && (!retry || Number(job.attempts) >= 3))
        throw Error("Job failed or was interrupted; explicit retry permitted up to three attempts");
      this.db
        .prepare(
          "INSERT INTO jobs VALUES(?,'running',1,?,NULL) ON CONFLICT(key) DO UPDATE SET state='running',attempts=attempts+1,updated=excluded.updated,error=NULL",
        )
        .run(key, now.toISOString());
      return true;
    });
  }
  finishJob(key: string, error?: string) {
    this.db
      .prepare("UPDATE jobs SET state=?,updated=?,error=? WHERE key=?")
      .run(error ? "failed" : "succeeded", new Date().toISOString(), error ?? null, key);
  }
  jobs() {
    return this.db.prepare("SELECT * FROM jobs ORDER BY updated DESC LIMIT 30").all();
  }
  recordMedia(resource: {
    slug: string;
    title: string;
    url: string;
    kind: "editor_timeline" | "editor_project" | "existing_export";
    verifiedAt: string;
    revision: number;
  }) {
    if (
      !articles.some((a) => a.productionReleased && a.slug === resource.slug) ||
      !resource.title.trim() ||
      resource.title.length > 180 ||
      !["editor_timeline", "editor_project", "existing_export"].includes(resource.kind) ||
      !Number.isSafeInteger(resource.revision) ||
      resource.revision < 0 ||
      !Number.isFinite(Date.parse(resource.verifiedAt))
    )
      throw Error("Invalid media resource");
    const url = new URL(resource.url);
    if (
      url.origin !== "https://invideo.io" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password ||
      !url.pathname.startsWith("/@")
    )
      throw Error("Use a stable editor URL, never a signed download or credential");
    const data = {
      ...resource,
      status:
        "Existing private draft; matching source, reuse rights and final content require review",
      uploadApproved: false,
    };
    this.db
      .prepare(
        "INSERT INTO media_resources VALUES(?,?) ON CONFLICT(url) DO UPDATE SET data=excluded.data",
      )
      .run(url.href, JSON.stringify(data));
    this.event(null, "existing_media_indexed", {
      url: url.href,
      kind: resource.kind,
      externalPublication: false,
    });
  }
  resources() {
    return this.db
      .prepare("SELECT data FROM media_resources ORDER BY url")
      .all()
      .map((r) => JSON.parse(String(r.data)));
  }
  export(id: string, channel: Channel) {
    if (!channels.includes(channel)) throw Error("Unknown channel");
    const row = this.get(id);
    if (row.status === "superseded") throw Error("Superseded package cannot be exported");
    const directory = privateDirectory(join(this.directory, "exports"));
    const file = join(directory, `${row.slug}-${id.slice(0, 12)}-${channel}.json`);
    const text =
      JSON.stringify(
        {
          status: row.decisions[channel]?.state ?? "DRAFT — NOT APPROVED",
          publishing:
            "NOT AUTHORIZED. Manual review and external publication authorization required.",
          gate: row.gate,
          provenance: row.package.source,
          claims: row.package.claims,
          draft: row.package[channel],
        },
        null,
        2,
      ) + "\n";
    // Re-exporting the same revision never overwrites another review artifact.
    const dated = `${file.slice(0, -5)}-${digest(text).slice(0, 12)}.json`;
    if (!existsSync(dated)) writeFileSync(dated, text, { mode: 0o600, flag: "wx" });
    const copyFile = dated.replace(/\.json$/, ".draft.md");
    if (!existsSync(copyFile))
      writeFileSync(
        copyFile,
        `DRAFT — ${row.decisions[channel]?.state ?? "NOT APPROVED"}\nExternal publication is NOT AUTHORIZED. Resolve source warnings and review final copy.\n\n${channelCopy(row.package, channel)}\n`,
        { mode: 0o600, flag: "wx" },
      );
    if (channel === "youtube") {
      const captions = dated.replace(/\.json$/, ".draft.srt");
      if (!existsSync(captions))
        writeFileSync(captions, row.package.youtube.captionDraft, { mode: 0o600, flag: "wx" });
    }
    this.event(id, "local_export", { channel, externalPublication: false });
    return dated;
  }
}
