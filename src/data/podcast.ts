import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function readScript(filename: string) {
  return readFileSync(resolve(process.cwd(), "content/podcast", filename), "utf8").trim();
}

export type PodcastSource = {
  title: string;
  href: string;
  label: string;
};

export type HistoryPodcastEpisode = {
  number: number;
  volume: string;
  title: string;
  summary: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  script: string;
  sources: PodcastSource[];
  boundary: string;
};

export type ListeningGuideEntry = {
  title: string;
  description: string;
  href: string;
};

export const historyPodcast = {
  title: "History Across the Volumes",
  subtitle: "Four audio essays on power, memory, work, and capability.",
  description:
    "A first-season audio guide to the Independent Observer research program. Each episode adapts one or two public paper synopses from a volume and keeps the argument, source trail, and limitation visible.",
  status: "Author-produced season one · editorial preview",
  episodes: [
    {
      number: 1,
      volume: "Volume I",
      title: "Observation Before Judgment",
      summary:
        "How the Independent Observer method treats history as a record of categories, procedures, memory, and correction—not only a timeline of events.",
      duration: "4 min 32 sec",
      durationSeconds: 272,
      audioUrl: "/media/podcast/episode-01-observation-before-judgment.wav",
      script: readScript("episode-01-observation-before-judgment.txt"),
      sources: [
        {
          title: "Manifesto of a Destiny: The Independent Observer Method",
          href: "/library/documents/independent-observer-volume-one/",
          label: "Volume I public reading copy",
        },
        {
          title: "The Illusion of Equality",
          href: "/library/documents/the-illusion-of-equality/",
          label: "Volume I working-paper record",
        },
      ],
      boundary:
        "The audio condenses public-safe synopses. The linked records remain the source of detail, citations, metrics, and limitations; neither the episode nor the papers are presented as peer-reviewed conclusions.",
    },
    {
      number: 2,
      volume: "Volume II",
      title: "Empire Beneath Democracy",
      summary:
        "How sovereignty, representation, capital, institutions, and historical power shifts can be studied together without collapsing different eras into one analogy.",
      duration: "4 min 57 sec",
      durationSeconds: 297,
      audioUrl: "/media/podcast/episode-02-empire-beneath-democracy.wav",
      script: readScript("episode-02-empire-beneath-democracy.txt"),
      sources: [
        {
          title: "From Colonization to China’s Rise",
          href: "/library/documents/from-colonization-to-chinas-rise/",
          label: "Volume II historical working paper",
        },
        {
          title: "The American Empire was Never a Democracy",
          href: "/library/documents/the-american-empire-was-never-a-democracy/",
          label: "Volume II political-history record",
        },
      ],
      boundary:
        "Historical analogy is not evidence by itself. The episode introduces the papers’ mechanisms and questions while the linked records preserve their interpretive status and review boundaries.",
    },
    {
      number: 3,
      volume: "Volume III",
      title: "Managed Decline",
      summary:
        "How war, policing, taxation, welfare, and work distribute the cost of disruption—and decide whether human difficulty is met with restoration or extraction.",
      duration: "5 min 18 sec",
      durationSeconds: 318,
      audioUrl: "/media/podcast/episode-03-managed-decline.wav",
      script: readScript("episode-03-managed-decline.txt"),
      sources: [
        {
          title: "From Vietnam to Terry v. Ohio",
          href: "/library/documents/from-vietnam-to-terry-ohio/",
          label: "Volume III public reading copy",
        },
        {
          title: "The Wardhan Tax Doctrine",
          href: "/library/documents/wardhan-tax-doctrine/",
          label: "Volume III policy working paper",
        },
      ],
      boundary:
        "The episode describes policy arguments and historical questions, not enacted law, individualized tax advice, an independent fiscal score, or proof that every institution follows one motive.",
    },
    {
      number: 4,
      volume: "Volume IV",
      title: "The Last Human Workforce",
      summary:
        "How digital intimacy and quantum infrastructure reveal the difference between a technical possibility and a human capability that people can actually use and govern.",
      duration: "5 min 24 sec",
      durationSeconds: 324,
      audioUrl: "/media/podcast/episode-04-the-last-human-workforce.wav",
      script: readScript("episode-04-the-last-human-workforce.txt"),
      sources: [
        {
          title: "Disconnected Hearts — The Tech Revolution of Intimacy",
          href: "/library/documents/disconnected-hearts/",
          label: "Volume IV conceptual working paper",
        },
        {
          title: "Entanglement, No-Signalling, and the Real Path to Quantum Advantage",
          href: "/library/documents/entanglement-primer/",
          label: "Volume IV public primer",
        },
      ],
      boundary:
        "The episode is an introduction to a developing research map. It is not a demographic forecast, clinical or engineering certification, or substitute for current primary research and standards review.",
    },
  ] satisfies HistoryPodcastEpisode[],
  listeningGuide: [
    {
      title: "In Our Time: History",
      description:
        "BBC roundtable conversations that place historical questions beside expert discussion.",
      href: "https://podcasts.apple.com/us/podcast/in-our-time-history/id463700741",
    },
    {
      title: "Throughline",
      description:
        "NPR’s history show tracing the origins of current stories and public arguments.",
      href: "https://www.npr.org/podcasts/510333/throughline",
    },
    {
      title: "The Rest Is History",
      description: "A broad catalogue moving across eras, places, and the people who shaped them.",
      href: "https://therestishistory.com/",
    },
    {
      title: "Fall of Civilizations",
      description:
        "Long-form narrative episodes about the rise, life, and collapse of historical societies.",
      href: "https://fallofcivilizationspodcast.com/",
    },
  ] satisfies ListeningGuideEntry[],
} as const;

export const historyPodcastEpisodes = historyPodcast.episodes;
