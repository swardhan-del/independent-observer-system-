export const authorIdentity = {
  name: "Siddhartha Harsh Wardhan",
  alternateNames: ["Sidd Wardhan"],
  orcid: "0009-0005-4228-1124",
  orcidUrl: "https://orcid.org/0009-0005-4228-1124",
} as const;

export const authorIdentityLinks = [authorIdentity.orcidUrl] as const;
