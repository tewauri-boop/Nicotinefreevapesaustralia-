// app/shop/[category]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site';
import ProductCard from '@/src/components/ProductCard';
import JsonLd from '@/src/components/JsonLd';
import { ChevronRight, Sparkles, Filter } from 'lucide-react';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const category = CATEGORIES.find((c) => c.slug === params.category);
  if (!category) return {};

  return {
    title: `${category.name} | 0mg Nicotine Free Vapes Australia`,
    description: category.description,
    alternates: {
      canonical: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

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
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://${SITE.domain}/shop/${category.slug}/`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-emerald-400 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{category.name}</span>
        </nav>

        {/* Exactly One H1 */}
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>0mg Certified Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {category.name} in Australia
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {category.description}
          </p>

          {/* Subcategories list */}
          <div className="pt-2 flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <span
                key={sub.slug}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Other Collections:
          </span>
          <Link
            href="/shop/"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            All Collections
          </Link>
          {CATEGORIES.map((c) => {
            const isActive = c.slug === category.slug;
            return (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}/`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800">
            <p className="text-slate-400">No products found in this category.</p>
            <Link
              href="/shop/"
              className="mt-4 inline-block text-xs font-bold text-emerald-400 hover:underline"
            >
              Return to All Products →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
