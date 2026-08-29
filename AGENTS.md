# KOLEKTA — Project Agent Guide

Tax compliance web application for Kenya's independent workers and creatives.

## Repo Layout
- `frontend/` — Next.js app (App Router, TS). See `frontend/AGENTS.md` for Next.js-specific rules.
- `backend/` — Express API server
- `studio/` — Sanity Studio (standalone, repo root; sibling to `frontend/`)
- `docs/` — Internal documentation

## Sanity CMS
- **Project:** kolekta — id `ev7risxe` (org `oyg5pzd3p`), owned by `lyricsngori@gmail.com`
- **Dataset:** `production`
- **Studio:** standalone at repo root `studio/`. Keep it standalone — do NOT embed into the app.
- **CLI:** `sanity` installed globally (`/home/pro-g/.npm-global/bin/sanity`). Source the repo-root
  `.env.local` (`set -a && source .env.local && set +a`) before CLI commands.
- **Tokens (in gitignored `.env.local`):**
  - `SANITY_AUTH_TOKEN` — `kolekta-deploy` robot token, `deploy-studio` role (schema/studio deploys, CORS)
  - `SANITY_WRITE_TOKEN` — `kolekta-cli` robot token, `write` role (content seeding/creation)
  - Seed/publish scripts use `SANITY_WRITE_TOKEN` (falls back to `SANITY_AUTH_TOKEN`).
- **MCP:** Sanity MCP server registered in `~/.config/opencode/opencode.jsonc` as `sanity`
  (remote `https://mcp.sanity.io`). Auth is a static `Authorization: Bearer {env:SANITY_AUTH_TOKEN}`
  header resolved from the shell env — the write token is exported in `~/.bashrc`. `oauth: false`
  disables browser OAuth. Verified: initialize + tools/list succeed with the token.
- The old project `pg78qsiy` (org `ow02tlfnv`) was the original setup under a different account and
  is no longer used. `u0bts60c` is an even older stale project with no robot access.

## Frontend (Next.js)
- Next.js 16.x App Router; `@/*` path alias → repo root of `frontend/` (no `src/` dir).
- **Sanity integration** lives in `frontend/lib/sanity/` (`client.ts`, `live.ts`, `queries.ts`,
  `image.ts`, `types.ts`). Blog is fully CMS-driven:
  - `/blog` listing (`app/(marketing)/blog/page.tsx`) and `/blog/[slug]` detail
    (`app/(marketing)/blog/[slug]/page.tsx`, uses `generateStaticParams` + PortableText).
  - Uses `next-sanity` (v13) + `@sanity/image-url`. Covers served via `next/image` from
    `cdn.sanity.io` (whitelisted in `frontend/next.config.ts` `images.remotePatterns`).
  - Env (`frontend/.env.local`, gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID=pg78qsiy`,
    `NEXT_PUBLIC_SANITY_DATASET=production`, optional `SANITY_API_READ_TOKEN` for live content.
  - `<SanityLive />` is mounted in `app/layout.tsx`.
- **Gotchas learned here:**
  - `next-sanity` v13 does NOT export `SanityDocument`; type results yourself
    (`lib/sanity/types.ts`). Without TypeGen, `sanityFetch` data is `unknown` — cast the result.
  - `@sanity/icons` v3+ only supports root imports (`import {UserIcon} from '@sanity/icons'`),
    NOT subpaths like `@sanity/icons/User`.
  - `@sanity/image-url` — use the named export `createImageUrlBuilder`, not the deprecated default.
  - Sanity API `client.create` writes **published** docs directly (no draft). String slugs are
    stored as plain strings — always send `slug: {_type:'slug', current}` so `defined(slug.current)`
    queries work.
  - `npx sanity debug`/`projects list` only shows projects for the *authenticated* identity; with
    `SANITY_AUTH_TOKEN` it reports the robot user and "No project found" — use the API token via
    curl to verify project access instead.
  - Seed/publish scripts: `studio/scripts/seed-blog.cjs` + `studio/scripts/publish-drafts.cjs`
    (run from repo root with `SANITY_AUTH_TOKEN` exported). Temporary stock photos live in
    gitignored `.seed-images/`.
- Marketing/blog content was previously hardcoded placeholders; the blog is now Sanity-backed.
- Run lint: `npm run lint` (eslint). Run dev: `npm run dev` (port 3000).
