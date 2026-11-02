import { publicDocumentItems } from "./documents";
import { byReadingUsefulness, startingQuestions } from "./scholarly-clarity";
import { releasedGreenPublications } from "./green-publications";

/** The same public paper catalogue drives the home count and library shelf. */
export const publicPaperCatalogue = publicDocumentItems
  .filter((document) => document.status === "Author working paper")
  .sort(byReadingUsefulness);
/** Date and release status come from the approved publication records. */
export const recentArticles = [...releasedGreenPublications].sort((a, b) =>
  b.publicationDate.localeCompare(a.publicationDate),
);
export const articleQuestions: Record<string, string> = {
  "the-independent-observer-method": "How can we test a public claim?",
  "the-last-human-workforce": "What changes when AI takes over tasks?",
  "the-server-as-a-furnace": "Can data-centre heat become a public resource?",
  "factories-return-but-do-the-jobs": "When factories return, do jobs return too?",
  "democracys-achilles-heel": "What makes democratic institutions vulnerable?",
  "regrowing-humanity": "What makes a prosthetic limb useful in daily life?",
  "borrowed-labor": "Who carries the costs of borrowed labour?",
};
export const publicationDateLabel = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export const paperQuestions: Record<string, string> = {
  ...startingQuestions,
  "history-is-not-a-moral-certificate": "Can a war establish a nation’s moral character?",
  "richer-republic-weaker-hegemon": "Can a country grow richer while losing relative power?",
  "latino-irony": "How should we interpret Hispanic support for Trump?",
  "from-colonization-to-chinas-rise": "How do colonial legacies shape changing global power?",
  "independent-observer-volume-one": "How can evidence strengthen democratic capacity?",
  "a-systems-centered-manifesto":
    "How could education and public investment respond to automation?",
  "the-illusion-of-equality": "When does formal equality fail to distribute power?",
  "citizens-without-a-country": "How should non-resident citizens participate in elections?",
  "empire-of-distraction": "How does attention shape public power?",
  "geography-of-enslaved-wealth": "Why can resource-rich lands remain poor?",
  "two-masks-one-face": "How do state and private power interact?",
  "the-american-empire-was-never-a-democracy": "How does empire complicate popular sovereignty?",
  "when-the-storm-decides": "How can crises influence elections?",
  "managed-interdependence": "What would rebuilding interdependent institutions require?",
  "from-vietnam-to-terry-ohio": "How do public institutions distribute the costs of disruption?",
  "children-left-behind-after-a-war": "What happens to children left behind after war?",
  "lottery-of-luck": "What could provide stability in an AI economy?",
  "entanglement-foundations": "Where do quantum concepts meet their practical limits?",
  "empires-mirror": "When does political access become influence?",
  "the-fear-circuit": "How can fear shape political behaviour?",
  "sanctioned-capital-and-the-american-opportunity-myth":
    "Who gains access to economic opportunity?",
  "how-command-states-finance-power": "How do command states finance power?",
  "when-real-science-becomes-science-fiction":
    "How can we separate scientific evidence from speculation?",
  "quantum-computing-antimatter-and-the-next-energy-revolution":
    "Which frontier-energy claims can current evidence support?",
};
