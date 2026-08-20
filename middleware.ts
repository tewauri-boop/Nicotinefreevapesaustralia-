// middleware.ts (repo root)
// V5 — Markdown negotiation middleware for LLMs and AI Agents

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE, BRAND, CATEGORIES, PRODUCTS, FAQ } from '@/config/site';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|js).*)'],
};

function prefersMarkdownOverHtml(accept: string): boolean {
  let mdQ = -1;
  let htmlQ = -1;

  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1.0;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }

  return mdQ > -1 && mdQ > htmlQ;
}

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  const pathname = request.nextUrl.pathname;

  // If client specifically requests markdown over html and is not an API or asset
  if (prefersMarkdownOverHtml(accept) && !pathname.startsWith('/api') && !pathname.startsWith('/.')) {
    let mdContent = `# ${SITE.name}\n\n> ${SITE.tagline}\n\n${BRAND.description}\n\n`;

    if (pathname.includes('/shop')) {
      mdContent += `## Product Catalog\n`;
      PRODUCTS.forEach((p) => {
        mdContent += `### ${p.name} — $${p.price.toFixed(2)} ${SITE.currency}\n- Category: ${p.category}\n- Description: ${p.description}\n- URL: https://${SITE.domain}/shop/${p.category}/${p.slug}/\n\n`;
      });
    } else if (pathname.includes('/faq')) {
      mdContent += `## Frequently Asked Questions\n`;
      FAQ.forEach((f) => {
        mdContent += `### ${f.question}\n${f.answer}\n\n`;
      });
    } else {
      mdContent += `## Main Collections\n`;
      CATEGORIES.forEach((c) => {
        mdContent += `- [${c.name}](https://${SITE.domain}/shop/${c.slug}/): ${c.description}\n`;
      });
    }

    return new NextResponse(mdContent, {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }

  return NextResponse.next();
}
