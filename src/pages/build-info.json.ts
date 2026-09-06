import type { APIRoute } from "astro";

import { execFileSync } from "node:child_process";
import { resolveCommitSha } from "../lib/build-provenance";

let localSha: string | undefined;
try {
  localSha = execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
} catch {
  /* Source archives may not include Git metadata. */
}
const commitSha = resolveCommitSha(
  [process.env.VERCEL_GIT_COMMIT_SHA, process.env.GITHUB_SHA, process.env.COMMIT_SHA, localSha],
  process.env.VERCEL_ENV === "production",
);
const buildTimestamp = process.env.BUILD_TIMESTAMP ?? new Date().toISOString();

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        project: "independent-observer",
        commitSha,
        buildTimestamp,
      },
      null,
      2,
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60, must-revalidate",
      },
    },
  );
