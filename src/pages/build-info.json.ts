import type { APIRoute } from "astro";

const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  process.env.COMMIT_SHA ??
  "unknown";
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
