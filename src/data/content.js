/**
 * WEDDING INVITATION CONFIGURATION & CONTENT FILE
 * ===============================================
 * Everything is fully editable here without modifying any React components.
 * All text supports both Bengali (bn) and English (en).
 * Timezone: Asia/Dhaka (UTC+6)
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

  // General Wedding Details
  timezone: "Asia/Dhaka", // UTC+6
  hashtag: "#SakibWedsEasha2026",

  // WhatsApp RSVP recipient (Groom's WhatsApp: 01791164440)
  rsvpWhatsAppNumber: "8801791164440",

  // Contact Persons for general queries & assistance (Mother's Number: 01721193070)
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

  // Travel Notes for Out-of-town & Far-away Guests (Khulna)
  travelNotes: {
    bus: {
      en: "Easily accessible from Sonadanga Bus Terminal, Royal Moar, Shibbari Moar, and Gollamari.",
      bn: "সোনাডাঙ্গা বাস টার্মিনাল, রয়েল মোড়, শিববাড়ি মোড় ও গল্লামারি থেকে যেকোনো বাহনে সহজে পৌঁছানো যাবে।",
    },
    railway: {
      en: "Khulna Railway Station (Rickshaws, auto-rickshaws, and easy bikes available to venue).",
      bn: "খুলনা রেলওয়ে স্টেশন (স্টেশন থেকে অনুষ্ঠানস্থলে আসার জন্য ইজিবাইক, রিকশা ও ট্যাক্সি সহজলভ্য)।",
    },
    accommodation: {
      en: "For out-of-town guests needing hotel or stay assistance in Khulna, please feel free to call our family contact directly.",
      bn: "খুলনার বাইরের মেহমানদের আবাসন সহায়তা বা যেকোনো প্রয়োজনে নিচের নম্বরে সরাসরি যোগাযোগের অনুরোধ রইল।",
    },
    stayContactPhone: "+8801721193070",
    coordinates: {
      lat: 22.808816992132105,
      lng: 89.54705054834844,
    },
    mapEmbedUrl: "https://maps.google.com/maps?q=22.808816992132105,89.54705054834844&hl=en&z=16&output=embed",
    mapDirectUrl: "https://www.google.com/maps/search/?api=1&query=22.808816992132105,89.54705054834844",
  },

  // Live Stream Details (for guests joining from overseas or far away)
  liveStream: {
    enabled: true,
    isLive: false, // Set to true when live broadcast starts
    // TODO: Add your YouTube Live or Zoom link
    url: "https://www.youtube.com/@SakibAndEashaWedding",
    badgeText: {
      en: "Live Broadcast Coming Soon",
      bn: "সরাসরি সম্প্রচার আসছে শীঘ্রই",
    },
    description: {
      en: "For our beloved family and friends unable to be present physically, join our celebration online from anywhere in the world.",
      bn: "দূর-দূরান্তে অবস্থানরত সকল প্রিয়জনের জন্য আমাদের এই শুভ মুহূর্তের আনন্দ ভাগ করে নিতে সরাসরি সম্প্রচারের ব্যবস্থা রাখা হয়েছে।",
    }
  },

  // Built-in Invite Generator Settings
  inviteMaker: {
    path: "/#/invite-maker", // Hash route for instant static hosting on Netlify
    passcode: "change-me", // TODO: Change this simple passcode for your private use
    defaultMaxGuests: 2,
    // Template used when clicking 'Send on WhatsApp' or 'Share'
    messageTemplate: {
      en: "Assalamu Alaikum / Dear {name}, we joyfully invite you and your family to celebrate our wedding ceremonies! Your personalized wedding invitation card: {link}",
      bn: "আস্সালামু আলাইকুম / প্রিয় {name}, আমাদের বিয়েতে আপনাকে ও আপনার পরিবারকে সাদর আমন্ত্রণ। আপনার জন্য বিশেষ ডিজিটাল আমন্ত্রণপত্র: {link}",
    }
  },

  // Background Audio
  audio: {
    src: "/audio/bg.mp3",
    title: {
      en: "Wedding Instrumental Theme",
      bn: "বিবাহের সানাই ও সুর",
    }
  },

  // Events List
  // Keys: 'h' = holud, 'w' = wedding, 'r' = reception
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
      date: "2026-12-23", // YYYY-MM-DD
      dateDisplay: {
        en: "Wednesday, 23 December 2026",
        bn: "বুধবার, ২৩ ডিসেম্বর ২০২৬",
      },
      timeDisplay: {
        en: "After Maghrib (approx. 6:30 PM)",
        bn: "মাগরিবের পর (আনুমানিক সন্ধ্যা ৬:৩০)",
      },
      // icsStartTime: ISO representation for calendar download (Asia/Dhaka UTC+6 = 18:30)
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
      isVenueTBA: false,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=22.808816992132105,89.54705054834844",
      dressCodeNote: {
        en: "Traditional yellow, mustard, or festive shades warmly welcomed.",
        bn: "হলুদ, বাসন্তী কিংবা গাঁদা ফুলের রঙের ঐতিহ্যবাহী পোশাক সাদরে কাম্য।",
      },
      accentColor: "#F4A300",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "Sparkles",
    },
    {
      id: "wedding",
      letter: "w",
      title: {
        en: "The Wedding",
        bn: "শুভ বিবাহ",
      },
      subtitle: {
        en: "The solemn union and knot of eternal togetherness",
        bn: "দুইটি হৃদয়ের এক পবিত্র বন্ধনে আবদ্ধ হওয়ার মুহূর্ত",
      },
      date: "2026-12-25",
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
      isVenueTBA: false,
      venueName: {
        en: "Family Residence / Venue",
        bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      mapUrl: "https://www.google.com/maps/search/?api=1&query=22.808816992132105,89.54705054834844",
      dressCodeNote: {
        en: "Traditional formal or elegant celebratory attire.",
        bn: "মার্জিত ও আভিজাত্যপূর্ণ দেশীয় বা আনুষ্ঠানিক পোশাক।",
      },
      accentColor: "#7A1F2B",
      badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
      icon: "Heart",
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
      isVenueTBA: false,
      venueName: {
        en: "Family Residence / Venue",
        bn: "পারিবারিক বাসভবন / অনুষ্ঠানস্থল",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      mapUrl: "https://www.google.com/maps/search/?api=1&query=22.808816992132105,89.54705054834844",
      dressCodeNote: {
        en: "Elegant semi-formal or traditional festive attire.",
        bn: "সুন্দর ও মার্জিত সেমি-ফরমাল বা ঐতিহ্যবাহী পোশাক।",
      },
      accentColor: "#C9A24B",
      badgeColor: "bg-yellow-100 text-yellow-900 border-yellow-300",
      icon: "Crown",
    }
  ],

  // Our Story Chapters (Storybook timeline)
  storyChapters: [
    {
      id: "childhood",
      title: {
        en: "Once Upon a Time...",
        bn: "এক যে ছিল ছোট্ট ছেলে...",
      },
      tagline: {
        en: "Two little dreamers in their own colorful worlds",
        bn: "ছোট্ট বেলার দূরন্তপনা আর রঙিন স্বপ্নের দিনগুলো",
      },
      description: {
        en: "In a world made of paper boats and endless summer afternoons, little Sakib was dreaming big dreams, while spirited little Easha filled every room with sunshine and laughter.",
        bn: "এক যে ছিল শান্ত দুষ্টু এক রাজপুত্র, যার শৈশব কেটেছিল রঙিন ঘুড়ি আর কাগজের নৌকার স্বপ্নে। আর দূরে এক চঞ্চল রাজকন্যা, যার মিষ্টি হাসিতে চারপাশ উজ্জ্বল হয়ে উঠত।",
      },
      groomImg: "/images/child-groom.webp",
      brideImg: "/images/child-bride.webp",
    },
    {
      id: "growing_up",
      title: {
        en: "Growing Up & Finding Paths",
        bn: "দিনবদলের সুর ও বেড়ে ওঠা",
      },
      tagline: {
        en: "Years drifted by, each shaping who they were meant to be",
        bn: "ঋতু বদলাল, বছর কাটল, নিজেদের গড়ে তোলার দিন",
      },
      description: {
        en: "As seasons turned and school days turned to university lectures, they grew into passionate young souls—unaware that destiny was quietly weaving their paths closer every single day.",
        bn: "শৈশব পেরিয়ে এলো তারুণ্যের দিন। বইয়ের পাতা, ব্যস্ত পথচলা আর হাজারো অভিজ্ঞতায় তারা দুজন নিজেদের চিনে নিল। ভাগ্য তখনও তাদের নিঃশব্দে প্রস্তুত করছিল এক সুন্দর মিলনের জন্য।",
      },
      groomImg: "/images/adult-groom.webp",
      brideImg: "/images/adult-bride.webp",
    },
    {
      id: "destiny",
      title: {
        en: "When Two Paths Cross",
        bn: "যখন ভাগ্য এক সুতোয় বাঁধল",
      },
      tagline: {
        en: "A spark of friendship, an ocean of trust",
        bn: "অপ্রত্যাশিত দেখা, গভীর বন্ধুত্ব আর নিখাদ বিশ্বাস",
      },
      description: {
        en: "What started as simple conversations slowly bloomed into a deep, unwavering friendship. In each other, they found home, understanding, and quiet joy.",
        bn: "অল্প কিছু কথা, এক কাপ চায়ের নীরব মুহূর্ত আর অফুরন্ত শ্রদ্ধা। দেখতে দেখতে দুজন দুজনের সবচেয়ে নির্ভরযোগ্য বন্ধু ও জীবনের নিরাপদ আশ্রয় হয়ে উঠল।",
      },
      groomImg: "/images/adult-groom.webp",
      brideImg: "/images/adult-bride.webp",
    },
    {
      id: "forever",
      title: {
        en: "And Now, They Are Getting Married!",
        bn: "আর এখন, তাদের বিয়ে!",
      },
      tagline: {
        en: "A fairytale chapter begins with your prayers and blessings",
        bn: "ভালোবাসার পূর্ণতা আর নতুন জীবনের শুভ সূচনা",
      },
      description: {
        en: "Two childhood stories have finally merged into one beautiful fairytale. With the blessings of our parents and loved ones, we take our steps into eternity.",
        bn: "দুইটি পৃথক গল্পের নদী এসে মিশল একই মোহনায়। পিতা-মাতা ও প্রিয়জনদের দোয়া আর ভালোবাসায় সিক্ত হয়ে তারা বাঁধতে চলেছে সারাজীবনের বন্ধন।",
      },
      coupleImg: "/images/couple-together.webp",
    }
  ],

  // Formal Family Invitation Paragraph
  invitationLetter: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    quranVerse: {
      arabic: "هُوَ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَجَعَلَ مِنْهَا زَوْجَهَا لِيَسْكُنَ إِلَيْهَا",
      en: "“It is He who created you from one soul and created from it its mate that he might dwell in security with her.” (Surah Al-A'raf 7:189)",
      bn: "“তিনিই সেই সত্তা যিনি তোমাদের এক সত্তা হতে সৃষ্টি করেছেন এবং তা থেকে সৃষ্টি করেছেন তার সঙ্গিনীকে, যেন সে তার সান্নিধ্যে প্রশান্তি পায়।” (সূরা আল-আ'রাফ ৭:১৮৯)",
    },
    heading: {
      en: "In the Name of Allah, Most Gracious, Most Merciful",
      bn: "পরম করুণাময় অসীম দয়ালু আল্লাহ তায়ালার নামে",
    },
    salutation: {
      en: "With immense joy and gratitude in our hearts",
      bn: "অশেষ কৃতজ্ঞতা ও পরম আনন্দের সাথে",
    },
    guestGreeting: {
      en: "Dear Guest,",
      bn: "সম্মানিত সুধী,",
    },
    bodyGeneral: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    bodyAllEvents: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    bodyHoludOnly: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    bodyWeddingOnly: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    bodyReceptionOnly: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    blessingClosing: {
      en: "Your presence and prayers are warmly requested",
      bn: "আপনার উপস্থিতি ও দোয়াপ্রার্থী",
    }
  },

  // Photo Gallery Placeholders
  gallery: [
    {
      id: 1,
      src: "/images/couple-together.webp",
      caption: {
        en: "Sakib & Easha — The Beginning of Forever",
        bn: "সাকিব ও ভাবনা — অনন্তের পথে শুভ সূচনা",
      },
      tag: "The Couple",
    },
    {
      id: 2,
      src: "/images/child-groom.webp",
      caption: {
        en: "Sakib's childhood innocence and daydreams",
        bn: "ছোট্ট বেলার চঞ্চলতা ও মিষ্টি স্মৃতি",
      },
      tag: "Childhood",
    },
    {
      id: 3,
      src: "/images/child-bride.webp",
      caption: {
        en: "Easha's sweet smiles and flower petals",
        bn: "ভাবনার অমায়িক হাসি ও শৈশবের আনন্দ",
      },
      tag: "Childhood",
    },
    {
      id: 4,
      src: "/images/adult-groom.webp",
      caption: {
        en: "A prince ready for his grandest chapter",
        bn: "নতুন জীবনের দ্বারপ্রান্তে আত্মবিশ্বাসী বর",
      },
      tag: "Groom",
    },
    {
      id: 5,
      src: "/images/adult-bride.webp",
      caption: {
        en: "Radiant bride adorned in elegance and grace",
        bn: "অনন্যা বধূ রূপবতী ও কমনীয় স্নিগ্ধতায়",
      },
      tag: "Bride",
    }
  ],

  // UI Strings for general components
  ui: {
    cardCover: {
      blessing: {
        en: "In the name of Allah, Most Gracious, Most Merciful",
        bn: "বিস্‌মিল্লাহির রাহ্‌মানির রাহীম",
      },
      initials: "S & E",
      subtitle: {
        en: "A Royal Storybook Invitation",
        bn: "একটি রাজকীয় ভালোবাসার গল্প",
      },
      touchHint: {
        en: "Touch or scroll to open the invitation",
        bn: "আমন্ত্রণপত্রটি খুলতে স্পর্শ করুন বা স্ক্রল করুন",
      },
      clickHint: {
        en: "Click or scroll to open",
        bn: "খুলতে ক্লিক করুন বা স্ক্রল করুন",
      },
      tapForMusic: {
        en: "Tap for Music ♫",
        bn: "গান চালু করুন ♫",
      },
      sealText: "শুভ বিবাহ",
    },
    hero: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      celebrationTag: {
        en: "The Wedding Celebration",
        bn: "শুভ বিবাহ ও শুভ পরিণয়",
      },
      dateBadge: {
        en: "December 2026 • Dhaka, Bangladesh",
        bn: "ডিসেম্বর ২০২৬ • ঢাকা, বাংলাদেশ",
      },
      scrollCue: {
        en: "Scroll down to explore our story",
        bn: "আমাদের গল্প দেখতে নিচে স্ক্রল করুন",
      }
    },
    countdown: {
      heading: {
        en: "Counting Down the Moments",
        bn: "শুভ ক্ষণের ক্ষণগণনা",
      },
      until: {
        en: "Until",
        bn: "বাকি আর মাত্র",
      },
      days: {
        en: "Days",
        bn: "দিন",
      },
      hours: {
        en: "Hours",
        bn: "ঘণ্টা",
      },
      minutes: {
        en: "Minutes",
        bn: "মিনিট",
      },
      seconds: {
        en: "Seconds",
        bn: "সেকেন্ড",
      },
      marriedState: {
        en: "Alhamdulillah, We Are Married!",
        bn: "আলহামদুলিল্লাহ্‌, আমরা বিবাহবন্ধনে আবদ্ধ!",
      },
      marriedSubtext: {
        en: "Thank you for being part of our beautiful journey and blessings.",
        bn: "আমাদের নতুন জীবনের সূচনালগ্নে পাশে থাকার ও শুভকামনার জন্য সবাইকে আন্তরিক ধন্যবাদ।",
      }
    },
    events: {
      heading: {
        en: "Celebration Schedule",
        bn: "অনুষ্ঠানসূচি ও পরিকল্পনা",
      },
      subheading: {
        en: "We would be honored by your gracious presence",
        bn: "প্রতিটি পর্বে আপনার সানন্দ উপস্থিতি আমাদের ধন্য করবে",
      },
      addToCalendar: {
        en: "Add to Calendar (.ics)",
        bn: "ক্যালেন্ডারে যোগ করুন",
      },
      openMaps: {
        en: "Open in Google Maps",
        bn: "গুগল ম্যাপে দেখুন",
      },
      locationSoon: {
        en: "Location Coming Soon",
        bn: "স্থান পরে জানানো হবে",
      },
      venueTBA: {
        en: "Venue to be announced",
        bn: "স্থান পরে জানানো হবে",
      }
    },
    venueMap: {
      heading: {
        en: "Venue & Travel Guide",
        bn: "ভেন্যু ও যাতায়াত তথ্য",
      },
      subheading: {
        en: "Location details, map, and travel directions for our beloved guests",
        bn: "সম্মানিত মেহমানদের সুবিধার্থে অনুষ্ঠানস্থলের ম্যাপ ও যাতায়াতের সার্বিক বিবরণ",
      },
      getDirections: {
        en: "Open in Google Maps",
        bn: "গুগল ম্যাপে দিকনির্দেশনা দেখুন",
      },
      mapEmbedTitle: {
        en: "Interactive Google Maps",
        bn: "গুগল ম্যাপ লোকেশন",
      },
      travelGuideTitle: {
        en: "Khulna Travel & Transit Guide",
        bn: "খুলনায় যাতায়াত ও অবস্থান সহায়িকা",
      },
      busLabel: {
        en: "Bus Terminal & Major Stands",
        bn: "বাস টার্মিনাল ও প্রধান মোড়সমূহ",
      },
      railwayLabel: {
        en: "Railway Station",
        bn: "খুলনা রেলওয়ে স্টেশন",
      },
      stayLabel: {
        en: "Accommodation & Stay Assistance",
        bn: "আবাসন ও সার্বিক সহায়তা",
      },
      callStayHelp: {
        en: "Call for Assistance",
        bn: "যেকোনো সহায়তায় কল করুন",
      }
    },
    liveStreamSection: {
      heading: {
        en: "Watch Live Celebration",
        bn: "সরাসরি সম্প্রচার দেখুন",
      },
      subheading: {
        en: "Celebrating together across distance and borders",
        bn: "দূর থেকেও আমাদের সাথে আনন্দ ভাগ করে নিন",
      },
      btnWatch: {
        en: "Watch Live Stream",
        bn: "সরাসরি দেখতে ক্লিক করুন",
      },
      comingSoonTag: {
        en: "Live broadcast will activate on event day",
        bn: "অনুষ্ঠানের দিন সম্প্রচার শুরু হবে",
      }
    },
    gallerySection: {
      heading: {
        en: "Moments & Memories",
        bn: "স্মৃতির অ্যালবাম",
      },
      subheading: {
        en: "Glimpses of a growing storybook love story",
        bn: "রূপকথার মতো সাজানো শৈশব থেকে পরিণয়ের গল্প",
      },
      viewFull: {
        en: "Click to enlarge",
        bn: "বড় করে দেখতে ক্লিক করুন",
      }
    },
    rsvpSection: {
      heading: {
        en: "RSVP & Attendance",
        bn: "উপস্থিতি নিশ্চিতকরণ (RSVP)",
      },
      subheading: {
        en: "To help us make the best arrangements for all guests, please kindly confirm your reservation before 20th December 2026.",
        bn: "অতিথিদের আপ্যায়ন ও সুষ্ঠু ব্যবস্থাপনার সুবিধার্থে অনুগ্রহ করে ২০ ডিসেম্বর ২০২৬ এর পূর্বে উপস্থিতি নিশ্চিত করুন।",
      },
      nameLabel: {
        en: "Your Name",
        bn: "আপনার নাম",
      },
      namePlaceholder: {
        en: "Enter your full name",
        bn: "আপনার পূর্ণ নাম লিখুন",
      },
      guestCountLabel: {
        en: "Guests Attending",
        bn: "উপস্থিত অতিথির সংখ্যা",
      },
      selectEventsLabel: {
        en: "Ceremonies & Guest Attendance",
        bn: "অনুষ্ঠান নির্বাচন ও সদস্য সংখ্যা",
      },
      perEventInstruction: {
        en: "Choose which events you are attending and select how many members from your family will join each:",
        bn: "কোন কোন অনুষ্ঠানে আপনার পরিবারের কতজন সদস্য অংশগ্রহণ করবেন তা নির্ধারণ করুন:",
      },
      maxAllotted: {
        en: "Max invitation limit",
        bn: "সর্বোচ্চ বরাদ্দকৃত সংখ্যা",
      },
      btnWhatsApp: {
        en: "Confirm RSVP on WhatsApp",
        bn: "হোয়াটসঅ্যাপে নিশ্চিত করুন",
      },
      orCallDirectly: {
        en: "Need assistance or wish to call directly?",
        bn: "সরাসরি ফোনে জানাতে বা প্রয়োজনে কল করুন",
      },
      directCall: {
        en: "Call",
        bn: "কল করুন",
      }
    },
    footer: {
      gratitude: {
        en: "With heartfelt gratitude from the families of Sakib Hassan Prangon & Easha Mahmud Bhabna.",
        bn: "সাকিব হাসান প্রাঙ্গন ও এশা মাহমুদ ভাবনা এর পরিবারের পক্ষ থেকে আপনাদের সকলের প্রতি অন্তরের গভীর কৃতজ্ঞতা ও ভালোবাসা।",
      },
      madeWithLove: {
        en: "Designed & crafted with love for our special day.",
        bn: "আমাদের বিশেষ এই দিনটির স্মরণে পরম ভালোবাসায় নির্মিত।",
      },
      replayOpening: {
        en: "Replay Card Opening Animation ↺",
        bn: "আমন্ত্রণপত্রটি পুনরায় খুলুন ↺",
      },
      backToTop: {
        en: "Back to Top ↑",
        bn: "উপরে ফিরে যান ↑",
      }
    }
  }
};
