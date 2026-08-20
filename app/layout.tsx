// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { SITE, CONTACT } from '@/config/site';
import { CartProvider } from '@/src/components/CartContext';
import AnnouncementBar from '@/src/components/AnnouncementBar';
import Nav from '@/src/components/Nav';
import Footer from '@/src/components/Footer';
import CartDrawer from '@/src/components/CartDrawer';
import ChatHub from '@/src/components/ChatHub';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} | Premium 0mg Zero-Nicotine Vaporizers Australia`,
    template: `%s | ${SITE.name}`
  },
  description:
    'Australia premier boutique for lab-certified 0mg zero-nicotine disposable vapes, authentic Uwell pod systems, sub-ohm coils, and pure botanical e-liquids.',
  keywords: [
    'Nicotine free vapes',
    'Nicotine free disposable vapes',
    '0 Mg Vape australia',
    'Nicotine free pods australia',
    'Vape pods australia',
    'Disposable vape',
    'Vape shop online australia',
    'Uwell Vape australia',
    'Vape Coils australia',
    'Vape mods australia',
    'vape batteries australia',
    'refillable pod vape australia'
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `https://${SITE.domain}/`,
    siteName: SITE.name,
    title: `${SITE.name} | 0mg Zero-Nicotine Vapes Australia`,
    description:
      'Explore Australia’s curated collection of 100% nicotine-free vaporizers, genuine Uwell pod kits, and artisan botanical blends with free express dispatch.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | 0mg Zero-Nicotine Vapes Australia`,
    description:
      'Explore Australia’s curated collection of 100% nicotine-free vaporizers, genuine Uwell pod kits, and artisan botanical blends with free express dispatch.',
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
    'google-site-verification': SITE.gscVerification,
    'msvalidate.01': SITE.gscVerification,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.locale} className="scroll-smooth dark bg-slate-950 text-slate-100">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script src="/js/webmcp.js" defer />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans" suppressHydrationWarning>
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <CartDrawer />
          <ChatHub />
        </CartProvider>
      </body>
    </html>
  );
}
