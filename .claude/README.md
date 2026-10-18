# `.claude/`

AI tooling for this repo. The authoritative guidance is in the root `AGENTS.md` (imported by
`CLAUDE.md`); the frontend has its own `frontend/AGENTS.md`.

## Skills — `.claude/skills/<name>/SKILL.md`

Task recipes an agent can follow. Long code templates live under each skill's `references/`.

| Skill | When |
|---|---|
| `automate-process` | model/adjust a BPMN process and wire its glue code |
| `create-rest-controller` | add a REST endpoint (inbound port → service → controller) |
| `create-delegate` | add a JavaDelegate for a BPMN service task |
| `create-persistence-adapter` | add an outbound persistence adapter |
| `sync-api-client` | propagate a backend change to a clean frontend client |
| `create-feature-slice` | scaffold a new FSD slice |
| `verify-model-visually` | inspect a BPMN model's structure |
| `create-adr` | record an architecture decision |

## Subagents — `.claude/agents/<name>.md`

| Agent | Does |
|---|---|
| `review-process` | checks BPMN model ↔ glue-code consistency |
| `review-vertical-slice` | walks a feature end to end (BPMN → port → service → controller → openapi.json → generated client → FSD slice → Bruno → Playwright) and reports gaps |

## Settings and hooks

- `settings.json` denies edits to generated files (`adapter/process`, `openapi.json`, the orval
  client), allows the build, lint and read-only `gh` commands, and wires one hook. Personal additions
  go in `settings.local.json` (git-ignored).
- `hooks/lint-bpmn.sh` (PostToolUse) runs bpmnlint after every edit of a model under
  `service/app/src/main/resources/bpmn/` and hands the findings back to Claude (exit 2). It changes
  nothing; a missing bpmnlint (`npm ci` in the repo root) is reported, not ignored.

## What goes where

| Kind | Place | Example |
|---|---|---|
| orientation, boundaries, conventions | `AGENTS.md` | "Spring Data types stop at the adapter" |
| a repeatable workflow | a skill | wiring a service task to a delegate |
| an independent read-only review | an agent | model ↔ glue consistency |
| a rule a machine can check | a test, linter or CI step | ArchUnit, bpmnlint, drift checks |
| feedback right after an edit | a hook (small, no side effects) | bpmnlint on `.bpmn` |
| a hard no on a path | a deny rule in `settings.json` | editing generated files |

One fact, one place: a skill links to `AGENTS.md` instead of repeating it.

Skills and subagents are read natively by Claude Code and other AGENTS.md-aware tools. See ADR-0007
for why `AGENTS.md` is the single source and `CLAUDE.md` is a one-line import.
