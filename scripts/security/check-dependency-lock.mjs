import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
const root = lock.packages?.[""];

if (!root || lock.lockfileVersion !== 3) {
  throw new Error("Dependency lock review failed: expected an npm lockfile v3 root entry.");
}

const expected = {
  dependencies: packageJson.dependencies ?? {},
  devDependencies: packageJson.devDependencies ?? {},
  optionalDependencies: packageJson.optionalDependencies ?? {},
};

function sameMap(left, right) {
  return (
    JSON.stringify(Object.fromEntries(Object.entries(left).sort())) ===
    JSON.stringify(Object.fromEntries(Object.entries(right).sort()))
  );
}

for (const [field, values] of Object.entries(expected)) {
  const actual = root[field] ?? {};
  if (!sameMap(actual, values)) {
    throw new Error(`Dependency lock review failed: ${field} does not match package.json.`);
  }
}

const packages = Object.entries(lock.packages).filter(([name]) => name !== "");
for (const [name, entry] of packages) {
  if (
    entry.resolved &&
    !/^https:\/\//.test(entry.resolved) &&
    !entry.resolved.startsWith("file:")
  ) {
    throw new Error(`Dependency lock review failed: unsupported resolved URL for ${name}.`);
  }
  if (
    entry.link === false &&
    entry.resolved &&
    !entry.integrity &&
    !entry.resolved.startsWith("file:")
  ) {
    throw new Error(`Dependency lock review failed: missing integrity for ${name}.`);
  }
}

console.log(
  `Dependency lock review passed: npm lockfile v3, ${packages.length} package entries checked.`,
);
