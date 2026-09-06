# Live collision content comparison

The pre-change live pages were fetched directly from the canonical domain on 2026-09-01. Their normalized main-content SHA-256 values were:

- Series catalogue: `09e1380f90040e8d92c3c3721646090d3f2e2b7e3bba5dab2ed06ac4f09ed263`
- Research article: `3adbf0b0e7b92735cffb1ec3fd0dc284a3c28ce98b8b4dec2deaf0c303aaffeb`

The hashes differ. The series page is a Volume IV roadmap/book catalogue entry; the research page is a bounded article about task bundles, automation, and transition design, with distinct body text and sources. Both routes are retained. The research article keeps its slug for compatibility but receives the disambiguated title **The Last Human Workforce: Task Bundles, Automation, and Transition Design** in its H1, title tag, Open Graph/Twitter metadata, JSON-LD headline, catalogue card, and related/internal labels.

After the local build, normalized main-content hashes are:

- Series catalogue: `5d7704d8c1799d9a65c7ee1af5c17f650cd1090e41548ac451ca799608f33139`
- Research article: `9af560d87ea1eaeadaad4c07b4445e4241301088172b91e771cb49780ec82ab8`

This comparison supports preservation of both distinct entities; it does not authorize deletion of either archive source.
