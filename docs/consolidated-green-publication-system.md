# Consolidated Green publication system

The six 2026 Green candidates are represented once in `src/data/green-publications.ts`.
The registry is the source for preview article routes, the research catalogue, site search,
homepage and Start Here shelves, volume shelves, topic shelves, and contextual related links.

## Release boundary

The records are bounded, text-only preview adaptations. `PUBLICATION_PREVIEW=true` (or a Vercel
Preview build) enables their routes and discovery cards. They remain `noindex`, are excluded from
the sitemap and release feeds, and carry no manuscript, PDF, figure, media, local path, or private
source identifier. A normal production build excludes the six records until a separate owner-
approved release change updates the release state.

The existing manifest validator remains the fail-closed authority for any future approved-feed
ingestion. This change does not populate `Website Feed/approved`, What’s New, RSS, Atom, or a
production deployment.

## Adding a future approved publication

Add one typed record, source-verified bounded body, source notes, limitations, rights/accessibility
state, and verified related IDs. Run the production build and preview build. The preview build
must show the route with `noindex`; the production build must not include it until the owner has
approved the exact record and SHA through the release process.

## Rollback

Rollback is a Vercel deployment operation, not a Dropbox operation. Keep the previous known-good
production deployment available, redeploy that deployment or revert the consolidated commit, and
verify the custom domain, sitemap, feeds, headers, and build SHA before restoring traffic.
