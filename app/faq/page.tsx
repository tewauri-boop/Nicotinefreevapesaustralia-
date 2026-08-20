// app/faq/page.tsx
import Link from 'next/link';
import { SITE, FAQ, SHOP, CONTACT } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import { HelpCircle, ShieldCheck, Truck, CreditCard, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions & Shipping Policy | 0mg Vapes Australia',
  description:
    'Frequently asked questions about zero-nicotine vapes in Australia, 0mg purity certification, Sydney express shipping times, cryptocurrency discounts, and payment methods.',
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function FAQPage() {
  const faqSchema = [
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
    {
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
          name: 'FAQ',
          item: `https://${SITE.domain}/faq/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={faqSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">FAQ Hub</span>
        </nav>

        {/* Page Header — Single H1 */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & Shipping Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Everything you need to know about our certified 0mg zero-nicotine formulations, Sydney express dispatch, payment options, and hardware warranties.
          </p>
        </header>

        {/* Quick Reference Policy Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">0.0% Purity Verified</h2>
            <p className="text-xs text-slate-400">100% zero-nicotine guarantee across every disposable and bottled blend.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">Free Express Shipping</h2>
            <p className="text-xs text-slate-400">Dispatched from Sydney. Free shipping with minimum order of ${SHOP.minOrder} AUD.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">10% Crypto Discount</h2>
            <p className="text-xs text-slate-400">Automatic 10% reduction when checking out via Bitcoin (BTC) or Tether (USDT).</p>
          </div>
        </div>

        {/* Full FAQ Accordion/Cards */}
        <section className="space-y-4">
          {FAQ.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3"
            >
              <h2 className="text-base sm:text-lg font-bold text-white flex items-start gap-3">
                <span className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">
                  Q{idx + 1}.
                </span>
                <span>{item.question}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
                {item.answer}
              </p>
            </div>
          ))}
        </section>

        {/* Unresolved Questions Callout */}
        <section className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-lg font-bold text-white">Have a Specific Question?</h2>
            <p className="text-xs text-slate-300">
              Our Sydney customer concierge is available for device advice and order updates.
            </p>
          </div>
          <Link
            href="/contact/"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </main>
  );
}
