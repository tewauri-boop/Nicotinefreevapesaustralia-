# Nicotine Free Vapes Australia

A production-ready, mobile-first, Agent-Ready Next.js 15 e-commerce application for Australia's premier zero-nicotine (0mg) boutique.

## Key Features

- **100% 0mg Zero-Nicotine Compliance**: Strict Australian compliance guardrails with lab-certified purity standards.
- **Single Source of Truth (`src/config/site.js`)**: All products, categories, guides, business policies, and metadata derive from one configuration file.
- **Agent-Ready Ecosystem**: Full Level 2+ support including `.well-known/mcp/server-card.json`, RFC 9727 `api-catalog`, `agent-skills`, `acp.json`, `ucp`, `llms.txt`, `auth.md`, and client-side `webmcp.js`.
- **Live Streamable HTTP MCP Server (`/api/mcp`)**: Interactive JSON-RPC 2.0 endpoint enabling AI agents to search products, inspect categories, and draft orders.
- **Mobile-First Responsive Layout**: Built with a 4:3 white canvas product frame, drawer-based cart with local storage persistence, responsive chat hub, and zero-horizontal-overflow layout.
- **SEO & AI Visibility (GEO/AEO)**: Rich JSON-LD schemas (`Store`, `Organization`, `WebSite`, `Product`, `Offer`, `BreadcrumbList`, `BlogPosting`, `FAQPage`), split image-aware sitemaps, and entity optimization.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Generate agent-ready files from site configuration
npm run gen

# 3. Run compliance & pre-ship crosscheck
npm run crosscheck

# 4. Start local development server
npm run dev
```

## Deployment to Vercel

```bash
1. Create a new empty GitHub repository
2. git init && git add . && git commit -m "Initial build — WebForge v9.1"
3. git remote add origin https://github.com/[username]/[repo-name].git
4. git push -u origin main
5. Import repo in Vercel (Framework Preset: Next.js)
6. Deploy
```
