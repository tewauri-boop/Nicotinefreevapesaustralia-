// src/components/CartDrawer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, Coins, AlertCircle } from 'lucide-react';
import { useCart } from './CartContext';
import SmartImage from './SmartImage';
import { SHOP } from '@/config/site';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    cryptoDiscountAmount,
    cryptoTotal,
    totalItems,
    meetsMinOrder,
    minOrderAmount,
    generateWhatsAppUrl
  } = useCart();

  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const remainingToMin = Math.max(0, minOrderAmount - subtotal);
  const progressPercent = Math.min(100, (subtotal / minOrderAmount) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col justify-between shadow-2xl text-slate-100">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold tracking-tight text-white">
                Your Cart ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Min Order Progress Banner */}
          <div className="bg-slate-950 px-6 py-3 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">
                Minimum Order: <strong className="text-slate-200">${minOrderAmount} AUD</strong>
              </span>
              {meetsMinOrder ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Order Valid
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">
                  Add ${remainingToMin.toFixed(2)} AUD more
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  meetsMinOrder ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center mb-4 text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-200">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Explore our selection of 0mg disposable vapes, refillable pod kits, and artisan botanical e-liquids.
                </p>
                <Link
                  href="/shop/"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 items-center justify-between"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
                    <SmartImage
                      src={item.image || ''}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-100 truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5">
                      ${item.price.toFixed(2)} AUD
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-700 bg-slate-900 rounded-md">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, -1)}
                          className="p-1 text-slate-400 hover:text-slate-200"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, 1)}
                          className="p-1 text-slate-400 hover:text-slate-200"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.slug)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-200">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Options */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              {/* Order Notes */}
              <div>
                <label htmlFor="cart-notes" className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Order Notes / Delivery Preferences (Optional)
                </label>
                <input
                  id="cart-notes"
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g. Leave in safe place, preferred payment..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-100">${subtotal.toFixed(2)} AUD</span>
                </div>

                {/* Crypto Savings Highlight */}
                <div className="flex justify-between text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/60 font-medium">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> Crypto Rate (-10%)
                  </span>
                  <span className="font-mono font-bold">
                    ${cryptoTotal.toFixed(2)} AUD (Save ${cryptoDiscountAmount.toFixed(2)})
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Express Australia Post Shipping</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
              </div>

              {/* Min Order Warning */}
              {!meetsMinOrder && (
                <div className="flex items-start gap-2 p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Minimum order amount is <strong>${minOrderAmount} AUD</strong>. Please add ${remainingToMin.toFixed(2)} AUD more to complete checkout.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <a
                  href={meetsMinOrder ? generateWhatsAppUrl(customerNotes) : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!meetsMinOrder) e.preventDefault();
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                    meetsMinOrder
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Checkout via WhatsApp Concierge</span>
                </a>

                <Link
                  href={meetsMinOrder ? '/contact/' : '#'}
                  onClick={(e) => {
                    if (!meetsMinOrder) {
                      e.preventDefault();
                    } else {
                      setIsCartOpen(false);
                    }
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                    meetsMinOrder
                      ? 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200'
                      : 'border-slate-800 bg-slate-900/50 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Order Draft (EFT / PayID / Card)</span>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={clearCart}
                  className="hover:text-rose-400 transition-colors"
                >
                  Clear Cart
                </button>
                <span>Discreet Sydney Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
