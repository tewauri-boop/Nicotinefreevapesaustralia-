// src/components/Footer.tsx
import Link from 'next/link';
import { Sparkles, ShieldCheck, Mail, MapPin, Phone, Lock, CreditCard } from 'lucide-react';
import { SITE, CONTACT, COMPLIANCE, CATEGORIES } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Australia&apos;s premier dedicated source for 100% lab-certified 0mg zero-nicotine vaporizers, authentic Uwell hardware, sub-ohm mesh coils, and pure botanical artisan e-liquids.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/60">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>100% Nicotine-Free (0mg) Verified</span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-100 font-bold mb-4">
              0mg Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop/${cat.slug}/`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop/" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  → Browse All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & B2B */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-100 font-bold mb-4">
              Explore & Support
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about/" className="hover:text-emerald-400 transition-colors">
                  About Our Sydney Heritage
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-emerald-400 transition-colors">
                  0mg Vaping Guide & Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="hover:text-emerald-400 transition-colors">
                  FAQ & Shipping Policies
                </Link>
              </li>
              <li>
                <Link href="/wholesale/" className="hover:text-emerald-400 transition-colors">
                  B2B Wholesale Inquiries
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-emerald-400 transition-colors">
                  Contact Concierge Desk
                </Link>
              </li>
              <li>
                <Link href="/search/" className="hover:text-emerald-400 transition-colors">
                  Search Full Inventory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-100 font-bold mb-4">
              Sydney Operations
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{CONTACT.hq}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: CONTACT.email }} />
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CONTACT.phone}</span>
              </div>
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Payment Channels
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-medium text-slate-300">
                  <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">EFT Bank Transfer</span>
                  <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">PayID / Osko</span>
                  <span className="px-2 py-1 bg-emerald-950/80 text-emerald-300 rounded border border-emerald-800">Bitcoin (-10%)</span>
                  <span className="px-2 py-1 bg-emerald-950/80 text-emerald-300 rounded border border-emerald-800">USDT (-10%)</span>
                  <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Gift Cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 text-xs mb-8 leading-relaxed">
          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Zero Nicotine Product Declaration:</strong> {COMPLIANCE.disclaimer}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {currentYear} {SITE.name}. All rights reserved. Express Dispatch from Sydney, NSW.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq/" className="hover:text-emerald-400 transition-colors">
              Terms & Policies
            </Link>
            <Link href="/wholesale/" className="hover:text-emerald-400 transition-colors">
              Wholesale
            </Link>
            <Link href="/contact/" className="hover:text-emerald-400 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
