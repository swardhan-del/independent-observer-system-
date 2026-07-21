import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const workflowRoot = join(process.cwd(), ".github/workflows");
const ci = readFileSync(join(workflowRoot, "ci.yml"), "utf8");
const deploy = readFileSync(join(workflowRoot, "deploy.yml"), "utf8");

function triggerKeys(workflow: string) {
  const triggerBlock = workflow.match(/^on:\s*\n([\s\S]*?)^permissions:/m)?.[1] ?? "";
  return [...triggerBlock.matchAll(/^ {2}([a-z_]+):/gm)].map((match) => match[1]);
}

describe("workflow publication safety", () => {
  it("keeps continuous integration read-only and deployment-free", () => {
    expect(triggerKeys(ci)).toEqual(["pull_request", "push", "workflow_dispatch"]);
    expect(ci).toMatch(/^permissions:\s*\n  contents: read$/m);
    expect(ci).not.toMatch(/pull_request_target/);
    expect(ci).not.toMatch(/actions\/(?:configure-pages|upload-pages-artifact|deploy-pages)@/);
    expect(ci).not.toMatch(/(?:pages|id-token):\s*write/);
    expect(ci).not.toMatch(/^\s*environment:\s*github-pages/m);
  });

  it("allows deployment only through a confirmed dispatch from main", () => {
    expect(triggerKeys(deploy)).toEqual(["workflow_dispatch"]);
    expect(deploy).toMatch(/confirm_deployment:/);
    expect(deploy).toMatch(/default:\s*false/);
    expect(deploy).toContain(
      "if: ${{ github.ref == 'refs/heads/main' && inputs.confirm_deployment == true }}",
    );
    expect(deploy).toMatch(/environment:\s*\n\s+name:\s*github-pages/);
    expect(deploy).toMatch(/pages:\s*write/);
    expect(deploy).toMatch(/id-token:\s*write/);
    expect(deploy).toMatch(/actions\/deploy-pages@/);
  });
});
