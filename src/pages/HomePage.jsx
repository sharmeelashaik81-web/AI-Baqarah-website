import React, { useState, useEffect } from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../context/QuranContext';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Share2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Layers, 
  Volume2, 
  Info,
  Calendar,
  Search,
  BookMarked
} from 'lucide-react';

export default function HomePage() {
  const { 
    surahData, 
    lastReadAyah, 
    navigateToAyah, 
    bookmarks,
    playAyah, 
    currentAyahNumber,
    isPlaying,
    copyAyah,
    shareAyah,
    selectedTranslation,
    setActivePage
  } = useQuran();

  // Featured Ayah (defaults to Ayat al-Kursi #255 or rotates daily)
  const [featuredAyahNum, setFeaturedAyahNum] = useState(255);

  const featuredAyah = surahData?.ayahs?.[featuredAyahNum - 1];
  const lastReadAyahObj = surahData?.ayahs?.[lastReadAyah - 1];
  const progressPercent = Math.min(100, Math.round((lastReadAyah / 286) * 100));

  const translationObj = featuredAyah?.translations?.[selectedTranslation] || featuredAyah?.translations?.sahih;
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  const isFeaturedPlaying = currentAyahNumber === featuredAyahNum && isPlaying;

  const keyVerses = [
    { num: 1, title: 'Opening (Alif Lam Meem)', desc: 'The Book containing no doubt, guidance for the mindful' },
    { num: 30, title: 'Creation of Adam', desc: 'Divine appointment of humanity as custodians on Earth' },
    { num: 143, title: 'The Middle Nation', desc: 'The balanced community as witnesses over humankind' },
    { num: 153, title: 'Patience & Prayer', desc: 'Seeking divine assistance during hardship and loss' },
    { num: 183, title: 'Obligation of Fasting', desc: 'Ramadan, the month of Quranic revelation and Taqwa' },
    { num: 255, title: 'Ayat al-Kursi', desc: 'The greatest verse of the Quran: The Divine Throne & Sovereign Majesty' },
    { num: 282, title: 'Verse of Debt', desc: 'The longest verse of the Quran: Financial integrity and legal contracts' },
    { num: 285, title: 'Amanar-Rasul (285-286)', desc: 'The noble creed, divine mercy, and the ultimate supplication' },
  ];

  const virtues = [
    {
      title: 'Protection of the Home',
      text: 'The Prophet ﷺ said: "Do not turn your houses into graveyards. Indeed, Satan flees from a house in which Surah Al-Baqarah is recited."',
      source: 'Sahih Muslim 780'
    },
    {
      title: 'Crown of the Quran (Pinnacle)',
      text: 'The Prophet ﷺ said: "Everything has a pinnacle, and the pinnacle of the Quran is Surah Al-Baqarah. Whoever recites it in his house by night, Satan will not enter it for three nights."',
      source: 'Sunan At-Tirmidhi / Ibn Hibban'
    },
    {
      title: 'Two Radiant Clouds on Judgment Day',
      text: 'The Prophet ﷺ said: "Recite the two radiant ones: Al-Baqarah and Al-Imran, for they will come on the Day of Resurrection like two clouds shading their companions."',
      source: 'Sahih Muslim 804'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-[#021810] text-white p-6 sm:p-10 md:p-14 shadow-2xl border border-emerald-800/60">
        {/* Background Islamic geometric pattern effect */}
        <div className="absolute inset-0 bg-arabesque opacity-30 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Chapter 2 of 114
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 text-xs font-semibold">
              Madani Revelation
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 text-xs font-semibold">
              286 Ayahs • 40 Rukus
            </span>
          </div>

          {/* Arabic Calligraphy Title */}
          <h1 className="font-arabic text-4xl sm:text-6xl md:text-7xl font-bold text-gold-200 leading-tight mb-2 tracking-wide drop-shadow-md" dir="rtl">
            سُورَةُ البَقَرَة
          </h1>

          {/* English Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
            Al-Baqarah – Read, Understand & Reflect
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
            Explore the pinnacle of the Noble Quran with authentic Uthmani Arabic script, verified published English translations, complete transliterations, and studio audio recitations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => navigateToAyah(lastReadAyah || 1)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center gap-2.5 transition-all transform active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              <span>{lastReadAyah > 1 ? `Continue Reading (Ayah ${lastReadAyah})` : 'Start Reading (Ayah 1)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => playAyah(lastReadAyah || 1)}
              className="px-5 py-3.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800/90 border border-emerald-700/60 text-emerald-100 font-semibold text-sm flex items-center gap-2 transition"
            >
              <Volume2 className="w-4 h-4 text-gold-400" />
              <span>Listen to Recitation</span>
            </button>

            <button
              onClick={() => setActivePage('info')}
              className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition"
            >
              Surah Overview
            </button>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE READING & STATS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Continue Reading Card */}
        <div className="md:col-span-2 bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-emerald-50">
                  Reading Progress
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-400/80">
                  Last active verse tracked via LocalStorage
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-gold-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              {progressPercent}% Completed
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 dark:bg-emerald-950 rounded-full overflow-hidden mb-4 border border-slate-200 dark:border-emerald-900">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div>
              <div className="text-xs text-slate-400 dark:text-emerald-400">Currently at:</div>
              <div className="text-sm font-bold text-slate-900 dark:text-emerald-100">
                Ayah {lastReadAyah} of 286 {lastReadAyahObj?.keyVerseTitle && `(${lastReadAyahObj.keyVerseTitle})`}
              </div>
            </div>

            <button
              onClick={() => navigateToAyah(lastReadAyah)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <span>Resume Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-emerald-50 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Surah Statistics</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/50">
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-300">286</div>
              <div className="text-[11px] text-slate-500 dark:text-emerald-400">Total Ayahs</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/50">
              <div className="text-xl font-extrabold text-gold-600 dark:text-gold-300">40</div>
              <div className="text-[11px] text-slate-500 dark:text-emerald-400">Rukus (Sections)</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/50">
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-300">3</div>
              <div className="text-[11px] text-slate-500 dark:text-emerald-400">Juz Divisions</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/50">
              <div className="text-xl font-extrabold text-gold-600 dark:text-gold-300">6,144</div>
              <div className="text-[11px] text-slate-500 dark:text-emerald-400">Quranic Words</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED AYAH CARD */}
      {featuredAyah && (
        <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100 dark:border-emerald-950">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gold-100 dark:bg-gold-950 text-gold-600 dark:text-gold-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                  Featured Verse Highlight
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
                  {featuredAyah.keyVerseTitle || `Ayah 2:${featuredAyah.numberInSurah}`}
                </h3>
              </div>
            </div>

            {/* Quick verse selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {[1, 153, 183, 255, 282, 286].map((num) => (
                <button
                  key={num}
                  onClick={() => setFeaturedAyahNum(num)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    featuredAyahNum === num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  Ayah {num}
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Script */}
          <div className="my-6 text-right" dir="rtl">
            <p className="font-arabic-text text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-emerald-50 leading-[2.3]">
              {featuredAyah.arabic}
              <span className="inline-flex items-center justify-center w-10 h-10 mx-2 rounded-full border border-emerald-400/40 text-emerald-700 dark:text-gold-300 text-sm font-sans font-bold align-middle bg-emerald-50/50 dark:bg-emerald-950/30">
                {featuredAyah.numberInSurah}
              </span>
            </p>
          </div>

          {/* Transliteration */}
          {featuredAyah.transliteration && (
            <div className="my-4 px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/30 border-l-2 border-emerald-500">
              <p className="text-sm sm:text-base text-slate-600 dark:text-emerald-200/90 italic font-serif">
                {featuredAyah.transliteration}
              </p>
            </div>
          )}

          {/* Published Translation */}
          <div className="pt-3">
            <div className="text-xs font-bold text-slate-500 dark:text-emerald-400 mb-2 flex items-center justify-between">
              <span>English Translation: <span className="text-emerald-700 dark:text-gold-400 underline">{translatorMeta.name}</span></span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                Published Translation
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed">
              {translationObj?.text}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-emerald-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => playAyah(featuredAyahNum)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition"
              >
                {isFeaturedPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                <span>{isFeaturedPlaying ? 'Pause' : 'Play Recitation'}</span>
              </button>

              <button
                onClick={() => copyAyah(featuredAyah)}
                className="p-2 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-emerald-300 hover:text-emerald-600"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={() => shareAyah(featuredAyah)}
                className="p-2 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-emerald-300 hover:text-emerald-600"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => navigateToAyah(featuredAyahNum)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View in Complete Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </section>
      )}

      {/* 4. KEY VERSES DIRECTORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-emerald-50">
              Pivotal Verses of Al-Baqarah
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-400/80">
              Essential themes, foundational laws, and comprehensive supplications
            </p>
          </div>
          <button
            onClick={() => setActivePage('reader')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>All 286 Verses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyVerses.map((kv) => (
            <div
              key={kv.num}
              onClick={() => navigateToAyah(kv.num)}
              className="p-5 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200/90 dark:border-emerald-950/80 hover:border-emerald-500 dark:hover:border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Ayah {kv.num}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {kv.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70 mt-1.5 line-clamp-2">
                  {kv.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Read & Listen</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VIRTUES FROM AUTHENTIC HADITH */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-emerald-50">
            Virtues of Surah Al-Baqarah
          </h3>
          <p className="text-xs text-slate-500 dark:text-emerald-400/80">
            Recorded in authentic Prophetic traditions (Ahadith)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {virtues.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-slate-50/80 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-emerald-100">
                    {v.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-emerald-200/90 italic leading-relaxed">
                  "{v.text}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-emerald-900/50 text-[11px] font-semibold text-gold-700 dark:text-gold-400">
                Reference: {v.source}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
