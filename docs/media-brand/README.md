# The Independent Observer editorial desk

The site is the canonical place to read the research and its references. This directory holds production drafts derived from public editions. Files here are visible in the source repository; Astro does not serve them as pages, add them to feeds, or treat them as a release. Use the private editorial hub for private sources, contact details, author decisions, unpublished production files, commercial deliberations, and exported metrics.

| Pilot                           | Source edition                                                                                                                      | Drafts                                                                                                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI and employment               | [The Last Human Workforce](https://independentobserver.org/research/the-last-human-workforce/), Vol. IV, 9 Oct 2026                 | [YouTube episode](packages/01-ai-and-work/episode.md) · [Website, shorts, social, cover and email](packages/01-ai-and-work/formats.md)                           |
| Labour and economic opportunity | [Factories Return but Do the Jobs](https://independentobserver.org/research/factories-return-but-do-the-jobs/), Vol. IV, 9 Oct 2026 | [YouTube episode](packages/02-reshoring-and-ownership/episode.md) · [Website, shorts, social, cover and email](packages/02-reshoring-and-ownership/formats.md)   |
| Institutions and accountability | [Democracy’s Achilles’ Heel](https://independentobserver.org/research/democracys-achilles-heel/), Vol. II, 18 Sep 2026              | [YouTube episode](packages/03-contestable-institutions/episode.md) · [Website, shorts, social, cover and email](packages/03-contestable-institutions/formats.md) |
| Science and infrastructure      | [The Server as a Furnace](https://independentobserver.org/research/the-server-as-a-furnace/), Vol. III, 9 Oct 2026                  | [YouTube episode](packages/04-computing-and-heat/episode.md) · [Website, shorts, social, cover and email](packages/04-computing-and-heat/formats.md)             |

The four original articles stay on their existing routes. A short, optional introduction on each route is part of the website update. The longer production copy is held for channel review. No script, post, video or email in these packages has been released through a distribution channel.

## Export the pilot graphics

The exporter uses the four released articles in the table above and their existing motifs. It produces a 1200×630 share card, a 1600×900 thumbnail, and a 1080×1920 poster for each article. A full export also includes the homepage share card. The manifest records the article's canonical URL, edition, date, citations, and license alongside each image's dimensions, alt text, and SHA-256 fingerprint.

From the repository root with npm dependencies and Playwright Chromium installed, choose a new output directory with an existing parent outside the checkout:

```sh
npm run media:export -- --output "/path/to/media-review/observer-pilot"
```

For a one-topic review, add `--pilot 01-ai-and-work` (or `02-reshoring-and-ownership`, `03-contestable-institutions`, `04-computing-and-heat`). If using an installed Chrome browser, set `PLAYWRIGHT_EXECUTABLE_PATH` to its executable. The export completes with `manifest.json`. Review the images with each package's existing `formats.md` and `episode.md` before using the channel release checklist below.

## From source to release

1. **Select an edition.** Use the existing [source-to-publication workflow](../source-to-publication-workflow.md), [approved article register](../approved-articles-2026-10-09.md), and publication registry. Record canonical URL, source date, volume and version in the [editorial package template](templates/editorial-package.md). For a private or unreleased source, keep the entire package private and use the existing Dropbox manifest/owner review process first.
2. **Make a claim sheet.** List the strongest claims, original citations, dates, denominators, population and limits. Distinguish observed evidence, author interpretation, proposals and teaching examples. Cross-check numerical claims at the cited original and record counterarguments. The pilot guardrails are below.
3. **Draft once, edit by medium.** Write a website introduction and a longer episode first. Extract three short questions that still make sense in isolation. Write one social thread, one LinkedIn post and one short email. Place the article URL in each asset or its distribution caption; include primary references in the long description and wherever needed for a quantitative claim. Use the same four cover motifs with medium-specific exports.
4. **Review before any distribution.** The editor and rights holder sign off on final narration, captions, claims, cover art and reuse permissions. The article-specific [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) notice does not itself grant permission to distribute adaptations or use the work commercially. These new scripts use original wording and diagrams; confirm rights for each final asset and any third-party material. Obtain explicit authorization before scheduling or posting on social, YouTube or email. One owner can fill both review roles; when possible, have an independent reader challenge the claim sheet.
5. **Publish through the existing channels when approved.** Use the existing public article for Monday's feature; sharing a canonical link does not require a site deploy. Existing [social channel records](../../plugins/social/channels.json), Substack, podcast and curated-feed workflows keep their scope. For a substantive source revision, use the site's version history and approval process. Do not add a second publication record for an introduction or a video.
6. **Maintain a private release log.** Record source version, asset revision, sign-off, platform identity, permanent URL, date and readback, rights decision, material corrections and any linked follow-up. Check for duplicates and current source revisions before submitting. If the source is corrected, review every derivative and link a correction in the relevant channel where feasible. Record platform limitations.
7. **Review weekly.** Use the [aggregate measurement workflow](MEASUREMENT.md) and [report template](templates/weekly-report.md). Where there is no data, record unavailable and state why. Do not add a tracking provider simply to complete a report.

| Claim guardrail                         | Source and boundary                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI in customer support                  | [Final journal study](https://doi.org/10.1093/qje/qjae044): 5,172 agents; 15% average increase in issues resolved per hour; heterogeneous outcomes. One workplace setting. No general employment forecast.                                                                                                                                                                                                                          |
| Domestic output, labour and ownership   | The article’s hours arithmetic is explicitly hypothetical. [Glennon](https://doi.org/10.1287/mnsc.2023.4715) examined historical H-1B restrictions and foreign affiliates; [Autor et al.](https://economics.mit.edu/sites/default/files/publications/Autor%20et%20al_2020_The%20Fall%20of%20the%20Labor%20Share%20and%20t.pdf) concern concentration and labour share. Neither proves intent or an effect from a current programme. |
| Participation and administrative access | The [EAC release](https://www.eac.gov/news/2025/06/30/us-election-assistance-commission-releases-2024-election-administration-and-voting) supports the dated national ballot count and approximate citizen voting-age turnout. The five channels and fictional appeal illustrate what to investigate.                                                                                                                               |
| Useful heat                             | [LBNL](https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report) distinguishes historical estimates from future scenarios. [DOE](https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf) informs the schematic. No site has been assessed. The district idea is a proposal.                                                                                 |

## A weekly rhythm, when approved

Use one source at a time. Tuesday and Thursday are alternate production slots when capacity is limited. A short or reading recommendation can substitute for a weekly episode; do not rush factual review to meet a day.

| Day       | Editorial action                                          | Done when                                                          |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| Monday    | Feature the canonical article and its reading question    | Source version, limits and working links confirmed                 |
| Tuesday   | Prepare or release short 1                                | Caption, visual rights and source URL approved                     |
| Wednesday | Prepare or share a LinkedIn summary or X thread           | Choose one channel; thread copy checked for context and duplicates |
| Thursday  | Prepare or release short 2                                | Different question from short 1; short 3 remains reserve           |
| Friday    | Prepare or release the main YouTube episode               | Timed read, captions, description references and review completed  |
| Saturday  | Prepare or send The Observer Brief or one curated reading | Send path, scope, unsubscribe mechanism and source checked         |
| Sunday    | Review the week and choose the next article               | Record results or missing data; decide one change to try           |

Suggested pilot sequence: AI and work → factories and ownership → contestable institutions → computing and heat. Rotate topics rather than treating all four as an AI series. If a topic is sensitive or the source needs correction, use a previously approved reading recommendation and leave the new package in review.

See the [audit and implementation record](AUDIT.md), [90-day roadmap](ROADMAP.md), and [measurement workflow](MEASUREMENT.md).
