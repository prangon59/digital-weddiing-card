# Sakib ❤ Easha | Animated Wedding E-Invitation & Personal Invite Generator
### সাকিব হাসান প্রাঙ্গন ও এশা মাহমুদ ভাবনা এর শুভ বিবাহ আমন্ত্রণ

A production-ready, mobile-first, bilingual (Bengali & English) animated wedding e-invitation web application with a 3D storybook virtual card opening, scroll-driven love story timeline, live countdown, schedule with Add to Calendar (.ics), WhatsApp RSVP, and a built-in private personalized invite generator.

---

## ✨ Key Features

1. **3D Virtual Card Opening Experience (Signature Moment)**
   - Realistic 3D invitation card with gold foil alpona embossing, wax seal monogram (`S & E`), and personalized guest greeting.
   - Smooth 3D animation (rotateY, seal break, golden sparkles, inside page scale-up).
   - Audio autoplay with gentle volume fade-in upon tap/click; displays a gentle "Tap for music" prompt if opened via scroll/swipe.
   - Scroll-lock while closed, smooth unlocking upon completion. Full support for `prefers-reduced-motion`.

2. **100% Bilingual (Bengali & English)**
   - Prominent language toggle button in the top floating bar.
   - Preserves all URL query parameters across language switching.
   - Google Fonts: **Noto Serif Bengali** (headings), **Hind Siliguri** & **Tiro Bangla** (body), **Cormorant Garamond** & **Great Vibes** (English accents), and **Amiri** (Bismillah).
   - Numbers and dates automatically convert to Bengali numerals (`০১২৩৪৫৬৭৮৯`) in Bengali mode.

3. **Our Story — Interactive Storybook Love Story**
   - Follows little Sakib and little Easha as children holding childhood dreams (kite, paper boat, flowers).
   - Visually cross-fades and morphs into adulthood along a delicate watercolor vine as they walk toward each other.
   - Climax: Sakib and Easha standing together under the floral archway with bursting celebration petals.

4. **Personalized Guest Links (No backend required)**
   - Encoded entirely in the URL query string:
     - `n`: Guest or family name in English (e.g., `Rahim & Family`)
     - `b`: Guest name in Bengali (e.g., `রহিম ও পরিবার`)
     - `e`: Invited events as letter codes: `h` (Gaye Holud), `w` (The Wedding), `r` (Reception & Walima). E.g., `e=hr` for Holud + Reception.
     - `c`: Maximum allowed guest count (integer between 1 and 20, default 1).
   - **Dynamic Guest Experience**:
     - Cover and hero display personalized greetings.
     - **Only invited events appear** across the entire website (Schedule cards, maps, RSVP checkboxes, invitation wording). Hidden events are completely omitted.
     - Live countdown automatically targets the guest's first upcoming invited event.
     - RSVP form prefills guest name and caps attendance selector at `c`.

5. **Built-in Private Invite Generator (`/#/invite-maker`)**
   - Private mobile-first route with passcode lock (stored in `src/data/content.js`, default: `change-me`).
   - Create and send a customized invitation in **under 10 seconds**!
   - Event selection chips with 1-tap presets: *"All three"*, *"Holud + Reception"*, *"Reception only"*.
   - Live real-time preview of the personalized link and bilingual WhatsApp message.
   - One-tap buttons: **Send on WhatsApp**, **Share (Web Share API)**, **Copy Link**, and **Open Preview**.
   - Remembers the last 30 generated invites in localStorage with "Sent" status toggling and "Export List" backup.

6. **Full Event Schedule & Integrations**
   - **Gaye Holud**: Wednesday, 23 December 2026, After Maghrib (6:30 PM for calendar).
   - **The Wedding**: Friday, 25 December 2026, 2:00 PM. Displays *"Venue to be announced / স্থান পরে জানানো হবে"* with disabled Google Maps button until venue is finalized.
   - **Reception & Walima**: Sunday, 27 December 2026, 2:00 PM.
   - **Add to Calendar (.ics)** generator downloads standard calendar events compatible with Apple Calendar, Google Calendar, and Outlook.
   - **Direct Call buttons** for family contacts.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Running
```bash
# 1. Clone or navigate to the directory
cd "wedding card"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev

# 4. Open in your browser:
# http://127.0.0.1:5173/
```

### Production Build
```bash
npm run build
# The optimized static build will be generated in the /dist folder.
```

---

## 📝 Customization Guide: Editing Details in ONE Place

All text content, dates, names, links, message templates, and TODO placeholders live in **`src/data/content.js`**. You do **not** need to touch any React components to customize details!

### 1. Update Couple & Parents' Names
Open `src/data/content.js` and locate the `groom` and `bride` sections:
```javascript
groom: {
  name: { en: "Sakib Hassan Prangon", bn: "সাকিব হাসান প্রাঙ্গন" },
  parents: {
    en: "Mr. [Father Name] & Mrs. [Mother Name]",
    bn: "জনাব [বাবার নাম] ও বেগম [মায়ের নাম]"
  }
}
```

