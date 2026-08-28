# Independent Observer security architecture

Status: security branch proposal, 2026-08-28. This document describes controls in code and controls that still require human GitHub/Vercel configuration.

## Trust boundaries

Independent Observer is a public, predominantly static Astro publication site. The browser is an untrusted client. The public repository is a release input, not a private research archive. Dropbox remains private source authority; only an owner-approved, structured feed may cross the boundary:

`private approved source -> manifest/path/type/size/restricted-text validation -> generated public-safe data -> pull request -> CI -> human review -> default branch -> deployment`

The sync workflow receives Dropbox credentials only as server-side Actions secrets. It reads the exact approved feed location, never copies raw source files, and creates a review branch/PR. The `dropbox-sync` environment should be configured by the owner with required reviewers before those secrets are released to the job.

## Edge and browser controls

- Vercel remains the intended Internet edge. Automatic DDoS/system mitigation must remain enabled; its current live state was not verifiable from the unauthenticated local CLI.
- `vercel.json` stages HSTS, MIME sniffing, clickjacking, referrer, capability, and CSP headers for Vercel responses.
- CSP permits only same-origin scripts/connectivity and the two Google Fonts origins required by the current design. JSON-LD remains a deliberate inline script; the interactive scroll script is now a static module. `unsafe-eval` is not used.
- The reading list treats localStorage and imported JSON as attacker-controlled. Imports are capped at 1 MiB/500 records and accept only bounded same-site root-relative publication paths.
- External editorial/social links are explicit content and open with `noopener noreferrer` where a new window is used; they are not executable import URLs.

## Delivery controls

CI has read-only default permissions, immutable action pins, dependency review, CodeQL, secret scanning, and the existing generated-feed gate. Deploy workflow permissions are scoped to the Pages job. Main protection, required checks, collaborators, Actions approval policy, Vercel Deployment Protection, and firewall publication remain owner-side controls and were not inferred from inaccessible GitHub endpoints.

## Residual risks

The generated-feed branch-name check is a useful guard but is not cryptographic attestation. Require a protected environment/reviewer and protected main branch in GitHub. A public site can still be scraped; no global bot or geography block is appropriate. Firewall rules are documented as LOG-mode proposals only because this task did not have an authenticated Vercel firewall session.
