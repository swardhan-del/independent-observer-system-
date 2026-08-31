import { releasedGreenPublications } from "./green-publications";

export type ReleaseLogEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  route: string;
};

/** Derived only from records that have passed the owner-approved release gate. */
export const releaseLog: ReleaseLogEntry[] = releasedGreenPublications.map((publication) => ({
  id: publication.candidateId,
  title: publication.title,
  description: publication.standfirst,
  category: publication.topics.slice(0, 2).join(" · "),
  date: publication.publicationDate,
  route: `/research/${publication.slug}/`,
}));
