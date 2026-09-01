export type ArchiveNavigationItem = {
  title: string;
  href?: string;
  status?: string;
};

export type ArchiveNavigationSection = {
  title: string;
  description: string;
  items: Array<string | ArchiveNavigationItem>;
};
export type ArchiveNavigationVolume = {
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV" | "Volume V";
  archiveTitle?: string;
  sections: ArchiveNavigationSection[];
};

/** Public programme map: no raw source paths, drafts, or duplicate files. */
export const archiveNavigation: ArchiveNavigationVolume[] = [
  {
    volume: "Volume I",
    sections: [
      { title: "Book and master compilations", description: "Volume-level reading and master records.", items: ["Manifesto and Destiny", "Original master and IP declaration"] },
      { title: "Foundational manifesto and method", description: "Method, public literacy, civic capacity, and human capability.", items: ["Foundational manifesto", { title: "Manifesto of a Destiny: The Independent Observer Method", href: "/research/the-independent-observer-method/" }, { title: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State", href: "/library/documents/a-systems-centered-manifesto/", status: "Cross-volume public record" }, { title: "The Illusion of Equality", href: "/library/documents/the-illusion-of-equality/", status: "Legacy relationship under review" }, "Institutional power and public literacy", "Democracy and civic capacity", "Knowledge, skills, and human capability"] },
      { title: "Political economy, labor, and equal opportunity", description: "Economic power, work, technology, and opportunity.", items: ["Capital amplification and equal opportunity", "Populism, STEM, and labor"] },
      { title: "Quiet wealth, risk, and asset protection", description: "Wealth architecture and risk questions.", items: ["Quiet wealth"] },
      { title: "Documentation, memory, and evidence", description: "Public records, evidence, and institutional memory.", items: ["Silent archivist", "Security of memory", "Death of evidentiary patience"] },
      { title: "Cross-volume connections", description: "Related work governed by one canonical paper record.", items: ["Border enforcement", { title: "From Colonization to China's Rise", href: "/library/documents/from-colonization-to-chinas-rise/", status: "Volume II public record" }, "Calm Before the Storm"] },
    ],
  },
  {
    volume: "Volume II",
    sections: [
      { title: "Book and compilations", description: "The Empire Beneath Democracy and controlled editions.", items: ["Empire Beneath Democracy"] },
      { title: "Democracy, institutions, and party power", description: "Democracy, elite continuity, parties, media, and public outrage.", items: [{ title: "The American Empire Was Never a Democracy", href: "/library/documents/the-american-empire-was-never-a-democracy/" }, { title: "Democracy's Achilles' Heel", href: "/research/democracys-achilles-heel/" }, { title: "The Empire of Distraction", href: "/library/documents/empire-of-distraction/", status: "Archive family match under review" }, { title: "When the Storm Decides", href: "/library/documents/when-the-storm-decides/" }, "Bipartisan betrayal", "Party switch and polarization", "Elite agenda setting", "Crises, elections, and public outrage"] },
      { title: "Immigration, citizenship, and border", description: "Citizenship, enforcement, migration labor, and voting.", items: [{ title: "Citizens Without a Country", href: "/library/documents/citizens-without-a-country/" }, { title: "Who Deported More?", href: "/library/documents/who-deported-more/" }, { title: "The Latino Irony", href: "/library/documents/latino-irony/" }, "Detained at the Border", "Migration, labor, and the rotating scapegoat"] },
      { title: "Civil rights, carceral state, and legal power", description: "Punishment, prosecution, capital, and legal power.", items: ["Thirteenth Amendment punishment clause", "Mask of the Progressive and Terry", "Protected criminals", "Attorney General and presidential pressure", "Sanctioned capital"] },
      { title: "Empire, geopolitics, and sovereignty", description: "Power shifts, Russia, China, Europe, resource systems, and strategic failure.", items: [{ title: "From Colonization to China's Rise", href: "/library/documents/from-colonization-to-chinas-rise/" }, { title: "Managed Interdependence", href: "/library/documents/managed-interdependence/" }, { title: "The Geography of Enslaved Wealth", href: "/library/documents/geography-of-enslaved-wealth/" }, { title: "Two Masks, One Face", href: "/library/documents/two-masks-one-face/" }, { title: "Borrowed Labor", href: "/research/borrowed-labor/", status: "Migration and sovereignty record" }, "Caspian supply corridor", "Truth, failure, and strategic blindness"] },
      { title: "Cross-volume connections", description: "Connected arguments shown once and linked across the programme.", items: ["Pockets to portfolios", "Steel to screens", "Territorial collapse to networked fade", "Perception proxy", "State of exception"] },
    ],
  },
  {
    volume: "Volume III",
    sections: [
      { title: "A. Marriage, ownership, tax, and wealth architecture", description: "Ownership, households, taxation, and wealth design.", items: [{ title: "The Wardhan Tax Doctrine", href: "/library/documents/wardhan-tax-doctrine/" }, "Cross-volume connections"] },
      { title: "B. Deindustrialization, welfare, social control, and cultural displacement", description: "Economic insecurity, welfare, labor, and social change.", items: [{ title: "From Vietnam to Terry, Ohio", href: "/library/documents/from-vietnam-to-terry-ohio/" }, "Deindustrialization and welfare research"] },
      { title: "C. Macroeconomy, industrial power, and geopolitical infrastructure", description: "Industrial systems, energy, technology, and macroeconomic power.", items: ["Macroeconomy and industrial power", { title: "The Server as a Furnace", href: "/research/the-server-as-a-furnace/" }] },
      { title: "D. Immigration, law enforcement, measurement, and labor dependence", description: "Measurement, enforcement, labor, and migration systems.", items: [{ title: "Who Deported More?", href: "/library/documents/who-deported-more/", status: "Canonical Volume II public record" }, "Hidden moral economy"] },
      { title: "E. Governance, legitimacy, and accountability", description: "Institutional trust, accountability, and public legitimacy.", items: ["Governance and accountability research"] },
      { title: "F. Education, medicine, health, and human capital", description: "Education, health systems, medicine, and capability.", items: [{ title: "Children Left Behind After a War", href: "/library/documents/children-left-behind-after-a-war/" }, "Education and human-capital research"] },
    ],
  },
  {
    volume: "Volume IV",
    sections: [
      { title: "Book and master compilation", description: "The Last Human Workforce book compilation, in editorial development.", items: [{ title: "The Last Human Workforce", href: "/research/the-last-human-workforce/" }] },
      { title: "Technology, cognition, and governance", description: "Technology as a human and institutional system, rather than a software-only story.", items: ["Medical technology and mechanistic training", "Biotechnology, biosecurity, and dual-use governance", { title: "Entanglement: A Systems-Level Primer", href: "/library/documents/entanglement-primer/" }, { title: "Entanglement: Foundations, Architectures, and Societal Implications", href: "/library/documents/entanglement-foundations/" }, { title: "Disconnected Hearts", href: "/library/documents/disconnected-hearts/", status: "Archive placement under review" }] },
      { title: "Human capability and development", description: "Embodiment, adaptation, care, and the conditions that make technical capability usable.", items: [{ title: "Regrowing Humanity", href: "/research/regrowing-humanity/" }, { title: "The Lottery of Luck", href: "/library/documents/lottery-of-luck/", status: "Archive placement under review" }, { title: "The Double Tax on Time", href: "/library/documents/double-tax-on-time/", status: "Cross-volume public record" }, "Environmental instability and human development"] },
      { title: "Research projects", description: "Interdisciplinary research-to-narrative projects, distinct from research papers.", items: ["GeneLock: The Silent Sequence"] },
      { title: "Cross-volume connections", description: "Connections from Volume III into learning, cognition, infrastructure, and capability.", items: ["Volume III to IV transition", "Learning and cognition bridges"] },
    ],
  },
  {
    volume: "Volume V",
    archiveTitle: "Future Societal Problems — Forthcoming",
    sections: [
      { title: "Education, rationality, and cognitive control", description: "An emerging fifth-volume research direction on education, judgment, and human capability.", items: ["Education and Rational Thinking"] },
    ],
  },
];
