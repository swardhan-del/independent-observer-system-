# Editorial package template

**Working title:**

**Canonical source URL and source date/version:**

**Volume and public status:**

**One reader question:**

**Editorial owner / reviewer / rights holder:** Record decisions in the private log.

**Status:** Draft → evidence checked → rights checked → approved for named channel → released with readback → revised if needed.

| Claim to carry | Evidence and exact locator           | Fact, inference, proposal or illustration | Boundary / counterargument         | What could change the conclusion? |
| -------------- | ------------------------------------ | ----------------------------------------- | ---------------------------------- | --------------------------------- |
| [Claim]        | [Primary source, date, page/section] | [Type]                                    | [Setting, denominator, limitation] | [Evidence]                        |

**Website introduction, 80–160 words:** Begin with the reader question. Explain the argument with one source and one limit. Point to the canonical article, not a duplicate publication. Add a separately labelled intro if the existing page benefits; keep the source article, dates and citations intact.

**YouTube, 15–25 minutes:** Hook and one honest question; framework; one cited result with the correct setting and measure; timed original demonstration; strongest counterargument; what the audience can check; conclusion and canonical URL. Keep spoken text separate from production directions. Calculate running time from actual spoken words and planned on-screen activities. Read aloud, caption and re-time the rough cut before upload.

**Three shorts, about 25–45 seconds each:** (1) one clear distinction; (2) one source, result and caveat; (3) one practical viewer question. Each needs a stand-alone caption with the source URL, or a clearly identified link destination when captions do not support links. Keep the setting and qualifier in the same frame as any number.

**X thread:** Four short posts: question, mechanism, evidence or counterargument, canonical URL. Verify length and link display in the target composer during review. **LinkedIn:** lead with a professional question, give one takeaway and one limit, end with the canonical link.

**The Observer Brief:** Subject that promises one idea. Preview line. One sentence of relevance, two sentences about evidence and its limits, one link to the full article. Send a preview to the author only with permission. Use the established free subscriber channel, and review its unsubscribe and privacy presentation. Avoid claims of a fixed cadence until it can be sustained.

**Cover and visual brief:** Use [editorial-cover.svg](editorial-cover.svg), navy `#101e33`, cream `#f5f1e8`, muted gold `#e0bc7b`. Serif headline, sans-serif evidence labels, one motif and no implied photograph of an event. Supply plain alt text for informative visuals, and empty alt text for decorative illustrations beside equivalent headings. Use 1200×630 JPG for article sharing and 1600×900 JPG for video thumbnails. Keep text inside the central crop; test on a phone. For a vertical short, rebuild the composition with the headline above the motif and room for platform captions, rather than stretching the horizontal image.

**Export:** From the repository root with npm dependencies and Playwright Chromium available, run `node docs/media-brand/templates/export-covers.mjs` for site share cards. Add `--video <directory outside public/>` for the pilot video covers. The source SVG and motif layers can also be edited in any SVG editor. Review the visual on light and dark previews and at small sizes. Existing share assets are retained; use a new filename for later campaign artwork.

**Approval and readback:** In the private log record the source edition, evidence review, rights review, channel, final copy version, approval timestamp, permanent URL, verification date, and correction links. Ship only the approved revision.
