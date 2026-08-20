// app/about/page.tsx
import Link from 'next/link';
import { SITE, BRAND, CONTACT, SHOP, PRODUCTS } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import { ShieldCheck, MapPin, Calendar, Award, CheckCircle2, Truck, Zap, HeartHandshake } from 'lucide-react';

export const metadata = {
  title: `About ${SITE.name} | Australia's 0mg Zero-Nicotine Authority`,
  description:
    'Learn about Nicotine Free Vapes Australia: Sydney headquarters, founding story in 2023, lab-certified 0mg zero-nicotine verification, and dedication to adult sensory vaporizers.',
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function AboutPage() {
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['AboutPage', 'ItemPage'],
      name: `About ${SITE.name}`,
      description: BRAND.description,
      url: `https://${SITE.domain}/about/`,
      mainEntity: {
        '@type': 'Organization',
        name: SITE.name,
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
        numberOfItems: PRODUCTS.length,
        areaServed: BRAND.areaServed,
      },
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
          name: 'About Us',
          item: `https://${SITE.domain}/about/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={aboutSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">About Us</span>
        </nav>

        {/* Page Header — Exactly One H1 */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sydney Headquarters · Established 2023</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            About Nicotine Free Vapes Australia
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-4">
            {BRAND.description}
          </p>
        </header>

        {/* Narrative & Mission Sections (700+ words rich entity content) */}
        <section className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base bg-slate-900/40 p-6 sm:p-10 rounded-3xl border border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Our Origin & Founding Vision
            </h2>
            <p>
              Founded in Sydney, Australia in 2023, Nicotine Free Vapes was established with a single unwavering principle: to create a dedicated sanctuary for adult Australians seeking sophisticated, 100% zero-nicotine (0mg) inhalation rituals. While the broader vapor industry historically centered around chemical stimulants, our founders recognized a growing cohort of discerning adults who cherish the sensory gratification, aromatic complexity, and mindful tactile pauses of vaping without any addictive stimulants.
            </p>
            <p className="mt-3">
              Operating out of our central logistics facility in Sydney, NSW, we have curated an uncompromising catalog of high-grade hardware, authentic refillable pod kits from global leaders like Uwell, and pure vegetable-glycerin botanical e-liquids. Every single product in our warehouse is batch-certified to guarantee exactly 0.0% nicotine content, ensuring complete regulatory harmony and peace of mind for our clients.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Uncompromising 0.0% Purity & Australian Compliance Standards
            </h2>
            <p>
              In Australia&apos;s evolving vaping landscape, purity and transparent documentation are paramount. We do not sell, import, or warehouse any nicotine-containing e-liquids, salts, or synthetic tobacco alkaloid substitutes. Every batch of pre-filled disposables and bottled botanical e-liquids undergoes rigorous laboratory chromatography testing to verify zero detectable nicotine molecules.
            </p>
            <p className="mt-3">
              Our e-liquid formulations prioritize USP/BP grade Vegetable Glycerin (VG), Propylene Glycol (PG), and nature-identical aromatic extracts. This delivers dense, velvety vapor output, authentic Australian fruit and cooling profiles, and a pristine throat-feel designed solely for sensory pleasure and lifestyle relaxation.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Official Hardware Partnerships & Genuine Uwell Distribution
            </h2>
            <p>
              Beyond 0mg disposables, our catalog emphasizes sustainable, long-term vaping solutions through open refillable pod systems and sub-ohm hardware. We maintain direct supply relationships with world-class manufacturers including Uwell, stocking authentic Caliburn G3 Pro, G3 Lite, and Caliburn A3S devices alongside genuine replacement coils and pods.
            </p>
            <p className="mt-3">
              Each hardware item is factory sealed with verifiable anti-counterfeiting scratch codes, ensuring you never receive inferior clone hardware that compromises battery safety or flavor fidelity.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Australia-Wide Express Logistics & Client Experience
            </h2>
            <p>
              To ensure our community across New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, and the Territories receives prompt service, all orders are packed and dispatched directly from Sydney using express courier networks. We provide transparent order tracking, responsive human concierge support via WhatsApp and email, and an automatic 10% discount for cryptocurrency settlements via Bitcoin and Tether.
            </p>
          </div>
        </section>

        {/* Historical Milestones Timeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Company Milestones & Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRAND.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4"
              >
                <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono font-bold text-xs shrink-0">
                  {m.year}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
                  {m.event}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Real Pillars of Differentiation */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Core Pillars of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BRAND.differentiation.map((diff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <p className="text-sm font-semibold text-slate-100 leading-snug">
                  {diff}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Geographic Footprint & Contact Details */}
        <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
              <MapPin className="w-4 h-4" />
              <span>Headquarters & Fulfillment</span>
            </div>
            <p className="text-slate-300">Sydney, NSW, Australia</p>
            <p className="text-slate-500">Same-day dispatch hub servicing all AU postcodes.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
              <Truck className="w-4 h-4" />
              <span>Coverage & Policies</span>
            </div>
            <p className="text-slate-300">NSW, VIC, QLD, WA, SA, TAS, ACT, NT</p>
            <p className="text-slate-500">Min Order: ${SHOP.minOrder} AUD · Free Express Dispatch</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
              <HeartHandshake className="w-4 h-4" />
              <span>Concierge Support</span>
            </div>
            <p className="text-slate-300">Direct Human Inquiries</p>
            <Link href="/contact/" className="text-emerald-400 hover:underline block font-mono">
              Contact Concierge →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
