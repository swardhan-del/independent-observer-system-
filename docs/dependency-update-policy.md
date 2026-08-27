# Dependency update policy

Independent Observer prefers native Astro, TypeScript, CSS, and browser APIs.
No runtime package is added unless the native implementation cannot meet the
requirement.

Before adding a package, record its exact version, purpose, maintenance status,
license, security history, estimated bundle-size effect, and privacy or telemetry
behavior in the pull request. Keep editorial content changes and unrelated major
dependency upgrades in separate pull requests.

CI audits production dependencies with `npm audit --omit=dev --audit-level=high`.
Development-tool findings remain visible as a maintenance task and are not
silently treated as publication clearance.
