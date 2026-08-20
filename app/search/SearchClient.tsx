// app/search/SearchClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, X, ArrowRight, Layers, BookOpen } from 'lucide-react';
import { PRODUCTS, POSTS, CATEGORIES } from '@/config/site';
import ProductCard from '@/src/components/ProductCard';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!trimmed) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.shortDescription.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  const filteredPosts = useMemo(() => {
    if (!trimmed) return [];
    return POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.excerpt.toLowerCase().includes(trimmed) ||
        p.content.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  const filteredCategories = useMemo(() => {
    if (!trimmed) return [];
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.description.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  return (
    <div className="space-y-10">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by flavor, brand (e.g. Uwell), coil, or 0mg disposables..."
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-500 shadow-xl transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories Match */}
      {filteredCategories.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Matching Collections ({filteredCategories.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}/`}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors"
              >
                <span className="text-sm font-bold text-slate-100 block">{c.name}</span>
                <span className="text-xs text-slate-400 line-clamp-1">{c.description}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {trimmed ? `Matching Products (${filteredProducts.length})` : `All Zero-Nicotine Products (${PRODUCTS.length})`}
          </h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <p className="text-slate-300 font-semibold">No products matched &quot;{query}&quot;.</p>
            <p className="text-xs text-slate-500">
              Try searching for &quot;Uwell&quot;, &quot;watermelon&quot;, &quot;coils&quot;, or &quot;disposable&quot;.
            </p>
          </div>
        )}
      </div>

      {/* Articles Section */}
      {filteredPosts.length > 0 && (
        <div className="pt-10 border-t border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Matching Guides & Articles ({filteredPosts.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-2 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
