// app/wholesale/WholesaleForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMS, SITE } from '@/config/site';
import { Building2, Loader2, AlertCircle } from 'lucide-react';

export default function WholesaleForm() {
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
        router.push('/thank-you-wholesale/');
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
        router.push('/thank-you-wholesale/');
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending your wholesale application.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      {/* Hidden Fields for Web3Forms */}
      <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
      <input type="hidden" name="subject" value={`New B2B Wholesale Application — ${SITE.name}`} />
      <input type="hidden" name="from_name" value={`${SITE.name} B2B Portal`} />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      <input type="hidden" name="replyto" value={replyTo} />

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="b2b-company" className="block text-slate-300 font-semibold mb-1">
            Company / Business Name <span className="text-emerald-400">*</span>
          </label>
          <input
            id="b2b-company"
            type="text"
            name="company"
            required
            placeholder="e.g. Sydney Vape Emporium Pty Ltd"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="b2b-abn" className="block text-slate-300 font-semibold mb-1">
            ABN / ACN Number <span className="text-emerald-400">*</span>
          </label>
          <input
            id="b2b-abn"
            type="text"
            name="abn"
            required
            placeholder="XX XXX XXX XXX"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="b2b-name" className="block text-slate-300 font-semibold mb-1">
            Contact Person <span className="text-emerald-400">*</span>
          </label>
          <input
            id="b2b-name"
            type="text"
            name="contact_name"
            required
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="b2b-email" className="block text-slate-300 font-semibold mb-1">
            Work Email Address <span className="text-emerald-400">*</span>
          </label>
          <input
            id="b2b-email"
            type="email"
            name="email"
            required
            placeholder="purchasing@company.com.au"
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="b2b-phone" className="block text-slate-300 font-semibold mb-1">
            Phone / WhatsApp <span className="text-emerald-400">*</span>
          </label>
          <input
            id="b2b-phone"
            type="tel"
            name="phone"
            required
            placeholder="+61 400 123 456"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="b2b-volume" className="block text-slate-300 font-semibold mb-1">
            Anticipated Monthly Volume
          </label>
          <select
            id="b2b-volume"
            name="volume"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-slate-100 text-sm transition-colors"
          >
            <option value="$500-$2,000">$500 – $2,000 AUD / month (Tier 1)</option>
            <option value="$2,000-$10,000">$2,000 – $10,000 AUD / month (Tier 2)</option>
            <option value="$10,000+">$10,000+ AUD / month (Tier 3)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="b2b-notes" className="block text-slate-300 font-semibold mb-1">
          Store Locations & Specific Product Needs
        </label>
        <textarea
          id="b2b-notes"
          name="notes"
          rows={3}
          placeholder="Tell us about your retail setup and specific product categories of interest (e.g., Uwell pods, 0mg disposables)..."
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
            <span>Submitting Wholesale Application...</span>
          </>
        ) : (
          <>
            <Building2 className="w-4 h-4" />
            <span>Submit B2B Wholesale Application</span>
          </>
        )}
      </button>
    </form>
  );
}
