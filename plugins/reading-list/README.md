# Reading list integration

Status: active and browser-local.

The Reading List adds a small “Save” action to public preview cards and keeps the visitor’s
selections in `localStorage` on that device. It does not require an account, cookies, analytics,
an API route, or a collection service.

## Privacy boundary

- Saved titles and public route paths never leave the browser.
- The feature does not read Dropbox, GitHub, Vercel, or social-platform credentials.
- Clearing browser storage or using the “Clear saved previews” action removes the list.
- It is a convenience layer for public-safe previews, not a private document vault.

## Integration points

- UI: `src/components/ReadingList.astro`
- Save controls: `src/components/EditorialCard.astro`
- Global placement: `src/layouts/BaseLayout.astro`
- Styling: `src/styles/global.css`
- Regression coverage: `src/tests/interactive.test.ts`

Future account-based synchronization must be designed and approved separately. Do not add a
database, email collection, or third-party tracker under this integration’s name.
