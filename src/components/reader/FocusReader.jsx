import React, { useEffect } from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../../context/QuranContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Share2, 
  Sparkles,
  RotateCcw,
  Info
} from 'lucide-react';

export default function FocusReader({ currentAyahIndex, onSelectAyah }) {
  const {
    surahData,
    currentAyahNumber,
    isPlaying,
    playAyah,
    toggleBookmark,
    isBookmarked,
    copyAyah,
    shareAyah,
    arabicFontSize,
    englishFontSize,
    arabicFontFamily,
    showTransliteration,
    selectedTranslation,
    updateLastRead
  } = useQuran();

  const ayahNum = currentAyahIndex || 1;
  const ayah = surahData?.ayahs?.[ayahNum - 1];

  useEffect(() => {
    updateLastRead(ayahNum);
  }, [ayahNum]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        if (ayahNum > 1) onSelectAyah(ayahNum - 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        if (ayahNum < 286) onSelectAyah(ayahNum + 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        playAyah(ayahNum);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ayahNum, onSelectAyah, playAyah]);

  if (!ayah) return null;

  const isCurrentPlaying = currentAyahNumber === ayahNum && isPlaying;
  const bookmarked = isBookmarked(ayahNum);
  const translationObj = ayah.translations?.[selectedTranslation] || ayah.translations?.sahih;
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  const arabicSizeClasses = {
    sm: 'text-3xl md:text-4xl leading-[2.4]',
    md: 'text-4xl md:text-5xl leading-[2.5]',
    lg: 'text-4xl md:text-6xl leading-[2.6]',
    xl: 'text-5xl md:text-7xl leading-[2.7]',
    '2xl': 'text-6xl md:text-8xl leading-[2.8]',
  };

  const arabicFontFamilyClass = arabicFontFamily === 'scheherazade' ? 'font-arabic-scheherazade' : 'font-arabic-text';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Focus Mode Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 px-4">
        <button
          onClick={() => onSelectAyah(Math.max(1, ayahNum - 1))}
          disabled={ayahNum <= 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950 text-slate-700 dark:text-emerald-200 disabled:opacity-30 hover:border-emerald-500 transition font-semibold text-sm shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Ayah</span>
        </button>

        <div className="text-center">
          <div className="text-sm font-bold text-slate-900 dark:text-emerald-100">
            Ayah {ayahNum} of 286
          </div>
          <div className="text-xs text-slate-400 dark:text-emerald-400/70">
            Juz {ayah.juz} • Ruku {ayah.ruku}
          </div>
        </div>

        <button
          onClick={() => onSelectAyah(Math.min(286, ayahNum + 1))}
          disabled={ayahNum >= 286}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950 text-slate-700 dark:text-emerald-200 disabled:opacity-30 hover:border-emerald-500 transition font-semibold text-sm shadow-sm"
        >
          <span>Next Ayah</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Single Ayah Card */}
      <div className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Key Verse Highlight Badge */}
        {ayah.keyVerseTitle && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/40 border border-gold-300/60 text-gold-800 dark:text-gold-300 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>{ayah.keyVerseTitle}</span>
          </div>
        )}

        {/* Focus Mode Arabic Text */}
        <div className="my-8 text-center sm:text-right" dir="rtl">
          <p className={`${arabicFontFamilyClass} ${arabicSizeClasses[arabicFontSize] || arabicSizeClasses.lg} text-slate-900 dark:text-emerald-50 font-normal`}>
            {ayah.arabic}
            <span className="inline-flex items-center justify-center w-12 h-12 mx-3 rounded-full border-2 border-emerald-400/40 dark:border-emerald-500/40 text-emerald-800 dark:text-gold-300 text-base font-sans font-bold align-middle select-none bg-emerald-50/70 dark:bg-emerald-950/50 shadow-inner">
              {ayah.numberInSurah}
            </span>
          </p>
        </div>

        {/* Transliteration */}
        {showTransliteration && ayah.transliteration && (
          <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-emerald-400 mb-1">
              Transliteration
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-emerald-200/90 italic font-serif">
              {ayah.transliteration}
            </p>
          </div>
        )}

        {/* Published English Translation */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-950/80">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-emerald-400">
              English Translation: <span className="text-emerald-700 dark:text-gold-400 underline">{translatorMeta.name}</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
              Published & Verified
            </span>
          </div>
          <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
            {translationObj?.text || 'English translation is currently unavailable.'}
          </p>
          <div className="mt-3 text-xs text-slate-400 dark:text-emerald-500/60 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>{translationObj?.source || translatorMeta.description}</span>
          </div>
        </div>

        {/* Bottom Actions Toolbar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-950/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => playAyah(ayahNum)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
            >
              {isCurrentPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isCurrentPlaying ? 'Pause Audio' : 'Play Ayah'}</span>
            </button>
            <button
              onClick={() => toggleBookmark(ayahNum)}
              className={`p-2.5 rounded-xl border transition ${
                bookmarked
                  ? 'bg-gold-50 dark:bg-gold-950/50 border-gold-400 text-gold-500'
                  : 'bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-emerald-300'
              }`}
              title="Bookmark"
            >
              {bookmarked ? <BookmarkCheck className="w-5 h-5 fill-gold-500" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={() => copyAyah(ayah)}
              className="p-2.5 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-emerald-300 hover:text-emerald-600 transition"
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={() => shareAyah(ayah)}
              className="p-2.5 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-emerald-300 hover:text-emerald-600 transition"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-slate-400 dark:text-emerald-500/70 hidden sm:block">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-emerald-950 border border-slate-300 dark:border-emerald-800 font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-emerald-950 border border-slate-300 dark:border-emerald-800 font-mono">→</kbd> keys to navigate
          </div>
        </div>

      </div>
    </div>
  );
}
