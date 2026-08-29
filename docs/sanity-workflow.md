# Sanity content workflow

How to author and publish blog content for kolekta.co.

## 1. Start the Studio locally

```bash
cd studio
set -a && source ../.env.local && set +a   # export tokens
npm run dev                                 # http://localhost:3333
```

Or use the hosted Studio (login with `lyricsngori@gmail.com`):
https://kolekta.sanity.studio/

## 2. Author in the Studio

- **Post** — title, slug (auto from title), excerpt, body (Portable Text), cover
  image (with hotspot), category (reference), author (reference), publishedAt,
  featured, readTime.
- Publish drafts when ready (click "Publish").
- The frontend reads **published** content only.

## 3. Deploy schema changes

When you change `schemaTypes/*`:

```bash
cd studio
set -a && source ../.env.local && set +a
npm run schema:validate   # validate
npx sanity schemas deploy # push schema to Content Lake
```

## 4. Regenerate types

```bash
cd studio
npm run typegen   # schema extract + typegen generate → frontend/lib/sanity/types.generated.ts
```

Run after any schema or GROQ query change. CI runs this automatically.

## 5. Programmatic seeding / publishing

```bash
cd /home/pro-g/ProG/kolekta-app
set -a && source .env.local && set +a
node studio/scripts/seed-blog.cjs        # create content (write token)
node studio/scripts/publish-drafts.cjs   # publish drafts
```

Images: `seed-blog.cjs` uploads images from the gitignored `.seed-images/`
folder via the Sanity asset API. To upload an image manually, use the Studio, the
Sanity MCP `dataset_assets_upload` tool, or the asset API.

## 6. Go live

Push to `main`. Vercel Git Integration auto-deploys the frontend; the blog
updates on the next `generateStaticParams` build.
