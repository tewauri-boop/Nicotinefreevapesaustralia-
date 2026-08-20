// app/thank-you-order/page.tsx
import Link from 'next/link';
import { SITE, CONTACT } from '@/config/site';
import { CheckCircle2, ArrowRight, MessageSquare, ShoppingBag, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Your Order Request',
  description: 'Your order draft has been received for dispatch preparation.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouOrderPage() {
  return (
    <main id="main" className="min-h-[80vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Exactly One H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Order Request Received
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Thank you for choosing {SITE.name}. Our Sydney fulfillment hub is preparing your order draft. A concierge representative will confirm delivery details and payment instructions.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Sydney Express Dispatch</span>
          </div>
          <p>Orders confirmed by 2:00 PM AEST dispatch same day with tracking numbers.</p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
          <Link
            href="/shop/"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Track on WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
