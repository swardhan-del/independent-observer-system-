import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { greenPublications, type GreenPublication } from "../../src/data/green-publications";
import { publicPublicationRegistry } from "../../src/data/publication-registry";
import { validatePublications } from "../../src/lib/publication-validation";
import { socialPreviewCardForPath } from "../../src/data/social-preview-cards";
import { historyPodcast } from "../../src/data/podcast";
import { volumeReels } from "../../src/data/video-reels";

export const origin = "https://independentobserver.org";
export const channels = ["linkedin", "substack", "youtube", "website"] as const;
export type Channel = (typeof channels)[number];
export const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
export const canonical = (article: GreenPublication) => `${origin}/research/${article.slug}/`;
export const articles = greenPublications;
export const generatorVersion = 1;
const root = new URL("../../", import.meta.url);
const pilots: Record<string, string> = {
  "the-last-human-workforce": "01-ai-and-work",
  "factories-return-but-do-the-jobs": "02-reshoring-and-ownership",
  "democracys-achilles-heel": "03-contestable-institutions",
  "the-server-as-a-furnace": "04-computing-and-heat",
};

export const destinations = [
  {
    platform: "website",
    url: origin,
    status: "Verified and connected",
    capability: "GitHub PR and Vercel release pipeline only",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/siddhartha-wardhan-1b5b3825b/",
    status: "Publicly identified but not connected",
    capability:
      "Owner account recorded in existing automation; live session and write access NOT VERIFIED",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@independenobserver",
    status: "Publicly identified but not connected",
    capability:
      "Existing verified repository channel record; Studio inventory and API access NOT VERIFIED",
  },
  {
    platform: "substack",
    url: "https://independentobserver.substack.com",
    status: "Publicly identified but not connected",
    capability: "Existing website subscription destination; publisher access NOT VERIFIED",
  },
  {
    platform: "orcid",
    url: "https://orcid.org/0009-0005-4228-1124",
    status: "Publicly identified but not connected",
    capability: "Author identifier linked by the production website; not a release feed",
  },
  {
    platform: "ssrn",
    url: "https://ssrn.com/abstract=5432014",
    status: "Publicly identified but not connected",
    capability: "Public author working-paper record, not peer review or approval for derivatives",
  },
  {
    platform: "researchgate",
    url: "https://www.researchgate.net/publication/395670267_A_Systems-Centered_Manifesto_on_Automation_Education_and_the_Carceral_State",
    status: "Publicly identified but not connected",
    capability: "Existing author-linked public record; not an approved source feed",
  },
  {
    platform: "search-console",
    url: "https://search.google.com/search-console",
    status: "Unsupported or inaccessible",
    capability: "GSC Wizard subscription_required on 2026-11-21; no metrics retrieved",
  },
] as const;

export function sourceRevision(article: GreenPublication) {
  // Hash the actual public edition and release decision, not just its controller label.
  return digest({
    article,
    release: publicPublicationRegistry.find(
      (r) => r.canonicalRoute === `/research/${article.slug}/`,
    ),
  });
}

export function requireReleased(article: GreenPublication) {
  validatePublications(articles, publicPublicationRegistry);
  const registered = articles.find((a) => a.slug === article.slug);
  if (!registered || sourceRevision(registered) !== sourceRevision(article))
    throw Error("Unregistered or modified source edition");
  const record = publicPublicationRegistry.find(
    (r) => r.canonicalRoute === `/research/${article.slug}/`,
  );
  if (
    !article.productionReleased ||
    article.status !== "Published bounded text adaptation" ||
    record?.status !== "approved_article" ||
    record.releaseDecision !== "owner_released" ||
    record.rightsDecision !== "reviewed_public_safe_text" ||
    !article.sourceVerified ||
    !article.rightsReviewed
  )
    throw Error("Only owner-released public articles may enter distribution");
}

