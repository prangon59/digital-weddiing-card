/**
 * WEDDING INVITATION CONFIGURATION & CONTENT (FINAL VERSION)
 * Sakib Hassan Prangon & Easha Mahmud Bhabna
 * =========================================================
 * Integrated master content file combining v1 & v2 with updated family details.
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
      en: "Md Mamtaz Hassan & Shamima Begum (Pakhi)",
      bn: "মোঃ মমতাজ হাসান ও শামীমা বেগম (পাখি)",
    },
    hometown: {
      en: "33 no Shahid Sohrawardy College Road, Banargati, Khulna",
      bn: "৩৩ নং শহীদ সোহরাওয়ার্দী কলেজ রোড, বানারগাতী, খুলনা",
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
      en: "Iqbal Nagar Mosque Road, Khulna",
      bn: "ইকবাল নগর মসজিদ রোড, খুলনা",
    }
  },

  timezone: "Asia/Dhaka", // UTC+6
  hashtag: "#SakibWedsEasha2026",
  rsvpWhatsAppNumber: "8801791164440",
  rsvpWebhookUrl: "https://script.google.com/macros/s/AKfycbxhEFZAoifGb-m1mE3mNz4bugTHMQiP5qBhZoKtUGnzDmiRUul2gCqe7rjpxyqsNXVk/exec",
  rsvpGoogleFormUrl: "https://forms.gle/StiU2P848nCeuQzW6",
  rsvpGoogleSheetUrl: "https://docs.google.com/spreadsheets/d/1P808kR9yekOE7o6XSqTLAktxWjYTdQnXSX9W8GfpVos/edit",

  // Family assistance contact
  contactPersons: [
    {
      name: {
        en: "Shamima Begum (Groom's Mother)",
        bn: "শামীমা বেগম (বরের মা)",
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
  },

  audio: {
    src: "./assets/audio/bg.mp3",
    fallbackSrc: "/audio/bg.mp3",
    title: {
      en: "Wedding Instrumental Theme",
      bn: "বিবাহের সানাই ও সুর",
    }
  },

  // 4 Event Programs (Keys: gh/h = Groom's Holud, bh = Bride's Holud, w = Wedding, r = Reception)
  events: [
    {
      id: "grooms_holud",
      letter: "gh",
      aliasLetters: ["gh", "h"],
      title: {
        en: "Groom's Gaye Holud",
        bn: "বরের গায়ে হলুদ",
      },
      subtitle: {
        en: "An evening of turmeric, marigolds, and celebration",
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
        en: "Groom's Residence",
        bn: "বরের বাসভবন",
      },
      venueAddress: {
        en: "33 no Shahid Sohrawardy College Road, Banargati, Khulna",
        bn: "৩৩ নং শহীদ সোহরাওয়ার্দী কলেজ রোড, বানারগাতী, খুলনা",
      },
      isVenueTBA: false,
      accentColor: "#F4A300",
      icon: "sparkles",
    },
    {
      id: "brides_holud",
      letter: "bh",
      aliasLetters: ["bh"],
      title: {
        en: "Bride's Gaye Holud",
        bn: "কনের গায়ে হলুদ",
      },
      subtitle: {
        en: "An evening of henna, sweet melodies, and joyous color",
        bn: "মেহেদি, মিষ্টি সুর আর রঙের বর্ণিল আনন্দসন্ধ্যা",
      },
      date: "2026-12-24",
      dayNumber: "24",
      monthName: {
        en: "December",
        bn: "ডিসেম্বর",
      },
      yearNumber: "2026",
      dateDisplay: {
        en: "Thursday, 24 December 2026",
        bn: "বৃহস্পতিবার, ২৪ ডিসেম্বর ২০২৬",
      },
      timeDisplay: {
        en: "Evening",
        bn: "সন্ধ্যা",
      },
      icsStartTime: "2026-12-24T18:30:00+06:00",
      icsEndTime: "2026-12-24T22:30:00+06:00",
      venueName: {
        en: "Venue: To be announced later",
        bn: "স্থান: পরে জানানো হবে",
      },
      venueAddress: {
        en: "Iqbal Nagar Mosque Road area, Khulna",
        bn: "ইকবাল নগর মসজিদ রোড এলাকা, খুলনা",
      },
      isVenueTBA: true,
      accentColor: "#E5A93C",
      icon: "flower",
    },
    {
      id: "wedding",
      letter: "w",
      aliasLetters: ["w"],
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
        en: "Venue: To be announced later",
        bn: "স্থান: পরে জানানো হবে",
      },
      venueAddress: {
        en: "Khulna, Bangladesh",
        bn: "খুলনা, বাংলাদেশ",
      },
      isVenueTBA: true,
      accentColor: "#7A1F2B",
      icon: "heart",
    },
    {
      id: "reception",
      letter: "r",
      aliasLetters: ["r"],
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
      isVenueTBA: false,
      accentColor: "#C9A24B",
      icon: "crown",
    }
  ],

  // Our Story Header (Exact from v1 OurStory.jsx)
  storyHeader: {
    badge: { en: "Our Storybook Journey", bn: "আমাদের ভালোবাসার গল্প" },
    heading: { en: "Growing Up Together Into Forever", bn: "শৈশব থেকে শুভ পরিণয়" },
    subheading: { en: "A Fairytale Written by Destiny", bn: "ভাগ্যের নিখুঁত গাঁথুনিতে এক ভালোবাসার গল্প" },
    viewToggleCarousel: { en: "📱 3D Carousel", bn: "📱 থ্রিডি ক্যারোসেল" },
    viewToggleStage: { en: "🎭 Story Stage", bn: "🎭 স্টোরি স্টেজ" },
    togetherBadge: { en: "And Now, They Are Getting Married! ❤", bn: "আর এখন, তাদের বিয়ে! ❤" },
    prevChapter: { en: "Previous Chapter", bn: "পূর্ববর্তী অধ্যায়" },
    nextChapter: { en: "Next Chapter", bn: "পরবর্তী অধ্যায়" },
    keyboardHint: { en: "Use ← / → keys", bn: "কীবোর্ড এরোর মাধ্যমে পরিবর্তন করুন" },
  },

  // 5 Story Slides (Exact from v1 OurStory.jsx lines 12-78)
  storySlides: [
    {
      id: "child-groom",
      tag: { en: "Childhood Memories", bn: "শৈশবের স্মৃতি" },
      title: { en: "Little Sakib", bn: "ছোট্ট সাকিব" },
      tagline: { en: "Paper boats, colorful kites & endless daydreams", bn: "কাগজের নৌকা, রঙিন ঘুড়ি আর ডানপিটে শৈশব" },
      description: {
        en: "A gentle little prince whose childhood was painted with sunshine, paper boats, and dreaming under golden skies.",
        bn: "এক যে ছিল শান্ত দুষ্টু এক রাজপুত্র, যার শৈশব কেটেছিল রঙিন ঘুড়ি আর কাগজের নৌকার রঙিন স্বপ্নে।",
      },
      img: "./assets/images/child-groom.svg",
      fallbackImg: "./assets/images/child-groom.webp",
      alt: "Little Sakib in childhood",
    },
    {
      id: "child-bride",
      tag: { en: "Childhood Innocence", bn: "শৈশবের সারল্য" },
      title: { en: "Little Easha (Bhabna)", bn: "ছোট্ট ভাবনা (এশা)" },
      tagline: { en: "Sweet smiles, dollhouses & laughter", bn: "মিষ্টি হাসি, পুতুলের বিয়ে আর অফুরন্ত উচ্ছ্বাস" },
      description: {
        en: "A spirited little princess whose sweet laughter lit up every home, surrounded by blooming blossoms and storybooks.",
        bn: "আর দূরে এক চঞ্চল রাজকন্যা, যার মিষ্টি হাসিতে চারপাশ উজ্জ্বল হয়ে উঠত আর পুতুল খেলার স্বপ্ন ছিল যার সারাবেলা।",
      },
      img: "./assets/images/child-bride.svg",
      fallbackImg: "./assets/images/child-bride.webp",
      alt: "Little Easha in childhood",
    },
    {
      id: "adult-groom",
      tag: { en: "Youth & Ambition", bn: "তারুণ্য ও দীপ্তি" },
      title: { en: "Sakib Hassan Prangon", bn: "সাকিব হাসান প্রাঙ্গন" },
      tagline: { en: "Integrity, dedication & walking his destined path", bn: "তারুণ্যের দীপ্তি, গভীর নিষ্ঠা ও জীবনের স্বপ্ন" },
      description: {
        en: "Years drifted by as childhood innocence transformed into quiet strength, wisdom, and an unwavering heart ready for life.",
        bn: "শৈশব পেরিয়ে এলো তারুণ্যের দিন। বইয়ের পাতা আর ব্যস্ত পথচলায় নিজেকে গড়ে তুলল এক আত্মবিশ্বাসী ও দায়িত্বশীল মানুষ হিসেবে।",
      },
      img: "./assets/images/adult-groom.svg",
      fallbackImg: "./assets/images/adult-groom.webp",
      alt: "Sakib Hassan Prangon in adulthood",
    },
    {
      id: "adult-bride",
      tag: { en: "Grace & Elegance", bn: "কমনীয়তা ও স্নিগ্ধতা" },
      title: { en: "Easha Mahmud Bhabna", bn: "এশা মাহমুদ ভাবনা" },
      tagline: { en: "Grace, compassion & warmth that brightens every day", bn: "স্নিগ্ধ কমনীয়তা, গভীর আন্তরিকতা ও মাধুর্য" },
      description: {
        en: "Blossoming into a radiant woman adorned with gentle grace, wisdom, and a beautiful soul ready for love’s greatest voyage.",
        bn: "কমনীয়তা ও স্নিগ্ধতায় উজ্জ্বল এক অনন্যা নারী, যার হৃদয় ভালোবাসায় পূর্ণ এবং নতুন জীবনের শুভ প্রত্যাশায় উদ্ভাসিত।",
      },
      img: "./assets/images/adult-bride.svg",
      fallbackImg: "./assets/images/adult-bride.webp",
      alt: "Easha Mahmud Bhabna in adulthood",
    },
    {
      id: "together",
      tag: { en: "Forever Destined", bn: "চিরন্তন পরিণয়" },
      title: { en: "Sakib & Easha Together", bn: "সাকিব ও ভাবনা: শুভ পরিণয়" },
      tagline: { en: "Two childhood stories finally becoming one forever", bn: "দুইটি পৃথক গল্পের নদী এসে মিশল একই মোহনায়" },
      description: {
        en: "What started as separate childhood dreams has united into a sacred bond of love, trust, and lifelong friendship. With parents’ blessings, we unite.",
        bn: "দুইটি ছোট মনের বেড়ে ওঠা ও এক হওয়া। পিতা-মাতা ও প্রিয়জনদের দোয়া আর ভালোবাসায় সিক্ত হয়ে তারা বাঁধতে চলেছে সারাজীবনের বন্ধন।",
      },
      img: "./assets/images/couple-together.svg",
      fallbackImg: "./assets/images/couple-together.webp",
      alt: "Sakib and Easha Together",
    },
  ],

  // 3 Desktop Stages (Exact from v1 OurStory.jsx lines 308-465)
  storyDesktopStages: [
    {
      id: 0,
      label: { en: "1. Childhood Dreams", bn: "১. শৈশবের দিনগুলো" },
      title: { en: "Childhood Innocence & Endless Daydreams", bn: "শৈশবের দূরন্তপনা ও রঙিন দিন" },
      description: {
        en: "A world made of paper boats and endless summer afternoons where little Sakib dreamed big, and spirited little Easha filled every room with sunshine.",
        bn: "এক শান্ত দুষ্টু ছেলে যার দিন কাটত রঙিন ঘুড়ি আর কাগজের নৌকায়, আর দূরে এক চঞ্চল রাজকন্যা যার মিষ্টি হাসিতে চারপাশ উজ্জ্বল হয়ে উঠত।",
      },
      groomImg: "./assets/images/child-groom.svg",
      groomFallback: "./assets/images/child-groom.webp",
      groomName: { en: "Little Sakib", bn: "ছোট্ট সাকিব" },
      brideImg: "./assets/images/child-bride.svg",
      brideFallback: "./assets/images/child-bride.webp",
      brideName: { en: "Little Bhabna", bn: "ছোট্ট ভাবনা" },
      centerBadge: { en: "Dreams", bn: "শৈশবের স্বপ্ন" },
    },
    {
      id: 1,
      label: { en: "2. Growing & Destiny", bn: "২. তারুণ্যের পথচলা" },
      title: { en: "Growing Up & Walking Destined Paths", bn: "দিনবদলের সুর ও ভাগ্যের পথচলা" },
      description: {
        en: "As years drifted by, they grew into passionate souls with shared values—unaware that destiny was quietly weaving their paths closer together.",
        bn: "শৈশব পেরিয়ে এলো তারুণ্যের দিন। বইয়ের পাতা আর ব্যস্ত পথচলায় নিজেদের গড়ে তোলার সাথে সাথে ভাগ্য তাদের নিঃশব্দে এক মোহনার দিকে নিয়ে এলো।",
      },
      groomImg: "./assets/images/adult-groom.svg",
      groomFallback: "./assets/images/adult-groom.webp",
      groomName: { en: "Sakib Hassan", bn: "সাকিব হাসান" },
      brideImg: "./assets/images/adult-bride.svg",
      brideFallback: "./assets/images/adult-bride.webp",
      brideName: { en: "Easha Mahmud", bn: "এশা মাহমুদ" },
      centerBadge: { en: "Destiny", bn: "ভাগ্যের পথচলা" },
    },
    {
      id: 2,
      label: { en: "3. Destined to Unite", bn: "৩. চিরন্তন শুভ পরিণয়" },
      title: { en: "And Now, A Lifelong Fairytale Begins", bn: "আর এখন, তাদের চিরন্তন বিয়ে!" },
      description: {
        en: "Two childhood stories have merged into one beautiful fairytale. With the blessings of our parents, we take our steps together into forever.",
        bn: "দুইটি পৃথক নদীর মিলন হলো একই মোহনায়। পিতা-মাতা ও প্রিয়জনদের দোয়া আর ভালোবাসায় সিক্ত হয়ে তারা বাঁধতে চলেছে সারাজীবনের বন্ধন।",
      },
      togetherImg: "./assets/images/couple-together.svg",
      togetherFallback: "./assets/images/couple-together.webp",
      togetherBadge: { en: "And Now, They Are Getting Married! ❤", bn: "আর এখন, তাদের বিয়ে! ❤" },
    },
  ],

  // Translations
  translations: {
    // Top Controls
    langEn: { en: "English", bn: "English" },
    langBn: { en: "বাংলা", bn: "বাংলা" },
    musicPlay: { en: "Play Music", bn: "গান চালু করুন" },
    musicMute: { en: "Mute Music", bn: "গান বন্ধ করুন" },

    // Gate & Seal
    gateHint: {
      en: "Tap wax seal to open invitation",
      bn: "আমন্ত্রণপত্রটি খুলতে সিলমোহরে স্পর্শ করুন",
    },
    gateSubhint: {
      en: "Touch anywhere, swipe or press Enter",
      bn: "স্পর্শ করুন, সোয়াইপ করুন অথবা Enter চাপুন",
    },
    gateCoupleNames: {
      en: "Sakib & Easha",
      bn: "সাকিব ও ভাবনা",
    },
    gateSubtitle: {
      en: "A sacred union of two hearts, embarking on a lifelong journey",
      bn: "দুইটি হৃদয়ের এক পবিত্র মেলবন্ধন ও শুভ যাত্রা",
    },
    waxSealText: {
      en: "ROYAL WEDDING",
      bn: "শুভ বিবাহ",
    },
    coupleConnector: {
      en: "❦ & ❦",
      bn: "❦ ও ❦",
    },

    // Hero Section
    bismillah: {
      en: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      bn: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    heroTag: {
      en: "The Wedding Celebration",
      bn: "শুভ বিবাহ ও শুভ পরিণয়",
    },
    guestBadgePrefix: {
      en: "Specially Invited:",
      bn: "সম্মানিত অতিথি:",
    },
    dateBadge: {
      en: "23 – 27 December 2026 • Khulna, Bangladesh",
      bn: "২৩ – ২৭ ডিসেম্বর ২০২৬ • খুলনা, বাংলাদেশ",
    },
    scrollCue: {
      en: "Scroll down to explore our story",
      bn: "আমাদের গল্প দেখতে নিচে স্ক্রল করুন",
    },

    // Our Story Section (Exact from v1)
    storyBadge: {
      en: "Our Storybook Journey",
      bn: "আমাদের ভালোবাসার গল্প",
    },
    storyHeading: {
      en: "Growing Up Together Into Forever",
      bn: "শৈশব থেকে শুভ পরিণয়",
    },
    storySubheading: {
      en: "A Fairytale Written by Destiny",
      bn: "ভাগ্যের নিখুঁত গাঁথুনিতে এক ভালোবাসার গল্প",
    },
    viewToggleCarousel: {
      en: "📱 3D Carousel",
      bn: "📱 থ্রিডি ক্যারোসেল",
    },
    viewToggleStage: {
      en: "🎭 Story Stage",
      bn: "🎭 স্টোরি স্টেজ",
    },

    // Formal Invitation Section
    invitationHeading: {
      en: "YOU ARE CORDIALLY INVITED TO THE WEDDING OF",
      bn: "আমাদের শুভ বিবাহ অনুষ্ঠানে আপনাকে সাদর আমন্ত্রণ",
    },
    quranVerseText: {
      en: "“It is He who created you from one soul and created from it its mate that he might dwell in security with her.” (Surah Al-A'raf 7:189)",
      bn: "“তিনিই সেই সত্তা যিনি তোমাদের এক সত্তা হতে সৃষ্টি করেছেন এবং তা থেকে সৃষ্টি করেছেন তার সঙ্গিনীকে, যেন সে তার সান্নিধ্যে প্রশান্তি পায়।” (সূরা আল-আ'রাফ ৭:১৮৯)",
    },
    invitationSalutation: {
      en: "With immense joy and gratitude in our hearts",
      bn: "অশেষ কৃতজ্ঞতা ও পরম আনন্দের সাথে",
    },
    guestGreeting: {
      en: "Dear Guest,",
      bn: "সম্মানিত সুধী,",
    },
    invitationBody: {
      en: "Together with our families, we cordially invite you and your family to join us in celebrating this joyous milestone of our lives. Your gracious presence, warm wishes, and heartfelt prayers will make our celebration truly blessed and memorable.",
      bn: "পারিবারিক স্নেহ ও পরম ভালোবাসার সাথে আমরা আপনাকে ও আপনার পরিবারকে আমাদের এই আনন্দঘন শুভযাত্রায় আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার সানন্দ উপস্থিতি ও মনখোলা দোয়া আমাদের আগামী দিনগুলোর পথচলাকে বরকতময় ও স্মরণীয় করে রাখবে।",
    },
    sonOf: {
      en: "SON OF",
      bn: "বরের অভিভাবকবৃন্দ",
    },
    daughterOf: {
      en: "DAUGHTER OF",
      bn: "কনের অভিভাবকবৃন্দ",
    },
    invitationClosing: {
      en: "Your presence and prayers are warmly requested",
      bn: "আপনার উপস্থিতি ও দোয়াপ্রার্থী",
    },
    invitationSignature: {
      en: "With Love & Prayers",
      bn: "স্নেহ, শ্রদ্ধা ও দোয়ায়",
    },

    // Timeline Section
    timelineBadge: {
      en: "SCHEDULE OF EVENTS",
      bn: "শুভ অনুষ্ঠানমালা",
    },
    timelineHeading: {
      en: "Celebration Timeline",
      bn: "অনুষ্ঠানসূচি ও পরিকল্পনা",
    },
    timelineSubheading: {
      en: "We would be honored by your gracious presence",
      bn: "প্রতিটি পর্বে আপনার সানন্দ উপস্থিতি আমাদের ধন্য করবে",
    },
    addToCalendarBtn: {
      en: "Add to Calendar (.ics)",
      bn: "ক্যালেন্ডারে যোগ করুন",
    },
    venueTbaNotice: {
      en: "Venue will be announced soon",
      bn: "ভেন্যু শীঘ্রই জানানো হবে",
    },

    // Countdown Section
    countdownHeading: {
      en: "Counting Down the Moments",
      bn: "শুভ ক্ষণের ক্ষণগণনা",
    },
    countdownTargetPrefix: {
      en: "Until",
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
      bn: "আমাদের নতুন জীবনের সূচনালগ্নে পাশে থাকার ও শুভকামনার জন্য সবাইকে আন্তরিক ধন্যবাদ।",
    },

    // Travel Guide & Map
    travelGuideBadge: {
      en: "LOCATION & DIRECTIONS",
      bn: "যাতায়াত ও দিকনির্দেশনা",
    },
    travelGuideHeading: {
      en: "Venue & Travel Guide",
      bn: "ভেন্যু ও যাতায়াত তথ্য",
    },
    travelGuideCity: {
      en: "Khulna, Bangladesh",
      bn: "খুলনা, বাংলাদেশ",
    },
    travelGuideSubheading: {
      en: "Location details, map, and travel directions for our beloved guests",
      bn: "সম্মানিত মেহমানদের সুবিধার্থে অনুষ্ঠানস্থলের ম্যাপ ও যাতায়াতের সার্বিক বিবরণ",
    },
    transitBusLabel: {
      en: "Bus Terminal & Major Stands",
      bn: "বাস টার্মিনাল ও প্রধান মোড়সমূহ",
    },
    transitBusDesc: {
      en: "Easily accessible by rickshaw, easybike, or taxi from Sonadanga Bus Terminal, Royal Mor, Shib Bari Mor, and Gollamari.",
      bn: "সোনাডাঙ্গা বাস টার্মিনাল, রয়েল মোড়, শিববাড়ি মোড় ও গল্লামারি থেকে যেকোনো বাহনে সহজে পৌঁছানো যাবে।",
    },
    transitRailLabel: {
      en: "Railway Station",
      bn: "খুলনা রেলওয়ে স্টেশন",
    },
    transitRailDesc: {
      en: "Easybikes, rickshaws, and auto-taxis are readily available from Khulna Railway Station directly to the venue.",
      bn: "খুলনা রেলওয়ে স্টেশন থেকে অনুষ্ঠানস্থলে আসার জন্য ইজিবাইক, রিকশা ও ট্যাক্সি সহজলভ্য।",
    },
    transitStayLabel: {
      en: "Accommodation & Stay Assistance",
      bn: "আবাসন ও সার্বিক সহায়তা",
    },
    transitStayDesc: {
      en: "For out-of-town guests needing hotel assistance or local stay guidance, please feel free to reach out to us directly.",
      bn: "খুলনার বাইরের মেহমানদের আবাসন সহায়তা বা যেকোনো প্রয়োজনে নিচের নম্বরে সরাসরি যোগাযোগের অনুরোধ রইল।",
    },
    transitContactPerson: {
      en: "Shamima Begum (Groom's Mother)",
      bn: "শামীমা বেগম (বরের মা)",
    },
    callStayHelpBtn: {
      en: "Call for Assistance",
      bn: "যেকোনো সহায়তায় কল করুন",
    },
    openInMapsBtn: {
      en: "Open in Google Maps ↗",
      bn: "গুগল ম্যাপে দিকনির্দেশনা ↗",
    },

    // Moments & Memories (Empty frames for now)
    momentsBadge: {
      en: "PHOTO GALLERY",
      bn: "গ্যালারি ও স্মৃতি",
    },
    momentsHeading: {
      en: "Moments & Memories",
      bn: "মধুর স্মৃতির অ্যালবাম",
    },
    momentsSubheading: {
      en: "Glimpses of a growing love story (Coming Soon)",
      bn: "আমাদের কিছু মধুর স্মৃতি (শীঘ্রই ছবি যুক্ত হবে)",
    },
    emptyPhotoPlaceholder: {
      en: "Photo Coming Soon 📸",
      bn: "শীঘ্রই ছবি যুক্ত হবে 📸",
    },

    // RSVP Section
    rsvpBadge: {
      en: "RSVP & ATTENDANCE",
      bn: "উপস্থিতি নিশ্চিতকরণ",
    },
    rsvpHeading: {
      en: "Confirm Your Presence",
      bn: "আপনার উপস্থিতি নিশ্চিত করুন",
    },
    rsvpSubheading: {
      en: "To help us make the best arrangements for all guests, please kindly confirm your reservation before 20th December 2026.",
      bn: "অতিথিদের আপ্যায়ন ও সুষ্ঠু ব্যবস্থাপনার সুবিধার্থে অনুগ্রহ করে ২০ ডিসেম্বর ২০২৬ এর পূর্বে উপস্থিতি নিশ্চিত করুন।",
    },

    // Public Wishes Section (For Social Media / Unpersonalized Visitors)
    publicWishesBadge: {
      en: "BLESSINGS & WISHES",
      bn: "দোয়া ও শুভকামনা",
    },
    publicWishesHeading: {
      en: "Send Your Warm Blessings",
      bn: "দোয়া ও শুভকামনা পাঠান",
    },
    publicWishesSubheading: {
      en: "Your heartfelt prayers and warm wishes are the most precious gift as we begin our new journey together.",
      bn: "আমাদের নতুন জীবনের শুভসূচনায় আপনাদের আন্তরিক দোয়া ও শুভকামনাই সবচেয়ে মূল্যবান উপহার।",
    },
    publicWishesNameLabel: {
      en: "Your Name (Optional)",
      bn: "আপনার নাম (ঐচ্ছিক)",
    },
    publicWishesNamePlaceholder: {
      en: "Your name (or leave empty to send anonymously)",
      bn: "আপনার নাম (নাম না দিতে চাইলে খালি রাখুন)",
    },
    publicWishesTextLabel: {
      en: "Your Prayers & Warm Wishes",
      bn: "আপনার আন্তরিক দোয়া ও শুভেচ্ছা",
    },
    publicWishesTextPlaceholder: {
      en: "Write your heartfelt prayers or congratulations for Sakib & Easha...",
      bn: "বর-কনের নতুন জীবনের জন্য আপনার আন্তরিক দোয়া বা শুভকামনা লিখুন...",
    },
    publicWishesSubmitBtn: {
      en: "Send Warm Blessings 💖",
      bn: "দোয়া ও শুভেচ্ছা পাঠান 💖",
    },
    publicWishesSubmitting: {
      en: "Sending your blessings...",
      bn: "শুভকামনা পাঠানো হচ্ছে...",
    },
    publicWishesSuccessHeading: {
      en: "JazakAllahu Khairan! 💖",
      bn: "জাজাকাল্লাহু খাইরান! 💖",
    },
    publicWishesSuccessMsg: {
      en: "Thank you so much! Your heartfelt prayers and blessings have been warmly received by Sakib & Easha.",
      bn: "আপনাকে আন্তরিক ধন্যবাদ! আপনার ভালোবাসা ও দোয়া সফলভাবে সাকিব ও ভাবনার কাছে পৌঁছেছে।",
    },
    publicWishesSendAnotherBtn: {
      en: "Send Another Wish ✉️",
      bn: "আরেকটি বার্তা পাঠান ✉️",
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
      en: "Ceremonies & Guest Attendance",
      bn: "অনুষ্ঠান নির্বাচন ও সদস্য সংখ্যা",
    },
    wishesFieldLabel: {
      en: "Dua & Blessings (Optional)",
      bn: "দোয়া ও শুভকামনা (ঐচ্ছিক)",
    },
    wishesFieldPlaceholder: {
      en: "Write your heartfelt prayers or warm wishes for the couple...",
      bn: "বর-কনের জন্য আপনার মনখোলা দোয়া বা শুভকামনা লিখুন...",
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
      en: "Attending guests:",
      bn: "উপস্থিত অতিথির সংখ্যা:",
    },
    confirmGoogleFormBtn: {
      en: "Confirm RSVP via Google Form ↗",
      bn: "গুগল ফর্মের মাধ্যমে নিশ্চিত করুন ↗",
    },
    googleFormHelpText: {
      en: "Opens the official Google Form to record your attendance into our guest registry.",
      bn: "বোতামে চাপ দিলে গুগল ফর্মে সরাসরি আপনার উপস্থিতি ও সদস্য সংখ্যা সংরক্ষিত হবে।",
    },
    submitRSVPBtn: {
      en: "Confirm Attendance ✨",
      bn: "উপস্থিতি নিশ্চিত করুন ✨",
    },
    submittingRSVP: {
      en: "Confirming attendance...",
      bn: "উপস্থিতি নিশ্চিত করা হচ্ছে...",
    },
    rsvpRegistryHelpText: {
      en: "Your response will be recorded directly into our official guest registry.",
      bn: "আপনার উপস্থিতি ও সদস্য সংখ্যা সরাসরি আমাদের ডিজিটাল অতিথি রেজিস্ট্রিতে সংরক্ষিত হবে।",
    },
    rsvpSuccessHeading: {
      en: "Attendance Confirmed! ✨",
      bn: "উপস্থিতি সফলভাবে নিশ্চিত হয়েছে! ✨",
    },
    rsvpSuccessMsg: {
      en: "Thank you for confirming! Your response is recorded in our guest registry. We eagerly await celebrating these blessed moments with you.",
      bn: "আপনাকে আন্তরিক ধন্যবাদ! আপনার উপস্থিতি ও সদস্য সংখ্যা অতিথি তালিকায় সফলভাবে লিপিবদ্ধ হয়েছে। আপনার সানন্দ উপস্থিতিতে আমাদের প্রতিটি মুহূর্ত আনন্দময় হয়ে উঠবে।",
    },
    rsvpSuccessGuest: {
      en: "Guest Name:",
      bn: "সম্মানিত অতিথি:",
    },
    rsvpSuccessAttending: {
      en: "Attending Ceremonies:",
      bn: "উপস্থিতির অনুষ্ঠানমালা:",
    },
    rsvpSuccessDeclined: {
      en: "Declined Ceremonies:",
      bn: "অনুপস্থিতির অনুষ্ঠানমালা:",
    },
    rsvpChangeResponseBtn: {
      en: "Modify Response ↺",
      bn: "প্রয়োজনে তথ্য পরিবর্তন করুন ↺",
    },
    rsvpNameAlert: {
      en: "Please enter your name.",
      bn: "অনুগ্রহ করে আপনার নাম লিখুন।",
    },
    rsvpNoneSelected: {
      en: "No ceremonies selected",
      bn: "কোনো অনুষ্ঠান নির্বাচন করা হয়নি",
    },
    confirmWhatsAppBtn: {
      en: "Confirm RSVP on WhatsApp",
      bn: "হোয়াটসঅ্যাপে নিশ্চিত করুন",
    },
    whatsAppHelpText: {
      en: "Tapping opens WhatsApp with your pre-filled event-by-event attendance details.",
      bn: "বোতামে চাপ দিলে আপনার অনুষ্ঠানভিত্তিক উপস্থিতি তথ্যসহ হোয়াটসঅ্যাপে মেসেজ প্রস্তুত হবে।",
    },
    whatsappEmergencyText: {
      en: "Need direct assistance? Message on WhatsApp",
      bn: "যেকোনো বিশেষ প্রয়োজনে হোয়াটসঅ্যাপে যোগাযোগ করুন",
    },

    // Footer
    footerGratitude: {
      en: "With heartfelt gratitude from the families of Sakib Hassan Prangon & Easha Mahmud Bhabna.",
      bn: "সাকিব হাসান প্রাঙ্গন ও এশা মাহমুদ ভাবনা এর পরিবারের পক্ষ থেকে আপনাদের সকলের প্রতি অন্তরের গভীর কৃতজ্ঞতা ও ভালোবাসা।",
    },
    footerReplay: {
      en: "Replay Gate Opening Animation ↺",
      bn: "আমন্ত্রণপত্রটি পুনরায় খুলুন ↺",
    },
    backToTop: {
      en: "Back to Top ↑",
      bn: "উপরে ফিরে যান ↑",
    }
  }
};

/**
 * Converts Western digits (0-9) to Bengali digits (০-৯)
 */
export function toBengaliNumerals(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}
