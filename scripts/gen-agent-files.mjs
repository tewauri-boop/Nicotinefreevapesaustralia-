// scripts/gen-agent-files.mjs
// Single source of truth generator for all domain-bearing agent files

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import config
const siteConfigPath = path.join(rootDir, 'src/config/site.js');
const { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS, FAQ } = await import(
  `file://${siteConfigPath}`
);

const domain = SITE.domain || 'DOMAIN.com';
const protocol = 'https';
const baseUrl = `${protocol}://${domain}`;

// Ensure directories exist
const publicDir = path.join(rootDir, 'public');
const wellKnownDir = path.join(publicDir, '.well-known');
const mcpDir = path.join(wellKnownDir, 'mcp');
const agentSkillsDir = path.join(wellKnownDir, 'agent-skills');
const jsDir = path.join(publicDir, 'js');

[publicDir, wellKnownDir, mcpDir, agentSkillsDir, jsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log(`[gen-agent-files] Generating agent-ready files for ${domain}...`);

// 1. robots.txt
const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Sitemap: ${baseUrl}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: ${baseUrl}/llms.txt
# API Catalog: ${baseUrl}/.well-known/api-catalog
# Agent Skills: ${baseUrl}/.well-known/agent-skills/index.json
# MCP Server Card: ${baseUrl}/.well-known/mcp/server-card.json
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

// 2. llms.txt (llmstxt.org specification)
const llmsTxt = `# ${SITE.name}

> ${SITE.tagline}

${BRAND.description}

## Business Overview
- Brand Name: ${SITE.name}
- Headquarters: ${CONTACT.hq}
- Country of Operation: ${CONTACT.country}
- Currency: ${SITE.currency}
- Minimum Order Amount: $${SHOP.minOrder} ${SITE.currency}
- Shipping: Free express shipping on all orders across Australia
- Cryptocurrency Settlement: 10% instant discount on BTC and USDT payments
- Payment Methods: Direct Bank Transfer (EFT), PayID/Osko, Cryptocurrency (BTC, USDT), Digital Gift Cards
- Contact Desk: Email ${CONTACT.rawEmail} | WhatsApp ${CONTACT.whatsapp} | Phone ${CONTACT.phone}

## Product Catalog & Categories
${CATEGORIES.map(
  (c) => `- [${c.name}](${baseUrl}/shop/${c.slug}/): ${c.description}`
).join('\n')}

## Core Navigation
- [Shop Catalog](${baseUrl}/shop/): Browse the full catalog of zero-nicotine devices, pod kits, coils, and 0mg e-liquids.
- [About ${SITE.name}](${baseUrl}/about/): Brand heritage, verified lab standards, quality assurance, and Australian operations.
- [Educational Blog](${baseUrl}/blog/): Guides on 0mg vaping in Australia, coil maintenance, and pod comparisons.
- [Frequently Asked Questions](${baseUrl}/faq/): Clear answers regarding 0mg verification, shipping, and ordering.
- [B2B Wholesale Inquiries](${baseUrl}/wholesale/): Bulk orders and wholesale tiers for Australian businesses.
- [Contact & Support Concierge](${baseUrl}/contact/): Reach our Sydney team via WhatsApp, phone, or secure online message.
- [Search Inventory](${baseUrl}/search/): Live client search across all products and educational guides.

## Important Information & Compliance
- 100% Zero Nicotine: All products listed contain strictly 0.0% nicotine.
- Human in the loop ordering: AI agents can browse catalog and draft orders, human customers confirm checkout via WhatsApp or secure order form.

## Optional
- [API Catalog](${baseUrl}/.well-known/api-catalog): RFC 9727 API Linkset
- [Agent Skills Index](${baseUrl}/.well-known/agent-skills/index.json): Declarative commerce capabilities
- [MCP Server Card](${baseUrl}/.well-known/mcp/server-card.json): Model Context Protocol streamable endpoint descriptor
- [Auth Specification](${baseUrl}/auth.md): Authentication disclosure for automated agents
`;
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);

// 3. auth.md (Mandatory: Must start with exactly `# Auth.md`)
const authMd = `# Auth.md

## Site: ${SITE.name} — Luxury Zero-Nicotine Vaporizers

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | ${baseUrl}/shop/ |
| Categories API | ${baseUrl}/api/categories |
| Products API | ${baseUrl}/api/products |
| Search API | ${baseUrl}/api/search |
| MCP Streamable HTTP | ${baseUrl}/api/mcp |
| Blog & Education | ${baseUrl}/blog/ |
| FAQ | ${baseUrl}/faq/ |
| Wholesale | ${baseUrl}/wholesale/ |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts.
Orders are completed by a human via WhatsApp or the order form.
`;
fs.writeFileSync(path.join(publicDir, 'auth.md'), authMd);

