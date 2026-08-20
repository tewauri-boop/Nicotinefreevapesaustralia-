// src/components/ChatHub.tsx
'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, Mail, Phone } from 'lucide-react';
import { CHAT, SITE } from '@/config/site';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Customer Support Hub" className="fixed bottom-6 right-6 z-40">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
          <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {SITE.name} Support
              </h3>
              <p className="text-[11px] text-emerald-300/80">Sydney Concierge Desk</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-200"
              aria-label="Close support menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-2.5">
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Need assistance with 0mg zero-nicotine pods, Uwell compatibility, or EFT/Crypto payment? Connect instantly:
            </p>

            {CHAT.channels.map((channel, idx) => {
              let Icon = MessageSquare;
              if (channel.type === 'whatsapp' || channel.type === 'telegram') Icon = Send;
              if (channel.type === 'email') Icon = Mail;
              if (channel.type === 'phone') Icon = Phone;

              return (
                <a
                  key={idx}
                  href={channel.href}
                  target={channel.type !== 'email' && channel.type !== 'phone' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/30 transition-all text-xs font-medium text-slate-200 hover:text-emerald-400"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-100">{channel.label}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {channel.value.replace('&#64;', '@')}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            Response time: Under 15 mins (AEST 8am - 10pm)
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        aria-label={isOpen ? 'Close support hub' : 'Open live support options'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </aside>
  );
}
