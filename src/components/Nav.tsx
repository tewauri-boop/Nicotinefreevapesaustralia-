// src/components/Nav.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE, CATEGORIES } from '@/config/site';
import { useCart } from './CartContext';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Shop All', href: '/shop/' },
    { name: 'About', href: '/about/' },
    { name: 'Education & Blog', href: '/blog/' },
    { name: 'FAQ', href: '/faq/' },
    { name: 'Wholesale B2B', href: '/wholesale/' },
    { name: 'Contact', href: '/contact/' },
  ];

  return (
    <>
      {/* WCAG 2.2 AA Skip Link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-md shadow-lg outline-none ring-2 ring-emerald-400"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
                aria-label="Nicotine Free Vapes Australia Homepage"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 border border-emerald-400/30 flex items-center justify-center shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-emerald-100" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {SITE.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 0mg Certified AU
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <Link
                  href="/shop/"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname?.startsWith('/shop')
                      ? 'text-emerald-400 bg-slate-800/80'
                      : 'text-slate-200 hover:text-emerald-300 hover:bg-slate-800/50'
                  }`}
                  aria-expanded={shopDropdownOpen}
                >
                  <span>Shop</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Link>

                {/* Compact Mega Dropdown */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 grid gap-3 z-50">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-2 border-b border-slate-800 pb-2">
                      Zero-Nicotine Collections
                    </div>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}/`}
                        className="group block p-2 rounded-lg hover:bg-slate-800/80 transition-colors"
                      >
                        <div className="text-sm font-medium text-slate-100 group-hover:text-emerald-400 flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">0mg</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-800">
                      <Link
                        href="/shop/"
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-between px-2"
                      >
                        <span>View Full Catalog</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href
                      ? 'text-emerald-400 bg-slate-800/80'
                      : 'text-slate-200 hover:text-emerald-300 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/search/"
                className="p-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label={`Open shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open mobile menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold px-3 py-1">
              Menu
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400 bg-slate-800'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold px-3 py-1">
                Zero-Nicotine Collections
              </div>
              <div className="grid grid-cols-1 gap-1 mt-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-md"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
