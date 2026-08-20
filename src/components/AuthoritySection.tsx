// src/components/AuthoritySection.tsx
import Link from 'next/link';
import { ShieldCheck, MapPin, Calendar, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { SITE, BRAND, CONTACT } from '@/config/site';

export default function AuthoritySection() {
  return (
    <section className="py-16 bg-slate-950 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Authority */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Australian Brand Authority</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pioneering 100% Zero-Nicotine (0mg) Lifestyle Vaporizers in Australia
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {BRAND.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Founding Year</div>
                  <div className="text-sm font-bold text-white">{BRAND.foundingYear}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Operations HQ</div>
                  <div className="text-sm font-bold text-white">{CONTACT.hq}</div>
                </div>
              </div>
            </div>

            {/* Differentiators */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Why Australia Chooses {SITE.name}
              </div>
              <ul className="space-y-2">
                {BRAND.differentiation.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Read Our Full Story
              </Link>
              <Link
                href="/wholesale/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wide transition-colors"
              >
                Wholesale & Partnerships
              </Link>
            </div>
          </div>

          {/* Right Column: Key Metrics & Geographic Footprint */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                    Quality & Scale Standard
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AU Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-emerald-400">0.0%</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Nicotine Purity Guarantee</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Authentic Hardware Only</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-white">Same-Day</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Sydney Dispatch</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-emerald-400">10% OFF</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Crypto Settlement</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Nationwide Shipping Footprint
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  {BRAND.areaServed.map((city, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
