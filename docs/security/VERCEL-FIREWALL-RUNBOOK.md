# Vercel Firewall runbook

## CODEX DOES NOT PUBLISH FIREWALL CHANGES.

This repository contains a non-executable, LOG-mode policy proposal only. Automatic DDoS/system mitigations stay enabled. Do not enable or disable Attack Mode from automation.

## Owner workflow

1. Authenticate to the correct Vercel team and confirm project `independent-observer` and its production domains.
2. Inspect `vercel firewall overview --json`, `vercel firewall rules list --expand`, `vercel firewall ip-blocks list`, and `vercel firewall system-bypass list`.
3. Stage the bounded common-probe rule in LOG mode. Exclude `/.well-known`, `/robots.txt`, sitemap routes, and normal static assets. Do not use User-Agent substring blocks.
4. Review real traffic and false positives, then enforce only in Preview first. Test publication pages, feed, sitemap, robots, social previews, accessibility tools, and ordinary users.
5. Review the exact `vercel firewall diff`. A human owner publishes the reviewed configuration using the authenticated Vercel workflow. Codex must not run `vercel firewall publish --yes`.
6. For rollback, remove or disable only the reviewed rule and inspect the diff again. Use an IP block only for a confirmed abusive address/range; record reason and expiry. Unblock through the same review path.

## Attack Mode

Attack Mode is an owner emergency control, not a normal WAF rule. If active attack evidence requires it, the owner records incident ID, start time, scope, and a planned duration of 1 hour, 6 hours, or 24 hours, then reviews impact and disables it manually when safe. Codex never activates it automatically.

## Current evidence

The local Vercel CLI is installed but unauthenticated, so firewall overview, rules, IP blocks, bypasses, system mitigations, and diff could not be retrieved. No firewall change was made.
