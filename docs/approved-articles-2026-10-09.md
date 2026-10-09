# Approved articles and connected reading

## Goal and scope

A new visitor can read two complete, source-supported analyses of AI, infrastructure and work, inspect a claim's source, recognize interpretation and choose a next step. The publisher can maintain the editions through a documented workflow and automated publication checks.

The owner authorized publication and implementation in the task conversation. This batch releases only the bounded, author-written web adaptations of **The Server as a Furnace** and **The Last Human Workforce**. Original source documents remain preserved privately. Their internal staging and release instructions are omitted from the public editions; no manuscript archive, correspondence, third-party illustration or private identifier is copied into public assets. The existing item-specific CC BY-NC-ND 4.0 notice is retained. The other two candidates remain previews, noindex and outside release feeds and the sitemap.

## Claim review

| Edition   | Evidence and decision                                                                                                                                                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server    | LBNL's _2024 United States Data Center Energy Usage Report_ describes historical consumption and scenario ranges to 2028. The article does not treat that range as an observed outcome or add a numerical forecast.                                                                                                        |
| Server    | DOE's July 2024 _Best Practices Guide for Energy-Efficient Data Center Design_, sections 5.6 and 7.1, supports liquid cooling, nearby heat demand, suitable temperature and redundant heat rejection. Correct PDF: `best-practice-guide-data-center-design_0.pdf`.                                                         |
| Server    | PNNL/ASHRAE/NEMA's framework, _Energy and Thermal Efficiency_, supports warm-water/direct-to-chip loops, heat reuse where there is a viable sink, separated technology/facility loops and water-sensitive design. The previous ASHRAE URL was replaced with its current official destination.                              |
| Server    | DOE's cooling-water guidance explains tower evaporation and makeup water. No universal water-free or site-feasibility claim is made. Apprenticeships, resource disclosure, redevelopment districts and enforceable community benefits remain explicit author proposals.                                                    |
| Workforce | Acemoglu and Restrepo (2019), DOI `10.1257/jep.33.2.3`, supports the task framework, displacement and reinstatement. Researcher/teacher examples are possibilities, not measured outcomes.                                                                                                                                 |
| Workforce | Brynjolfsson, Li and Raymond's final 2025 QJE article, DOI `10.1093/qje/qjae044`, abstract: 5,172 agents, 15% average issues-resolved-per-hour gain, heterogeneous effects. This replaces the draft's older working-paper statistics (5,179; 14%; 34%). The article expressly limits generalization beyond this workplace. |

External sources were checked on 2026-10-09. Sources are not reproduced in full. Reader-facing limitations and the web-edition AI-assistance disclosure identify the scope; no independent peer review, funding declaration or conflict declaration is invented. Reading times are calculated from the actual article bodies.

## Implementation and acceptance

- Preserve both existing research URLs and the workforce research/book title distinction.
- Record web publication and review dates as 2026-10-09, not the older manuscript dates.
- Keep article release flags, metadata registry, sitemap/search and RSS/Atom consistent.
- Show Analysis/Method labels, author links, dates, section anchors, numbered citations, return links and accurate related-reading status in the shared template.
- Provide local edition histories for the new web releases and a next step through the existing Join route; no new form or signup-success claim is introduced.
- Add `/collections/ai-work-and-infrastructure/`, linked from home, Start Here, relevant topic pages and both articles. Include the collection in search and the sitemap.
- Run `npm run verify:editorial`, build/type checks, unit/output tests, browser journeys, canonical and preview-indexing checks before deployment.
- Verify preview and production build-info against the intended commit. Keep the preceding production deployment for rollback.

## Maintenance

Edit approved bounded text in `src/data/green-publications.ts` and keep `src/data/publication-registry.ts` consistent. Citations use zero-based paragraph and source indices; section headings name the paragraph they precede. Add a dated, factual `revisionNotes` entry for substantive changes and update the review date. Preserve the first web publication date on later revisions. Do not release another candidate simply to make a test pass.

`npm run verify:editorial` checks metadata, calendar dates, attached citation references, safe source URLs, public-text boundaries, section anchors, related reading and agreement with the owner-approved registry. It runs in the production build and CI. It cannot verify factual truth, license ownership or editorial quality; maintain the source-to-publication review checklist for those decisions. The existing generated Dropbox feed remains untouched.

## Measurement and remaining dependencies

The production event transport remains inactive pending a verified supported provider configuration. No visitor counts or signup completions are claimed. A fresh Search Console export still depends on completing Google's account verification. Neither measurement dependency blocks this approved publication batch. Physical desktop synchronization remains outside this environment's verified access.
