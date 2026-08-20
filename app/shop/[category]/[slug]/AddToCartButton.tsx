// app/shop/[category]/[slug]/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '@/src/components/CartContext';

export interface ProductItem {
  slug: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  badge?: string;
  shortDescription?: string;
  description?: string;
  images: string[];
}

interface AddToCartButtonProps {
  product: ProductItem;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.images[0] || 'default.webp',
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 400);
  };


  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-700 bg-slate-950 rounded-xl p-1 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-sm font-bold text-slate-100">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add To Cart Primary Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl ${
            added
              ? 'bg-emerald-600 text-white shadow-emerald-950/80'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50 hover:scale-[1.02]'
          }`}
          id={`add-to-cart-${product.slug}`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart — ${(product.price * quantity).toFixed(2)} AUD</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
