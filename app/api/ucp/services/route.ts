// app/api/ucp/services/route.ts
// V3 — Live UCP services endpoint

import { NextResponse } from 'next/server';
import { SITE, SHOP, BRAND, CONTACT } from '@/config/site';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=300'
};

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;
  return NextResponse.json(
    {
      ucp: '1.0',
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
      currency: SITE.currency,
      minimum_order_usd: SHOP.minOrder,
      payment_methods: SHOP.paymentMethods
    },
    { headers: CORS_HEADERS }
  );
}
