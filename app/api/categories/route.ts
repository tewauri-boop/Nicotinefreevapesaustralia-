// app/api/categories/route.ts
// V2 — GET /api/categories

import { NextResponse } from 'next/server';
import { CATEGORIES, PRODUCTS, SITE } from '@/config/site';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'public, max-age=300'
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const result = CATEGORIES.map((c) => ({
    ...c,
    productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
    url: `https://${SITE.domain}/shop/${c.slug}/`
  }));

  return NextResponse.json(result, { headers: CORS_HEADERS });
}
