# Author paper migration audit — 31 August 2026

## Decision

The website now treats the Independent Observer paper catalogue as an author-controlled
publication surface. The retired repository is no longer an access dependency. Dropbox remains
the private source archive and is not linked, mirrored, or exposed by the website.

The public model is deliberately narrow:

- 21 author paper pages contain a source-reviewed synopsis, selected analytical points, visible
  limitations, and historical discovery counts.
- 18 pages link to an exact, title-matched ResearchGate record.
- 3 pages remain unlinked because an exact and content-consistent ResearchGate record was not
  verified.
- 21 prior internal route slugs permanently redirect to neutral paper routes so existing bookmarks
  do not break.
- No DOCX or PDF manuscript is copied into the site, transformed, re-saved, or published.

## Source taxonomy rules

The review used the four-volume archive spine as the authority. A categorized controller,
content-confirmed controller, research-cleared controller, or explicit submission package outranks
an old draft, duplicate-review copy, aggregate book, generated presentation, or methodology-hold
revision. Cross-volume copies were used only to understand placement; they were not treated as a
second publication source.

Each public paper record stores a SHA-256 fingerprint of the exact reviewed source. The fingerprint
provides a later integrity check without revealing the archive path or publishing the file.

## Paper register

| Volume | Paper                                                                         | Reviewed source class                                          | ResearchGate                                   |
| ------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| I      | Independent Observer — Volume I Foundational Manifesto                        | Foundational paper controller                                  | Verified                                       |
| I      | A Systems-Centered Manifesto on Automation, Education, and the Carceral State | Foundational paper controller                                  | Verified                                       |
| I      | The Illusion of Equality                                                      | Categorized PDF; duplicate DOCX copies excluded                | Verified                                       |
| II     | Who Deported More?                                                            | Categorized paper controller; later review copies excluded     | Verified                                       |
| II     | The Latino Irony                                                              | Categorized paper controller                                   | Hold — exact record not found                  |
| II     | From Colonization to China’s Rise                                             | Categorized paper controller                                   | Verified                                       |
| II     | Citizens Without a Country                                                    | Categorized paper controller                                   | Verified                                       |
| II     | The Empire of Distraction                                                     | Categorized controller with cross-volume placement conflict    | Hold — attached public file appears mismatched |
| II     | The Geography of Enslaved Wealth                                              | Categorized paper controller                                   | Verified                                       |
| II     | Two Masks, One Face                                                           | Categorized paper controller                                   | Verified                                       |
| II     | The American Empire was Never a Democracy                                     | Research-cleared controller                                    | Verified                                       |
| II     | When the Storm Decides                                                        | Categorized controller; methodology-hold revision excluded     | Verified                                       |
| II     | Managed Interdependence                                                       | Expanded categorized controller                                | Verified                                       |
| III    | The Wardhan Tax Doctrine                                                      | Content-confirmed controller                                   | Verified                                       |
| III    | From Vietnam to Terry v. Ohio                                                 | Categorized paper controller                                   | Verified                                       |
| III    | Children Left Behind After a War                                              | Categorized paper controller                                   | Hold — exact record not found                  |
| IV     | Disconnected Hearts                                                           | Submission package; internal volume label needs reconciliation | Verified                                       |
| IV     | The Double Tax on Time                                                        | Content-confirmed cross-volume controller                      | Verified                                       |
| IV     | The Lottery of Luck                                                           | Source under placement review; duplicate copies excluded       | Verified                                       |
| IV     | Entanglement — Systems-Level Primer                                           | Paper controller                                               | Verified                                       |
| IV     | Entanglement — Foundations, Architectures, and Societal Implications          | Paper controller                                               | Verified                                       |

## Public protection model

No website can guarantee that publicly visible prose cannot be copied. The defensible protection
is to publish less and make provenance stronger:

- Publish a synopsis and selected analytical points, not the complete manuscript.
- Keep Dropbox paths and paper files out of HTML, feeds, search data, and build artifacts.
- Display author, status, rights notice, archive-placement note, review date, and source fingerprint.
- Emit canonical scholarly-article metadata for discovery and attribution.
- Link externally only when the exact ResearchGate title and content identity are verified.
- Preserve historical download and abstract-view counts as dated discovery metadata, not ratings.

## Release boundary

This audit supports a review branch and protected preview. It is not authority to merge, alias, or
deploy the migration to the production domain. Production remains a separate owner approval gate.
