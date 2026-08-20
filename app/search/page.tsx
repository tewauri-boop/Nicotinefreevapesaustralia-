// app/search/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { SITE } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Search 0mg Nicotine Free Vapes & Pods Australia',
  description:
    'Search our comprehensive catalog of 0mg disposable vapes, refillable Uwell pod systems, sub-ohm coils, and botanical e-liquids.',
  alternates: {
    canonical: `https://${SITE.domain}/search/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function SearchPage() {
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
        name: 'Search',
        item: `https://${SITE.domain}/search/`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Search Catalog</span>
        </nav>

        {/* Exactly One H1 */}
        <div className="mb-10 max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Search 0mg Products & Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Find certified zero-nicotine disposables, authentic Uwell pod systems, replacement coils, and botanical juices across our Australian warehouse.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-slate-500 font-mono">Loading search engine...</div>}>
          <SearchClient />
        </Suspense>
      </div>
    </main>
  );
}
