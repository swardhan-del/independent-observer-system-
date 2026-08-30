/**
 * Public-safe synthesis of the Volume II Dropbox taxonomy and audit frame.
 * These are research families and reading principles, not a claim that only
 * four manuscripts exist or that any manuscript is a released publication.
 */
export type VolumeTwoResearchFamily = {
  title: string;
  description: string;
};

export type VolumeTwoPrinciple = {
  title: string;
  description: string;
};

export type VolumeTwoFramework = {
  intro: string;
  families: readonly VolumeTwoResearchFamily[];
  principles: readonly VolumeTwoPrinciple[];
};

export const volumeTwoFramework: VolumeTwoFramework = {
  intro:
    "The research taxonomy organizes Volume II into four paper families rather than a single thesis or a four-paper limit. Together, they examine how democratic authority is designed, enforced, bounded, and made materially dependent. The frame below is a public editorial synthesis of that research map; it does not reproduce private drafts or turn a working paper into a released publication.",
  families: [
    {
      title: "Democracy, institutions, and party power",
      description:
        "Examines constitutional arrangements, elections, party continuity, agenda-setting, donor and elite power, and political crises to ask how formal participation can coexist with a narrow range of outcomes.",
    },
    {
      title: "Immigration, citizenship, and border",
      description:
        "Uses careful definitions and administrative records to distinguish citizenship, border inspection, detention, removal, return, expulsion, migration, and political identity, showing how membership and enforcement become operational.",
    },
    {
      title: "Civil rights, carceral state, and legal power",
      description:
        "Follows the relationship among constitutional exceptions, policing, punishment, pardons, non-prosecution, and prosecutorial independence while keeping legal doctrine separate from claims about motive or outcome.",
    },
    {
      title: "Empire, geopolitics, and sovereignty",
      description:
        "Traces how external capital, technology, security, labor, markets, resource power, and geopolitical competition can produce authority that looks sovereign while remaining materially interdependent.",
    },
  ],
  principles: [
    {
      title: "Formal democracy is not the same as usable power.",
      description:
        "Rights and elections matter, but practical power also depends on access, information, agenda-setting, institutional vetoes, and a route for correction between elections.",
    },
    {
      title: "Definitions are part of evidence.",
      description:
        "A credible comparison must keep categories distinct—such as removals, returns, and expulsions; citizens and noncitizens; or basic and advanced searches—before drawing a conclusion.",
    },
    {
      title: "Sovereignty is relational and material.",
      description:
        "A state can speak in the language of independence while relying on outside capital, technology, security, labor, or markets; dependence is a mechanism to investigate, not an insult to assign.",
    },
    {
      title: "Enforcement reveals how power is organized.",
      description:
        "Emergency authority, selective enforcement, punishment, protection, and administrative discretion reveal who is exposed, who is buffered, and whether institutions can correct themselves.",
    },
  ],
};
