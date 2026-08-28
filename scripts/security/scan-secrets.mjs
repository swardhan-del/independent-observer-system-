import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const detectors = [
  ["GitHub token", /(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}/g],
  ["Stripe key", /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["Stripe webhook secret", /\bwhsec_[A-Za-z0-9]{16,}\b/g],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["Private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ["Credential URL", /\b(?:postgres(?:ql)?|mysql|redis):\/\/[^\s"'<>]+/gi],
  ["Bearer token", /\bBearer\s+[A-Za-z0-9._-]{24,}/g],
  [
    "Inline credential assignment",
    /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{12,}["']/gi,
  ],
];
const ignored = new Set(["scripts/security/scan-secrets.mjs"]);
const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);
const findings = [];
for (const file of files) {
  if (ignored.has(file) || /(^|\/)(node_modules|dist|\.next|coverage)\//.test(file)) continue;
  let contents;
  try {
    contents = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (contents.includes("\u0000")) continue;
  const lines = contents.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const [name, detector] of detectors) {
      detector.lastIndex = 0;
      const match = detector.exec(line);
      if (!match) continue;
      const value = match[0];
      const fixture =
        /your[_-]|example|placeholder|changeme|replace[_-]|<[^>]+>|example\.test|localhost|127\.0\.0\.1|fixture/i.test(
          value,
        ) || /(^|\/)(test|tests|__tests__)\//i.test(file);
      const fingerprint = createHash("sha256").update(value).digest("hex").slice(0, 12);
      findings.push({
        name,
        file,
        line: index + 1,
        fingerprint,
        status: fixture ? "BENIGN_FIXTURE" : "POSSIBLE",
      });
    }
  });
}
if (findings.length) {
  for (const finding of findings)
    console.log(
      `${finding.name} — ${finding.file}:${finding.line} — ${finding.status} — REDACTED-${finding.fingerprint}`,
    );
  if (findings.some((finding) => finding.status === "POSSIBLE")) process.exitCode = 1;
} else {
  console.log(
    "No possible active credentials found in tracked text files. Values were never printed.",
  );
}
