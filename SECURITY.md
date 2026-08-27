# Security policy

Independent Observer is a static-first publication site. The public build does
not accept accounts, search submissions, reading-list uploads, analytics
identifiers, or article publication requests.

## Reporting

Use the public contact route only when it is activated by the owner. Until then,
do not send sensitive material through the preview form. Do not include private
Dropbox paths, credentials, personal records, legal packets, medical records, or
unpublished evidence in a report.

## Release controls

- Dropbox is a read-only source archive for ordinary website work.
- Only the exact approved feed, a validated manifest, CI, a pull request, human
  review, and a protected merge can move a record toward publication.
- `src/data/dropbox-content.generated.ts` is generated data and may only change
  in a sync-generated pull request.
- Candidate, preprint, working-paper, and concept statuses are not publication
  approval.

## Dependency maintenance

The repository runs a production-dependency audit in CI and keeps dependency
updates separate from editorial releases. New packages require a documented
purpose, exact version, maintenance and license review, security-history review,
bundle-size assessment, and privacy/telemetry assessment. Do not perform an
unrelated major upgrade in a publication-content change.
