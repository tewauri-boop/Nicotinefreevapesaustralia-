// app/api/products/[slug]/route.ts
// V2 — GET /api/products/[slug]

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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(
    {
      ...product,
      currency: SITE.currency,
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`
    },
    { headers: CORS_HEADERS }
  );
}
