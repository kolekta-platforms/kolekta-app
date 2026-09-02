/* eslint-disable no-console */
/**
 * Migration: ev7risxe (org oyg5pzd3p) -> 998ifqep (org o4qckorzc)
 *
 * Reads posts/categories from the OLD project and recreates them in the NEW
 * project with:
 *   - a single "Kolekta" author (SVG avatar uploaded as an asset)
 *   - content-inferred categories with descriptions
 *   - cover images reused by content-hash asset id (deterministic across
 *     projects for identical file bytes)
 *
 * Run from the repo root with tokens exported:
 *   set -a && source .env.local && set +a
 *   SANITY_OLD_READ_TOKEN=... SANITY_NEW_TOKEN=... \
 *     node studio/scripts/migrate-posts.cjs
 */
const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const OLD_PROJECT_ID = 'ev7risxe'
const NEW_PROJECT_ID = '998ifqep'
const DATASET = 'production'
const API_VERSION = '2026-08-29'

const oldToken = process.env.SANITY_OLD_READ_TOKEN
const newToken = process.env.SANITY_NEW_TOKEN
if (!oldToken || !newToken) {
  console.error('Missing SANITY_OLD_READ_TOKEN or SANITY_NEW_TOKEN.')
  process.exit(1)
}

const oldClient = createClient({
  projectId: OLD_PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: oldToken,
  useCdn: false,
})

const newClient = createClient({
  projectId: NEW_PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: newToken,
  useCdn: false,
})

const IMG_DIR = path.join(__dirname, '..', '..', '.seed-images')
const STATIC_DIR = path.join(__dirname, '..', 'static')

// Content-inferred category mapping: post slug -> {slug,title,description}
const CATEGORY_BY_POST = {
  'vat-registration-kenya': {
    slug: 'vat',
    title: 'VAT & Indirect Tax',
    description:
      'Value Added Tax registration, the KES 5 million threshold, rates, eTIMS invoicing, and compliance for Kenyan businesses.',
  },
  'allowable-expenses-creatives': {
    slug: 'expenses',
    title: 'Business Expenses',
    description:
      'Allowable deductions for freelancers and creatives — equipment, software, travel, marketing, and professional services under Kenyan tax law.',
  },
  'freelancer-tax-pin': {
    slug: 'pin',
    title: 'Registration & PIN',
    description:
      'KRA PIN registration, tax obligations, iTax onboarding, and first-time filer guidance for independent workers.',
  },
  'paye-guide-2026': {
    slug: 'paye',
    title: 'PAYE & Payroll',
    description:
      'Pay As You Earn explained — tax bands, reliefs, statutory deductions (AHL, SHIF, NSSF), filing deadlines, and penalties.',
  },
  'kra-itax-guide': {
    slug: 'filing',
    title: 'Tax Filing & Compliance',
    description:
      'Filing returns on iTax, payments via bank/M-PESA, Tax Compliance Certificates, and the mistakes to avoid.',
  },
}

// Cover file per post slug (fallback lookup only; refs are content-hashed)
const COVER_FILE_BY_POST = {
  'vat-registration-kenya': 'vat.jpg',
  'allowable-expenses-creatives': 'expenses.jpg',
  'freelancer-tax-pin': 'pin.jpg',
  'paye-guide-2026': 'paye.jpg',
  'kra-itax-guide': 'itax.jpg',
}

async function uploadImage(fileName, dir = IMG_DIR) {
  const filePath = path.join(dir, fileName)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing image: ${filePath}`)
  }
  const asset = await newClient.assets.upload('image', fs.createReadStream(filePath), {
    filename: fileName,
  })
  console.log(`Uploaded ${fileName} -> ${asset._id}`)
  return asset
}

async function fetchAll(type) {
  const docs = await oldClient.fetch(`*[_type == $type]`, {type})
  return docs
}

async function main() {
  // 0. Create author "Kolekta" with SVG avatar
  const avatar = await uploadImage('kolekta-author.svg', STATIC_DIR)
  const author = await newClient.create({
    _type: 'author',
    name: 'Kolekta',
    slug: {_type: 'slug', current: 'kolekta'},
    bio: 'Kolekta helps Kenya\'s independent workers, creatives, and small businesses understand and file their taxes with confidence — plain English, no jargon.',
    image: {
      _type: 'image',
      asset: {_type: 'reference', _ref: avatar._id},
      alt: 'Kolekta',
    },
  })
  console.log('Created author Kolekta:', author._id)

  // 1. Create the 5 inferred categories
  const catBySlug = {}
  for (const cat of Object.values(CATEGORY_BY_POST)) {
    const doc = await newClient.create({
      _type: 'category',
      title: cat.title,
      slug: {_type: 'slug', current: cat.slug},
      description: cat.description,
    })
    catBySlug[cat.slug] = doc._id
    console.log(`Created category ${cat.title}:`, doc._id)
  }

  // 2. Ensure cover assets exist in the new project (content-hash ids)
  const coverRefs = {}
  for (const [postSlug, file] of Object.entries(COVER_FILE_BY_POST)) {
    const asset = await uploadImage(file)
    coverRefs[postSlug] = asset._id
  }

  // 3. Migrate posts
  const posts = await fetchAll('post')
  console.log(`\nFound ${posts.length} posts in old project`)
  for (const post of posts) {
    const postSlug = post.slug?.current
    if (!postSlug) {
      console.warn('Skipping post without slug:', post._id)
      continue
    }
    const cat = CATEGORY_BY_POST[postSlug]
    if (!cat) {
      console.warn(`No category mapping for post "${postSlug}", skipping`)
      continue
    }
    // Prefer the post's existing cover asset id (already uploaded) when present
    const oldCoverRef = post.coverImage?.asset?._ref
    const coverRef = coverRefs[postSlug] || oldCoverRef

    const doc = {
      _type: 'post',
      title: post.title,
      slug: {_type: 'slug', current: postSlug},
      excerpt: post.excerpt,
      body: post.body,
      coverImage: coverRef
        ? {
            _type: 'image',
            asset: {_type: 'reference', _ref: coverRef},
            alt: post.coverImage?.alt || 'A Kolekta blog cover image',
          }
        : undefined,
      category: {_type: 'reference', _ref: catBySlug[cat.slug]},
      author: {_type: 'reference', _ref: author._id},
      publishedAt: post.publishedAt,
      featured: Boolean(post.featured),
      readTime: post.readTime,
    }
    const created = await newClient.create(doc)
    console.log(`Created post "${postSlug}":`, created._id)
  }

  console.log('\nMigration complete.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
