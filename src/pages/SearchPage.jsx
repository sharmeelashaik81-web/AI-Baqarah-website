import React, { useState, useMemo } from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../context/QuranContext';
import { 
  Search, 
  X, 
  Sparkles, 
  BookOpen, 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Share2, 
  Layers, 
  Filter,
  Check
} from 'lucide-react';

export default function SearchPage() {
  const { 
    surahData, 
    navigateToAyah, 
    playAyah, 
    currentAyahNumber, 
    isPlaying,
    selectedTranslation,
    setSelectedTranslation,
    toggleBookmark,
    isBookmarked,
    copyAyah,
    shareAyah
  } = useQuran();

  const [query, setQuery] = useState('');
  const [filterJuz, setFilterJuz] = useState('all');
  const [searchTarget, setSearchTarget] = useState('all'); // all | english | arabic | ayahNumber

  const ayahs = surahData?.ayahs || [];
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  // Pure exact matching search algorithm (NO AI semantic synthesis)
  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const isNum = /^\d+$/.test(trimmed) || /^2:\d+$/.test(trimmed);
    const targetNum = isNum ? parseInt(trimmed.replace('2:', ''), 10) : null;

    const lowerQuery = trimmed.toLowerCase();

    return ayahs.filter((ayah) => {
      // Juz filter
      if (filterJuz !== 'all' && ayah.juz !== parseInt(filterJuz, 10)) {
        return false;
      }

      // 1. Ayah Number match
      if (targetNum !== null) {
        return ayah.numberInSurah === targetNum;
      }

      const translation = ayah.translations?.[selectedTranslation] || ayah.translations?.sahih;
      const englishText = (translation?.text || '').toLowerCase();
      const transliterationText = (ayah.transliteration || '').toLowerCase();
      const arabicText = ayah.arabic || '';
      const keyVerseTitle = (ayah.keyVerseTitle || '').toLowerCase();

      if (searchTarget === 'english') {
        return englishText.includes(lowerQuery) || transliterationText.includes(lowerQuery) || keyVerseTitle.includes(lowerQuery);
      } else if (searchTarget === 'arabic') {
        return arabicText.includes(trimmed);
      } else {
        return (
          englishText.includes(lowerQuery) ||
          transliterationText.includes(lowerQuery) ||
          arabicText.includes(trimmed) ||
          keyVerseTitle.includes(lowerQuery)
        );
      }
    });
  }, [query, ayahs, filterJuz, searchTarget, selectedTranslation]);

  // Highlight matches helper
  const highlightText = (text, highlight) => {
    if (!highlight || !text) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="bg-gold-200 dark:bg-gold-900/70 text-slate-900 dark:text-gold-100 rounded px-1 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const sampleSearches = [
    'Patience',
    'Ayat al-Kursi',
    'Ramadan',
    'Forgiveness',
    'Charity',
    '255',
    '286',
    'ٱللَّهُ'
  ];

  return (
    <div className="space-y-6 pb-28">
      
      {/* Header & Search Input Box */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Exact Text Search Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-emerald-50">
            Search Surah Al-Baqarah
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-400/80 mt-1">
            Search 286 verses by Ayah number, Arabic text, or published English translation.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords (e.g., 'patience', 'prayer', 'throne', '255', 'ٱللَّهُ')..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/60 text-slate-900 dark:text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base font-medium transition"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Options & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            
            {/* Target Radio Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50">
              <button
                onClick={() => setSearchTarget('all')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  searchTarget === 'all'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm'
                    : 'text-slate-500 dark:text-emerald-300'
                }`}
              >
                All Fields
              </button>
              <button
                onClick={() => setSearchTarget('english')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  searchTarget === 'english'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm'
                    : 'text-slate-500 dark:text-emerald-300'
                }`}
              >
                English Translation
              </button>
              <button
                onClick={() => setSearchTarget('arabic')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  searchTarget === 'arabic'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm'
                    : 'text-slate-500 dark:text-emerald-300'
                }`}
              >
                Arabic Text
              </button>
            </div>

            {/* Juz Filter & Translation */}
            <div className="flex items-center gap-2">
              <select
                value={filterJuz}
                onChange={(e) => setFilterJuz(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/50 text-xs font-medium text-slate-700 dark:text-emerald-200"
              >
                <option value="all">All Juzs</option>
                <option value="1">Juz 1</option>
                <option value="2">Juz 2</option>
                <option value="3">Juz 3</option>
              </select>

              <select
                value={selectedTranslation}
                onChange={(e) => setSelectedTranslation(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/50 text-xs font-medium text-slate-700 dark:text-emerald-200"
              >
                {TRANSLATION_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Search Tag Suggestions */}
          {!query && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] text-slate-400 dark:text-emerald-400 font-semibold mr-1">
                Popular Searches:
              </span>
              {sampleSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-medium transition"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Search Results Summary */}
      {query && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm font-semibold text-slate-700 dark:text-emerald-300">
            {searchResults.length > 0 ? (
              <span>Found <strong className="text-emerald-600 dark:text-gold-400">{searchResults.length}</strong> matching {searchResults.length === 1 ? 'verse' : 'verses'}</span>
            ) : (
              <span>No verses found matching "{query}"</span>
            )}
          </div>
          <div className="text-xs text-slate-400 dark:text-emerald-500/70">
            Translation: {translatorMeta.name}
          </div>
        </div>
      )}

      {/* Results List */}
      {query && searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((ayah) => {
            const isPlayingThis = currentAyahNumber === ayah.numberInSurah && isPlaying;
            const translation = ayah.translations?.[selectedTranslation] || ayah.translations?.sahih;
            const bookmarked = isBookmarked(ayah.numberInSurah);

            return (
              <article
                key={ayah.numberInSurah}
                className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-5 sm:p-7 shadow-sm hover:shadow-md transition"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-emerald-950">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                      Ayah 2:{ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-emerald-400/80">
                      Juz {ayah.juz} • Ruku {ayah.ruku}
                    </span>
                    {ayah.keyVerseTitle && (
                      <span className="text-xs px-2 py-0.5 rounded bg-gold-50 dark:bg-gold-950 text-gold-700 dark:text-gold-300 font-semibold hidden sm:inline-block">
                        {ayah.keyVerseTitle}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => playAyah(ayah.numberInSurah)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow"
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      <span>{isPlayingThis ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className={`p-1.5 rounded-xl border text-xs ${
                        bookmarked ? 'bg-gold-50 dark:bg-gold-950 text-gold-500 border-gold-400' : 'bg-slate-50 dark:bg-emerald-950/40 text-slate-500 border-slate-200 dark:border-emerald-900/40'
                      }`}
                      title="Bookmark"
                    >
                      {bookmarked ? <BookmarkCheck className="w-4 h-4 fill-gold-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => copyAyah(ayah)}
                      className="p-1.5 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-500 hover:text-emerald-600"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigateToAyah(ayah.numberInSurah)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 hover:bg-emerald-100 text-slate-700 dark:text-emerald-200 text-xs font-bold"
                    >
                      Open in Reader
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="my-4 text-right" dir="rtl">
                  <p className="font-arabic-text text-2xl sm:text-3xl text-slate-900 dark:text-emerald-50 leading-[2.2]">
                    {highlightText(ayah.arabic, query)}
                    <span className="inline-flex items-center justify-center w-8 h-8 mx-2 rounded-full border border-emerald-400/40 text-emerald-800 dark:text-gold-300 text-xs font-sans font-bold align-middle bg-emerald-50/60 dark:bg-emerald-950/40">
                      {ayah.numberInSurah}
                    </span>
                  </p>
                </div>

                {/* English Translation */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 dark:text-emerald-400 mb-1">
                    English Translation ({translatorMeta.name}):
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed">
                    {highlightText(translation?.text, query)}
                  </p>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* Empty State when searched and zero results */}
      {query && searchResults.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 max-w-lg mx-auto">
          <Search className="w-12 h-12 text-slate-300 dark:text-emerald-700 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-900 dark:text-emerald-100 mb-1">
            No Verses Matched "{query}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Try checking spelling, trying synonymous terms, searching by Ayah number (e.g. "255"), or switching the search filter to "All Fields".
          </p>
          <button
            onClick={() => setQuery('')}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
}
