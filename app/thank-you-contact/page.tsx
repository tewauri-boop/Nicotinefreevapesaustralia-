// app/thank-you-contact/page.tsx
import Link from 'next/link';
import { SITE, CONTACT } from '@/config/site';
import { CheckCircle2, ArrowRight, MessageSquare, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Contacting Us',
  description: 'Your inquiry has been received by our Sydney concierge.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouContactPage() {
  return (
    <main id="main" className="min-h-[80vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Exactly One H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Inquiry Successfully Received
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Thank you for reaching out to {SITE.name}. Our Sydney customer concierge has received your details and will get back to you shortly.
        </p>

        <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
          <Link
            href="/shop/"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore 0mg Store</span>
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Need Immediate Assistance? WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
