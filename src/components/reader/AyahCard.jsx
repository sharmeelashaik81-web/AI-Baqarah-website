import React, { useState } from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../../context/QuranContext';
import { 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Share2, 
  Check, 
  Sparkles, 
  Volume2,
  Info,
  BookOpen
} from 'lucide-react';

export default function AyahCard({ ayah, index }) {
  const {
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
    selectedReciter,
    updateLastRead
  } = useQuran();

  const [copied, setCopied] = useState(false);

  const isCurrentAyah = currentAyahNumber === ayah.numberInSurah;
  const isCurrentlyPlaying = isCurrentAyah && isPlaying;
  const bookmarked = isBookmarked(ayah.numberInSurah);

  // Translation data
  const translationObj = ayah.translations?.[selectedTranslation] || ayah.translations?.sahih;
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  // Font size classes
  const arabicSizeClasses = {
    sm: 'text-2xl sm:text-3xl leading-[2.2]',
    md: 'text-3xl sm:text-4xl leading-[2.3]',
    lg: 'text-3xl sm:text-4xl lg:text-5xl leading-[2.4]',
    xl: 'text-4xl sm:text-5xl lg:text-6xl leading-[2.5]',
    '2xl': 'text-5xl sm:text-6xl lg:text-7xl leading-[2.6]',
  };

  const englishSizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed',
  };

  const arabicFontFamilyClass = arabicFontFamily === 'scheherazade' ? 'font-arabic-scheherazade' : 'font-arabic-text';

  const handleCopy = async () => {
    const ok = await copyAyah(ayah);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlayToggle = () => {
    playAyah(ayah.numberInSurah);
  };

  return (
    <article
      id={`ayah-${ayah.numberInSurah}`}
      className={`rounded-2xl sm:rounded-3xl transition-all duration-300 p-5 sm:p-7 md:p-8 relative border ${
        isCurrentAyah
          ? 'bg-gradient-to-b from-emerald-50/90 to-white dark:from-[#0d281e] dark:to-[#091812] border-emerald-500/80 dark:border-emerald-500 ayah-playing'
          : 'bg-white dark:bg-[#0c1e17] border-slate-200/80 dark:border-emerald-950/70 hover:border-emerald-300 dark:hover:border-emerald-800/80 shadow-sm hover:shadow-md'
      }`}
      onMouseEnter={() => updateLastRead(ayah.numberInSurah)}
    >
      {/* Top Ayah Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-emerald-950/70">
        
        {/* Left: Ayah Badge & Details */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Ayah Number Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs shadow-inner">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
              AYAH
            </span>
            <span className="text-sm">{ayah.numberInSurah}</span>
          </div>

          {/* Surah & Quran Coordinates */}
          <span className="text-xs text-slate-400 dark:text-emerald-400/70">
            2:{ayah.numberInSurah}
          </span>

          <span className="text-slate-300 dark:text-emerald-900">•</span>
          
          <span className="text-xs text-slate-500 dark:text-emerald-400/80 font-medium">
            Juz {ayah.juz}
          </span>

          <span className="text-slate-300 dark:text-emerald-900">•</span>

          <span className="text-xs text-slate-500 dark:text-emerald-400/80 font-medium">
            Ruku {ayah.ruku}
          </span>

          {/* Key Verse Highlight Badge */}
          {ayah.keyVerseTitle && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-50 dark:bg-gold-950/40 border border-gold-300/60 dark:border-gold-700/50 text-gold-800 dark:text-gold-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>{ayah.keyVerseTitle}</span>
            </div>
          )}
        </div>

        {/* Right: Quick Actions Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Play Audio Button */}
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isCurrentlyPlaying
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                : isCurrentAyah
                ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-600 hover:text-white'
                : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white'
            }`}
            title={isCurrentlyPlaying ? 'Pause recitation' : 'Play Ayah recitation'}
          >
            {isCurrentlyPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                <span>Play Audio</span>
              </>
            )}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(ayah.numberInSurah)}
            className={`p-2 rounded-xl border text-xs transition-all ${
              bookmarked
                ? 'bg-gold-50 dark:bg-gold-950/50 border-gold-300 dark:border-gold-700 text-gold-600 dark:text-gold-400 font-bold'
                : 'bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-500 dark:text-emerald-400 hover:text-gold-500 hover:border-gold-300'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Ayah'}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-gold-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`p-2 rounded-xl border text-xs transition-all ${
              copied
                ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-400 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-300'
            }`}
            title="Copy Arabic & English Translation"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={() => shareAyah(ayah)}
            className="p-2 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-300 transition-all"
            title="Share this Ayah"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. ORIGINAL ARABIC TEXT */}
      <div className="mb-6 pt-2">
        <p
          className={`${arabicFontFamilyClass} ${arabicSizeClasses[arabicFontSize] || arabicSizeClasses.lg} text-slate-900 dark:text-emerald-50 text-right select-text font-normal tracking-wide`}
          dir="rtl"
        >
          {ayah.arabic}
          {/* Ornamental Ayah End Marker */}
          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mx-2 rounded-full border border-emerald-400/40 dark:border-emerald-500/30 text-emerald-700 dark:text-gold-300 text-xs sm:text-sm font-sans font-bold align-middle select-none bg-emerald-50/50 dark:bg-emerald-950/30">
            {ayah.numberInSurah}
          </span>
        </p>
      </div>

      {/* 2. TRANSLITERATION (if enabled) */}
      {showTransliteration && ayah.transliteration && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-slate-50/80 dark:bg-emerald-950/30 border-l-2 border-emerald-500/60 dark:border-emerald-500">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-emerald-400/80 mb-1">
            Transliteration
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-emerald-200/90 italic leading-relaxed font-serif">
            {ayah.transliteration}
          </p>
        </div>
      )}

      {/* 3. EXACT PUBLISHED ENGLISH TRANSLATION */}
      <div className="pt-2">
        {/* Clear Published Translation Source Label */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-xs font-bold text-slate-500 dark:text-emerald-400/90 flex items-center gap-1.5">
            <span>English Translation:</span>
            <span className="text-emerald-700 dark:text-gold-400 font-semibold underline decoration-emerald-500/30">
              {translatorMeta.name}
            </span>
          </div>

          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-emerald-950 text-slate-500 dark:text-emerald-400 font-medium">
            {translatorMeta.badge}
          </span>
        </div>

        {/* Translation Body */}
        <p className={`${englishSizeClasses[englishFontSize] || englishSizeClasses.md} text-slate-800 dark:text-slate-100 font-normal leading-relaxed`}>
          {translationObj?.text || 'English translation is currently unavailable.'}
        </p>

        {/* Explicit Citation footnote */}
        <div className="mt-3 text-[11px] text-slate-400 dark:text-emerald-500/60 flex items-center gap-1">
          <Info className="w-3 h-3" />
          <span>Source: {translationObj?.source || translatorMeta.description}</span>
        </div>
      </div>

    </article>
  );
}
