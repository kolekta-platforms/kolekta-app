# ADR-001: Sanity project ownership — `pg78qsiy` → `ev7risxe`

- **Date:** 2026-08-29
- **Status:** Accepted

## Context

The blog was initially wired to Sanity project `pg78qsiy` (org `ow02tlfnv`).
Investigation revealed that project is owned by a *different* Sanity account
(admin member `pQlo1dTl6`), not by the Kolekta owner account
(`lyricsngori@gmail.com`, Sanity user `gyecv8fZx`). The owner account has zero
projects and zero organizations, so it could not see or review the content in
the Sanity dashboard — the dashboard appeared empty despite content existing.

## Decision

Create a new project `ev7risxe` (org `oyg5pzd3p`) owned by `lyricsngori@gmail.com`
and migrate all schema + content there. Repoint the Studio, the frontend
`next-sanity` client, CI environment variables, and seed scripts at `ev7risxe`.

The old `pg78qsiy` and `u0bts60c` projects are abandoned (the latter is a stale
pre-robot project with no access).

## Consequences

- The owner account is the project administrator and can review/edit content in
  the dashboard and Studio.
- Robot tokens must be scoped to `ev7risxe` (the old token only worked on
  `pg78qsiy`).
- Two robot tokens are used for least-privilege separation (see ADR-003).

## Alternatives considered

- **Invite `lyricsngori@gmail.com` as a member of `pg78qsiy`.** Rejected — the
  admin member `pQlo1dTl6` belongs to an unknown account that would have to
  perform the invite, and the owner wanted first-class ownership, not shared
  access.
- **Keep `pg78qsiy` and use the browser OAuth account.** Rejected — the OAuth
  identity (`gyecv8fZx`) is distinct from the project owner and has no grants.
