export type PromptCategory = "Short video" | "Editorial" | "Search" | "Graphic" | "Distribution";

export type PromptEntry = {
  id: string;
  title: string;
  category: PromptCategory;
  format: string;
  summary: string;
  prompt: string;
};

/**
 * Public-safe prompt templates for turning an approved Independent Observer page into useful
 * editorial and social entry points. These templates are not publication approvals and do not
 * contain private archive paths or unpublished source material.
 */
export const promptLibrary: PromptEntry[] = [
  {
    id: "mechanism-in-60-seconds",
    title: "The mechanism in 60 seconds",
    category: "Short video",
    format: "Reel / Short",
    summary: "Turn one documented question into a calm, source-led vertical explainer.",
    prompt: `Create a 50–65 second vertical 9:16 documentary Reel or YouTube Short about [QUESTION].

Open with a plain-language tension, not an unsupported certainty. State the familiar frame neutrally, then show the mechanism in 2–4 steps. Use only the approved public source package for facts, numbers, quotations, dates, and examples. Keep verified fact, interpretation, and unknown separate.

Structure:
0–4 seconds: question or hook.
5–18 seconds: the common frame.
19–42 seconds: the mechanism, with source/date labels.
43–55 seconds: what the evidence changes and what it does not prove.
Final 5–8 seconds: “Read the source trail at [CANONICAL URL].”

Use a calm, skeptical, evidence-first voice. Add burned-in captions, accessible contrast, restrained navy/cream/gold/teal graphics, and a transcript. Do not invent statistics, quotations, legal findings, scientific claims, or current-event facts. Do not call a preview a finished release.`,
  },
  {
    id: "before-you-share",
    title: "Before you share",
    category: "Short video",
    format: "20–35 second check",
    summary: "Make source literacy a repeatable series rather than a one-off disclaimer.",
    prompt: `Create a 20–35 second vertical video titled “Before You Share: [TOPIC].”

Use five quick beats:
1. What is the claim?
2. Who is making it?
3. What does the source actually measure or establish?
4. What date, definition, comparison, or missing context matters?
5. Where can the viewer read the public source trail?

Use one source card, one definition card, and one limitation card. Keep the language respectful and specific. If the source is incomplete, say so plainly. Use no rage bait, fake breaking-news styling, invented urgency, or unsupported conclusion. End with [CANONICAL URL] and a short invitation to inspect the evidence.`,
  },
  {
    id: "long-form-from-one-question",
    title: "Long-form essay from one question",
    category: "Editorial",
    format: "5–10 minute essay",
    summary:
      "Expand a single question into a structured essay without losing the evidence boundary.",
    prompt: `Write a 5–10 minute evidence-led video essay about [QUESTION] for Independent Observer.

Begin with a concise question. Explain the common answer without caricature. Then trace the mechanism through chronology, institutions, incentives, records, and consequences. Use three source-supported examples, followed by the strongest counterargument. End by stating what the evidence establishes, what remains uncertain, and what a reader can inspect next at [CANONICAL URL].

Provide:
- a 1,000–1,500 word voiceover;
- a short cold open;
- chapter titles;
- B-roll or diagram suggestions between sections;
- source links and dates;
- a transcript-ready version;
- one 60-second cutdown.

Do not invent numbers, quotes, legal holdings, credentials, or current facts. Label analysis as analysis. Avoid presenting a concept preview as a published paper or finished documentary.`,
  },
  {
    id: "seo-without-the-rewrite",
    title: "SEO without the rewrite",
    category: "Search",
    format: "Page review",
    summary:
      "Improve the discoverability of an existing page while preserving its structure and meaning.",
    prompt: `Review the existing public page [URL] for practical SEO improvements without rewriting the website or changing its design.

First identify what is already present: title, description, canonical URL, H1/H2 outline, internal links, Open Graph fields, social image, JSON-LD, robots/indexability, sitemap eligibility, image alt text, and visible publication status.

Then propose only the smallest useful changes:
- one accurate title tag;
- one accurate meta description;
- one reader question the page answers;
- up to three natural related phrases;
- up to five internal links with a reason for each;
- a social title, description, and image concept;
- structured-data changes only when visible content supports them.

Separate VERIFIED observations, RECOMMENDATIONS, ASSUMPTIONS, and UNKNOWN/BLOCKED measurements. Do not invent search demand, claims, sources, dates, or credentials. Do not create thin keyword pages, expose private material, or publish automatically. Finish with a verification checklist and stop before editing.`,
  },
  {
    id: "source-trail-carousel",
    title: "The source-trail carousel",
    category: "Graphic",
    format: "6–8 slide carousel",
    summary: "Give readers a visual route from a claim to the record, limitation, and full page.",
    prompt: `Create a 6–8 slide carousel for [PUBLIC PAGE OR QUESTION].

Slide 1: one clear question.
Slide 2: the familiar frame, stated fairly.
Slide 3: the mechanism in 3–5 labeled steps.
Slide 4: the key public record or source, with date.
Slide 5: what the source measures or establishes.
Slide 6: what it does not establish.
Slide 7: the practical implication or open question.
Slide 8: “Read the source trail” with [CANONICAL URL].

Use the Independent Observer navy, cream, gold, and muted teal system. Keep one idea per slide, large type, high contrast, accessible alt text, and a quiet source strip. Use arrows only for relationships supported by the source. Do not use decorative imagery to imply causation, scale, geography, or certainty.`,
  },
  {
    id: "subtractive-graphic-brief",
    title: "Subtractive graphic brief",
    category: "Graphic",
    format: "Static or low-motion visual",
    summary:
      "Make dense systems work at phone size by removing visual noise before adding decoration.",
    prompt: `Design one social graphic about [QUESTION] using a subtractive Independent Observer visual system.

Start with one focal point: a document, map, diagram, timeline, or human-scale symbol. Remove every element that does not orient, explain, or create memory. Use two core colors plus one accent. Keep the hook to 3–6 words and the source label quiet but legible.

Specify:
- 1080x1920 reel/story crop;
- 1080x1350 feed crop;
- 1200x630 link-preview crop;
- safe text area;
- alt text;
- source/date strip;
- reduced-motion static state;
- the exact canonical URL.

Avoid stock-photo emotional cues, fake alert banners, tiny paragraphs, unsupported arrows, overuse of texture, and sensational claims. The finished frame should still make sense with sound off and at small size.`,
  },
  {
    id: "evidence-inference-unknown",
    title: "Evidence, inference, unknown",
    category: "Editorial",
    format: "Reasoning card",
    summary:
      "Turn the project’s method into a recognizable public format readers can save and share.",
    prompt: `Create a source-led “Evidence / Inference / Unknown” card about [TOPIC].

Evidence: list only directly documented facts, with source and date.
Inference: state the interpretation that follows, using cautious language.
Unknown: name the missing record, definition, comparison, or measurement that limits confidence.

Add one sentence explaining why the distinction matters and one link to [CANONICAL URL]. Keep the card useful to a reader who has not seen the full page. Do not turn inference into fact, do not overstate a single source, and do not fill the unknown column with speculation. Use navy for structure, cream for reading space, gold for emphasis, and muted teal only when it has a defined meaning.`,
  },
  {
    id: "one-page-many-routes",
    title: "One page, many routes",
    category: "Editorial",
    format: "Content atomizer",
    summary: "Build a small, coherent release package from one approved public page.",
    prompt: `Turn the approved public page [URL / TITLE] into a connected editorial package.

Return:
1. one plain-language web summary;
2. one 5–10 minute essay outline;
3. three short-video concepts;
4. one 6–8 slide carousel;
5. one diagram or timeline brief;
6. one newsletter note;
7. one discussion question;
8. one list of related Independent Observer pages.

Every asset must point back to the same canonical page. Reuse the page’s evidence and wording; do not create new claims by repetition. Label each asset as published, preview, or concept according to the source page. Include captions, transcript needs, image alt text, source/date labels, and a rights/provenance check. If the page cannot support an asset, omit it rather than padding the package.`,
  },
  {
    id: "transcript-and-captions",
    title: "Transcript and captions",
    category: "Editorial",
    format: "Accessibility package",
    summary:
      "Make every video more searchable, usable, and trustworthy without changing the argument.",
    prompt: `Create an accessibility and search package for the approved video [TITLE / URL].

Produce:
- a faithful transcript;
- WebVTT-style caption cues with readable line lengths;
- a 1–2 sentence description;
- a 40–60 word page summary;
- a chapter list;
- a source list with dates;
- a plain-language limitation note;
- descriptive poster alt text;
- one canonical “read the source” link.

Preserve exact quotations and mark uncertain audio rather than guessing. Do not add facts that are not spoken or supported by the public source package. Distinguish narration, quotation, on-screen text, and ambient sound. Keep the public status label accurate if the video is a preview.`,
  },
  {
    id: "podcast-and-newsletter-brief",
    title: "Podcast and newsletter briefing",
    category: "Distribution",
    format: "One-page outreach",
    summary:
      "Give a relevant host or editor a focused reason to share one useful source-led question.",
    prompt: `Prepare a one-page briefing for a podcast, newsletter, educator, librarian, or public-interest publication about [QUESTION].

Include:
- a 40-word project description;
- the specific question and why it matters;
- three discussion questions;
- three public source links with dates;
- one counterargument;
- one limitation or unresolved issue;
- the relevant Independent Observer page;
- a short, supportable author/project bio;
- suggested audience takeaway.

Make the pitch useful even if the recipient never promotes the project. Do not mass-mail, exaggerate reach, imply institutional endorsement, or claim expertise that is not verified. Use a narrow question rather than pitching the entire archive.`,
  },
];
