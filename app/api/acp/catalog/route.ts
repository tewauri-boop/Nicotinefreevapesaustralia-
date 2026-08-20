// app/api/acp/catalog/route.ts
// V3 — Live ACP catalog endpoint

import { NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, SHOP, SITE } from '@/config/site';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=300'
};

export async function GET() {
  return NextResponse.json(
    {
      catalog: CATEGORIES.map((c) => ({
        ...c,
        url: `https://${SITE.domain}/shop/${c.slug}/`,
        products: PRODUCTS.filter((p) => p.category === c.slug).map((p) => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`
        }))
      })),
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
      paymentMethods: SHOP.paymentMethods
    },
    { headers: CORS_HEADERS }
  );
}
