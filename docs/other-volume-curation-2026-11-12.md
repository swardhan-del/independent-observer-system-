# Other-volume source-to-site curation — 12 November 2026

## Scope and duplicate check

The owner asked for additional papers from the other Dropbox volumes, after checking
whether they already exist in the website repository. This batch starts from the
deployed Volume III preview commit `2aac6e6ad6a692c5fd5bf0543469c09af29bdbb9`.

Inventory pagination was exhausted for the legacy Volume I, II and IV folders and
the newer manuscript tree. The legacy inventories contain 1,078 / 332 / 224 entries
(965 / 238 / 163 files); the newer tree contains 2,329 entries (1,964 files), including
Volume III and copied legacy material. These are inventory counts, **not unique
papers or publication-ready counts**. Filenames, variants, actual source titles,
research-map identities, public records, article editions and repository text were
compared. Not every historical manuscript received a full factual review.

Seven newer source texts were retrieved for six absent research families. The two
mandate/backlash drafts are grouped under one identity. No additional Volume I
family is added: candidates inspected in this pass already have public records,
research-map or archive identities. Existing entries such as The Family Wealth
Machine, Formation Through Struggle, the attention papers, medical technological
literacy, quantum/antimatter and the reshoring article are not counted again.

## Named reconciliation

| New research family                                 | Volume | Source date                    | Curation decision                                                                                                                             |
| --------------------------------------------------- | ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| The Cost of Political Independence                  | II     | 12 November 2026               | Distinct inquiry into the costs of dissent; connects to existing party-sorting and accountability work.                                       |
| The Illusion of Permanence                          | II     | 30 October and 5 November 2026 | Group The Two-Year Pendulum as a companion draft; one route and family. Dated polling and election claims withheld.                           |
| The Civilizational Mirror                           | II     | 1 November 2026                | Publish only the comparative research question. News chronology, quotations, images and constitutional claims require independent review.     |
| Who Is America For?                                 | II     | 5 November 2026                | Use the actual manuscript title; America for Americans is a filename alias. Keep the question about institutions and civic belonging.         |
| Ideology, Military Necessity, and the Indian Legion | II     | 30 October 2026                | Historical research direction on cooperation and unequal membership; no source tables or images reproduced.                                   |
| AI and the First Rung of Economic Opportunity       | IV     | 31 October 2026                | Identify the source as a research brief/proposed episode, not a completed empirical paper. No numerical findings or study updates reproduced. |

This is a six-family addition, not seven new papers, six released manuscripts or
six new SSRN publications. The texts of the two mandate drafts overlap sufficiently
to share an identity while retaining both source dates and the companion title.
The new family aliases prevent accidental reinsertion under those alternate names.

## Public implementation

- Original summaries describe questions, connections, evidence requirements and source genre/date.
- Six new identities enter the existing taxonomy, search and research catalogue once each.
- The Volume II and IV pages link the additions in their own research sections.
- A shared renderer supports both the existing 28 Volume III previews and the six additions.
- All 34 preview routes remain `noindex,follow` and outside publication feeds/sitemap.
- Existing counts remain 29 public paper records, five released articles and 30 Volume III dossier entries.
- No raw source files, private paths/identifiers, figures, publication approval or unverified external paper links are imported.

The source review here establishes identity and a bounded public research direction.
It does not validate every cited study, source chronology, legal proposition or
empirical claim. No source filename marked final/ready is treated as clearance.

## Verification

Source and built-output tests cover new identities, family aliases, duplicate
exclusion, volume placement, source labels, topic/related/return links, noindex,
feed exclusion and unchanged released-paper counts. Browser tests cover desktop,
mobile, map filtering, keyboard activation and native navigation without JavaScript.
Local Astro checks and the production build passed (119 pages; three pre-existing
unused-import hints). All 564 Vitest tests in 40 files passed. Formatting,
publication/editorial boundaries, canonical origin, SEO, Search Console readiness
and performance budgets passed. Local Chromium could not start because its
process-singleton socket was denied by the runtime; hosted CI supplies the browser
results. The pull request records final hosted results.

This branch includes the preceding Volume III production work; no merge to main is
implied by this curation request. No generated Dropbox feed is edited.