### 2. Update Wedding Venue when Finalized
In `src/data/content.js`, find the `wedding` event under `events`:
```javascript
// Change isVenueTBA to false and enter your booked venue details:
isVenueTBA: false,
venueName: {
  en: "Grand Ballroom, Senakunja",
  bn: "গ্র্যান্ড বলরুম, সেনাকুঞ্জ"
},
venueAddress: {
  en: "Dhaka Cantonment, Dhaka",
  bn: "ঢাকা সেনানিবাস, ঢাকা"
},
mapUrl: "https://maps.google.com/?q=Senakunja+Dhaka"
```

### 3. Update WhatsApp RSVP & Contact Phone Numbers
In `src/data/content.js`:
- `rsvpWhatsAppNumber`: `"8801791164440"` (digits only, no `+` sign or spaces).
- `contactPersons`: Update phone numbers and names for both families.
- `travelNotes`: Update stay assistance phone numbers and hotel recommendations.

---

## 🖼 How to Replace Images and Audio

Place your real images in the `public/images/` folder with these exact filenames:
- `child-groom.webp`: Photograph/illustration of Sakib as a child.
- `child-bride.webp`: Photograph/illustration of Easha as a child.
- `adult-groom.webp`: Photograph of Sakib Hassan Prangon.
- `adult-bride.webp`: Photograph of Easha Mahmud Bhabna.
- `couple-together.webp`: Beautiful photograph of Sakib & Easha together.
- `card-cover.webp` (Optional): Custom card cover artwork.

> **Tip:** The application includes SVG vector placeholders that render automatically if `.webp` images are not present.

### How to Replace Background Music
- Place your audio file at `public/audio/bg.mp3`.
- A gentle Indian classical pentatonic melody is pre-packaged as a fallback.

---

## ⚡ How to Create and Send a Personal Invite in 10 Seconds

1. Open `/#/invite-maker` in your browser (e.g. `https://your-site.netlify.app/#/invite-maker`).
2. Enter the passcode: `change-me` (configurable in `content.js`).
3. Enter the guest's name in Bengali and/or English (e.g., `রহিম ও পরিবার` / `Rahim & Family`).
4. Tap an event shortcut button:
   - **All three**: Holud + Wedding + Reception (`hwr`)
   - **Holud + Reception**: For guests not attending the main wedding ceremony (`hr`)
   - **Reception only**: For reception-only guests (`r`)
5. Adjust max attending guests (1 to 20).
6. Tap **"WhatsApp"** or **"Copy Link"**:
   - Tapping WhatsApp opens a pre-composed message with the guest's personal link ready to send!
7. The invite is automatically saved in your **Recent Invites** list below, where you can mark it as sent or resend anytime.

---

## 🌐 Free Deployment to Netlify (Step-by-Step)

### Method 1: Instant Drag-and-Drop (Easiest & Fastest — No Git needed)
1. Run the build command in terminal:
   ```bash
   npm run build
   ```
2. Log in to [app.netlify.com](https://app.netlify.com/) (create a free account if you don't have one).
3. Go to the **Sites** tab.
4. Drag and drop the `dist` folder directly onto the Netlify dashboard upload area.
5. In 10 seconds, your site is live with a free `https://random-name.netlify.app` URL!
6. Click **Site configuration** > **Change site name** to set a custom domain like `sakib-weds-easha.netlify.app`.

### Method 2: Git / GitHub Deployment (Automatic Updates)
1. Initialize a git repository and commit all files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Sakib & Easha Wedding E-Invitation"
   ```
2. Push to GitHub, GitLab, or Bitbucket.
3. On Netlify, click **Add new site** > **Import an existing project**.
4. Select your GitHub repository.
5. The `netlify.toml` file included in this project will automatically configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **SPA redirects**: `/*` to `/index.html` (Status 200)
   - Asset caching & security headers.
6. Click **Deploy Site**. Every time you push changes to GitHub, Netlify will build and deploy automatically!

---

## 📱 Mobile Reliability & Performance Checklist

- **100svh/dvh**: Responsive viewports prevent layout shift when mobile address bars expand/collapse.
- **Low-end Device Detection**: Reduces canvas particles on low-RAM/low-core mobile devices.
- **prefers-reduced-motion**: Supported across all animations.
- **Safe-area padding**: `pb-safe` and `pt-safe` support iOS notch and navigation pill bars.
- **Touch targets**: All interactive buttons are >= 44px for effortless tapping on phones.
- **SEO & Social Previews**: Open Graph metadata configured for rich WhatsApp/Facebook link previews (`Sakib ❤ Easha | Wedding Invitation / বিবাহের আমন্ত্রণ`).
- **Private Invitation**: `robots` meta set to `noindex, nofollow`.

---

*Made with love for Sakib Hassan Prangon & Easha Mahmud Bhabna • December 2026*
