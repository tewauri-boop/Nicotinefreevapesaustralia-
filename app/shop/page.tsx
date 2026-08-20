// app/shop/page.tsx
import Link from 'next/link';
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site';
import ProductCard from '@/src/components/ProductCard';
import JsonLd from '@/src/components/JsonLd';
import { Filter, Layers, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Shop All 0mg Nicotine Free Vapes & Pods Australia',
  description:
    'Browse the full catalog of certified 0mg disposable vapes, refillable Uwell pod kits, replacement coils, and botanical e-liquids. Free express dispatch Australia-wide.',
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ShopPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `https://${SITE.domain}/shop/`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Shop Catalog</span>
        </nav>

        {/* Exactly One H1 */}
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete 0mg Certified Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Nicotine Free Vapes & Pods Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover Sydney&apos;s most refined selection of 100% zero-nicotine vaporizers, authentic Uwell pod systems, sub-ohm replacement coils, and pure botanical e-liquids. All items tested for 0.0% nicotine content.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Categories:
          </span>
          <Link
            href="/shop/"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 shadow-md"
          >
            All ({PRODUCTS.length})
          </Link>
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                {cat.name} ({count})
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
