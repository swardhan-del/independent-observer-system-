# PRODUCTION-SECURITY-ROLLOUT-2026-08-28

## Independent Observer

- Repository: `swardhan-del/independent-observer-system-` (ID `1306506841`)
- PR: [#30](https://github.com/swardhan-del/independent-observer-system-/pull/30), ready for review, not merged
- Reviewed branch: `security/platform-hardening-v1`
- Reviewed head: `cac22d1e733805f6b09ff52fbdb1338dd7389fa5`
- Default branch: `main` at `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`
- Merge SHA: none; merge was stopped by protected-main approval from someone other than the last pusher
- Canonical domain: `https://independentobserver.org`
- Vercel project: `independent-observer` / `prj_KF5jNuvfO4aK4dV0WIJfcWoezNGX`
- Production aliases observed: `independentobserver.org`, `www.independentobserver.org`, `independent-observer.vercel.app`, and the team Vercel alias
- Reviewed Preview: `dpl_7LVdmX7mth1mjtaKKPhMgap6hiay`, READY, exact reviewed head, PR #30
- Current production deployment: `dpl_7zyiu5XCUUsQT2JubCP1WeZz92AA`, READY, target `production`, aliases include `independentobserver.org` and `www.independentobserver.org`; Vercel returned no Git SHA metadata for this deployment
- Production rollout deployment: none; the reviewed security branch has not been merged
- Previous READY production rollback candidate: current target `dpl_7zyiu5XCUUsQT2JubCP1WeZz92AA` is identified, but its source commit is not attributable through returned Vercel metadata

### Release gates

| Gate                 | Status                | Evidence                                                                                   |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| CI                   | PASS                  | GitHub run `33188020060`                                                                   |
| CodeQL               | PASS                  | GitHub run `33188020273`                                                                   |
| Dependency security  | PASS                  | Platform-independent lockfile/audit run `33188020089`                                      |
| npm audit            | PASS                  | 0 high/critical vulnerabilities                                                            |
| Secret scan          | PASS                  | No active-looking credential; values not printed                                           |
| Production build     | PASS                  | Approved-origin Astro build                                                                |
| Preview deployment   | PASS                  | `dpl_rXTviWv8Jxq1sgYDzNRnLVxvPKQn` READY and exact head match                              |
| Browser smoke        | PASS WITH LIMITATIONS | Preview root is SSO-protected; public pre-rollout route checks passed                      |
| Security headers     | FAIL for production   | Current public production response has HSTS only; staged CSP, frame, Permissions-Policy, Referrer-Policy, and `nosniff` are not present |
| Canonical/provenance | FAIL                  | Production deployment Git metadata unavailable                                             |
| Rollback identified  | PASS WITH LIMITATIONS | READY production candidate identified; Git SHA unavailable                                 |
| Native WAF/DDoS      | UNKNOWN               | Authenticated Vercel firewall state unavailable; no changes made                           |

### Result

**PRODUCTION SECURITY PASS WITH DOCUMENTED LIMITATIONS for the reviewed branch; production rollout stopped before merge.** The blocking action is human approval required by protected `main`, followed by production deployment and read-only verification. Codex did not merge, deploy, promote, publish firewall rules, change domains, or alter Dropbox content.

## Cross-system controls

The branch contains security architecture, incident response, firewall runbooks/proposals, provenance scripts, security regression tests, dependency controls, and human account checklists. The native Vercel firewall remains unconfigured by this rollout because authenticated firewall tooling was unavailable. Automatic DDoS/system mitigation state remains an owner verification item.
