// app/shop/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, PRODUCTS, CATEGORIES, SHOP, CONTACT } from '@/config/site';
import SmartImage from '@/src/components/SmartImage';
import ProductCard from '@/src/components/ProductCard';
import JsonLd from '@/src/components/JsonLd';
import AddToCartButton from './AddToCartButton';
import { ShieldCheck, Truck, Sparkles, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} (0mg Zero Nicotine) | Buy in Australia`,
    description: `${product.shortDescription} Genuine zero-nicotine formulation with free express shipping across Australia.`,
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    openGraph: {
      title: `${product.name} (0mg Zero Nicotine)`,
      description: product.shortDescription,
      images: [
        {
          url: `https://${SITE.domain}/images/${product.images[0]}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  // If less than 4 related in same category, top up with featured
  if (relatedProducts.length < 4) {
    const remaining = PRODUCTS.filter(
      (p) => p.slug !== product.slug && !relatedProducts.some((r) => r.slug === p.slug)
    ).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...remaining);
  }

  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images.map((img) => `https://${SITE.domain}/images/${img}`),
      description: product.description,
      sku: product.slug,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        priceCurrency: SITE.currency,
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: SITE.name,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://${SITE.domain}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Shop',
          item: `https://${SITE.domain}/shop/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category?.name || 'Category',
          item: `https://${SITE.domain}/shop/${product.category}/`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: product.name,
          item: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={productSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-emerald-400 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop/${product.category}/`} className="hover:text-emerald-400 transition-colors">
            {category?.name || product.category}
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800">
          {/* Left Column: Image Canvas Frame */}
          <div className="lg:col-span-6 space-y-4">
            <div className="product-frame rounded-2xl overflow-hidden shadow-2xl relative">
              <SmartImage
                src={product.images[0]}
                alt={product.name}
                priority={true}
                className="w-full h-full object-contain p-6"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Thumbs if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl bg-white border border-slate-700 overflow-hidden p-2"
                  >
                    <SmartImage
                      src={img}
                      alt={`${product.name} preview thumbnail ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quality & Authenticity Guarantee Callout */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>100% 0.0% Nicotine Purity Guarantee</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                All hardware is 100% authentic and sourced from official distributors. E-liquid formulations contain 0mg (zero) nicotine, verified for compliance with Australian standards.
              </p>
            </div>
          </div>

          {/* Right Column: Product Info, Pricing, Add to Cart */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700 uppercase">
                  {category?.name || product.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 uppercase">
                  0mg Nicotine
                </span>
              </div>

              {/* Exactly One H1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm font-mono text-slate-400">
                  {SITE.currency} · GST Included
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                  10% Off via Crypto
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Product Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block font-mono">Nicotine Strength:</span>
                  <span className="text-slate-100 font-bold font-mono">0mg / 0.0% (Zero)</span>
                </div>
                {product.specs &&
                  Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-400 block font-mono">{key}:</span>
                      <span className="text-slate-100 font-bold font-mono">{val}</span>
                    </div>
                  ))}
              </div>


              {/* Interactive Client Add to Cart Component */}
              <AddToCartButton product={product} />

              {/* WhatsApp Fast Concierge Order */}
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${SITE.name}, I would like to order: ${product.name} ($${product.price.toFixed(2)} AUD).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order via WhatsApp Concierge</span>
              </a>
            </div>

            {/* Shipping & Payment Perks */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dispatches from Sydney</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Min Order ${SHOP.minOrder} AUD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-800">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Complementary Selections
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                You May Also Consider
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
