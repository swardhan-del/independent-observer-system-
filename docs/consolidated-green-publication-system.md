# Consolidated Green publication system

The six 2026 Green candidates are represented once in `src/data/green-publications.ts`.
The registry is the source for preview article routes, the research catalogue, site search,
homepage and Start Here shelves, volume shelves, topic shelves, and contextual related links.

## Release boundary

The records are bounded, text-only web adaptations. All six routes are available for reading;
`productionReleased` determines whether an edition is indexable and eligible for release feeds.
Four editions are released: Method, Democracy, Workforce and Server. Regrowing Humanity and
Borrowed Labor remain noindex previews outside the sitemap and release feeds. Vercel preview
builds and GitHub Pages fallback builds remain noindex for all pages, including released editions.
These records carry no raw manuscript, PDF, figure, local path or private source identifier.

The existing manifest validator remains the fail-closed authority for approved-feed ingestion.
The hand-curated article registry is separately checked by `npm run verify:editorial`; release
changes must also update `src/data/publication-registry.ts`. Release-log, search, sitemap, RSS and
Atom output derive from these reviewed records. Do not manually edit generated Dropbox data.

## Adding a future approved publication

Add one typed record, source-verified bounded body, source notes, limitations, rights/accessibility
state, verified related IDs, claim-linked citations and dated edition notes. Run the production
and preview builds. The preview build must show the route with `noindex`; the production edition
must remain noindex and outside release feeds until the owner-approved release is recorded.
Existing explicit approval for a defined batch does not require another confirmation.

## Rollback

Rollback is a Vercel deployment operation, not a Dropbox operation. Keep the previous known-good
production deployment available, redeploy that deployment or revert the consolidated commit, and
verify the custom domain, sitemap, feeds, headers, and build SHA before restoring traffic.
