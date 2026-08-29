# Architecture

## Overview

Kolekta is a tax-compliance web app for Kenya's independent workers and creatives.
The marketing site + blog is a Next.js app served by Vercel, with content managed
in Sanity.

```
┌──────────────┐   GROQ query (CDN)   ┌──────────────────────┐
│  Sanity CMS   │ ──────────────────► │  Next.js App Router   │
│  ev7risxe     │   next-sanity       │  frontend/            │
│  (production) │   client.ts         │  /blog, /blog/[slug]  │
└──────┬───────┘                      └──────────┬───────────┘
       │  Studio (standalone)                     │ push to main
       │  https://kolekta.sanity.studio/          ▼
       │                                  ┌──────────────────────┐
       │                                  │  Vercel (kolekta.co) │
       │                                  │  Git Integration     │
       └──────────────────────────────────┴──────────────────────┘
```

## Components

### Sanity CMS (`studio/`)
- Project `ev7risxe`, dataset `production`, org `oyg5pzd3p`.
- Standalone Studio (repo root), not embedded in the Next.js app.
- Schema types: `post`, `author`, `category`, `blockContent` (Portable Text).
- Deployed at https://kolekta.sanity.studio/.

### Frontend (`frontend/`)
- Next.js 16 App Router, TypeScript, Tailwind + daisyUI.
- Sanity integration in `frontend/lib/sanity/`:
  - `client.ts` — `next-sanity` client (`createClient`).
  - `live.ts` — `defineLive` (live content + `<SanityLive />`).
  - `queries.ts` — GROQ queries via `defineQuery`.
  - `image.ts` — `@sanity/image-url` builder.
  - `types.ts` — hand-written result types.
  - `types.generated.ts` — Sanity TypeGen output (regenerated in CI).
- Blog routes:
  - `/blog` listing (`app/(marketing)/blog/page.tsx`).
  - `/blog/[slug]` detail (`app/(marketing)/blog/[slug]/page.tsx`) — SSG via
    `generateStaticParams`.

### Backend (`backend/`)
- Express API server (health check only at present).

## Deployment

- Vercel Git Integration auto-deploys `frontend/` on push to `main`.
- GitHub Actions runs quality gates (see `ci.yml`); the `deploy.yml` workflow
  verifies the production build but does not deploy (no Vercel token).

## Environment variables

| Variable | Scope | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | frontend + CI | `ev7risxe` (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | frontend + CI | `production` (public) |
| `SANITY_API_READ_TOKEN` | frontend (server) | optional, for live/draft |
| `SANITY_AUTH_TOKEN` | studio CLI | `deploy-studio` robot token |
| `SANITY_WRITE_TOKEN` | seed scripts | `write` robot token |