export function mediaIndex() {
  const asset = (path: string) => {
    if (!path.startsWith("/") || path.includes("..")) throw Error("Invalid asset path");
    const file = new URL(`public${path}`, root);
    return {
      url: `${origin}${path}`,
      present: existsSync(file),
      sha256: existsSync(file)
        ? createHash("sha256").update(readFileSync(file)).digest("hex")
        : null,
    };
  };
  return {
    graphics: articles
      .filter((a) => a.productionReleased)
      .flatMap((a) => {
        const card = socialPreviewCardForPath(`/research/${a.slug}/`);
        return card
          ? [
              {
                slug: a.slug,
                ...card,
                ...asset(card.src),
                reuse: "Existing public preview; owner must approve derivative reuse",
              },
            ]
          : [];
      }),
    audio: historyPodcast.episodes.map((e) => ({
      title: e.title,
      volume: e.volume,
      ...asset(e.audioUrl),
      durationSeconds: e.durationSeconds,
      sources: e.sources,
      status: historyPodcast.status,
      boundary: e.boundary,
      reuse: "Not cleared for automatic reuse; match excerpt, context and rights first",
    })),
    previews: volumeReels.map((r) => ({
      title: r.title,
      volume: r.volume,
      ...asset(r.mediaUrl),
      status: r.sourceNote,
      reuse:
        "Preview is not a verified published YouTube video; footage/music rights require review",
    })),
    templates: [
      "docs/media-brand/templates/editorial-cover.svg",
      "docs/media-brand/templates/editorial-poster.svg",
    ],
    rendering:
      "Connected invideo identity and an existing editable private timeline verified on 2026-11-21; CLI not signed in. No new render or paid generation is invoked by this workflow.",
  };
}

export type Claim = {
  id: string;
  text: string;
  kind: "author-summary" | "source-linked-excerpt" | "limitation";
  paragraph: number | null;
  sourceIndexes: number[];
  articleUrl: string;
};
export type DraftPackage = ReturnType<typeof makePackage>;

export function channelCopy(p: DraftPackage, channel: Channel) {
  if (channel === "linkedin") return p.linkedin.post;
  if (channel === "youtube")
    return `NARRATION DRAFT\n\n${p.youtube.narration}\n\nTITLE\n${p.youtube.title}\n\nDESCRIPTION\n${p.youtube.description}`;
  if (channel === "substack")
    return `Subject: ${p.substack.subject}\n\n${p.substack.researchSummary.text}\n\n${p.substack.mainArgument.text}\n\nSupporting evidence\n${p.substack.supportingEvidence.map((r) => `${r.label}\n${r.href}`).join("\n\n")}\n\nLimitations\n${p.substack.limitations.text}\n\nRelated reading\n${p.relatedReading.map((r) => `${r.title}\n${r.url}`).join("\n\n")}\n\n${p.source.attribution}\nRead the canonical article: ${p.source.canonicalUrl}`;
  return JSON.stringify(p.website, null, 2);
}

