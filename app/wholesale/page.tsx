// app/wholesale/page.tsx
import Link from 'next/link';
import { SITE, BRAND, SHOP, CONTACT } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import WholesaleForm from './WholesaleForm';
import { Building2, ShieldCheck, Truck, Percent, PackageCheck, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Wholesale Zero-Nicotine Vapes Australia | B2B Bulk Distributor',
  description:
    'Australian wholesale supplier of certified 0mg nicotine-free vapes, genuine Uwell pod kits, and botanical e-liquids. Tiered pricing, fast dispatch, and compliance support for retailers.',
  alternates: {
    canonical: `https://${SITE.domain}/wholesale/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function WholesalePage() {
  const wholesaleSchema = [
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
          name: 'Wholesale B2B',
          item: `https://${SITE.domain}/wholesale/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={wholesaleSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Wholesale B2B</span>
        </nav>

        {/* Page Header — Single H1 */}
        <header className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>Australian B2B Wholesale Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Wholesale 0mg Zero-Nicotine Vaporizers & Uwell Hardware
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Partner with Australia&apos;s specialist zero-nicotine distributor. Supply your retail store, tobacconist, or convenience chain with lab-verified 0mg disposables, Uwell pod kits, and bulk botanical e-liquids.
          </p>
        </header>

        {/* Wholesale Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Tier 1 · Starter Pack</span>
              <h2 className="text-xl font-bold text-white">$500 – $2,000 AUD</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal for boutique stores introducing premium 0mg zero-nicotine product lines.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30% off standard wholesale MSRP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard 48-hr dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Compliance lab certificates included</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-emerald-950/40 to-slate-900 border-2 border-emerald-500/40 space-y-4 flex flex-col justify-between shadow-2xl">
            <div className="space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold uppercase">
                Most Popular
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">Tier 2 · Retail Master</span>
              <h2 className="text-xl font-bold text-white">$2,000 – $10,000 AUD</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                For established vape shops & multi-location retail chains across Australia.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                  <span>42% off standard wholesale MSRP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Priority same-day Sydney courier</span>
                </li>
                <li className="flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dedicated B2B account manager</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Tier 3 · Master Distributor</span>
              <h2 className="text-xl font-bold text-white">$10,000+ AUD</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-pallet direct shipments, custom white-label formulations & maximum margin.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Up to 55% volume discount</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Freight forwarding included</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct factory batch reservations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Apply for a Wholesale Account</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete the business registration form below. Once approved, you will receive our wholesale price book, CSV batch ordering sheets, and direct access to Sydney inventory allocations.
            </p>
            <div className="pt-4 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Valid ABN / ACN required for Australian commercial accounts.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All shipments dispatched with Australian compliance paperwork.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <WholesaleForm />
          </div>
        </div>
      </div>
    </main>
  );
}
