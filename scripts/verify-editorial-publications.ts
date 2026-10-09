import { greenPublications } from "../src/data/green-publications";
import { sixCandidateReleaseQueue } from "../src/data/publication-registry";
import { validatePublications } from "../src/lib/publication-validation";

const result = validatePublications(greenPublications, sixCandidateReleaseQueue);
console.log(
  `Editorial publication checks passed: ${result.released} released articles, ${result.previews} previews. Factual and rights review remain editorial responsibilities.`,
);