export function makePackage(article: GreenPublication, paragraph?: number) {
  requireReleased(article);
  const selected =
    paragraph ??
    article.citations?.find((c) => article.paragraphs[c.paragraph].length < 1100)?.paragraph;
  const citation = article.citations?.find((c) => c.paragraph === selected);
  if (selected === undefined || !citation?.sources.length)
    throw Error("Select an existing source-linked paragraph");
  const url = canonical(article);
  const claims: Claim[] = [
    {
      id: "summary",
      text: article.standfirst,
      kind: "author-summary",
      paragraph: null,
      sourceIndexes: [],
      articleUrl: url,
    },
    {
      id: "evidence",
      text: article.paragraphs[selected],
      kind: "source-linked-excerpt",
      paragraph: selected,
      sourceIndexes: citation.sources,
      articleUrl: url,
    },
    {
      id: "limitations",
      text: article.limitations,
      kind: "limitation",
      paragraph: null,
      sourceIndexes: [],
      articleUrl: `${url}#article-limitations`,
    },
  ];
  if (claims.some((c) => /\/Users\/|dropbox|\b(?:TODO|TBD|PLACEHOLDER)\b/i.test(c.text)))
    throw Error("Private or incomplete content quarantined");
  const refs = citation.sources.map((i) => article.sourceNotes[i]);
  if (refs.some((s) => !s)) throw Error("Missing claim reference");
  const attribution = `${article.author} · ${article.shortTitle} · ${article.version} · Published ${article.publicationDate} · Factual cutoff ${article.factualCutoffDate}`;
  const sourceLines = refs.map((s) => `${s.label}\n${s.href}`).join("\n\n");
  const reading = articles
    .filter(
      (a) =>
        a.productionReleased &&
        a.slug !== article.slug &&
        article.relatedPublicationIds.some((id) => id === a.familyId || id === a.candidateId),
    )
    .slice(0, 3)
    .map((a) => ({ title: a.shortTitle, url: canonical(a) }));
  const post = `${article.standfirst}\n\n${claims[1].text}\n\nLimits: ${article.limitations}\n\n${attribution}\n\nRead the analysis: ${url}\n\nSources:\n${sourceLines}`;
  if (post.length > 3000)
    throw Error("LinkedIn draft exceeds 3000 characters; choose a shorter cited paragraph");
  const script = [article.standfirst, claims[1].text, article.limitations];
  let seconds = 0;
  const scenes = script.map((text, i) => {
    const start = seconds;
    seconds += Math.max(5, Math.ceil((text.split(/\s+/).length / 145) * 60));
    return {
      start,
      end: seconds,
      text,
      claimId: claims[i].id,
      visual: [
        "Opening question and existing article cover",
        "Original diagram or source card; display reference and setting",
        "Limitation card followed by canonical reading link",
      ][i],
    };
  });
  const stamp = (s: number) => {
    const ms = Math.round(s * 1000);
    return `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
  };
  // Short cues are estimated from word counts. A final narration requires real retiming.
  const cues: string[] = [];
  for (const scene of scenes) {
    const words = scene.text.split(/\s+/);
    const chunks = Array.from({ length: Math.ceil(words.length / 10) }, (_, i) =>
      words.slice(i * 10, i * 10 + 10).join(" "),
    );
    chunks.forEach((text, i) => {
      const start = scene.start + ((scene.end - scene.start) * i) / chunks.length;
      const end = scene.start + ((scene.end - scene.start) * (i + 1)) / chunks.length;
      cues.push(`${cues.length + 1}\n${stamp(start)} --> ${stamp(end)}\n${text}`);
    });
  }
  const sourceHash = sourceRevision(article);
  const pilot = pilots[article.slug];
  const data = {
    generatorVersion,
    slug: article.slug,
    title: article.shortTitle,
    sourceHash,
    source: {
      canonicalUrl: url,
      author: article.author,
      version: article.version,
      publicationDate: article.publicationDate,
      factualCutoffDate: article.factualCutoffDate,
      license: article.license,
      attribution,
    },
    claims,
    references: article.sourceNotes,
    relatedReading: reading,
    existingPilot: pilot
      ? {
          formats: `docs/media-brand/packages/${pilot}/formats.md`,
          episode: `docs/media-brand/packages/${pilot}/episode.md`,
          status: "Existing editorial drafts; consult during review, not automatically approved",
        }
      : null,
    linkedin: {
      post,
      concise: `${article.standfirst}\n\n${article.author} · ${article.shortTitle}\n${url}\n\nLimits: ${article.limitations}`,
      factualSummary: claims[1],
      references: refs,
      claimIds: claims.map((c) => c.id),
    },
    substack: {
      subject: `${article.shortTitle} — The Observer Brief`,
      researchSummary: claims[0],
      mainArgument: claims[1],
      supportingEvidence: refs,
      limitations: claims[2],
      relatedReading: reading,
      canonicalUrl: url,
    },
    youtube: {
      concept: article.standfirst,
      narration: script.join("\n\n"),
      scenes,
      captionDraft: cues.join("\n\n") + "\n",
      estimatedSeconds: seconds,
      timing: "Estimated at 145 words/minute; retime after final audio",
      title: article.shortTitle,
      description: `${attribution}\n\n${url}\n\n${sourceLines}\n\nLimits: ${article.limitations}`,
      thumbnailBrief: `Use the existing article cover and original graphics. Title: ${article.shortTitle}. Review readability, context and rights.`,
      stages: {
        scriptPrepared: true,
        assetsVerified: false,
        renderingAvailable: false,
        previewGenerated: false,
        editorialReviewComplete: false,
        approvedForUpload: false,
        publishedAndVerified: false,
      },
      missing: [
        "Final narration or approved existing audio excerpt",
        "Rights review for each selected visual/audio asset",
        "Renderer access, preview and actual caption timing",
        "Editorial review and separate upload authorization",
      ],
    },
    website: {
      suggestedDescription: article.standfirst,
      internalLinks: reading,
      preview: socialPreviewCardForPath(`/research/${article.slug}/`) ?? null,
      distributionStatus: "draft; no site metadata changed",
    },
  };
  return { ...data, id: digest(data) };
}

export function verifyTraceability(p: DraftPackage, article: GreenPublication) {
  // Rebuild instead of allowing unchecked arbitrary model text into any channel.
  if (
    JSON.stringify(p) !== JSON.stringify(makePackage(article, p.claims[1]?.paragraph ?? undefined))
  )
    throw Error("Package differs from its source-traceable generated revision");
  return true;
}

export const repoRoot = fileURLToPath(root);
