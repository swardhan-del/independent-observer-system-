type PublicationReuseState = {
  license?: string;
  rightsReviewed?: boolean;
  productionReleased?: boolean;
};

export const pendingReuseNotice = "Reuse terms pending final review and release.";

/** A source licence is not a grant for an adaptation still awaiting release. */
export function publicationReuse(publication: PublicationReuseState) {
  const license = publication.license?.trim();
  const approved =
    publication.rightsReviewed === true && publication.productionReleased === true && license;

  return {
    schemaLicense: approved ? license : undefined,
    reuseNotice: approved ? license : pendingReuseNotice,
  };
}
