// src/components/TrustBar.tsx
import { ShieldCheck, Truck, Coins, Award } from 'lucide-react';
import { SHOP } from '@/config/site';

const pillars = [
  {
    icon: ShieldCheck,
    title: '100% Zero-Nicotine (0mg)',
    description: 'Lab-certified pure USP vegetable glycerin & botanical terpenes with zero nicotine.'
  },
  {
    icon: Truck,
    title: 'Free Express AU Shipping',
    description: 'Discreet, tamper-evident express dispatch across Australia on all orders over $200.'
  },
  {
    icon: Coins,
    title: `Extra ${SHOP.cryptoDiscount}% Crypto Discount`,
    description: 'Automated 10% instant discount when checking out with Bitcoin (BTC) or Tether (USDT).'
  },
  {
    icon: Award,
    title: 'Authentic Global Hardware',
    description: '100% genuine Uwell, Vaporesso & GeekVape hardware with verifiable scratch codes.'
  }
];

export default function TrustBar() {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
