// app/api/products/route.ts
// V2 — GET /api/products

import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/config/site';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'public, max-age=300'
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

  let list = PRODUCTS;

  if (category) {
    list = list.filter((p) => p.category === category);
  }
  if (q) {
    const query = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
    );
  }
  if (limit) {
    list = list.slice(0, limit);
  }

  const result = list.map((p) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`
  }));

  return NextResponse.json(result, { headers: CORS_HEADERS });
}
