// src/components/ProductCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import SmartImage from './SmartImage';
import { useCart } from './CartContext';

export interface ProductProps {
  slug: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  badge?: string;
  shortDescription: string;
  images: string[];
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.images[0]
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-emerald-950/20">
      {/* Top Image Frame */}
      <Link
        href={`/shop/${product.category}/${product.slug}/`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950"
      >
        <SmartImage
          src={product.images[0] || ''}
          alt={product.name}
          width={600}
          height={450}
          category={product.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 rounded-md shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* 0mg Pill */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/30 rounded backdrop-blur-sm">
            0mg AU
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-mono text-emerald-400/90 uppercase tracking-wider mb-1 font-semibold">
            {product.category.replace(/-/g, ' ')}
          </div>
          <Link
            href={`/shop/${product.category}/${product.slug}/`}
            className="block text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price and Cart Button */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono">AUD</span>{' '}
            <span className="text-lg font-bold text-slate-100 font-mono">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/shop/${product.category}/${product.slug}/`}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={`View details for ${product.name}`}
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
              }`}
              aria-label={`Add ${product.name} to shopping cart`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
