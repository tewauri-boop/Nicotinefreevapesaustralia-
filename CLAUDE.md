# Nicotine Free Vapes Australia — Project Instructions

React/Next.js 15 e-commerce store with Vercel deployment, zero-nicotine verification, and full Agent-Ready ecosystem.

## Non-negotiable: 0mg Compliance & Regulatory Guardrails
- **Banned terms:** "nicotine salt", "high nicotine", "tobacco cigarette", "cure addiction", "therapeutic cure", "health remedy".
- **Required framing:** All products sold contain 0mg (zero) nicotine. Formulations are intended solely for adult sensory enjoyment and lifestyle relaxation. No smoking cessation or health claims are ever made.
- **Authority:** Australian Department of Health & TGA therapeutic advertising regulations.
- If a request would require breaking any of the above, stop and say so rather than complying.

## Architecture
`src/config/site.js` is the single source of truth. Adding or modifying an entry in `PRODUCTS`, `CATEGORIES`, `POSTS`, or `SITE` updates all routes, metadata, JSON-LD schemas, sitemaps, navigation links, and agent endpoints.
Never hand-edit generated files (`llms.txt`, `.well-known/*`, `vercel.json`) — run `npm run gen` to regenerate from `src/config/site.js`.

## Rules
- `npm run crosscheck` and `npm run build` must pass before every push.
- Exactly one `<h1>` per page. Meta descriptions in ~150 char band. Titles ≤ 60 chars.
- Product images: 4:3 white canvas frame (`.product-frame`), WebP/AVIF format with dimensions.
- Emails entity-encoded (&#64;) everywhere, including JSON-LD and HTML.
- Never commit `node_modules/`, `.next/`, `out/`, `assets/product-photos/`.
- Framework Preset on Vercel must be "Next.js" (never Static).
- Web3Forms CORS method is exact: FormData + Accept header only, no Content-Type.

## Live Placeholders
- `SITE.domain`: Currently `DOMAIN.com` (change before production Vercel DNS launch).
- `FORMS.web3formsKey`: `pending` (forms fallback to immediate thank-you redirect until key configured).
- `SITE.gscVerification`: `pending` (meta tag placeholder for Google Search Console).
- `CONTACT.whatsapp`: `+61400000000` (update to live business phone).

## Brand Authority Facts (Truthful Signals Only)
- Founded: 2023 in Sydney, NSW, Australia.
- Fulfillment: Direct express dispatch from Sydney warehouse across all Australian states.
- Catalog: 100% certified 0mg zero-nicotine disposable vapes, authentic Uwell pod kits, replacement sub-ohm coils, botanical e-liquids.
- Minimum Order: $200 AUD with Free Express Shipping.
- Crypto Discount: 10% instant discount on Bitcoin (BTC) and Tether (USDT).
- No invented statistics, fake awards, press mentions, or fabricated endorsements.
