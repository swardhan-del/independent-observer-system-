# Integration map

These are the integrations that belong with Independent Observer. They are intentionally small and independently reviewable.

## Already available

- **Site search and topic filtering:** native client-side discovery across the published archive.
- **RSS:** `/feed.xml` gives readers and feed readers an independent subscription path.
- **Search discovery:** `/robots.txt`, `/sitemap.xml`, canonical links, Open Graph metadata, Twitter metadata, and JSON-LD.
- **Social awareness:** verified public links can point people back to the canonical site.
- **Dropbox boundary:** only an approved, public-safe feed can move from Dropbox toward the site; raw Dropbox contents are never mirrored automatically.

## Good future additions

- Google Search Console ownership and sitemap submission, done manually by the account owner.
- Privacy-respecting analytics, only after a provider and retention policy are chosen.
- A contact or newsletter form backed by an owned mailbox and server-side secrets.
- Archive filters for topic, format, date, and source once the corresponding reviewed metadata exists.

## Not automatic

No integration should scrape, republish, or invent material from Dropbox or social platforms. No secret belongs in client-side code. A plugin may prepare a report or a preview, but publication remains an explicit review step.