// 4. IndexNow key file
if (SITE.indexNowKey) {
  fs.writeFileSync(
    path.join(publicDir, `${SITE.indexNowKey}.txt`),
    SITE.indexNowKey
  );
}

// 5. .well-known/api-catalog
const apiCatalog = {
  linkset: [
    {
      anchor: `${baseUrl}/`,
      'https://www.iana.org/assignments/link-relations/service-doc': [
        { href: `${baseUrl}/faq/` }
      ],
      title: `${SITE.name} — ${SITE.tagline}`
    },
    {
      anchor: `${baseUrl}/shop/`,
      type: 'text/html',
      title: `${SITE.name} Product Catalog`
    },
    {
      anchor: `${baseUrl}/wholesale/`,
      type: 'text/html',
      title: `${SITE.name} Wholesale`
    },
    {
      anchor: `${baseUrl}/api/products`,
      type: 'application/json',
      title: `${SITE.name} Products API`
    },
    {
      anchor: `${baseUrl}/api/categories`,
      type: 'application/json',
      title: `${SITE.name} Categories API`
    },
    {
      anchor: `${baseUrl}/api/search`,
      type: 'application/json',
      title: `${SITE.name} Search API`
    },
    {
      anchor: `${baseUrl}/api/mcp`,
      type: 'application/json',
      'https://www.iana.org/assignments/link-relations/service-desc': [
        { href: `${baseUrl}/.well-known/mcp/server-card.json` }
      ],
      title: `${SITE.name} MCP Server`
    }
  ]
};
fs.writeFileSync(
  path.join(wellKnownDir, 'api-catalog'),
  JSON.stringify(apiCatalog, null, 2)
);

// 6. .well-known/agent-skills/index.json
const agentSkills = {
  $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
  name: SITE.name,
  url: baseUrl,
  description: SITE.tagline,
  skills: [
    {
      name: 'search-products',
      type: 'commerce',
      description: 'Search zero-nicotine vapes, pod kits, coils, and e-liquids by keyword, category, or price',
      url: `${baseUrl}/api/mcp`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      name: 'browse-catalog',
      type: 'navigation',
      description: 'Browse the full 0mg product catalog by category and subcategory',
      url: `${baseUrl}/shop/`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      name: 'order-draft',
      type: 'commerce',
      description: 'Create a prefilled order draft with 10% crypto discount calculation. Human completes the order.',
      url: `${baseUrl}/api/mcp`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      name: 'wholesale-inquiry',
      type: 'commerce',
      description: 'Access Australian wholesale pricing tiers and bulk ordering requirements',
      url: `${baseUrl}/wholesale/`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      name: 'product-education',
      type: 'content',
      description: 'Read educational guides on 0mg vaping, coil longevity, and device maintenance in Australia',
      url: `${baseUrl}/blog/`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      name: 'contact',
      type: 'support',
      description: 'Direct contact concierge for product guidance, bank transfer, and order support',
      url: `${baseUrl}/contact/`,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  ]
};
fs.writeFileSync(
  path.join(agentSkillsDir, 'index.json'),
  JSON.stringify(agentSkills, null, 2)
);

// 7. .well-known/mcp/server-card.json (Vercel live variant)
const mcpServerCard = {
  $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: {
    name: SITE.name,
    version: '1.0.0',
    description: BRAND.description,
    homepage: baseUrl,
    contact: {
      email: CONTACT.rawEmail,
      whatsapp: CONTACT.whatsapp
    }
  },
  transport: {
    type: 'streamable-http',
    endpoint: `${baseUrl}/api/mcp`
  },
  capabilities: {
    tools: [
      {
        name: 'search_products',
        description: 'Search products by keyword, category, or max_price',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            category: { type: 'string' },
            max_price: { type: 'number' }
          }
        }
      },
      {
        name: 'get_product',
        description: 'Get full product details by slug',
        inputSchema: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string' }
          }
        }
      },
      {
        name: 'list_categories',
        description: 'List all product categories and subcategories',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_policies',
        description: 'Get shipping, payment, returns, and min order policies',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'create_order_draft',
        description: 'Create prefilled order URL for WhatsApp or order form. Human completes — never captures payment.',
        inputSchema: {
          type: 'object',
          properties: {
            items: { type: 'array' },
            notes: { type: 'string' }
          }
        }
      }
    ],
    resources: [
      {
        name: 'product-catalog',
        description: 'Full product catalog',
        uri: `${baseUrl}/shop/`
      },
      {
        name: 'wholesale',
        description: 'Wholesale pricing & application',
        uri: `${baseUrl}/wholesale/`
      },
      {
        name: 'blog',
        description: 'Educational guides & device reviews',
        uri: `${baseUrl}/blog/`
      }
    ],
    commerce: {
      ordering: 'human-assisted-whatsapp-or-form',
      payment: SHOP.paymentMethods,
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
      freeShipping: 'Free express shipping on all orders',
      cryptoDiscount: '10%'
    }
  },
  legal: {
    ageRestriction: 'Adults only',
    productType: '100% Zero-Nicotine Vaporizers & Botanical Blends',
    compliance: 'All items are 0mg nicotine free. For adult lifestyle use.'
  }
};
fs.writeFileSync(
  path.join(mcpDir, 'server-card.json'),
  JSON.stringify(mcpServerCard, null, 2)
);

