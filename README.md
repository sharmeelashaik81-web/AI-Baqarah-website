# Al-Baqarah – Read, Understand & Reflect
### The Noble Quran (Surah 2: 286 Verses • Madani Revelation)

A premium, authentic Islamic web application for reading, listening to, understanding, and reflecting upon **Surah Al-Baqarah**.

---

## 🌟 Core Highlights & Non-AI Data Guarantee

- **100% Original Quranic Arabic (Uthmani Script):** Preserved directly from verified King Fahd Complex datasets.
- **Published English Translations Only:** Strict zero-AI policy. Translations are fetched directly from authorized publications:
  - **Saheeh International** (Published by Dar Abul-Qasim, Saudi Arabia)
  - **The Clear Qur'an** (Published Translation by Talal Itani)
  - **Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan** (Published by King Fahd Complex, Madinah)
  - **Abdullah Yusuf Ali** (Historical Standard Published Translation)
  - **Mohammed Marmaduke Pickthall** (The Meaning of the Glorious Quran)
- **Authentic Audio Recitations:** High-fidelity studio recitations for every verse from renowned Qaris:
  - Sheikh Mishary Rashid Alafasy
  - Sheikh Abdul Basit Abdul Samad (Murattal)
  - Sheikh Mahmoud Khalil Al-Husary
  - Sheikh Mohamed Siddiq El-Minshawi
  - Sheikh Abu Bakr Al-Shatri
- **Offline Reliability:** Verified fallback dataset bundled directly into `public/data/surah_al_baqarah.json`.

---

## 📖 Features Overview

### 1. Ayah Reader (3 Distinct View Modes)
- **Card View:** Comprehensive breakdown of each Ayah with Arabic script, phonetics/transliteration, published English translation, and verified citation.
- **Focus Mode:** Single-verse distraction-free reading with keyboard navigation (`←` / `→` arrows, `Spacebar` to play).
- **Mushaf Flow:** Traditional continuous text flow with interactive ornamental verse end markers and floating translation drawer.
- **Interactive Controls:** Play Audio, Bookmark verse, Copy to clipboard (formatted with citation), Share verse, Filter by Juz (1–3) or Ruku (1–40).

### 2. Search Engine
- High-speed substring search over all 286 verses.
- Search by **Ayah Number** (e.g. `255`, `2:286`), **English Keywords** (e.g. `patience`, `throne`, `charity`), or **Arabic Script**.
- Real-time match highlighting.

### 3. Audio Player Engine
- Persistent bottom audio player on desktop and mobile.
- Waveform audio visualizer animation synced with active playback.
- Scrub bar with seek support, elapsed/total time, volume slider with mute toggle, playback speed (0.75x–1.5x), repeat modes (Single Ayah, Whole Surah), and continuous auto-advance.

### 4. Bookmarks & Reading Progress
- LocalStorage persistence for saved verses and last-read marker.
- "Continue Reading" quick-resume cards on Home and Sidebar.
- Export all bookmarked verses to clipboard.

### 5. Settings & Customization
- Arabic font size slider (Small to 2X-Large).
- English translation font size (Compact to Spacious).
- Arabic calligraphy style (`Amiri Naskh` vs `Scheherazade New`).
- Transliteration toggle (Show/Hide).
- Color Theme switcher (Islamic Emerald Dark vs Clean Daylight).

### 6. Surah Information & Thematic Breakdown
- Surah metadata (286 Ayahs, 40 Rukus, 3 Juzs, 6,144 words, Madani revelation).
- Authentic virtues with citations from **Sahih Muslim**, **Sahih Al-Bukhari**, and **Jami' at-Tirmidhi**.
- 7-Part structural thematic breakdown with 1-click jump to key verses.

---

## 💻 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS + Tailwind CSS (Custom Islamic Emerald & Gold Color Tokens)
- **Icons:** Lucide React
- **Data Source:** AlQuran Cloud API & Quran Foundation verified datasets
- **Storage:** Browser LocalStorage

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
