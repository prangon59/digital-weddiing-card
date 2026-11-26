import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Users, ChevronUp, ChevronDown, Check, ExternalLink } from 'lucide-react';

export default function TestGuestDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { guest, lang } = useWedding();

  const presets = [
    {
      id: 'all',
      labelEn: 'All 3 Events',
      labelBn: 'সবগুলো অনুষ্ঠান (হলুদ, বিয়ে, বউভাত)',
      query: '?n=Rahim%20%26%20Family&b=রহিম%20ও%20পরিবার&e=hwr&c=4',
      badge: 'H + W + R (4 Guests)',
    },
    {
      id: 'holud-rec',
      labelEn: 'Holud + Reception',
      labelBn: 'হলুদ ও বউভাত (বিয়ে ব্যতীত)',
      query: '?n=Karim%20Uncle&b=করিম%20আঙ্কেল&e=hr&c=2',
      badge: 'H + R (2 Guests)',
    },
    {
      id: 'reception-only',
      labelEn: 'Reception Only',
      labelBn: 'শুধু বউভাত ও ওয়ালিমা',
      query: '?n=Colleague%20Tanvir&b=সহকর্মী%20তানভীর&e=r&c=1',
      badge: 'R Only (1 Guest)',
    },
    {
      id: 'default',
      labelEn: 'Generic Guest (No query params)',
      labelBn: 'সাধারণ অতিথি (কোনো লিংক প্যারামিটার ছাড়া)',
      query: '',
      badge: 'Default / General',
    }
  ];

  const handleSelectPreset = (query) => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    window.location.href = `${origin}${pathname}${query}`;
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 pb-safe">
      {/* Drawer Container */}
      <div className="bg-[#1A050B]/90 backdrop-blur-md rounded-2xl border border-gold/40 shadow-3d-card overflow-hidden transition-all duration-300 max-w-xs">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-3 w-full px-3.5 py-2.5 text-xs font-bold text-gold-300 hover:text-gold hover:bg-gold/10 transition-colors min-h-[44px]"
          aria-label="Toggle test as guest options"
        >
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span className="font-banglaHeading">{lang === 'bn' ? 'গেস্ট টেস্ট কন্ট্রোল' : 'Test as Guest'}</span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-gold-400" /> : <ChevronUp className="w-4 h-4 text-gold-400" />}
        </button>

        {/* Collapsible Presets List */}
        {isOpen && (
          <div className="p-3 border-t border-gold/20 space-y-2 text-left bg-[#150308]/95">
            <p className="text-[10px] text-cream-200/70 font-mono uppercase tracking-wider">
              Active: {guest.isPersonalized ? `${guest.nameBn} [${guest.invitedEventLetters.join('')}]` : 'Default (All Events)'}
            </p>

            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.query)}
                className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-maroon-dark/80 to-[#2A0912]/80 hover:from-gold/20 hover:to-maroon border border-gold/25 transition-all text-xs active:scale-95 min-h-[44px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cream-100 font-banglaHeading text-[13px]">
                    {lang === 'bn' ? preset.labelBn : preset.labelEn}
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-gold/20 text-gold-300 border border-gold/30 px-1.5 py-0.5 rounded">
                    {preset.badge}
                  </span>
                </div>
              </button>
            ))}

            <div className="pt-2 border-t border-gold/20 text-center">
              <a
                href="/#/invite-maker"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-300 hover:text-gold transition-colors py-1"
              >
                <span>{lang === 'bn' ? 'আমন্ত্রণপত্র জেনারেটরে যান →' : 'Go to Invite Maker →'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
