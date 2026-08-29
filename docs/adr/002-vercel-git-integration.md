# ADR-002: Vercel deployment via Git Integration (no CI token)

- **Date:** 2026-08-29
- **Status:** Accepted

## Context

`kolekta.co` is hosted on Vercel (`server: Vercel`). The original
`.github/workflows/deploy.yml` ran `vercel deploy --prod` in GitHub Actions using
a `VERCEL_TOKEN` secret. That token expired (created 2026-05-19) and every deploy
job failed with `The token provided via VERCEL_TOKEN environment variable is not
valid`, so production silently stayed on stale builds.

In parallel, Vercel's Git Integration is enabled: Vercel watches the repo and
auto-deploys `frontend/` whenever `main` changes. This is why a push to `main`
made the Sanity-backed blog appear on `kolekta.co` even though the GitHub Actions
deploy workflow kept failing.

## Decision

Treat Vercel's Git Integration as the deployment mechanism. Rewrite
`.github/workflows/deploy.yml` to be a **production-build verification gate only**
— it runs `npm run build` and reports pass/fail, with **no Vercel token or CLI
deploy step**. A failed build stops here; a passing build is deployed by Vercel
automatically.

The `VERCEL_TOKEN` secret (and its `--build-env` passing) is no longer needed.

## Consequences

- Deploy workflow no longer fails on an expired token; its only failure mode is a
  genuine build break.
- No secret rotation burden for Vercel.
- Deploy timing is driven by Vercel's integration, not GitHub Actions.

## Alternatives considered

- **Rotate `VERCEL_TOKEN` and keep `vercel deploy` in CI.** Rejected — redundant
  with Git Integration; adds a secret to maintain with no benefit.
- **Disable Vercel Git Integration and rely on CI-only deploys.** Rejected — more
  moving parts and a hard secret dependency.
