# Independent Observer local growth desk

The desk prepares distribution drafts from the existing owner-released article registry. It never posts, sends email, uploads video, reads private manuscripts, changes article text or enables analytics. Node 24 or newer is required for built-in SQLite. All source files in Dropbox remain read-only.

## Start and review

From the website checkout outside Dropbox:

```sh
npm ci
npm run growth -- prepare
npm run dashboard
```

Open the local URL printed in the terminal (normally `http://127.0.0.1:4323`) and paste the session's owner token into the unlock form. The token changes on restart. The dashboard binds only to loopback, validates Host and Origin, uses an HttpOnly SameSite session cookie and CSRF-protected review forms, and serves no private API, report, download or caption before authentication. It works without JavaScript and loads no external assets. Do not put this server behind a public tunnel or reverse proxy. It is an owner-controlled local workflow, not multi-user hosted authentication.

Storage defaults to `~/Library/Application Support/Independent Observer/growth`, outside all Git checkouts and Dropbox. The directory is mode 0700; SQLite, exports and reports are mode 0600. Set `GROWTH_DATA_DIR` only to another owner-only directory outside the repository and cloud storage. The path guard resolves symlink ancestors. It does not authorize copying private data into another checkout. Device administrators and processes running as your user remain inside the local trust boundary.

1. Review one LinkedIn package per week. Open its source ledger, original source and limits. The copy is an extractive draft: it retains approved wording rather than adding model-generated facts. Each excerpt records the article paragraph and original source indexes. Four existing media pilots are linked for deeper editorial context; they are not silently promoted to approved releases.
2. Resolve source warnings. A live canonical/edition/text mismatch cannot be overridden. Restricted external sources remain blocked until the owner checks the original passage, setting, date and attribution and records a substantive verification note. Reachability alone is never factual verification. Manual checks are recorded as owner checks, not API proof.
3. Approve or reject each channel separately, recording source review, derivative rights, accurate limitations and public-only evidence. No decision is preselected. Article approval does not confer adaptation rights under the existing CC BY-NC-ND notice. Script/package approval does not approve video upload. Technical checks must be less than seven days old when approving copy.
4. Copy the draft or download its provenance package. Publication still requires an explicit decision for the exact final content and destination, a confirmed authorized account, composer review and live readback. There is no publishing endpoint, account token store or upload integration to bypass this step. Confirmed publishing and newsletter dispatch history remain NOT VERIFIED until verified separately in the platform's existing ledger.
5. Review one Observer Brief and the aggregate/Council report monthly. YouTube is optional. The proposed 10–20 minute weekly review budget is not measured production time. Reduce cadence when source checks or available time make it impractical.

## CLI and recovery

```sh
npm run growth -- queue
npm run growth -- prepare --retry
npm run growth -- prepare --refresh
npm run growth -- check --id FULL_PACKAGE_HASH
npm run growth -- export --id FULL_PACKAGE_HASH --channel linkedin
npm run growth -- export --id FULL_PACKAGE_HASH --channel youtube
npm run growth -- report --month 2026-11
npm run growth -- media
```

Preparation uses a Budapest week key, source-revision fingerprint and a transactional SQLite unique job key. Repeated successful runs skip the job; exact source/package hashes prevent duplicate records. Concurrent processes cannot claim the same job. A failed/interrupted job needs an explicit retry, up to three attempts. A running job becomes eligible for explicit recovery after 30 minutes. Source checks have deadlines, bounded response sizes, redirect limits and at most two transport attempts. Private/reserved network addresses are refused at the actual DNS lookup, including redirects.

Exit code 2 from preparation means drafts were prepared but source verification needs review. Inspect the dashboard jobs and claim warnings. Do not delete the database to get past the gate. After correcting access, use `check --id` or an explicit fresh check. Manual source checks may need repeating after an automated refresh; this is deliberate. A changed source or alternative cited paragraph produces a new immutable package, supersedes the previous active revision and requires fresh review. Re-selecting a previous revision also requires fresh review. To choose another excerpt without changing research:

```sh
npm run growth -- prepare --slug the-last-human-workforce --paragraph 4 --refresh
```

Paragraph indices in the CLI are zero-based; the dashboard displays human-readable paragraph numbers. Only existing cited paragraphs are accepted. A long LinkedIn draft is rejected above 3000 characters; choose a shorter cited paragraph. There is no arbitrary prose editor that can introduce untraceable claims.

Stop the dashboard before making a private backup of `queue.sqlite`; preserve its 0600 permissions and the directory's 0700 permissions. Restore only from your verified backup while all desk processes are stopped. Retain the database when reverting code. If source integrity fails, preserve the database and restore a known good private backup; never edit package JSON to fabricate a passing check.

## Media stages

Every package contains a narration draft, storyboard, source list, title, description, thumbnail brief and estimated SRT captions. Times are word-count estimates and must be retimed against final audio. Export generates real JSON, copy-ready Markdown and SRT files, not a claimed finished video.

Keep these separate: script prepared → assets verified → rendering available → preview generated → editorial review complete → approved for upload → published and verified. Only the first is set automatically. The existing cover exporter (`npm run media:export`) remains the graphics workflow. Existing public social cards, podcast audio, concept reels and templates are indexed with content hashes, original status and reuse warnings. Preview reels are not asserted to be published YouTube inventory. No voice cloning, music/stock licensing, paid generation or render credit is assumed.

The invideo CLI was installed on 21 November but was not authenticated. The existing connector did authenticate the owner, and an existing private 1080×1920, 30 fps heat-reuse timeline (revision 5) and completed private video export were verified by metadata and indexed locally. They were reused as references without creating a duplicate project or changing the existing timeline. This verifies an editable rendering path, not the accuracy or rights of every existing frame, compatibility with a newly generated script, or upload approval. No new render, credit expenditure, video upload or project publication was performed. Private editor URLs live only in the local database; the media index combines these with the public asset index.

## Scheduling

Reuse the existing Codex social automations rather than adding another daily/weekly scheduler. The Independent Observer preparation hook runs `npm run growth -- prepare` in the isolated website checkout; the database limits it to one successful preparation per Budapest week and source revision. Preparation also refreshes the current month's durable report. Existing other-project rotations retain their scope. No scheduled task may approve its own package or infer approval from a successful job.

Existing GitHub Actions continue to handle PR verification, production health, approved-feed review and deployment. The new unit and browser tests run in that CI without a new scheduled Action or publication credential. No private database, metrics, generated package, owner decision or report is uploaded as a GitHub Actions artifact. Browser fixtures are synthetic public-source data in temporary local databases.

## Rollback

Stop `npm run dashboard`. Preserve the private database and exports. Revert this implementation commit through the normal PR pipeline; the previous dashboard is read-only. Restore the saved pre-change automation prompts only after reconciling the current editorial instruction: an older automatic-publication rule must not be restored without owner authorization. No schema migration modifies the public site, and no public article release or analytics activation needs reversal.
