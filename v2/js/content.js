/**
 * WEDDING INVITATION CONFIGURATION & CONTENT (v2)
 * Sakib Hassan Prangon & Easha Mahmud Bhabna
 * ===============================================
 * Complete single EN/BN translation dictionary and event configuration.
 */

export const weddingConfig = {
  // Couple Information
  groom: {
    name: {
      en: "Sakib Hassan Prangon",
      bn: "সাকিব হাসান প্রাঙ্গন",
    },
    shortName: {
      en: "Sakib",
      bn: "সাকিব",
    },
    initial: "S",
    title: {
      en: "Groom",
      bn: "বর",
    },
    parents: {
      en: "Md Mamtaz Hassan & Shamima Hassan (Pakhi)",
      bn: "মোঃ মমতাজ হাসান ও শামীমা হাসান (পাখি)",
    },
    hometown: {
      en: "Khulna, Bangladesh",
      bn: "খুলনা, বাংলাদেশ",
    }
  },

  bride: {
    name: {
      en: "Easha Mahmud Bhabna",
      bn: "এশা মাহমুদ ভাবনা",
    },
    shortName: {
      en: "Easha",
      bn: "ভাবনা",
    },
    initial: "E",
    title: {
      en: "Bride",
      bn: "কনে",
    },
    parents: {
      en: "Saifuddin Mahmud & Shahana Jahan",
      bn: "সাইফুদ্দিন মাহমুদ ও শাহানা জাহান",
    },
    hometown: {
      en: "Khulna, Bangladesh",
      bn: "খুলনা, বাংলাদেশ",
    }
  },

  timezone: "Asia/Dhaka", // UTC+6
  hashtag: "#SakibWedsEasha2026",
  rsvpWhatsAppNumber: "8801791164440",

  contactPersons: [
    {
      name: {
        en: "Shamima Hassan (Groom's Mother)",
        bn: "শামীমা হাসান (বরের মা)",
      },
      phone: "+8801721193070",
      relation: {
        en: "Groom's Mother",
        bn: "বরের মা",
      }
    }
  ],

  venue: {
    name: {
      en: "Family Residence / Venue",
      bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
    },
    address: {
      en: "Khulna, Bangladesh",
      bn: "খুলনা, বাংলাদেশ",
    },
    coordinates: {
      lat: 22.808816992132105,
      lng: 89.54705054834844,
    },
    mapEmbedUrl: "https://maps.google.com/maps?q=22.808816992132105,89.54705054834844&hl=en&z=16&output=embed",
    mapDirectUrl: "https://www.google.com/maps/search/?api=1&query=22.808816992132105,89.54705054834844",
  },

  audio: {
    src: "./assets/audio/bg.mp3",
    fallbackSrc: "/audio/bg.mp3",
    title: {
      en: "Wedding Instrumental Theme",
      bn: "বিবাহের সানাই ও সুর",
    }
  },

  // Events configuration (Keys: h = holud, w = wedding, r = reception)
  events: [
    {
      id: "holud",
      letter: "h",
      title: {
        en: "Gaye Holud",
        bn: "গায়ে হলুদ",
      },
      subtitle: {
        en: "An evening of turmeric, marigolds, and laughter",
        bn: "হলুদ, ভালোবাসা আর অফুরন্ত আনন্দের এক সন্ধ্যা",
      },
      date: "2026-12-23",
      dayNumber: "23",
      monthName: {
        en: "December",
        bn: "ডিসেম্বর",
      },
      yearNumber: "2026",
      dateDisplay: {
        en: "Wednesday, 23 December 2026",
        bn: "বুধবার, ২৩ ডিসেম্বর ২০২৬",
      },
      timeDisplay: {
        en: "After Maghrib (approx. 6:30 PM)",
        bn: "মাগরিবের পর (আনুমানিক সন্ধ্যা ৬:৩০)",
      },
      icsStartTime: "2026-12-23T18:30:00+06:00",
      icsEndTime: "2026-12-23T22:30:00+06:00",
      venueName: {
        en: "Family Residence / Venue",
        bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      dressCodeNote: {
        en: "Traditional yellow, mustard, or marigold festive shades warmly welcomed.",
        bn: "হলুদ, বাসন্তী কিংবা গাঁদা ফুলের রঙের ঐতিহ্যবাহী পোশাক সাদরে কাম্য।",
      },
      accentColor: "#F4A300",
      icon: "sparkles",
    },
    {
      id: "wedding",
      letter: "w",
      title: {
        en: "The Wedding Ceremony",
        bn: "শুভ বিবাহ",
      },
      subtitle: {
        en: "The solemn union and knot of eternal togetherness",
        bn: "দুইটি হৃদয়ের এক পবিত্র বন্ধনে আবদ্ধ হওয়ার মুহূর্ত",
      },
      date: "2026-12-25",
      dayNumber: "25",
      monthName: {
        en: "December",
        bn: "ডিসেম্বর",
      },
      yearNumber: "2026",
      dateDisplay: {
        en: "Friday, 25 December 2026",
        bn: "শুক্রবার, ২৫ ডিসেম্বর ২০২৬",
      },
      timeDisplay: {
        en: "2:00 PM (After Jumu'ah)",
        bn: "দুপুর ২:০০ (জুম্মার পর)",
      },
      icsStartTime: "2026-12-25T14:00:00+06:00",
      icsEndTime: "2026-12-25T18:00:00+06:00",
      venueName: {
        en: "Family Residence / Venue",
        bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      dressCodeNote: {
        en: "Traditional formal or elegant celebratory attire.",
        bn: "মার্জিত ও আভিজাত্যপূর্ণ দেশীয় বা আনুষ্ঠানিক পোশাক।",
      },
      accentColor: "#7A1F2B",
      icon: "heart",
    },
    {
      id: "reception",
      letter: "r",
      title: {
        en: "Reception & Walima",
        bn: "বউভাত ও ওয়ালিমা",
      },
      subtitle: {
        en: "Feast of blessings, gratitude, and joyous union",
        bn: "কৃতজ্ঞতা, দোয়া ও আনন্দ উৎসবের প্রীতিভোজ",
      },
      date: "2026-12-27",
      dayNumber: "27",
      monthName: {
        en: "December",
        bn: "ডিসেম্বর",
      },
      yearNumber: "2026",
      dateDisplay: {
        en: "Sunday, 27 December 2026",
        bn: "রবিবার, ২৭ ডিসেম্বর ২০২৬",
      },
      timeDisplay: {
        en: "2:00 PM",
        bn: "দুপুর ২:০০",
      },
      icsStartTime: "2026-12-27T14:00:00+06:00",
      icsEndTime: "2026-12-27T18:00:00+06:00",
      venueName: {
        en: "Family Residence / Venue",
        bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      dressCodeNote: {
        en: "Elegant semi-formal or traditional festive attire.",
        bn: "সুন্দর ও মার্জিত সেমি-ফরমাল বা ঐতিহ্যবাহী পোশাক।",
      },
      accentColor: "#C9A24B",
      icon: "crown",
    }
  ],

  // Complete Single EN/BN Translation Dictionary
  translations: {
    // Top Controls
    langEn: { en: "English", bn: "English" },
    langBn: { en: "বাংলা", bn: "বাংলা" },
    musicPlay: { en: "Play Music", bn: "গান চালু করুন" },
    musicMute: { en: "Mute Music", bn: "গান বন্ধ করুন" },

    // Wax Seal & Envelope
    envelopeHint: {
      en: "Tap wax seal to open invitation",
      bn: "আমন্ত্রণপত্রটি খুলতে সিলমোহরে স্পর্শ করুন",
    },
    envelopeSubhint: {
      en: "Tap or swipe to open",
      bn: "স্পর্শ করুন বা সোয়াইপ করুন",
    },
    waxSealText: {
      en: "ROYAL WEDDING",
      bn: "শুভ বিবাহ",
    },

    // Hero Section
    bismillah: {
      en: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      bn: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    heroTag: {
      en: "Welcome to the Wedding Celebration of",
      bn: "শুভ বিবাহ ও শুভ পরিণয়",
    },
    heroSubtitle: {
      en: "Two souls destined to unite in love and grace",
      bn: "দুইটি হৃদয়ের এক পবিত্র মেলবন্ধন ও শুভ যাত্রা",
    },
    guestBadgePrefix: {
      en: "Specially Invited:",
      bn: "সম্মানিত অতিথি:",
    },
    scrollCue: {
      en: "Scroll down",
      bn: "নিচে স্ক্রল করুন",
    },

    // Date & Scratch Card
    theDateHeading: {
      en: "The Date",
      bn: "শুভ তারিখ",
    },
    scratchInstruction: {
      en: "✦ Scratch to reveal the date ✦",
      bn: "✦ তারিখ দেখতে কার্ডটি ঘষুন ✦",
    },
    scratchAllBtn: {
      en: "Reveal Date",
      bn: "তারিখ দেখুন",
    },
    labelDay: {
      en: "DAY",
      bn: "দিন",
    },
    labelMonth: {
      en: "MONTH",
      bn: "মাস",
    },
    labelYear: {
      en: "YEAR",
      bn: "সাল",
    },

    // Formal Invitation Section
    invitationHeading: {
      en: "YOU ARE CORDIALLY INVITED TO THE WEDDING OF",
      bn: "আমাদের শুভ বিবাহ অনুষ্ঠানে আপনাকে সাদর আমন্ত্রণ",
    },
    sonOf: {
      en: "SON OF",
      bn: "বরের পিতা-মাতা",
    },
    daughterOf: {
      en: "DAUGHTER OF",
      bn: "কনের পিতা-মাতা",
    },
    quranVerseArabic: {
      en: "هُوَ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَجَعَلَ مِنْهَا زَوْجَهَا لِيَسْكُنَ إِلَيْهَا",
      bn: "هُوَ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَجَعَلَ مِنْهَا زَوْجَهَا لِيَسْكُنَ إِلَيْهَا",
    },
    quranVerseText: {
      en: "“It is He who created you from one soul and created from it its mate that he might dwell in security with her.” (Surah Al-A'raf 7:189)",
      bn: "“তিনিই সেই সত্তা যিনি তোমাদের এক সত্তা হতে সৃষ্টি করেছেন এবং তা থেকে সৃষ্টি করেছেন তার সঙ্গিনীকে, যেন সে তার সান্নিধ্যে প্রশান্তি পায়।” (সূরা আল-আ'রাফ ৭:১৮৯)",
    },
    invitationLetterSalutation: {
      en: "Dear Beloved Friends & Family,",
      bn: "সম্মানিত সুধী ও প্রিয়জন,",
    },
    invitationLetterBody: {
      en: "With immense gratitude to Allah and joyous hearts, our families cordially invite you to celebrate our union. Your gracious presence, blessings, and sincere duas will make our milestone truly memorable.",
      bn: "আল্লাহর অশেষ রহমতে ও পারিবারিক আনন্দের সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের বিয়েতে আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও প্রাণখোলা দোয়া আমাদের আগামী দিনগুলোকে আলোকিত করে রাখবে।",
    },
    invitationClosing: {
      en: "With love, respect & prayers",
      bn: "আন্তরিক শ্রদ্ধা ও দোয়াপ্রার্থী",
    },

    // Timeline Section
    timelineHeading: {
      en: "Wedding Itinerary",
      bn: "অনুষ্ঠানসূচি",
    },
    timelineSubheading: {
      en: "Please join us for each sacred ceremony",
      bn: "প্রতিটি পর্বে আপনার উপস্থিতি আমাদের ধন্য করবে",
    },
    addToCalendarBtn: {
      en: "Add to Calendar (.ics)",
      bn: "ক্যালেন্ডারে যোগ করুন",
    },

    // Countdown Section
    countdownHeading: {
      en: "The Celebration Begins",
      bn: "শুভ ক্ষণের ক্ষণগণনা",
    },
    countdownTargetPrefix: {
      en: "Counting down to",
      bn: "বাকি আর মাত্র:",
    },
    daysLabel: {
      en: "Days",
      bn: "দিন",
    },
    hoursLabel: {
      en: "Hours",
      bn: "ঘণ্টা",
    },
    minutesLabel: {
      en: "Minutes",
      bn: "মিনিট",
    },
    secondsLabel: {
      en: "Seconds",
      bn: "সেকেন্ড",
    },
    marriedStateHeading: {
      en: "Alhamdulillah, We Are Married!",
      bn: "আলহামদুলিল্লাহ্‌, আমরা বিবাহবন্ধনে আবদ্ধ!",
    },
    marriedStateSubtext: {
      en: "Thank you for showering us with your prayers and blessings.",
      bn: "আমাদের নতুন জীবনের শুরুতে পাশে থাকা ও দোয়ার জন্য আন্তরিক ধন্যবাদ।",
    },

    // Venue & Location Section
    locationHeading: {
      en: "Location",
      bn: "অনুষ্ঠানস্থল",
    },
    locationSubheading: {
      en: "Khulna, Bangladesh",
      bn: "খুলনা, বাংলাদেশ",
    },
    openInMapsBtn: {
      en: "Open in Google Maps ↗",
      bn: "গুগল ম্যাপে দিকনির্দেশনা ↗",
    },
    needAssistanceHeading: {
      en: "For Directions & Guest Assistance",
      bn: "যাতায়াত ও অবস্থান সহায়তায়",
    },
    callBtn: {
      en: "Call for Assistance",
      bn: "সরাসরি কল করুন",
    },

    // Dress Code Section
    dressCodeHeading: {
      en: "Dress Code",
      bn: "পোশাকের নির্দেশিকা",
    },
    dressCodeIntro: {
      en: "We kindly invite our guests to dress in Traditional Bangladeshi formal attire in elegant festive shades.",
      bn: "অনুষ্ঠানের নান্দনিকতা বাড়াতে সম্মানিত অতিথিদের ঐতিহ্যবাহী ও মার্জিত উৎসবমুখর পোশাকে আসার সাদর অনুরোধ জানানো হচ্ছে।",
    },
    recommendedShades: {
      en: "Recommended Shades",
      bn: "পছন্দনীয় রঙের শেড",
    },
    dressCodeNoteGroomBride: {
      en: "Please avoid wearing deep maroon or pure bridal gold — reserved for the bride and groom.",
      bn: "গাঢ় মেরুন বা জমকালো ব্রাইডাল গোল্ড পরিহারের অনুরোধ রইল — যা বর ও কনের জন্য নির্ধারিত।",
    },

    // RSVP Section
    rsvpHeading: {
      en: "RSVP & Confirmation",
      bn: "উপস্থিতি নিশ্চিতকরণ (RSVP)",
    },
    rsvpSubheading: {
      en: "To help us make the most hospitable arrangements, kindly confirm your attendance before 20th December 2026.",
      bn: "অতিথিদের সুব্যবস্থাপনা ও সমাদরের সুবিধার্থে অনুগ্রহ করে ২০ ডিসেম্বর ২০২৬ এর পূর্বে উপস্থিতি নিশ্চিত করুন।",
    },
    nameFieldLabel: {
      en: "Your Full Name",
      bn: "আপনার নাম",
    },
    nameFieldPlaceholder: {
      en: "Enter your full name",
      bn: "আপনার পূর্ণ নাম লিখুন",
    },
    eventsSelectionLabel: {
      en: "Ceremonies & Attending Guests",
      bn: "অনুষ্ঠান ও উপস্থিতির সংখ্যা",
    },
    maxAllottedNotice: {
      en: "Max invitation limit:",
      bn: "সর্বোচ্চ বরাদ্দকৃত সংখ্যা:",
    },
    attendingLabel: {
      en: "Attending",
      bn: "উপস্থিত থাকব",
    },
    declinedLabel: {
      en: "Unable to attend",
      bn: "উপস্থিত হতে পারছি না",
    },
    guestsCountLabel: {
      en: "Guests attending:",
      bn: "উপস্থিত অতিথির সংখ্যা:",
    },
    confirmWhatsAppBtn: {
      en: "Confirm on WhatsApp",
      bn: "হোয়াটসঅ্যাপে নিশ্চিত করুন",
    },
    whatsAppHelpText: {
      en: "Tapping will open WhatsApp with your formatted RSVP details ready to send.",
      bn: "বোতামে চাপ দিলে আপনার উপস্থিতি তথ্যসহ হোয়াটসঅ্যাপে বার্তা প্রস্তুত হবে।",
    },

    // Footer
    footerGratitude: {
      en: "With heartfelt gratitude from the families of Sakib Hassan Prangon & Easha Mahmud Bhabna.",
      bn: "সাকিব হাসান প্রাঙ্গন ও এশা মাহমুদ ভাবনা এর পরিবারের পক্ষ থেকে অন্তরের গভীর কৃতজ্ঞতা ও ভালোবাসা।",
    },
    footerReplay: {
      en: "Replay Envelope Opening ↺",
      bn: "আমন্ত্রণপত্র পুনরায় খুলুন ↺",
    },
    backToTop: {
      en: "Back to Top ↑",
      bn: "উপরে ফিরে যান ↑",
    }
  }
};

/**
 * Converts Western digits (0-9) to Bengali digits (০-৯)
 * @param {number|string} input 
 * @returns {string}
 */
export function toBengaliNumerals(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}
