// app/thank-you-wholesale/page.tsx
import Link from 'next/link';
import { SITE, CONTACT } from '@/config/site';
import { CheckCircle2, ArrowRight, Building2, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Wholesale Application Received',
  description: 'Your B2B application has been submitted to our Sydney wholesale division.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouWholesalePage() {
  return (
    <main id="main" className="min-h-[80vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <Building2 className="w-8 h-8" />
        </div>

        {/* Exactly One H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          B2B Application Submitted
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Thank you for applying to partner with {SITE.name}. Our commercial trade team in Sydney will review your ABN credentials and dispatch your wholesale catalog tier within 1 business day.
        </p>

        <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Direct Commercial Line (WhatsApp)</span>
          </a>
        </div>
      </div>
    </main>
  );
}
