# Week 4: reuse rights for held adaptations

The five civic-capacity, learning, realignment and welfare adaptations already
exist in PR #59. They retain their family identities and remain publication
previews. This change does not recreate or release those articles.

The queued records declare `rightsReviewed: false` while assigning a shared
Creative Commons licence. The article template previously emitted its input
licence without checking review or release state. A source manuscript's notice
does not establish the reuse terms for an unreleased adaptation.

The shared template now emits an Article `license` and a corresponding reuse
notice only when both rights review and production release are explicit. Held
previews instead show “Reuse terms pending final review and release.” The five
released articles retain their existing notices. Existing routes, content,
status labels, noindex and feed boundaries remain intact.

The focused branch starts at the actual production commit
`90f1949938692dcbd5776eadd2fdb2d071c3e58f`, recorded in open PR #96. It is stacked
on that branch to avoid including its earlier production changes in this review.
No merge, deployment or new manuscript release is authorized by this change.

Tests exercise each missing approval gate and the actual generated HTML and
Article metadata for every existing article. Full repository CI must pass before
the PR is ready for review. Private source comparison, fingerprints, outstanding
rights decisions and delivery evidence remain in the private weekly reports.

The first hosted run exposed an existing Astro dependency-audit failure. The
follow-up raises the minimum Astro version from 7.3.2 to 7.4.7 and refreshes its
dependency lock to address GHSA-mh32-jxcr-mh9f and GHSA-r3h5-4585-7x3w. The static
site does not use the Node adapter described by the latter advisory; this is a
dependency-gate fix, not a claim of an observed production exploit. CI thresholds
and checks remain unchanged, and the updated build requires full validation.

Before merge, closing this PR withdraws the proposal. If later merged, revert its
reuse-rights implementation commit through a reviewed branch and revalidate;
preserve later work and do not reset shared history. Assess the separate security
dependency update independently before any reversal, because restoring the old
lock reintroduces the known audit failure. No source originals need restoring.
