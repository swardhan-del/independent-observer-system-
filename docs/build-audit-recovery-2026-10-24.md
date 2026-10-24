# Build dependency audit recovery

## Verified checkpoint

On 24 October 2026, the website's GitHub main branch and Vercel production both
matched `505edb5635ba5bec7adef518658bb5779874d1d1` before this continuation.
The October 19 search improvement and October 21 press page were already present.
The current Volume III catalogue also already describes From Pockets to Portfolios
through law, time and labor taxation; no duplicate catalogue rewrite was needed.

PR #80 was reused and merged as
`870f2d029b206f0749d9a811a7157457b004181f`. It adds nine page-specific social
preview cards. A fresh local build and all 549 tests passed. Production was then
verified through build-info.json and all nine affected pages: canonical URLs,
Open Graph and Twitter images, alternative text, image dimensions and exact image
bytes matched the reviewed assets. This is evidence of release, not a measured
increase in traffic.

## Why this dependency update is needed

The post-merge hosted verification run
[40130108114](https://github.com/swardhan-del/independent-observer-system-/actions/runs/40130108114)
passed the publication checks and production dependency audit, then failed the
build and test dependency audit. The earlier PR #80 checks had passed on October 21.
The later audit reported six affected packages, including indirect effects:
Astro, Vitest and its mocker, fast-uri, undici and Zod.

The lockfile was refreshed with npm audit fix without force, within the existing
package.json ranges. This resolves Astro to 7.4.2, Vitest and its mocker to 4.1.12,
fast-uri to 3.1.9, undici to 8.12.3 and Zod to 4.6.7. Related dependency graph
changes are retained in the lockfile. Application content, publication flags,
routes, CI gates and deployment settings are unchanged.

## Local verification

- npm audit --audit-level=moderate: zero vulnerabilities reported.
- npm test: Astro check and the 85-page build passed; all 549 tests passed.
- The hosted suite must pass on this PR's exact final commit before normal merge.
- Verify the resulting production commit through Vercel and build-info.json after
  merge. Do not weaken the dependency audit to work around a failure.

## Separate work that remains

PR #59 retains five research adaptations and additional reader tools on its
existing branch; it is unmerged and requires reconciliation with current main.
Its content must retain the existing preview and editorial review boundaries.
The six bounded reading identities from the older PR #61 were already delivered
through PR #77. Do not publish a second copy from that old branch.

Search Console and analytics measurement is still required before claiming the
requested 15 percent visibility increase. Social metadata and a successful
deployment alone do not establish that result.
