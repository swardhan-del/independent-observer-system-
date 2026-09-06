# Production rollback runbook

This runbook is for an owner or release operator. It does not authorize a
production deployment or rollback by itself.

1. Identify the exact production deployment and Git SHA in Vercel. Confirm the
   intended known-good SHA against the release review record.
2. Inspect the target deployment before assigning any alias. Do not promote a
   deployment whose build, route crawl, security headers, or annotation
   behavior has not been reviewed.
3. Use the Vercel project UI or the approved Vercel CLI workflow to assign the
   production alias to the verified known-good deployment. Do not force-push or
   rewrite Git history as part of rollback.
4. Re-run the production contract against `https://independentobserver.org`:
   sitemap, route status, canonical/H1, JSON-LD, internal links, redirects,
   robots, security.txt, 404, and `build-info.json`.
5. Record the incident, previous deployment ID, restored deployment ID, SHA,
   observed symptoms, verification output, and owner approval.

The static site has no database migration or account-session rollback step. Any
future external service, mailbox, analytics, or publication feed would require
its own rollback record and owner approval.
