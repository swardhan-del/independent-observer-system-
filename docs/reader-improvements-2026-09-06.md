# Reader improvements — September 6, 2026

This change extends launch PR #36 from `bca9af028d59ee43274994c76ccc19ee190a321b`.
It preserves the source archive, approved-publication boundaries, stable article IDs,
existing reading lists, and the protected production release path.

## Reader changes

- Shorter homepage introduction and direct Read, Listen, Explore actions.
- Search includes all four episodes and their full public transcripts. A static,
  same-origin JSON index downloads on first opening; queries are processed locally.
  Failed downloads can be retried. Enter activates a result only from the search input.
- Podcast playback uses smaller AAC/M4A derivatives, with WAV fallbacks preserved.
  No audio is fetched until needed. Progress is stored on this device, can be forgotten,
  and is cleared after completion. Playback remains usable when storage is blocked.
- Transcript filtering and paragraph time links. **Times are approximate**, derived
  from narration length and nearby silence, and labeled in the interface. They are
  not a verified word alignment or synchronized captions.
- Four reading journeys connect an audio introduction with three existing public papers.
- BibTeX and RIS downloads use known author/date metadata and identify the source record;
  unavailable metadata is not invented. Original plain-text citation controls remain.
- Correction links carry the current paper and visible section into the existing email
  draft form. The website does not send or store the message.
- Website updates and paper corrections have distinct logs. Paper corrections must be
  approved, refer to an existing public document and section, and include a date, change,
  and reason. No paper correction records were fabricated for this feature.

## Private publishing desk

Run `npm run dashboard` in this checkout. The server binds only to `127.0.0.1`, checks
Host and Origin, and serves a noncached local page. It has no Astro route and no public
build output. Use `DASHBOARD_PORT=4463 npm run dashboard` if the default port is occupied.

- Current publication release queue and recorded rights/verification gates.
- Missing citation metadata.
- Live PR #36 approval and checks, plus production build identity.
- Optional source checks: `npm run dashboard -- --check-links`. HTTP 403, 405 and 429
  require manual review; they are not automatically classified as broken sources.
- Terminal snapshot: `npm run dashboard -- --check`.
- Restart to refresh the snapshot. No automatic publication or release control is provided.

## Performance

Measured with `npm run perf:check` on the built output:

| Asset                           |             Original |                  New |
| ------------------------------- | -------------------: | -------------------: |
| Main volume map, desktop        |  2,690,774 bytes PNG |    81,600 bytes WebP |
| Main volume map, mobile         |        same original |    23,558 bytes WebP |
| Four podcast downloads combined | 53,387,136 bytes WAV | 10,752,173 bytes M4A |

The responsive volume illustrations also have 640px and 1280px WebP variants. Originals
remain in place. The 69-entry search index is 58,877 bytes and is no longer repeated
inside every page. These are byte measurements, not claimed Core Web Vitals scores.

## Verification and release

`npm test` covers existing publication, security, fallback and content contracts plus
new citation, revision, correction-context, progress, search and media regressions.
`npm run test:e2e` tests desktop/mobile reading, real audio resume, search failures,
storage restrictions, keyboard interaction, no-JavaScript paths and saved-list recovery.
CI runs browser tests before fallback builds and preserves failure traces.

Astro must keep generated scripts and styles external so the existing strict CSP remains
valid. No unsafe-inline or unsafe-eval allowance was introduced. Test report directories
are excluded from type checks and source control.

A protected merge and Git-triggered production deployment still require the repository's
independent approval. A healthy preview alone does not establish a production release.
