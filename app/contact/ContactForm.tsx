// app/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMS, SITE } from '@/config/site';
import { Send, Loader2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const key = (form.querySelector('[name="access_key"]') as HTMLInputElement)?.value;

    // Key-pending fallback: If key is not configured, skip to thank you page
    if (!key || key === 'pending' || key.startsWith('YOUR-')) {
      setTimeout(() => {
        router.push('/thank-you-contact/');
      }, 500);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new FormData(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push('/thank-you-contact/');
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending your message.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      {/* Hidden Fields for Web3Forms */}
      <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
      <input type="hidden" name="subject" value={`New Contact Inquiry — ${SITE.name}`} />
      <input type="hidden" name="from_name" value={`${SITE.name} Concierge`} />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      <input type="hidden" name="replyto" value={replyTo} />

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-slate-300 font-semibold mb-1">
          Full Name <span className="text-emerald-400">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          placeholder="e.g. Liam Walker"
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-slate-300 font-semibold mb-1">
            Email Address <span className="text-emerald-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="liam@example.com.au"
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-slate-300 font-semibold mb-1">
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="+61 400 000 000"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-slate-300 font-semibold mb-1">
          Inquiry Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm transition-colors"
        >
          <option value="Product Advice">0mg Product Guidance & Device Compatibility</option>
          <option value="Order Status">Order Status & Tracking</option>
          <option value="Crypto Payment">Cryptocurrency Payment (10% Discount)</option>
          <option value="Wholesale">Wholesale & B2B Inquiries</option>
          <option value="General">Other Inquiries</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-slate-300 font-semibold mb-1">
          Message <span className="text-emerald-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="How can our Sydney concierge assist you with zero-nicotine vaporizers today?"
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message to Sydney Concierge</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        Your information is confidential and used exclusively for your inquiry.
      </p>
    </form>
  );
}
