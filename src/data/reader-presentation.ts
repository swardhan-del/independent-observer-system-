import type { PublicDocument } from "./documents";

// Display copy is separate from the original manuscript title and citation metadata.
export const documentTitles: Record<string, string> = {
  "who-deported-more": "How to Compare Deportation Statistics",
  "latino-irony": "The Latino Irony: Hispanic Support for Trump",
  "wardhan-tax-doctrine": "The Wardhan Tax Doctrine: Time and Tax Relief",
  "disconnected-hearts": "Disconnected Hearts: Technology and Intimacy",
  "double-tax-on-time": "The Double Tax on Time: Gender, Work and Care",
  "from-colonization-to-chinas-rise": "From Colonization to China’s Rise",
  "independent-observer-volume-one": "Volume I: Evidence and Democratic Capacity",
  "a-systems-centered-manifesto": "Automation, Education and the Carceral State",
  "the-illusion-of-equality": "The Illusion of Equality: Institutions and Power",
  "citizens-without-a-country": "Citizens Without a Country: Non-Resident Voting",
  "empire-of-distraction": "The Empire of Distraction: Attention and Power",
  "geography-of-enslaved-wealth": "Why Resource-Rich Lands Can Remain Poor",
  "two-masks-one-face": "State and Private Power: Two Masks, One Face",
  "the-american-empire-was-never-a-democracy": "The American Empire and Popular Sovereignty",
  "when-the-storm-decides": "When the Storm Decides: Crises and Elections",
  "managed-interdependence": "Managed Interdependence: Rebuilding Institutions",
  "from-vietnam-to-terry-ohio": "From Vietnam to Terry v. Ohio: Public Investment",
  "children-left-behind-after-a-war": "Children Left Behind After War: Vietnam and Iraq",
  "lottery-of-luck": "Education and Stability in the AI Economy",
  "entanglement-primer": "Quantum Entanglement: A Practical Primer",
  "entanglement-foundations": "Quantum Entanglement: Systems and Society",
  "documentary-projects-print-capture": "Documentary Projects: Archive Reading Copy",
};

const documentDescriptions: Record<string, string> = {
  "wardhan-tax-doctrine":
    "Explore a working-paper proposal to recognize time spent building skills through tax relief, with questions about eligibility, reporting and fairness.",
  "independent-observer-volume-one":
    "Explore the foundational working paper on evidence, institutions and democratic capacity, with its public synopsis and source record.",
  "a-systems-centered-manifesto":
    "A working-paper synopsis connecting automation, skills, employment and reentry, with proposals for public investment and their limitations.",
  "the-illusion-of-equality":
    "A working-paper synopsis examining the gap between formal equality and the institutions that distribute political and economic power.",
  "children-left-behind-after-a-war":
    "A conceptual comparison of how war, law, stigma and migration shape the visibility of war-born children in Vietnam and Iraq.",
};

export const volumeDescriptions: Record<string, string> = {
  "Volume I":
    "How do we judge public claims? Explore Volume I’s research on evidence, memory and democratic capacity. The volume remains in development.",
  "Volume II":
    "Where does public power reside? Explore working papers on sovereignty, citizenship and institutions. Volume II remains in development.",
  "Volume III":
    "Who carries the cost of change? Explore research on work, taxation and social citizenship. Volume III remains in development.",
  "Volume IV":
    "How can technology expand human capability? Explore research on AI, science, education and intimacy. Volume IV remains in development.",
};

export const displayTitle = (entry: Pick<PublicDocument, "id" | "title">) =>
  documentTitles[entry.id] ?? entry.title;

export const summaryDescription = (entry: Pick<PublicDocument, "id" | "description">) =>
  documentDescriptions[entry.id] ?? entry.description;

// Estimate from words actually rendered in the main explanation, not paragraph count.
export function readingMinutes(entry: PublicDocument): number {
  const text = entry.sections
    .filter((section) => section.id !== "publication-boundary")
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs ?? []),
      ...(section.items ?? []),
      ...(section.table
        ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat()]
        : []),
    ])
    .join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));
}
