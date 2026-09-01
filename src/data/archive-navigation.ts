export type ArchiveNavigationSection = { title: string; description: string; items: string[] };
export type ArchiveNavigationVolume = {
  volume: "Volume I" | "Volume II" | "Volume III";
  sections: ArchiveNavigationSection[];
};

/** Public programme map: no raw source paths, drafts, or duplicate files. */
export const archiveNavigation: ArchiveNavigationVolume[] = [
  {
    volume: "Volume I",
    sections: [
      { title: "Book and master compilations", description: "Volume-level reading and master records.", items: ["Manifesto and Destiny", "Original master and IP declaration"] },
      { title: "Foundational manifesto and method", description: "Method, public literacy, civic capacity, and human capability.", items: ["Foundational manifesto", "Manifesto of a Destiny method", "Institutional power and public literacy", "Democracy and civic capacity", "Knowledge, skills, and human capability"] },
      { title: "Political economy, labor, and equal opportunity", description: "Economic power, work, technology, and opportunity.", items: ["Capital amplification and equal opportunity", "Populism, STEM, and labor"] },
      { title: "Quiet wealth, risk, and asset protection", description: "Wealth architecture and risk questions.", items: ["Quiet wealth"] },
      { title: "Documentation, memory, and evidence", description: "Public records, evidence, and institutional memory.", items: ["Silent archivist", "Security of memory", "Death of evidentiary patience"] },
      { title: "Cross-volume connections", description: "Related work governed by one canonical paper record.", items: ["Border enforcement", "China power shifts", "Calm Before the Storm"] },
    ],
  },
  {
    volume: "Volume II",
    sections: [
      { title: "Book and compilations", description: "The Empire Beneath Democracy and controlled editions.", items: ["Empire Beneath Democracy"] },
      { title: "Democracy, institutions, and party power", description: "Democracy, elite continuity, parties, media, and public outrage.", items: ["American empire and elite continuity", "Democracy's Achilles' Heel", "Bipartisan betrayal", "Party switch and polarization", "Elite agenda setting", "Crises, elections, and public outrage"] },
      { title: "Immigration, citizenship, and border", description: "Citizenship, enforcement, migration labor, and voting.", items: ["Citizens Without a Country", "Detained at the Border", "Who Deported More", "Latino voting behavior", "Migration, labor, and the rotating scapegoat"] },
      { title: "Civil rights, carceral state, and legal power", description: "Punishment, prosecution, capital, and legal power.", items: ["Thirteenth Amendment punishment clause", "Mask of the Progressive and Terry", "Protected criminals", "Attorney General and presidential pressure", "Sanctioned capital"] },
      { title: "Empire, geopolitics, and sovereignty", description: "Power shifts, Russia, China, Europe, resource systems, and strategic failure.", items: ["China and global order", "American empire and network power", "Europe, NATO, and borrowed sovereignty", "Post-autocratic Russia", "Resource wealth", "Caspian supply corridor", "Truth, failure, and strategic blindness"] },
      { title: "Cross-volume connections", description: "Connected arguments shown once and linked across the programme.", items: ["Pockets to portfolios", "Steel to screens", "Territorial collapse to networked fade", "Perception proxy", "State of exception"] },
    ],
  },
  {
    volume: "Volume III",
    sections: [
      { title: "A. Marriage, ownership, tax, and wealth architecture", description: "Ownership, households, taxation, and wealth design.", items: ["Content-confirmed Volume III papers", "Cross-volume connections"] },
      { title: "B. Deindustrialization, welfare, social control, and cultural displacement", description: "Economic insecurity, welfare, labor, and social change.", items: ["Deindustrialization and welfare research"] },
      { title: "C. Macroeconomy, industrial power, and geopolitical infrastructure", description: "Industrial systems, energy, technology, and macroeconomic power.", items: ["Macroeconomy and industrial power", "The Server as a Furnace research"] },
      { title: "D. Immigration, law enforcement, measurement, and labor dependence", description: "Measurement, enforcement, labor, and migration systems.", items: ["Who Deported More", "Hidden moral economy"] },
      { title: "E. Governance, legitimacy, and accountability", description: "Institutional trust, accountability, and public legitimacy.", items: ["Governance and accountability research"] },
      { title: "F. Education, medicine, health, and human capital", description: "Education, health systems, medicine, and capability.", items: ["Education and human-capital research"] },
    ],
  },
];
