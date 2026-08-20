// app/not-found.tsx
import Link from 'next/link';
import { SITE } from '@/config/site';
import { HelpCircle, ArrowRight, ShoppingBag, Search } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | 404',
  description: 'The requested page could not be located on Nicotine Free Vapes Australia.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main" className="min-h-[75vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 font-mono font-bold text-xl">
          404
        </div>

        {/* Exactly One H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Page Not Located
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          The link or page you requested may have moved or been updated in our zero-nicotine catalog.
        </p>

        <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop/"
            className="w-full py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Browse 0mg Products</span>
          </Link>
          <Link
            href="/search/"
            className="w-full py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Search Catalog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
