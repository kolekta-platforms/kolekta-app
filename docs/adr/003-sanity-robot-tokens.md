# ADR-003: Sanity robot tokens — least-privilege split

- **Date:** 2026-08-29
- **Status:** Accepted

## Context

The Sanity CLI and scripts need authenticated access to project `ev7risxe`, but a
single over-privileged token violates least privilege. Sanity token roles are
fixed (`write`, `read`, `manage-datasets`, `deploy-studio`, `create-session`,
`custom`); the `write` role can create/patch documents but **cannot** deploy
schemas or manage CORS, and `deploy-studio` can deploy schemas/studio but **cannot**
create documents.

## Decision

Use two robot tokens, both scoped to `ev7risxe`, stored in the gitignored
repo-root `.env.local`:

- `SANITY_AUTH_TOKEN` — `kolekta-deploy`, role `deploy-studio` → CLI schema
  deploys, studio deploys, CORS management.
- `SANITY_WRITE_TOKEN` — `kolekta-cli`, role `write` → content seeding/creation.

Seed/publish scripts prefer `SANITY_WRITE_TOKEN` and fall back to
`SANITY_AUTH_TOKEN`.

The Sanity MCP server (`~/.config/opencode/opencode.jsonc`) authenticates with a
static `Authorization: Bearer {env:SANITY_AUTH_TOKEN}` header (`oauth: false`);
the write token is exported in `~/.bashrc` for shell resolution.

## Consequences

- Content creation and schema deployment use separate capabilities.
- CLI commands must source `.env.local` first (`set -a && source .env.local && set +a`).
- CORS updates go through the admin OAuth token (the CLI `cors` command needs a
  grant the robot tokens don't carry).

## Alternatives considered

- **Single `custom`-role token with all grants.** Rejected — Sanity custom roles
  are not expressible through the public token API we used, and a single
  all-purpose token is a larger blast radius.