// 8. .well-known/oauth-protected-resource
const oauthProtected = {
  resource: baseUrl,
  resource_name: `${SITE.name} Public Catalog`,
  authorization_servers: [],
  scopes_supported: [],
  bearer_methods_supported: [],
  resource_documentation: `${baseUrl}/auth.md`,
  resource_policy_uri: `${baseUrl}/faq/`,
  tls_client_certificate_bound_access_tokens: false,
  note: `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
};
fs.writeFileSync(
  path.join(wellKnownDir, 'oauth-protected-resource'),
  JSON.stringify(oauthProtected, null, 2)
);

// 9. .well-known/oauth-authorization-server
const oauthAuthServer = {
  issuer: baseUrl,
  authorization_endpoint: null,
  token_endpoint: null,
  jwks_uri: null,
  grant_types_supported: [],
  response_types_supported: [],
  scopes_supported: [],
  note: `${SITE.name} has no protected APIs. All resources publicly accessible.`,
  public_resources: [
    `${baseUrl}/shop/`,
    `${baseUrl}/blog/`,
    `${baseUrl}/faq/`,
    `${baseUrl}/wholesale/`,
    `${baseUrl}/llms.txt`,
    `${baseUrl}/.well-known/api-catalog`,
    `${baseUrl}/.well-known/agent-skills/index.json`,
    `${baseUrl}/.well-known/mcp/server-card.json`
  ],
  agent_auth: {
    register_uri: null,
    identity_types_supported: ['none'],
    credential_types_supported: ['none'],
    notes: 'No registration required. All content publicly accessible to agents.'
  }
};
fs.writeFileSync(
  path.join(wellKnownDir, 'oauth-authorization-server'),
  JSON.stringify(oauthAuthServer, null, 2)
);

// 10. .well-known/openid-configuration
const openidConfig = {
  issuer: baseUrl,
  note: `${SITE.name} does not operate an OpenID Connect provider. All resources publicly accessible.`,
  public_site: true,
  authorization_endpoint: null,
  token_endpoint: null,
  userinfo_endpoint: null,
  jwks_uri: null,
  scopes_supported: [],
  response_types_supported: [],
  grant_types_supported: [],
  subject_types_supported: [],
  id_token_signing_alg_values_supported: []
};
fs.writeFileSync(
  path.join(wellKnownDir, 'openid-configuration'),
  JSON.stringify(openidConfig, null, 2)
);

// 11. .well-known/acp.json
const acpJson = {
  protocol: { name: 'acp', version: '0.1.0' },
  name: SITE.name,
  description: BRAND.description,
  api_base_url: baseUrl,
  homepage: baseUrl,
  transports: ['https'],
  capabilities: {
    services: ['product-catalog', 'wholesale', 'blog', 'faq', 'mcp-server'],
    ordering: 'human-assisted',
    payment_methods: SHOP.paymentMethods,
    currency: SITE.currency,
    minimum_order_usd: SHOP.minOrder,
    free_shipping_threshold_usd: SHOP.freeShippingThreshold
  },
  contact: {
    whatsapp: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
    email: CONTACT.rawEmail
  },
  legal: {
    age_restriction: 'Adults only (18+)',
    region: CONTACT.country,
    ships_to: 'Australia Nationwide',
    product_type: '0mg Zero-Nicotine Vaporizers & E-Liquids',
    compliance: 'All formulas 100% nicotine-free'
  }
};
fs.writeFileSync(
  path.join(wellKnownDir, 'acp.json'),
  JSON.stringify(acpJson, null, 2)
);

// 12. .well-known/ucp (CRITICAL: "ucp": "1.0" is mandatory)
const ucpJson = {
  ucp: '1.0',
  protocol_version: '1.0',
  spec: 'https://ucp.dev/specification/overview/',
  schema: 'https://ucp.dev/schema/v1.json',
  site: baseUrl,
  name: SITE.name,
  description: BRAND.description,
  services: [
    {
      id: 'product-catalog',
      type: 'catalog',
      url: `${baseUrl}/shop/`,
      description: 'Full 0mg product catalog'
    },
    {
      id: 'mcp-server',
      type: 'mcp',
      url: `${baseUrl}/api/mcp`,
      description: 'MCP Streamable HTTP server'
    },
    {
      id: 'order',
      type: 'commerce',
      url: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
      description: 'Place orders via WhatsApp'
    },
    {
      id: 'wholesale',
      type: 'b2b',
      url: `${baseUrl}/wholesale/`,
      description: 'Wholesale pricing and bulk ordering'
    }
  ],
  capabilities: ['browse', 'search', 'inquiry', 'wholesale', 'content', 'mcp'],
  endpoints: {
    mcp: `${baseUrl}/api/mcp`,
    catalog: `${baseUrl}/shop/`,
    contact: `${baseUrl}/contact/`,
    agent_skills: `${baseUrl}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${baseUrl}/.well-known/mcp/server-card.json`,
    api_catalog: `${baseUrl}/.well-known/api-catalog`,
    llms_txt: `${baseUrl}/llms.txt`
  },
  currency: SITE.currency,
  minimum_order_usd: SHOP.minOrder,
  payment_methods: SHOP.paymentMethods,
  legal: {
    age_restriction: 'Adults only',
    product_type: '0mg Zero-Nicotine Vaporizers',
    compliance: 'All formulas 100% nicotine-free'
  }
};
fs.writeFileSync(
  path.join(wellKnownDir, 'ucp'),
  JSON.stringify(ucpJson, null, 2)
);

// 13. public/js/webmcp.js
const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${SITE.name} products by keyword, category, or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`${baseUrl}/api/search?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse 0mg products by category",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? \`${baseUrl}/shop/\${category}/\` : \`${baseUrl}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order. Minimum order $${SHOP.minOrder} AUD. Human completes.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const rawNum = "${CONTACT.whatsapp.replace(/[^0-9]/g, '')}";
          const url = message ? \`https://wa.me/\${rawNum}?text=\${encodeURIComponent(message)}\` : \`https://wa.me/\${rawNum}\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get wholesale pricing tiers and requirements",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/wholesale/\`;
          return { url: \`${baseUrl}/wholesale/\` };
        }
      },
      {
        name: "contact",
        description: "Contact ${SITE.name} for questions or support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/contact/\`;
          return { url: \`${baseUrl}/contact/\` };
        }
      }
    ]
  });
})();
`;
fs.writeFileSync(path.join(jsDir, 'webmcp.js'), webmcpJs);

// 14. vercel.json
const vercelJson = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  trailingSlash: true,
  redirects: [
    {
      source: '/:path*',
      has: [{ type: 'host', value: `www.${domain}` }],
      destination: `${baseUrl}/:path*`,
      permanent: true
    }
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://api.web3forms.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; font-src 'self' data:;"
        },
        {
          key: 'Link',
          value: '</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration"'
        }
      ]
    },
    {
      source: '/.well-known/api-catalog',
      headers: [
        { key: 'Content-Type', value: 'application/linkset+json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/agent-skills/index.json',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/mcp/server-card.json',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/oauth-protected-resource',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/oauth-authorization-server',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/openid-configuration',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/acp.json',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/.well-known/ucp',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/auth.md',
      headers: [
        { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/llms.txt',
      headers: [
        { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    },
    {
      source: '/:path*.md',
      headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }]
    },
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Accept, Mcp-Session-Id'
        }
      ]
    }
  ]
};
fs.writeFileSync(
  path.join(rootDir, 'vercel.json'),
  JSON.stringify(vercelJson, null, 2)
);

console.log('[gen-agent-files] All agent-ready files generated successfully.');
