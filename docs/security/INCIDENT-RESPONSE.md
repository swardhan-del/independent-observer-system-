# Independent Observer incident response

Preserve evidence, keep the publication boundary fail-closed, and record timestamps, SHAs, deployment IDs, and owners for every action.

## GitHub compromise

Freeze merges/deployment review, revoke affected sessions/tokens/apps, inspect collaborators and workflow changes, compare against the last trusted default-branch SHA, and restore only through a human-reviewed PR. Do not delete history or force-push as an incident shortcut.

## Vercel compromise

Review project members/integrations, deployment provenance and aliases, domains, environment-variable metadata (never copy values into tickets), runtime/build logs, and firewall changes. Keep automatic DDoS/system mitigations enabled. The owner may use Attack Mode for a documented 1-hour, 6-hour, or 24-hour emergency window; Codex does not activate it.

## Secret exposure

Stop using the credential, identify the exposure window, rotate/invalidate it through the owner, search logs and history without printing values, remove it through a reviewed change, and preserve forensic copies. Do not ask Codex to print or rotate a secret.

## Active web attack

Capture representative requests and WAF/runtime evidence, add a bounded LOG rule first, then have the owner decide whether to enforce it or use Attack Mode. Keep SEO and legitimate readers in scope. Do not block by generic bot labels or geography.

## Dropbox publication incident

Stop the sync workflow and publication merge path, preserve the manifest/PR/SHA, inspect generated data for private paths or evidence, and have the owner revoke or rotate Dropbox credentials if exposed. Do not publish private files or weaken the approved-folder gate.
