export type VolumeReel = {
  volume: "Series overview" | "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  volumeTitle: string;
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  posterUrl?: string;
  mediaType: "video/mp4";
  sourceLabel: string;
  sourceNote: string;
  volumeHref: string;
};

/**
 * Public-safe media previews selected from the organized video archive.
 * These players are preview assets; they do not assert publication approval.
 */
export const volumeReels: VolumeReel[] = [
  {
    volume: "Series overview",
    volumeTitle: "Independent Observer · Book Presentations",
    title: "Is This the Life We Want? | Independent Observer",
    category: "Book trailer · Volumes I, II & IV",
    description:
      "A scored vertical trailer connecting the book presentations behind Independent Observer: Volume I on civic agency, Volume II on democratic power, and Volume IV on human capability. It asks how systems distribute voice, opportunity, accountability, knowledge, and the practical capacity to act—then points readers toward the volume pages for the longer work. This is one series-level entry point, not a duplicate paper page or a claim that a Volume III presentation exists.",
    mediaUrl: "/media/reels/is-this-the-life-we-want-independent-observer.mp4",
    posterUrl: "/media/reels/is-this-the-life-we-want-independent-observer-poster.png",
    mediaType: "video/mp4",
    sourceLabel: "Author-created book trailer · original instrumental score",
    sourceNote: "Preview asset · presentation overview; Volume III deck forthcoming",
    volumeHref: "/series/",
  },
  {
    volume: "Volume I",
    volumeTitle: "Independent Observer",
    title: "When Evidence Meets Institutional Denial",
    category: "Institutions, Bureaucracy & Evidence",
    description:
      "A visual entry into Volume I’s method: timelines, contradictions, and surviving records that let readers distinguish what was observed from what an institution says happened.",
    mediaUrl: "/media/reels/volume-i-evidence-and-institutional-denial.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized video export · high-confidence subject classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/independent-observer/",
  },
  {
    volume: "Volume I",
    volumeTitle: "Independent Observer",
    title: "News, Screens, and Attention Control",
    category: "Media, Attention & Public Narratives",
    description:
      "A visual study of breaking news, screens, influencers, and attention control, giving Volume I’s method a contemporary test: what becomes visible, what is amplified, and what the record can actually establish.",
    mediaUrl: "/media/reels/volume-i-attention-and-public-record.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized slideshow export · high-confidence media classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/independent-observer/",
  },
  {
    volume: "Volume I",
    volumeTitle: "Independent Observer",
    title: "Expertise, Synthesis, and Independent Thought",
    category: "Knowledge, Expertise & Independent Thought",
    description:
      "A cross-disciplinary visual essay about expertise, synthesis, and interpretation—the method question of who can translate a complex record without hiding its limits.",
    mediaUrl: "/media/reels/volume-i-expertise-and-independent-thought.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized slideshow export · high-confidence knowledge classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/independent-observer/",
  },
  {
    volume: "Volume II",
    volumeTitle: "The Empire Beneath Democracy",
    title: "The Architect’s Blueprint",
    category: "Institutions, Power & State Capacity",
    description:
      "A systems-level visual treatment of institutional design and state capacity, opening Volume II’s question of how power is structured beneath formal democratic language.",
    mediaUrl: "/media/reels/volume-ii-the-architects-blueprint.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized long-form video export · institution and power classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  {
    volume: "Volume II",
    volumeTitle: "The Empire Beneath Democracy",
    title: "Ballots, Organizing, and Civic Participation",
    category: "Democracy, Politics & Civic Power",
    description:
      "A public-power visual sequence on ballots, organizing, documentation, and civic participation. It extends Volume II’s inquiry from formal democratic procedures to the practical ability to be counted, heard, and recognized.",
    mediaUrl: "/media/reels/volume-ii-ballots-and-civic-participation.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized slideshow export · high-confidence democracy classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  {
    volume: "Volume II",
    volumeTitle: "The Empire Beneath Democracy",
    title: "Elite Control in U.S. Democracy",
    category: "Democracy, Elections & Elite Power",
    description:
      "A long-form preview tracing how elite influence may shape agenda-setting and institutional outcomes within U.S. democracy. It gives Volume II a concrete case for examining power beneath formal representation.",
    mediaUrl: "/media/reels/volume-ii-elite-control-in-us-democracy.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized long-form video export · high-confidence democracy classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  {
    volume: "Volume II",
    volumeTitle: "The Empire Beneath Democracy",
    title: "The Terry Cascade: Tracing the Legal Architecture of Mass Incarceration",
    category: "Criminal Justice, Carceral Systems & Legal Power",
    description:
      "A legal-history preview following Terry doctrine and the institutional pathways through which discretionary enforcement can scale into a broader carceral architecture. It is a Volume II inquiry into enforcement, rights, and practical power—not a single-cause claim.",
    mediaUrl: "/media/reels/volume-ii-terry-cascade.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized long-form video export · high-confidence carceral classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  {
    volume: "Volume III",
    volumeTitle: "Managed Decline",
    title: "Factory Labor, Wages, and Economic Power",
    category: "Economy, Labor & Social Policy",
    description:
      "A visual argument about factory labor, wages, and economic power—the material starting point for Volume III’s study of work, taxation, time, and social citizenship.",
    mediaUrl: "/media/reels/volume-iii-factory-labor-and-economic-power.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized video export · high-confidence labor classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/managed-decline/",
  },
  {
    volume: "Volume III",
    volumeTitle: "Managed Decline",
    title: "Oil, Money, Productivity, and Labor",
    category: "Political Economy, Capital & Labor",
    description:
      "A visual political-economy sequence connecting oil, money, productivity, capital, and labor. It opens Volume III’s question of how economic systems distribute work, security, and the cost of change.",
    mediaUrl: "/media/reels/volume-iii-oil-money-productivity-and-labor.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized slideshow export · high-confidence economic classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/managed-decline/",
  },
  {
    volume: "Volume III",
    volumeTitle: "Managed Decline",
    title: "Dignity, Trust, and Social Cooperation",
    category: "Social Psychology, Community & Dignity",
    description:
      "A social-psychology preview on humiliation, dehumanization, reputation, trust, and cooperation, showing how social citizenship depends on more than income or formal rights.",
    mediaUrl: "/media/reels/volume-iii-dignity-trust-and-social-cooperation.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized slideshow export · high-confidence social-psychology classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/managed-decline/",
  },
  {
    volume: "Volume IV",
    volumeTitle: "The Last Human Workforce",
    title: "Engineering the Brainstem: The 3D Cranial Traversal",
    category: "Science, Medicine & Human Capability",
    description:
      "A three-dimensional science preview for Volume IV, where technical possibility is tested against embodied knowledge, education, care, institutions, and the human work required to make capability real.",
    mediaUrl: "/media/reels/volume-iv-engineering-the-brainstem.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized science video export · high-confidence anatomy classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-last-human-workforce/",
  },
  {
    volume: "Volume IV",
    volumeTitle: "The Last Human Workforce",
    title: "Prescription Pad to Power",
    category: "Medicine, Anatomy & Professional Power",
    description:
      "A medical-systems preview asking how prescribing authority becomes professional and institutional power, and how care, expertise, and accountability shape human capability.",
    mediaUrl: "/media/reels/volume-iv-prescription-pad-to-power.mp4",
    mediaType: "video/mp4",
    sourceLabel:
      "Organized long-form video export · reviewed medicine and professional-power classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-last-human-workforce/",
  },
];
