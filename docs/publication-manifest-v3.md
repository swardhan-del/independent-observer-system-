# Publication manifest v3

The approved Dropbox handoff accepts only a complete, owner-approved manifest.
It is a release input, not a source inventory and not a place to store private
paths or manuscript text.

Each item must contain:

`candidateId`, `slug`, `title`, `shortTitle`, `author`, `volume`, `topics`,
`contentType`, `version`, `dateCreated`, `dateModified`, `controllerSha256`,
`sourceVerified`, `contentQualityChecked`, `rightsAndProvenanceReviewed`,
`privacyLegalSafetyReviewed`, `accessibilityChecked`, `releaseApproved`,
`approvedBy`, `approvedAt`, `license`, `citationStatus`, `downloadAllowed`,
and `publicAssetReferences`.

The validator rejects every item unless all release gates are true, the release
approval names the configured owner, the controller hash is a SHA-256 digest,
and public asset references are safe repository-relative paths. It rejects
private paths, Dropbox URLs, restricted material, duplicates, unknown content
types, malformed dates, unauthorized downloads, and incomplete approvals.

The generated website data contains only sanitized public fields. Controller
paths, Dropbox identifiers, reviewer notes, and approval infrastructure remain
outside the client bundle and public API.
