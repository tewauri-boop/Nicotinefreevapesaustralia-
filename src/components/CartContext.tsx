// src/components/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE, SHOP, CONTACT } from '@/config/site';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  cryptoDiscountAmount: number;
  cryptoTotal: number;
  totalItems: number;
  meetsMinOrder: boolean;
  minOrderAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppUrl: (notes?: string) => string;
  generateOrderDraftText: (notes?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SITE.cartKey || 'mm-cart');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SITE.cartKey || 'mm-cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);


  const addToCart = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.slug === slug) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cryptoDiscountAmount = subtotal * (SHOP.cryptoDiscount / 100);
  const cryptoTotal = subtotal - cryptoDiscountAmount;
  const meetsMinOrder = subtotal >= SHOP.minOrder;

  const generateOrderDraftText = (notes?: string) => {
    let text = `*Order Inquiry — ${SITE.name}*\n\n`;
    text += `*Items:*\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)} AUD\n`;
    });
    text += `\n*Subtotal:* $${subtotal.toFixed(2)} AUD\n`;
    text += `*Crypto Settlement (10% OFF):* $${cryptoTotal.toFixed(2)} AUD (Save $${cryptoDiscountAmount.toFixed(2)})\n`;
    text += `*Express Shipping:* FREE Nationwide\n`;
    if (notes) {
      text += `*Customer Note:* ${notes}\n`;
    }
    text += `\nPlease provide payment instructions (Bank Transfer / PayID / Crypto / Gift Card).`;
    return text;
  };

  const generateWhatsAppUrl = (notes?: string) => {
    const rawNumber = CONTACT.whatsapp.replace(/[^0-9]/g, '');
    const draft = generateOrderDraftText(notes);
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(draft)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        cryptoDiscountAmount,
        cryptoTotal,
        totalItems,
        meetsMinOrder,
        minOrderAmount: SHOP.minOrder,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppUrl,
        generateOrderDraftText
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
