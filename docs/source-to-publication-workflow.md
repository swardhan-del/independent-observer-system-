# Source to publication workflow

Use this alongside the existing publication manifest, Dropbox feed contract, release policy and subscriber-funnel architecture. It does not replace their checks or human editorial decisions.

1. **Source draft (private).** Preserve the original Dropbox document. Record file id, source path, modification time/revision, title, topic, author and rights basis in a private inventory. Read the content rather than judging its filename. Keep unpublished manuscripts, correspondence and third-party pages outside this public Git repository and public build directories.
2. **Reconcile.** Match the draft to existing document and article slugs. Compare revision, scope, claims and citations with the live adaptation. Decide revise, combine, retain privately or archive in the inventory; do not delete originals or silently replace newer revisions. `WEB_READY` is a filename, not release approval.
3. **Stage (private).** Copy selected sources into a dated Website Feed curated-resource folder. Record the source id/revision and intended destination. Stage a manageable batch. Do not redirect the approved-feed sync to the entire archive, and do not edit `src/data/dropbox-content.generated.ts` manually.
4. **Review.** Maintain a claim/source ledger: claim, authoritative reference, relevant passage/date, factual versus interpretive status, uncertainty and required correction. Check consequential/current facts. Pin the edition of statistics. Remove internal-controller references from public citation lists, keep support beside its claim, and use topic-specific related reading. Check images for ownership/license/permission; do not assume archive presence grants publication rights.
5. **Approve.** Obtain the editorial release decision required by the existing manifest/workflow. Record what was reviewed, reviewer/decision date, allowed public assets and release scope. A bounded released adaptation does not approve the longer source draft. Preserve `productionReleased` and `indexable` boundaries until approval.
6. **Implement.** Follow existing article/data conventions; include visible author, date, genre/status, limitations, citations, corrections route and at most three relevant continuations. Use working infrastructure for subscriptions. An external click cannot be recorded as a completed signup. Never ship an unconnected form or proposed paid product as available.
7. **Verify and publish.** Run build/type, relevant tests, publication boundary, canonical, SEO and preview-indexing checks. Verify desktop/mobile reading, links, citation destinations and changed controls. Commit on an isolated branch, use the normal PR workflow, and verify preview `build-info.json` against that commit. Merge only after applicable checks/review. Verify production commit and representative routes after deployment.
8. **Maintain.** Record released URL/commit, source references and revision date in the private inventory. Keep a corrections log and regenerate accurate search/sitemap metadata. Archive decisions are records, not automatic deletion instructions. A Dropbox folder named “desktop” is remote storage; syncing a physical desktop requires verified access and a separate delivery record.

## Publication checklist

Existing authorization in the task conversation satisfies the editorial decision for the specifically approved batch; do not ask for the same decision again. Technical checks remain necessary. For the 2026-10-09 two-article batch, see [the release and claim-review record](approved-articles-2026-10-09.md).

Run `npm run verify:editorial` before publishing bounded article editions. Keep numbered paragraph/source references, section anchors, dated edition notes and the metadata release registry aligned. Production builds and CI run the validator, but factual and rights checks require source review.

- [ ] Correct project, clean/understood working tree, repository instructions followed.
- [ ] Source read, version reconciled, originals preserved; no confidential content in Git.
- [ ] Claims checked against appropriate sources; interpretation and scenarios labeled.
- [ ] Public citations inspectable; internal references removed; asset permissions recorded.
- [ ] Author, genre/status, dates, corrections, relevant next step visible.
- [ ] Required editorial approval/manifest complete; no unauthorized release flag changes.
- [ ] Mobile/desktop and subscription behavior checked; metadata/links/indexing correct.
- [ ] Build, functional checks and required CI passed; preview and live SHAs verified.
- [ ] Release inventory and rollback route recorded.

## Measurement contract

Current production event transport is inactive. Before configuring an existing supported provider, document aggregate metrics, retention and privacy behavior. Limit properties to public route/content ids, coarse categories and booleans/numbers. Never send article text, email addresses, free-text searches or sensitive inputs. Separate article view, related-article click, signup start and provider-confirmed signup success. Use a fresh Search Console export for search visibility and provider-supported aggregate subscription counts; do not invent missing baselines or promise growth.
