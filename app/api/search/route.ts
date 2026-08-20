// app/api/search/route.ts
// V2 — GET /api/search?q=

import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, POSTS, CATEGORIES, SITE } from '@/config/site';

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
  const q = searchParams.get('q') || '';
  const query = q.toLowerCase().trim();

  if (!query) {
    return NextResponse.json(
      {
        products: PRODUCTS.slice(0, 8).map((p) => ({
          ...p,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`
        })),
        posts: POSTS.map((p) => ({
          ...p,
          url: `https://${SITE.domain}/blog/${p.slug}/`
        })),
        categories: CATEGORIES.map((c) => ({
          ...c,
          url: `https://${SITE.domain}/shop/${c.slug}/`
        }))
      },
      { headers: CORS_HEADERS }
    );
  }

  const matchedProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  ).map((p) => ({
    ...p,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`
  }));

  const matchedPosts = POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query)
  ).map((p) => ({
    ...p,
    url: `https://${SITE.domain}/blog/${p.slug}/`
  }));

  const matchedCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
  ).map((c) => ({
    ...c,
    url: `https://${SITE.domain}/shop/${c.slug}/`
  }));

  return NextResponse.json(
    {
      query: q,
      products: matchedProducts,
      posts: matchedPosts,
      categories: matchedCategories
    },
    { headers: CORS_HEADERS }
  );
}
