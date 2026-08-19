/**
 * Human-gate wiring check.
 *
 * The ART/COPY/SEO/GEO decisions remain human/Codex-owned. This gate only
 * prevents CI from silently running without the required playbook, skills or
 * an approved handoff for one of those decisions.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let failed = 0;

const fail = (message) => {
  console.error(`  ✗ ${message}`);
  failed++;
};
const ok = (message) => console.log(`  ✓ ${message}`);

const requiredFiles = [
  [".claude/playbooks/codex-gates.md", "Codex gates playbook"],
  [".claude/skills/copy-craft/SKILL.md", "copy-craft skill"],
  [
    ".claude/skills/animation/skills/review-animations/SKILL.md",
    "review-animations skill",
  ],
];

for (const [relativePath, label] of requiredFiles) {
  if (existsSync(join(root, relativePath))) ok(`${label}: có`);
  else fail(`${label}: thiếu ${relativePath}`);
}

const handoffs = [
  ["CODEX_ART_HANDOFF.md", "ART"],
  ["CODEX_COPY_HANDOFF.md", "COPY"],
  ["CODEX_SEO_HANDOFF.md", "SEO"],
  ["CODEX_GEO_HANDOFF.md", "GEO"],
];

for (const [relativePath, label] of handoffs) {
  const path = join(root, relativePath);
  if (!existsSync(path)) {
    fail(`${label} GATE: thiếu ${relativePath}`);
    continue;
  }
  const text = readFileSync(path, "utf8");
  if (/\bapproved\b|\bapprove\b/i.test(text)) ok(`${label} GATE: handoff đã có quyết định duyệt`);
  else fail(`${label} GATE: handoff chưa có quyết định approve/approved`);
}

console.log("");
if (failed) {
  console.error(`✗ approval gate FAIL (${failed} lỗi)`);
  process.exit(1);
}
console.log("✓ approval gates wired (ART + COPY + SEO + GEO)");
