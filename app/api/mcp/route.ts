// app/api/mcp/route.ts
// V1 — MCP Streamable HTTP server (Model Context Protocol)

import { NextRequest, NextResponse } from 'next/server';
import { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS } from '@/config/site';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
  'Content-Type': 'application/json'
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      name: SITE.name,
      protocol: 'mcp-streamable-http',
      version: '1.0.0',
      status: 'ready'
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonrpc, id, method, params } = body;

    if (jsonrpc !== '2.0') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id || null,
          error: { code: -32600, message: 'Invalid Request: jsonrpc must be "2.0"' }
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
              resources: {}
            },
            serverInfo: {
              name: SITE.name,
              version: '1.0.0'
            }
          }
        },
        { headers: CORS_HEADERS }
      );
    }

    if (method === 'tools/list') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'search_products',
                description: 'Search products by keyword, category, max_price',
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
                description: 'List all product categories',
                inputSchema: {
                  type: 'object',
                  properties: {}
                }
              },
              {
                name: 'get_policies',
                description: 'Get shipping, payment, returns policies',
                inputSchema: {
                  type: 'object',
                  properties: {}
                }
              },
              {
                name: 'create_order_draft',
                description: 'Create prefilled order URL. Human completes — never captures payment.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    items: { type: 'array' },
                    notes: { type: 'string' }
                  }
                }
              }
            ]
          }
        },
        { headers: CORS_HEADERS }
      );
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      if (toolName === 'search_products') {
        const { query = '', category = '', max_price } = toolArgs;
        let results = PRODUCTS;

        if (category) {
          results = results.filter((p) => p.category === category);
        }
        if (query) {
          const q = query.toLowerCase();
          results = results.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.shortDescription.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q)
          );
        }
        if (typeof max_price === 'number') {
          results = results.filter((p) => p.price <= max_price);
        }

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    results.map((p) => ({
                      slug: p.slug,
                      name: p.name,
                      price: p.price,
                      currency: SITE.currency,
                      category: p.category,
                      shortDescription: p.shortDescription,
                      url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`
                    }))
                  )
                }
              ]
            }
          },
          { headers: CORS_HEADERS }
        );
      }

      if (toolName === 'get_product') {
        const { slug } = toolArgs;
        const product = PRODUCTS.find((p) => p.slug === slug);
        if (!product) {
          return NextResponse.json(
            {
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: JSON.stringify({ error: 'Product not found' }) }],
                isError: true
              }
            },
            { headers: CORS_HEADERS }
          );
        }
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    ...product,
                    currency: SITE.currency,
                    url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`
                  })
                }
              ]
            }
          },
          { headers: CORS_HEADERS }
        );
      }

      if (toolName === 'list_categories') {
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    CATEGORIES.map((c) => ({
                      slug: c.slug,
                      name: c.name,
                      description: c.description,
                      productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
                      url: `https://${SITE.domain}/shop/${c.slug}/`
                    }))
                  )
                }
              ]
            }
          },
          { headers: CORS_HEADERS }
        );
      }

      if (toolName === 'get_policies') {
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    minimumOrder: SHOP.minOrder,
                    currency: SITE.currency,
                    shipping: 'Free express Australia courier on all orders over $200',
                    cryptoDiscount: `${SHOP.cryptoDiscount}% instant discount on BTC and USDT`,
                    paymentMethods: SHOP.paymentMethods,
                    compliance: '100% Zero-Nicotine (0mg) verified formulations'
                  })
                }
              ]
            }
          },
          { headers: CORS_HEADERS }
        );
      }

      if (toolName === 'create_order_draft') {
        const { items = [], notes = '' } = toolArgs;
        const total = items.reduce(
          (sum: number, item: { price?: number; quantity?: number }) =>
            sum + (item.price || 0) * (item.quantity || 1),
          0
        );
        const cryptoTotal = total * (1 - SHOP.cryptoDiscount / 100);
        const rawNum = CONTACT.whatsapp.replace(/[^0-9]/g, '');

        let draftText = `*Order Inquiry — ${SITE.name}*\n`;
        items.forEach((it: { name?: string; quantity?: number; price?: number }, idx: number) => {
          draftText += `${idx + 1}. ${it.name} x${it.quantity || 1} — $${((it.price || 0) * (it.quantity || 1)).toFixed(2)} AUD\n`;
        });
        draftText += `Subtotal: $${total.toFixed(2)} AUD\n`;
        draftText += `Crypto (10% OFF): $${cryptoTotal.toFixed(2)} AUD\n`;
        if (notes) draftText += `Notes: ${notes}\n`;

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    orderValid: total >= SHOP.minOrder,
                    minimumOrderRequired: SHOP.minOrder,
                    subtotal: total,
                    cryptoTotal,
                    whatsAppUrl: `https://wa.me/${rawNum}?text=${encodeURIComponent(draftText)}`,
                    orderFormUrl: `https://${SITE.domain}/contact/`
                  })
                }
              ]
            }
          },
          { headers: CORS_HEADERS }
        );
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Tool not found: ${toolName}` }
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not supported: ${method}` }
      },
      { status: 400, headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32603, message: errorMsg }
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
