# Dropbox website-safe proof

Audit date: 2026-08-19

This folder is a public-safe control document for the Independent Observer website. It is not a copy of the Dropbox archive, and it is not a release approval for any source file.

## Source and preservation boundary

- Source authority: the Dropbox folder named `Independent Observer desktop`.
- The Dropbox inventory was read-only. No Dropbox file or folder was moved, renamed, deleted, shared, or overwritten.
- The top-level Dropbox inventory completed without pagination: 31 entries were observed.
- The current intake folder `Website Feed/approved` had no approved feed manifest in the audited snapshot. The workflow therefore fails closed and publishes no new Dropbox feed item.
- Private source paths, file IDs, hashes, credentials, browser records, internal project identifiers, and raw research/archive files are intentionally omitted from this public repository.

## What this audit proves

This audit records a conservative classification of source areas:

- `SAFE_SUMMARY_ALREADY_REFLECTED`: public-safe editorial summaries already represented in the site can remain in the site data model.
- `CANDIDATE_REVIEW_REQUIRED`: a human must review the current content and approve the exact item before it can become a website feed entry.
- `SITE_SOURCE_ONLY`: code, assets, and deployment scaffolding are implementation inputs, not editorial content.
- `INTERNAL_NOT_PUBLIC`: governance, provenance, rights, original archives, commercial plans, social archives, and internal work products remain private.
- `EXCLUDE`: stale navigation captures, personal/browser material, duplicate/conflict material, and anything with uncertain publication status stay out.

The attached manifest is a decision record, not a factual or legal certification. A safe classification does not prove that a claim is accurate, that rights are cleared, or that the author has approved publication.

## Current candidate findings

The Dropbox documentary-projects print capture contains two clearly labelled public-preview concepts:

1. Could America Leave NATO?
2. The Martian Illusion

They are described as concepts or editorial development, not completed or released films. They may be considered for a future public summary only after current human approval. The old hosting URL printed in that capture is deliberately not reused.

The file named `independent-observer-approved-preview.zip` was inspected read-only as an archive. It contains the Astro website source and assets (44 entries), with no suspicious secret-named files, absolute paths, path-traversal names, or symlink entries. That result makes it suitable as implementation provenance, not automatic authorization to publish Dropbox editorial material.

## Safe integration rule

Future automation may read only the exact `Website Feed/approved` intake folder. If that folder or its manifest is unavailable, the workflow must fail closed. For each approved item, the workflow should:

1. preserve the Dropbox original;
2. create a public-safe structured summary rather than copying the raw document;
3. remove private paths, credentials, personal records, and internal identifiers;
4. retain the source title, review date, and approval status in a private audit log;
5. run the website build and content tests before deployment.

Do not place raw PDFs, DOCX files, ZIP archives, private audit registers, browser captures, or unpublished evidence in the public website repository.

## Recheck trigger

Repeat this audit before any new Dropbox-to-website publication, after the `Website Feed/approved` folder changes, or when a source item is materially revised. This folder documents the safe boundary; it does not authorize publication by itself.
