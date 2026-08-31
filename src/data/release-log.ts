export type ReleaseLogEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  route: string;
};

/** Intentionally empty until an owner-approved release reaches protected main. */
export const releaseLog: ReleaseLogEntry[] = [];
