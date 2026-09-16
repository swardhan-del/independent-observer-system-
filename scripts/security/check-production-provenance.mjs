import { createHash } from "node:crypto";

const expectedRepository = "swardhan-del/independent-observer-system-";
const expectedBranch = "main";
const env = process.env;
const isVercel = Boolean(env.VERCEL_ENV || env.VERCEL_DEPLOYMENT_ID || env.VERCEL_GIT_COMMIT_SHA);
const metadata = {
  deploymentId: env.VERCEL_DEPLOYMENT_ID || null,
  commit: env.VERCEL_GIT_COMMIT_SHA || env.GITHUB_SHA || null,
  branch: env.VERCEL_GIT_COMMIT_REF || env.GITHUB_REF_NAME || null,
  repository:
    [env.VERCEL_GIT_REPO_OWNER, env.VERCEL_GIT_REPO_SLUG].filter(Boolean).join("/") ||
    env.GITHUB_REPOSITORY ||
    null,
  pullRequest: env.VERCEL_GIT_PULL_REQUEST_ID || null,
};
const flags = [];

if (isVercel && env.VERCEL_ENV === "production") {
  if (metadata.branch && metadata.branch !== expectedBranch)
    flags.push("PRODUCTION_NOT_FROM_DEFAULT_BRANCH");
  if (metadata.repository && metadata.repository !== expectedRepository)
    flags.push("PRODUCTION_REPOSITORY_MISMATCH");
  if (!metadata.commit || !metadata.branch || !metadata.repository)
    flags.push("PRODUCTION_PROVENANCE_UNKNOWN");
  if (env.VERCEL_MANUAL_PROMOTION === "true" || env.VERCEL_DEPLOYMENT_ORIGIN === "preview")
    flags.push("UNVERIFIED_MANUAL_PROMOTION");
}

const fingerprint = metadata.commit
  ? createHash("sha256").update(metadata.commit).digest("hex").slice(0, 16)
  : null;
console.log(
  JSON.stringify(
    {
      policy: { repository: expectedRepository, defaultBranch: expectedBranch },
      observed: { ...metadata, commitFingerprint: fingerprint },
      flags,
      status: flags.length ? "REVIEW_REQUIRED" : isVercel ? "CHECKED" : "NOT_A_VERCEL_RUNTIME",
    },
    null,
    2,
  ),
);
if (flags.length) process.exitCode = 1;
