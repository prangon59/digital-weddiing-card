import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../data/content';
import { 
  Send, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  UserPlus, 
  Trash2, 
  Download, 
  Lock, 
  Unlock, 
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Eye
} from 'lucide-react';

export default function InviteMaker() {
  const { inviteMaker, events } = weddingConfig;
  
  // Passcode protection
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('invite_maker_auth') === 'true';
    }
    return false;
  });
  const [passcodeError, setPasscodeError] = useState(false);

  // Form Fields
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [selectedLetters, setSelectedLetters] = useState(['h', 'w', 'r']);
  const [maxGuests, setMaxGuests] = useState(weddingConfig.inviteMaker.defaultMaxGuests || 2);
  const [phone, setPhone] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [exportFeedback, setExportFeedback] = useState(false);

  // Recent Invites (stored in localStorage, max 30)
  const [recentInvites, setRecentInvites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('wedding_recent_invites');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const saveRecentInvites = (list) => {
    setRecentInvites(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_recent_invites', JSON.stringify(list));
    }
  };

  // Passcode submit
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === inviteMaker.passcode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('invite_maker_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // Event chips toggle
  const toggleEventLetter = (letter) => {
    if (selectedLetters.includes(letter)) {
      if (selectedLetters.length > 1) {
        setSelectedLetters(selectedLetters.filter(l => l !== letter));
      }
    } else {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  // Preset shortcuts
  const applyPreset = (letters) => {
    setSelectedLetters(letters);
  };

  // Generate Guest URL
  const generateInviteUrl = (n = nameEn, b = nameBn, e = selectedLetters, c = maxGuests) => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/$/, '');
    const params = new URLSearchParams();

    if (n.trim()) params.set('n', n.trim().slice(0, 60));
    if (b.trim()) params.set('b', b.trim().slice(0, 60));

    // Sort letters for consistency
    const sortedLetters = [...e].sort().join('');
    if (sortedLetters && sortedLetters !== 'hrw') {
      params.set('e', sortedLetters);
    }

    if (c && c > 1) {
      params.set('c', String(c));
    }

    const queryString = params.toString();
    return `${origin}${pathname}/${queryString ? `?${queryString}` : ''}`;
  };

  const currentInviteUrl = generateInviteUrl();

  // Generate WhatsApp Message
  const generateWhatsAppMessage = (n = nameEn, b = nameBn, link = currentInviteUrl) => {
    const greetingName = (b.trim() && n.trim()) ? `${b.trim()} / ${n.trim()}` : (b.trim() || n.trim() || 'সম্মানিত অতিথি');
    let template = inviteMaker.messageTemplate.bn;
    // Replace placeholder
    return template.replace('{name}', greetingName).replace('{link}', link);
  };

  const currentWhatsAppMessage = generateWhatsAppMessage();

  // Record this invite to Recent Invites
  const recordInvite = () => {
    const primaryName = nameBn.trim() || nameEn.trim() || 'Unnamed Guest';
    const newEntry = {
      id: Date.now().toString(),
      nameEn: nameEn.trim(),
      nameBn: nameBn.trim(),
      primaryName,
      events: selectedLetters,
      maxGuests,
      phone: phone.trim(),
      url: currentInviteUrl,
      message: currentWhatsAppMessage,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: false,
    };

    const updated = [newEntry, ...recentInvites.filter(item => item.url !== currentInviteUrl)].slice(0, 30);
    saveRecentInvites(updated);
    return newEntry;
  };

  // Actions
  const handleSendWhatsApp = () => {
    recordInvite();
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('01')) {
      cleanPhone = '880' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('+880')) {
      cleanPhone = cleanPhone.slice(1);
    }

    const encodedText = encodeURIComponent(currentWhatsAppMessage);
    const targetUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
    window.open(targetUrl, '_blank');
  };

  const handleShare = async () => {
    recordInvite();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sakib ❤ Easha Wedding Invitation',
          text: currentWhatsAppMessage,
          url: currentInviteUrl,
        });
      } catch {
        // User canceled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    recordInvite();
    navigator.clipboard.writeText(currentInviteUrl).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const handleReset = () => {
    setNameEn('');
    setNameBn('');
    setSelectedLetters(['h', 'w', 'r']);
    setMaxGuests(2);
    setPhone('');
  };

  const toggleSentStatus = (id) => {
    const updated = recentInvites.map(item =>
      item.id === id ? { ...item, isSent: !item.isSent } : item
    );
    saveRecentInvites(updated);
  };

  const deleteRecentInvite = (id) => {
    const updated = recentInvites.filter(item => item.id !== id);
    saveRecentInvites(updated);
  };

  const handleExportList = () => {
    if (recentInvites.length === 0) return;
    const textContent = recentInvites.map((item, idx) => {
      return `${idx + 1}. ${item.primaryName} | Events: [${item.events.join(', ')}] | Max: ${item.maxGuests} | Sent: ${item.isSent ? 'YES' : 'NO'}\nLink: ${item.url}\n`;
    }).join('\n');

    navigator.clipboard.writeText(textContent).then(() => {
      setExportFeedback(true);
      setTimeout(() => setExportFeedback(false), 2000);
    });
  };

  // If locked, show Passcode Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border-2 border-gold/40 shadow-card-warm text-center">
          <div className="w-12 h-12 rounded-full bg-cream-200 text-maroon flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-banglaHeading text-xl font-bold text-maroon mb-1">
            আমন্ত্রণপত্র জেনারেটর
          </h1>
          <p className="text-xs text-ink-muted mb-6">
            Private Wedding Invite Maker (Enter Passcode)
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode (default: change-me)"
              className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-gold/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon text-center font-mono min-h-[48px]"
              autoFocus
            />

            {passcodeError && (
              <p className="text-xs text-rose-600 font-medium">
                ভুল পাসকোড! অনুগ্রহ করে আবার চেষ্টা করুন।
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-maroon text-cream-100 text-sm font-bold shadow-md hover:bg-maroon-600 active:scale-95 transition-all min-h-[48px]"
            >
              আনলক করুন / Unlock
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-maroon transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>মূল সাইটে ফিরে যান / Back to Website</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] py-8 px-4 pb-safe">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cream-200 text-maroon text-xs font-bold hover:bg-cream-300 transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল আমন্ত্রণপত্র / View Site</span>
          </a>

          <div className="text-right">
            <span className="text-[11px] font-mono uppercase bg-marigold/20 text-maroon font-bold px-2.5 py-1 rounded-full">
              Invite Maker • 10s Mode
            </span>
          </div>
        </div>

        {/* Generator Form Card */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-gold/40 shadow-card-warm space-y-6">
          <div className="text-center">
            <h1 className="font-banglaHeading text-2xl font-bold text-maroon">
              ব্যক্তিগত আমন্ত্রণ লিংক তৈরি করুন
            </h1>
            <p className="text-xs text-ink-muted mt-1">
              Create personalized invitation link &amp; WhatsApp message in 10 seconds
            </p>
          </div>

          {/* 1 & 2: Names in Bengali and English */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-bn-input" className="block text-xs font-bold text-maroon mb-1.5">
                অতিথির নাম (বাংলায়)
              </label>
              <input
                id="name-bn-input"
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="যেমন: রহিম ও পরিবার"
                maxLength={60}
                className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-gold/40 text-sm font-banglaBody focus:outline-none focus:ring-2 focus:ring-maroon min-h-[48px]"
              />
            </div>

            <div>
              <label htmlFor="name-en-input" className="block text-xs font-bold text-maroon mb-1.5">
                Guest Name (English)
              </label>
              <input
                id="name-en-input"
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Rahim &amp; Family"
                maxLength={60}
                className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-gold/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon min-h-[48px]"
              />
            </div>
          </div>

          {/* 3: Event Selection Chips & Shortcuts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-maroon">
                আমন্ত্রিত অনুষ্ঠানসমূহ / Invited Events:
              </label>
            </div>

            {/* Shortcut Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                type="button"
                onClick={() => applyPreset(['h', 'w', 'r'])}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-maroon border border-gold/30 active:scale-95 transition-all min-h-[36px]"
              >
                All three (সবগুলো)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(['h', 'r'])}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-maroon border border-gold/30 active:scale-95 transition-all min-h-[36px]"
              >
                Holud + Reception (হলুদ ও বউভাত)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(['r'])}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-maroon border border-gold/30 active:scale-95 transition-all min-h-[36px]"
              >
                Reception only (বউভাত)
              </button>
            </div>

            {/* Big Toggle Chips */}
            <div className="grid grid-cols-3 gap-2.5">
              {events.map((ev) => {
                const isSelected = selectedLetters.includes(ev.letter);
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => toggleEventLetter(ev.letter)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 min-h-[58px] ${
                      isSelected
                        ? 'bg-maroon text-cream-100 border-maroon shadow-sm font-bold'
                        : 'bg-white text-ink-muted border-gray-200 hover:border-gold/40'
                    }`}
                  >
                    <span className="text-xs">{ev.title.bn}</span>
                    <span className="text-[10px] opacity-80 uppercase mt-0.5 font-mono">
                      {ev.letter} ({ev.title.en})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 & 5: Max Guests Stepper & Optional Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Max Guests */}
            <div>
              <label className="block text-xs font-bold text-maroon mb-1.5">
                সর্বোচ্চ অতিথি সংখ্যা / Max Guests:
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMaxGuests(prev => Math.max(1, prev - 1))}
                  disabled={maxGuests <= 1}
                  className="w-12 h-12 rounded-2xl bg-cream-200 border border-gold/30 text-maroon font-bold text-lg disabled:opacity-40 active:scale-95"
                >
                  -
                </button>
                <div className="flex-1 py-3 bg-cream-50 rounded-2xl border border-gold/40 text-center font-bold text-maroon text-base">
                  {maxGuests}
                </div>
                <button
                  type="button"
                  onClick={() => setMaxGuests(prev => Math.min(20, prev + 1))}
                  disabled={maxGuests >= 20}
                  className="w-12 h-12 rounded-2xl bg-cream-200 border border-gold/30 text-maroon font-bold text-lg disabled:opacity-40 active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Optional WhatsApp Phone */}
            <div>
              <label htmlFor="phone-input" className="block text-xs font-bold text-maroon mb-1.5">
                হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক / Optional)
              </label>
              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+88017xxxxxxxx"
                className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-gold/40 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-maroon min-h-[48px]"
              />
              <p className="text-[10px] text-ink-soft mt-1">
                নম্বরটি শুধু পাঠানোর জন্য ব্যবহৃত হবে, লিংকে থাকবে না।
              </p>
            </div>
          </div>

          {/* 6: Live Preview Box */}
          <div className="p-4 rounded-2xl bg-cream-100/80 border border-gold/40 space-y-3">
            <div>
              <span className="text-[11px] font-bold text-maroon uppercase tracking-wider block mb-1">
                লাইভ লিংক প্রিভিউ / Live Link:
              </span>
              <p className="text-xs font-mono text-ink-muted break-all bg-white p-2.5 rounded-xl border border-gold/20 select-all">
                {currentInviteUrl}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-maroon uppercase tracking-wider block mb-1">
                হোয়াটসঅ্যাপ বার্তা / WhatsApp Message Preview:
              </span>
              <div className="text-xs font-banglaBody text-ink bg-white p-3 rounded-xl border border-gold/20 leading-relaxed whitespace-pre-wrap">
                {currentWhatsAppMessage}
              </div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {/* WhatsApp Send */}
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            {/* Share API */}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-maroon hover:bg-maroon-600 text-cream-100 text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all min-h-[48px]"
            >
              <Share2 className="w-4 h-4 text-marigold" />
              <span>Share</span>
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-maroon text-xs sm:text-sm font-bold border border-gold/40 active:scale-95 transition-all min-h-[48px]"
            >
              {copyFeedback ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span>{copyFeedback ? 'Copied!' : 'Copy Link'}</span>
            </button>

            {/* Open Preview in New Tab */}
            <a
              href={currentInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl bg-white hover:bg-cream-100 text-ink text-xs sm:text-sm font-bold border border-gray-300 active:scale-95 transition-all min-h-[48px]"
            >
              <Eye className="w-4 h-4 text-marigold" />
              <span>Preview</span>
            </a>
          </div>

          {/* Reset for next guest */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-maroon font-medium py-1 px-3 rounded-full hover:bg-cream-200 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>নতুন মেহমান / New Guest Form</span>
            </button>
          </div>
        </div>

        {/* Recent Generated Invites (Last 30) */}
        <div className="bg-white/95 rounded-3xl p-6 border-2 border-gold/40 shadow-card-warm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-banglaHeading text-lg font-bold text-maroon">
                তৈরিকৃত সাম্প্রতিক লিংকসমূহ (Recent Invites)
              </h2>
              <p className="text-xs text-ink-soft">
                Saved locally on your device ({recentInvites.length} invites)
              </p>
            </div>

            {recentInvites.length > 0 && (
              <button
                type="button"
                onClick={handleExportList}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200 hover:bg-cream-300 text-maroon text-xs font-semibold border border-gold/30 active:scale-95 transition-all min-h-[36px]"
              >
                <Download className="w-3.5 h-3.5 text-marigold" />
                <span>{exportFeedback ? 'Copied All!' : 'Export List'}</span>
              </button>
            )}
          </div>

          {recentInvites.length === 0 ? (
            <p className="text-xs text-ink-soft text-center py-6">
              এখনও কোনো লিংক তৈরি করা হয়নি। উপরের ফর্মে নাম লিখে লিংক তৈরি করুন।
            </p>
          ) : (
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {recentInvites.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-cream-50 border border-gold/30 text-xs gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSentStatus(item.id)}
                        className="text-maroon hover:text-green-600 transition-colors shrink-0"
                        title={item.isSent ? 'Mark as unsent' : 'Mark as sent'}
                        aria-label={item.isSent ? 'Mark invite as unsent' : 'Mark invite as sent'}
                      >
                        {item.isSent ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-100" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <p className={`font-bold font-banglaHeading truncate ${item.isSent ? 'line-through text-gray-400' : 'text-maroon'}`}>
                        {item.primaryName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-ink-soft">
                      <span className="uppercase font-mono font-bold text-marigold">
                        [{item.events.join(', ')}]
                      </span>
                      <span>•</span>
                      <span>Guests: {item.maxGuests}</span>
                      <span>•</span>
                      <span>{item.createdAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(item.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-500 hover:bg-green-600 text-white min-h-[36px] min-w-[36px] flex items-center justify-center transition-all"
                      title="Send on WhatsApp"
                      aria-label="Send invite on WhatsApp"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white hover:bg-cream-200 border border-gold/30 text-maroon min-h-[36px] min-w-[36px] flex items-center justify-center transition-all"
                      title="Open guest preview"
                      aria-label="Open guest invite preview in new tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => deleteRecentInvite(item.id)}
                      className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-500 min-h-[36px] min-w-[36px] flex items-center justify-center transition-all"
                      title="Delete entry"
                      aria-label="Delete recent invite entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
