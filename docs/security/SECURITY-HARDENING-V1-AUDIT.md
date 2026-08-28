# Independent Observer security hardening v1 audit

Date: 2026-08-28  
Branch: `security/platform-hardening-v1`  
Repository: `swardhan-del/independent-observer-system-`  
Repository ID: `1306506841`  
Default branch: `main`  
Verified remote default SHA before changes: `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`

## Verdict

**FAIL for security-hardened release; PASS WITH WARNINGS for the code changes in this branch.** The branch adds meaningful defense in depth, but GitHub main protection, Vercel deployment/firewall state, production provenance, and hosted CodeQL results are not all verifiable here. The PR must remain draft until a human reviews it.

## Inventory and evidence

- Public Astro static site. Package manager: npm; lockfile: `package-lock.json`; Node is declared by CI as 22 and Vercel project metadata reported Node 24.x.
- Vercel project: `independent-observer`, project ID `prj_KF5jNuvfO4aK4dV0WIJfcWoezNGX`, linked to the expected GitHub repository. Observed domains/aliases: `independentobserver.org`, `www.independentobserver.org`, `independent-observer.vercel.app`, and `independent-observer-swardhan1-9944s-projects.vercel.app`.
- Observed production deployment included a READY deployment but did not expose sufficient Git provenance metadata in the accessible response. Latest observed preview was PR #29 / SHA `112390c...`; this is not production evidence.
- Public routes are generated pages, feed, sitemap, robots, and browser-only reading-list/localStorage UI. No server API, webhook, database, authentication, or upload route was found.
- GitHub rulesets and branch protection were not readable from the available API context; do not infer that they exist. Open PRs were observed, including PR #29 and PR #28; neither was merged by this audit.

## Findings

### Critical

None confirmed.

### High

- **H1 — production provenance and Vercel access controls unverified.** The accessible deployment metadata was insufficient to prove that production can only receive reviewed `main` commits. Human action: verify Deployment Protection, Git linkage, production branch, team members, manual-promotion controls, and audit events.
- **H2 — native WAF/system mitigation state unverified.** CLI firewall queries failed because the local session was unauthenticated. No rule was published.

### Moderate

- **M1 — main protection/rulesets unverified.** GitHub endpoints returned inaccessible/upgrade responses. Configure PR-only changes, no force-push/delete, required CI/security/build checks, and an emergency owner recovery path.
- **M2 — Dropbox sync branch gate is not cryptographic attestation.** It remains scoped to an exact approved feed and generated file, now with a protected `dropbox-sync` environment recommendation. Add human-required environment reviewers and review the generated diff.
- **M3 — CSP retains `unsafe-inline` for the inline JSON-LD contract.** The scroll handler was moved to a static asset and `unsafe-eval` is absent. A future nonce/hash or fully static JSON-LD refactor can remove the remaining inline allowance.

### Low

- **L1 — public operational wording may reveal more internal archive taxonomy than necessary.** Review public copy and generalize internal folder names where they do not serve readers.

## Secret exposure

Tracked text scanning was added and is designed to print only detector/path/line/redacted fingerprint. `.gitignore` excludes `.env`, `.env.*` except `.env.example`, generated secret material, and Vercel local state. No active credential was intentionally added. A complete historical secret scan and GitHub secret-scanning/push-protection status require owner/GitHub-side verification; no secret value is reproduced here.

## Dependencies and lifecycle scripts

The initial npm audit found five advisories in build/dev transitive dependencies (`fast-uri`, `js-yaml`, `nanoid`, `postcss`, `sharp`); a non-forced `npm audit fix` resolved the local audit to zero vulnerabilities. Install scripts remain limited to package-managed `esbuild`, `fsevents`, and `sharp`/related build tooling; no new script permission was added. Re-run `npm audit` and review the lockfile in CI before merge.

## GitHub security

CI/deploy/sync action references are pinned to immutable commits with human-readable version comments. Default permissions are read-only; write permissions are scoped to Pages or the sync job. Dependency review, Dependabot, CodeQL, provenance, and secret scan workflow steps are added. GitHub branch protection, rulesets, Actions approval policy, and collaborator review remain human-required.

## Vercel and firewall

Headers are staged in `vercel.json`. The firewall proposal is exact-path, LOG-first common-probe detection with no global rate limit or User-Agent blocking. `vercel firewall diff` and native firewall state were unavailable without authentication; the firewall remains **UNSTAGED** and **UNPUBLISHED**.

## Application/publication security

The public feed remains generated from the approved boundary. Reading-list imports now reject external/protocol-relative/backslash/control-character/traversal/encoded-protocol paths, oversized files, malformed metadata, and excess records. Rendering uses text nodes/DOM properties rather than HTML injection. No raw Dropbox files, credentials, internal IDs, or private evidence are intentionally copied into the public build.

## Production provenance

`scripts/security/check-production-provenance.mjs` emits deployment/commit/branch/repository metadata without secrets and flags non-default-branch, repository mismatch, unknown provenance, and unverified manual promotion when Vercel exposes those signals. It does not roll back or promote anything.

## Tests

Added reading-list security tests and workflow assertions. Verification recorded: `npm ci` passed; `npm run format:check` passed; `npm run lint` passed; `npm test` passed with 87 tests; `npm run build:pages` passed; `npm run test:built` passed with 87 tests; `SITE_URL=https://independentobserver.org BASE_PATH=/ npm run build` passed; `SEO_SITE_URL=https://independentobserver.org npm run seo:audit` passed for 22 HTML files; `npm audit --audit-level=high` passed with 0 vulnerabilities; and the redacted secret scan passed. Hosted CodeQL, Vercel Preview, live header, and native WAF results are not available until the draft PR is pushed and human-owned integrations execute.

## Deferred actions and human actions required

1. Protect `main` and configure required checks/reviewer policy; confirm Actions fork restrictions and Dependabot alerts.
2. Verify Vercel domains, production branch/deployment provenance, preview authentication, fork protection, narrow automation bypass, native WAF, IP blocks, bypasses, bot protection, and system mitigations.
3. Review and publish firewall changes manually only after LOG/Preview evidence; never publish from Codex.
4. Configure `dropbox-sync` required reviewers and audit the approved manifest/PR path.
5. Complete a human review of public taxonomy and production content before any merge or publication approval.

## Rollback

Do not merge this branch to roll back. A human may close/revert the PR, remove the staged `vercel.json`/workflow changes in a reviewed branch, and inspect the diff. Do not reset or rewrite main history. Any Vercel firewall rollback is an owner action through the native diff/publish workflow.
