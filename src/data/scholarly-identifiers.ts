export type ScholarlyIdentity = {
  scholarlyTitle: string;
  doi?: string;
  ssrnUrl?: string;
  ssrnAbstractId?: string;
};

const scholarlyIdentities: Partial<Record<string, ScholarlyIdentity>> = {
  "who-deported-more": {
    scholarlyTitle:
      "Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000-2025",
    doi: "10.2139/ssrn.5495878",
    ssrnUrl: "https://ssrn.com/abstract=5495878",
    ssrnAbstractId: "5495878",
  },
  "wardhan-tax-doctrine": {
    scholarlyTitle:
      "The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity (with IRC Amendments)",
    doi: "10.2139/ssrn.5477606",
    ssrnUrl: "https://ssrn.com/abstract=5477606",
    ssrnAbstractId: "5477606",
  },
  "from-vietnam-to-terry-ohio": {
    scholarlyTitle: "From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential",
    doi: "10.2139/ssrn.5563298",
    ssrnUrl: "https://ssrn.com/abstract=5563298",
    ssrnAbstractId: "5563298",
  },
  "disconnected-hearts": {
    scholarlyTitle: "Disconnected Hearts — The Tech Revolution of Intimacy",
    doi: "10.2139/ssrn.5578130",
    ssrnUrl: "https://ssrn.com/abstract=5578130",
    ssrnAbstractId: "5578130",
  },
};

export const scholarlyIdentityFor = (documentId: string) => scholarlyIdentities[documentId];

export const verifiedScholarlyIdentities = scholarlyIdentities;
