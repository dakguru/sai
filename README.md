# Sai Agro Foods Ecommerce Website

Premium React/Vite storefront for Sai Agro Foods, an edible oil and agricultural products brand from Pasupathipalayam, Karur, Tamil Nadu.

## V2 Features

- Seven real products with SKU-level variants, primary packs, trade packs, badges, shelf life, nutrition, and Tamil taglines.
- Catalog filters for category, sub-brand, pack size, bulk/trade, and price/newest sorting.
- Variant-aware product detail pages, cart, checkout, WhatsApp order links, provenance card, and checkout trust sidebar.
- Browser-based admin panel at `/admin` with login, dashboard stats, product CRUD, variants, images, site settings, orders, audit log, and JSON backup export.
- Thirty-five deterministic SVG placeholder product images under `public/images/products`.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Admin

This Vite build uses client-side demo authentication and localStorage persistence because the current repo is not a Next.js/server codebase.

- URL: `http://localhost:5173/admin`
- Email: `admin@saiagrofoods.com`
- Password: `admin123`

Admin edits are stored in browser localStorage and reflected on the public storefront immediately. Use Settings -> Download data backup to export products, orders, and site settings.

For production, migrate the admin to Next.js with NextAuth Credentials, bcrypt, middleware protection, and server-side JSON or database persistence. Required environment variables are listed in `.env.example`.

## JSON To PostgreSQL + Prisma Plan

The product shape maps directly to relational tables:

- `products`: id, slug, name, tamil, subBrand, category, tagline, shortDesc, longDesc, nutrition, shelfLife, featured, archived, batchNo, createdAt, updatedAt.
- `variants`: id, productId, sku, size, price, compareAtPrice, stock, primary, tradePack, sortOrder.
- `productImages`: id, productId, src, alt, sortOrder.
- `siteSettings`: announcements, footer contact fields, shipping threshold, shipping rate, banner state.
- `orders`: id, customer JSON, total, status, createdAt.
- `orderItems`: orderId, productSlug, sku, name, size, price, qty.
- `auditLogs`: id, adminEmail, action, entity, delta, createdAt.

Migration steps: create the Prisma schema, seed from the exported admin backup JSON, replace localStorage reads with API/server actions, and wrap product/order writes in transactions. For file-based JSON during an interim phase, write temp files and rename atomically behind a mutex.

## Image Replacement Workflow

Current placeholders are SVGs. Replace each product folder one image at a time:

1. Keep the same filenames: `01-hero`, `02-detail-label`, `03-pour`, `04-ingredients`, `05-context`.
2. Export real images as webp or jpg at 1200x1500 or larger.
3. Update the image path in the admin product editor if a filename changes.
4. Keep alt text product-specific and never empty.

## AI Photography Prompts

Groundnut oil: "A 1-litre amber glass bottle of cold-pressed groundnut oil with a forest green cap and cream paper label reading 'KANI CHEKKU GROUNDNUT OIL', placed on a jute mat with raw peanuts and dried groundnut leaves scattered around, warm afternoon Tamil Nadu kitchen window light, shallow depth of field, food editorial photography, hyperreal 35mm film look, --ar 4:5"

Gingelly oil: "A 1-litre dark amber glass bottle labelled 'KANI CHEKKU GINGELLY OIL' on a woven palm leaf placemat, white sesame seeds in a small brass katori, golden Tamil Nadu kitchen light, editorial food photography, --ar 4:5"

Coconut oil: "A 1-litre clear glass bottle of cold-pressed coconut oil labelled 'KANI BRAND COCONUT OIL' beside a halved fresh coconut and grated copra on banana leaf, soft natural light, traditional Tamil kitchen mood, hyperreal, --ar 4:5"

Castor oil: "A 1-litre pale-amber glass bottle of cold-pressed castor oil with cream label 'KANI CHEKKU CASTOR OIL', surrounded by green castor leaves and dried castor pods on a wooden board, soft directional light, --ar 4:5"

Lamp oil: "A 1-litre golden bottle labelled 'KANI BRAND LAMP OIL' beside a lit brass kuthuvilakku oil lamp, mustard yellow flame reflecting off the bottle, dark wooden temple shrine background, devotional mood, --ar 4:5"

Roasted peanuts: "A glossy mustard-and-forest-green pouch labelled 'SAI ROASTED PEANUTS 1 KG' standing upright next to a brass bowl overflowing with roasted peanuts, jute backdrop, warm afternoon light, hyperreal product photography, --ar 4:5"

Sai Gold Palm Oil: "A premium golden-yellow corrugated cardboard box labelled 'SAI GOLD PALM OIL', clean studio cream background with a subtle palm frond shadow, tilted 3/4 angle, premium FMCG product photography, --ar 4:5"

## Build

```bash
npm run build
```

## Notes Before Launch

- Replace placeholder FSSAI, GSTIN, and founding year.
- Move demo admin auth and localStorage persistence to real server-backed auth and storage before accepting live admin edits.
- Connect checkout to Razorpay, PhonePe, WhatsApp Business API, email, or an order database.
