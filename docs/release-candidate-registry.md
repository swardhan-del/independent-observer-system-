# Release-candidate registry

This is the review branch's sanitized publication registry. It is a metadata index, not a public
feed and not a release decision. The approved Dropbox feed remains empty until the owner gives
item-level release approval.

## First-wave queue

Every item below is staged as `public_preview` and `awaiting_human_release`. No item has a public
article route or a release flag in the registry, and no manuscript text is stored here.

| Order | Candidate                                                                                  | Volume | Registry status | Release decision       |
| ----: | ------------------------------------------------------------------------------------------ | ------ | --------------- | ---------------------- |
|     1 | Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body | IV     | public preview  | awaiting human release |
|     2 | The Independent Observer Method                                                            | I      | public preview  | awaiting human release |
|     3 | The Last Human Workforce                                                                   | IV     | public preview  | awaiting human release |
|     4 | The Server as a Furnace                                                                    | III    | public preview  | awaiting human release |
|     5 | Borrowed Labor                                                                             | II     | public preview  | awaiting human release |
|     6 | Democracy’s Achilles’ Heel                                                                 | II     | public preview  | awaiting human release |

The order is a review priority, not a rating. Any future release requires verified source,
quality, rights/provenance, metadata, accessibility, rendering, and explicit human approval.

## Next clearance queue

These entries are metadata-only and remain outside the public website until item-level clearance is
complete.

| Priority    | Title                                                         | Volume     | Public manuscript text |
| ----------- | ------------------------------------------------------------- | ---------- | ---------------------- |
| Priority    | When Real Science Becomes Science Fiction                     | IV         | not included           |
| Priority    | Quantum Computing, Antimatter, and the Next Energy Revolution | IV         | not included           |
| Priority    | The Rival the West Built                                      | Unassigned | not included           |
| Second wave | Capital Amplification and the Myth of Equal Opportunity       | I          | not included           |
| Second wave | The Attention Infrastructure Gap                              | I          | not included           |
| Second wave | Programmable Gene Silencing Governance                        | IV         | not included           |
| Second wave | Environmental Instability and Early Homo                      | IV         | not included           |
| Second wave | American Empire Was Never a Democracy                         | II         | not included           |
| Second wave | Human Rights, Policing, and Hidden Taxation                   | II         | not included           |
| Second wave | How Empires Fail                                              | II         | not included           |
| Second wave | From Mao to Manufacturing Sovereignty                         | II         | not included           |
| Second wave | Heavy Water Data Center Coolant Feasibility Study             | III        | not included           |

## Existing external records

The seven existing SSRN reading-copy records remain separate from the first-wave queue. They are
`external_preprint` records linked to their verified public SSRN URLs and internal public reading
routes. Usage signals are dated discovery context, never ratings or proof of quality. If an
external record cannot be reverified, its last-verification date must remain visible and the record
must be marked for review rather than described as currently downloadable.

## Required release sequence

```text
owner-approved source manifest → validation → sanitized generated data → pull request
→ CI → human review → merge → deployment
```

The source-level audit manifest is local-only and gitignored. The repository registry intentionally
contains no absolute source paths, private identifiers, credentials, raw evidence, or reviewer
correspondence.
