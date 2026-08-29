/* eslint-disable no-console */
/**
 * Publish all draft documents (author, categories, posts) so the
 * public frontend can read them.
 *
 * Run from the repo root with the API token exported:
 *   set -a && source .env.local && set +a
 *   node studio/scripts/publish-drafts.cjs
 */
const {createClient} = require('@sanity/client')

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN / SANITY_AUTH_TOKEN. Source .env.local first.')
  process.exit(1)
}

const projectId = process.env.SANITY_PROJECT_ID || 'ev7risxe'

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2026-08-29',
  token,
  useCdn: false,
})

async function main() {
  const drafts = await client.fetch('*[_id in path("drafts.**")]')
  if (!drafts.length) {
    console.log('No drafts to publish.')
    return
  }
  for (const d of drafts) {
    const id = d._id.replace(/^drafts\./, '')
    const published = {...d, _id: id}
    delete published._rev
    await client.createOrReplace(published)
    await client.delete(d._id)
    console.log('Published:', id, '-', d._type, '-', d.title || d.name)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error('Publish failed:', err.message)
  process.exit(1)
})
