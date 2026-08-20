// app/page.tsx
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, Layers, Zap } from 'lucide-react';
import { SITE, BRAND, CATEGORIES, PRODUCTS, FAQ, SHOP, CONTACT } from '@/config/site';
import TrustBar from '@/src/components/TrustBar';
import ProductCard from '@/src/components/ProductCard';
import AuthoritySection from '@/src/components/AuthoritySection';
import JsonLd from '@/src/components/JsonLd';

export const metadata = {
  title: 'Nicotine Free Vapes Australia | 0mg Disposable Vapes & Refillable Pods',
  description:
    'Buy certified 0mg nicotine free vapes in Australia. Authentic Uwell pod systems, replacement coils, vape batteries, and artisan botanical e-liquids with free express dispatch from Sydney.',
  openGraph: {
    title: 'Nicotine Free Vapes Australia | 0mg Zero-Nicotine Store',
    description:
      'Australian specialist store for 100% zero-nicotine disposable vapes, refillable pod kits, coils, and botanical e-liquids. Free express shipping over $200 AUD.',
    url: `https://${SITE.domain}/`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicotine Free Vapes Australia | 0mg Zero-Nicotine Store',
    description:
      'Australian specialist store for 100% zero-nicotine disposable vapes, refillable pod kits, coils, and botanical e-liquids. Free express shipping over $200 AUD.',
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestSellers = PRODUCTS.slice(0, 4);

  // Structured Data (Store + Organization + WebSite + SearchAction + FAQPage)
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization'],
      name: SITE.name,
      description: BRAND.description,
      foundingDate: BRAND.foundingYear,
      foundingLocation: {
        '@type': 'Place',
        name: BRAND.foundingLocation,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      url: `https://${SITE.domain}/`,
      sameAs: BRAND.sameAs,
      areaServed: BRAND.areaServed,
      numberOfItems: PRODUCTS.length,
      knowsAbout: [
        'Nicotine free vapes',
        '0mg vape juice',
        'Refillable pod vapes Australia',
        'Uwell coils',
        'Vape mods Australia'
      ],
      priceRange: '$$',
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      makesOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: SITE.currency,
        lowPrice: Math.min(...PRODUCTS.map((p) => p.price)),
        highPrice: Math.max(...PRODUCTS.map((p) => p.price)),
        offerCount: PRODUCTS.length,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: `https://${SITE.domain}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://${SITE.domain}/search/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <main id="main" className="flex flex-col bg-slate-950 text-slate-100">
      <JsonLd data={homeSchema} />

      {/* Hero Section — Single H1 on Slide 1 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 py-16 sm:py-24 lg:py-28">
        {/* Ambient Decorative Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono font-bold tracking-wide shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>100% Certified Zero-Nicotine (0mg) Formulations</span>
            </div>

            {/* Exactly One H1 on the Page */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Nicotine Free Vapes & Botanical Vaporizers in Australia
            </h1>

            {/* Factual Brand Entity Statement */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {BRAND.description}
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02]"
              >
                <span>Shop 0mg Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop/refillable-pod-systems/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-semibold text-sm tracking-wide transition-all"
              >
                <span>Explore Uwell Pod Kits</span>
              </Link>
            </div>

            {/* Live Stats Pill Banner */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Min Order: ${SHOP.minOrder} AUD</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10% Crypto Discount</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Category Grid Section */}
      <section className="py-16 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                Curated Collections
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Explore Zero-Nicotine Categories
              </h2>
            </div>
            <Link
              href="/shop/"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View All Collections</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const productCount = PRODUCTS.filter((p) => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}/`}
                  className="group relative p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Subcategories list */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub.slug}
                          className="px-2 py-0.5 text-[10px] font-mono bg-slate-950 border border-slate-800 rounded text-slate-400"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">{productCount} Products</span>
                    <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Shop 0mg →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                Australian Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Featured 0mg Vapes & Uwell Pods
              </h2>
            </div>
            <Link
              href="/shop/"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Explore Complete Range</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Authority Section */}
      <AuthoritySection />

      {/* Education & Guides Section */}
      <section className="py-16 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                Knowledge & Reviews
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                0mg Vaping Guides & Hardware Insights
              </h2>
            </div>
            <Link
              href="/blog/"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Comprehensive Guide
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-2 mb-2">
                  The Complete Guide to 0mg Nicotine-Free Vaping in Australia
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Understand pure vegetable glycerin formulations, sensory flavor rituals, and why thousands of Australians are switching to 0mg.
                </p>
              </div>
              <Link
                href="/blog/complete-guide-to-0mg-nicotine-free-vaping-australia/"
                className="mt-6 text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Device Comparison
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-2 mb-2">
                  Uwell Caliburn G3 Pro vs Vaporesso XROS 4 Nano (0mg Edition)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A side-by-side benchmark comparing flavor clarity, coil life, battery endurance, and leak prevention for zero-nicotine pods.
                </p>
              </div>
              <Link
                href="/blog/uwell-caliburn-g3-vs-xros-4-comparison/"
                className="mt-6 text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Read Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Maintenance Pro Tips
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-2 mb-2">
                  How to Make Your Vape Coils Last 3x Longer
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sydney technician priming secrets, wattage management, and botanical juice selections that eliminate burnt hits.
                </p>
              </div>
              <Link
                href="/blog/how-to-make-vape-coils-last-longer/"
                className="mt-6 text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Read Maintenance Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Direct Answers */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Zero-Nicotine & Australia Shipping FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Concise, factual answers regarding 0mg formulation, orders, and payment in Australia.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2"
              >
                <h3 className="text-base font-semibold text-slate-100 flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">Q{idx + 1}.</span>
                  <span>{item.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq/"
              className="text-xs font-mono text-emerald-400 hover:underline tracking-wider"
            >
              View Full FAQ & Shipping Policy Hub →
            </Link>
          </div>
        </div>
      </section>

      {/* Wholesale & B2B Callout Banner */}
      <section className="py-14 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-emerald-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                B2B & Retail Distribution
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Wholesale Zero-Nicotine Supply for Australian Retailers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Partner with Sydney&apos;s specialist 0mg distributor. Enjoy volume pricing tiers, dedicated account managers, priority batch allocation, and compliant dispatch across all Australian states.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/wholesale/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors text-center"
              >
                Apply for Wholesale
              </Link>
              <Link
                href="/contact/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wide transition-colors text-center"
              >
                Speak with Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
