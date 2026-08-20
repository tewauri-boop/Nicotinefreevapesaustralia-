// src/components/AnnouncementBar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Truck, ShieldCheck, Coins } from 'lucide-react';
import { SHOP } from '@/config/site';

const announcements = [
  {
    icon: Sparkles,
    text: '100% Certified Zero-Nicotine (0mg) Botanical Formulations & Authentic Hardware',
    link: '/shop/'
  },
  {
    icon: Truck,
    text: 'Free Express Courier Shipping Across All Australian States (Min Order $200)',
    link: '/faq/'
  },
  {
    icon: Coins,
    text: `Extra ${SHOP.cryptoDiscount}% Instant Discount on Bitcoin (BTC) & Tether (USDT) Payments`,
    link: '/shop/'
  },
  {
    icon: ShieldCheck,
    text: 'Discreet, Tamper-Evident Packaging & Same-Day Dispatch from Sydney',
    link: '/about/'
  }
];

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIdx];
  const Icon = current.icon;

  return (
    <aside aria-label="Store Announcements" className="bg-slate-950 text-slate-200 border-b border-emerald-950/60 py-2.5 px-4 text-xs font-medium transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-emerald-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-widest text-[10px] font-bold text-slate-300">Sydney Hub Live</span>
        </div>

        <div className="flex-1 flex items-center justify-center text-center">
          <Link
            href={current.link}
            className="inline-flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors group"
          >
            <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="tracking-wide group-hover:underline underline-offset-4">
              {current.text}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 text-slate-400 text-[11px]">
          <Link href="/wholesale/" className="hover:text-emerald-400 transition-colors">
            Wholesale Inquiries
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/faq/" className="hover:text-emerald-400 transition-colors">
            Help & FAQ
          </Link>
        </div>
      </div>
    </aside>
  );
}
