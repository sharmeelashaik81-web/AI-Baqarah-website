import React, { useState } from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../../context/QuranContext';
import { Play, Pause, Bookmark, BookmarkCheck, Copy, Info, X, Volume2 } from 'lucide-react';

export default function MushafView({ ayahs }) {
  const {
    currentAyahNumber,
    isPlaying,
    playAyah,
    toggleBookmark,
    isBookmarked,
    copyAyah,
    arabicFontSize,
    arabicFontFamily,
    selectedTranslation,
    updateLastRead
  } = useQuran();

  const [activeHoverAyah, setActiveHoverAyah] = useState(null);

  const arabicSizeClasses = {
    sm: 'text-2xl sm:text-3xl leading-[2.6]',
    md: 'text-3xl sm:text-4xl leading-[2.7]',
    lg: 'text-3xl sm:text-5xl leading-[2.8]',
    xl: 'text-4xl sm:text-6xl leading-[3.0]',
    '2xl': 'text-5xl sm:text-7xl leading-[3.2]',
  };

  const arabicFontFamilyClass = arabicFontFamily === 'scheherazade' ? 'font-arabic-scheherazade' : 'font-arabic-text';
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  const selectedAyahObj = activeHoverAyah ? ayahs.find(a => a.numberInSurah === activeHoverAyah) : null;
  const translationObj = selectedAyahObj?.translations?.[selectedTranslation] || selectedAyahObj?.translations?.sahih;

  return (
    <div className="relative">
      {/* Mushaf Page Container */}
      <div className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-10 md:p-14 shadow-xl">
        
        {/* Bismillah Header */}
        <div className="text-center pb-10 mb-8 border-b border-slate-100 dark:border-emerald-950">
          <div className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold mb-3">
            سُورَةُ البَقَرَة – Al-Baqarah
          </div>
          <div className="font-arabic text-3xl sm:text-4xl text-slate-900 dark:text-emerald-50" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>

        {/* Continuous Flow Text */}
        <div 
          className={`${arabicFontFamilyClass} ${arabicSizeClasses[arabicFontSize] || arabicSizeClasses.lg} text-slate-900 dark:text-emerald-50 text-justify text-right select-text`}
          dir="rtl"
        >
          {ayahs.map((ayah) => {
            const isPlayingThis = currentAyahNumber === ayah.numberInSurah && isPlaying;
            const isSelected = activeHoverAyah === ayah.numberInSurah;
            const isCurrent = currentAyahNumber === ayah.numberInSurah;

            return (
              <span 
                key={ayah.numberInSurah}
                className={`transition-colors duration-200 rounded px-1 cursor-pointer ${
                  isPlayingThis
                    ? 'bg-emerald-200/70 dark:bg-emerald-900/90 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500'
                    : isCurrent
                    ? 'bg-emerald-100/60 dark:bg-emerald-950/70'
                    : isSelected
                    ? 'bg-gold-100/70 dark:bg-gold-950/50'
                    : 'hover:bg-slate-100 dark:hover:bg-emerald-950/40'
                }`}
                onClick={() => {
                  setActiveHoverAyah(ayah.numberInSurah);
                  updateLastRead(ayah.numberInSurah);
                }}
              >
                <span>{ayah.arabic}</span>
                
                {/* Inline Ayah End Marker */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAyah(ayah.numberInSurah);
                  }}
                  title={`Ayah ${ayah.numberInSurah} (Click to play)`}
                  className={`inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 mx-1.5 rounded-full border text-xs sm:text-sm font-sans font-bold align-middle select-none transition ${
                    isPlayingThis
                      ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse shadow-md'
                      : isBookmarked(ayah.numberInSurah)
                      ? 'bg-gold-50 dark:bg-gold-950 border-gold-400 text-gold-600 dark:text-gold-300'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300/60 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {ayah.numberInSurah}
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* Floating Translation Inspection Drawer */}
      {selectedAyahObj && (
        <div className="fixed bottom-24 lg:bottom-20 left-4 right-4 sm:left-auto sm:right-10 sm:max-w-md bg-white/95 dark:bg-[#07130e]/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-800 p-5 shadow-2xl z-40 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-950">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-emerald-100">
                Ayah 2:{selectedAyahObj.numberInSurah}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                Juz {selectedAyahObj.juz}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => playAyah(selectedAyahObj.numberInSurah)}
                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                title="Play"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
              <button
                onClick={() => toggleBookmark(selectedAyahObj.numberInSurah)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-300"
                title="Bookmark"
              >
                {isBookmarked(selectedAyahObj.numberInSurah) ? (
                  <BookmarkCheck className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => setActiveHoverAyah(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[11px] font-bold text-slate-400 dark:text-emerald-400 mb-1">
              Translation ({translatorMeta.name}):
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-h-48 overflow-y-auto">
              {translationObj?.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
