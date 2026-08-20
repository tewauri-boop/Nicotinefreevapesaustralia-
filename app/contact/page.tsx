// app/contact/page.tsx
import Link from 'next/link';
import { SITE, CONTACT, SHOP } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import ContactForm from './ContactForm';
import { Mail, MessageSquare, MapPin, ShieldCheck, Clock, Phone } from 'lucide-react';

export const metadata = {
  title: 'Contact Us & Order Concierge | Nicotine Free Vapes Australia',
  description:
    'Contact our Sydney customer concierge for order inquiries, zero-nicotine product guidance, or wholesale applications. Available via WhatsApp, email, and live messaging.',
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
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
        name: 'Contact',
        item: `https://${SITE.domain}/contact/`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Contact Concierge</span>
        </nav>

        {/* Page Header — Single H1 */}
        <header className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Sydney Customer Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Get in Touch with Our Sydney Team
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions about 0mg vape devices, Uwell coil compatibility, or wholesale orders? Send us a message or connect directly via WhatsApp.
          </p>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Send an Inquiry</h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below. Our Sydney specialists will respond within 2-4 business hours.
            </p>
            <ContactForm />
          </div>

          {/* Quick Channels & Info Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Concierge Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/50 border border-emerald-800/80 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Instant WhatsApp Concierge</h2>
                  <p className="text-xs text-emerald-300">Fastest response for order preparation</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our team on WhatsApp for real-time inventory checks, custom bundle inquiries, and seamless cryptocurrency order processing.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${SITE.name}, I have a question regarding 0mg vapes.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Business Details Info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-100 block">Fulfillment Location</span>
                  <span>{CONTACT.hq}</span>
                  <span className="text-slate-500 block">Sydney NSW, Australia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-100 block">Email Support</span>
                  <span className="font-mono text-slate-300">
                    orders&#64;nicotinefreevapes.com.au
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-100 block">Operating Hours</span>
                  <span>Mon – Fri: 9:00 AM – 6:00 PM AEST</span>
                  <span className="text-slate-500 block">Online orders dispatched daily</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Minimum Order: ${SHOP.minOrder} AUD · Free Express Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
