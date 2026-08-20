# Project Strategy: Nicotine Free Vapes Australia

## 1. Executive Summary
- **Brand**: Nicotine Free Vapes Australia
- **Target Market**: Discerning adult Australians seeking premium, 100% zero-nicotine (0mg) vaporizers, authentic open pod systems (Uwell Caliburn), replacement coils, and pure botanical e-liquids.
- **Fulfillment**: Central warehouse in Sydney, NSW, Australia with express nationwide delivery.
- **Positioning**: High-end sensory relaxation boutique with uncompromising 0.0% nicotine purity certification and Australian regulatory adherence.

## 2. Commercial Rules
- **Minimum Order**: $200 AUD
- **Shipping**: Free Express Delivery across all Australian States & Territories on orders meeting MOQ.
- **Cryptocurrency Discount**: 10% instant discount on Bitcoin (BTC) & Tether (USDT).
- **Checkout Channels**:
  1. WhatsApp Concierge Direct Draft
  2. Online Order Request Form
  3. B2B Wholesale Application Portal

## 3. Technology Architecture
- **Framework**: Next.js 15 (App Router, TypeScript, Tailwind CSS v4)
- **Deployment**: Vercel
- **Persistence**: Local storage cart (`mm-cart`), stateless JSON-RPC MCP server
- **Compliance Scanner**: Pre-ship AST & token scan (`scripts/crosscheck.mjs`) for prohibited nicotine terms and health claims.
