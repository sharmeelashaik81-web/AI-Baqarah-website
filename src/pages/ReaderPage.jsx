import React, { useState, useEffect, useRef } from 'react';
import { useQuran, TRANSLATION_OPTIONS, RECITERS } from '../context/QuranContext';
import AyahCard from '../components/reader/AyahCard';
import FocusReader from '../components/reader/FocusReader';
import MushafView from '../components/reader/MushafView';
import { 
  Filter, 
  Search, 
  Layers, 
  BookOpen, 
  Maximize2, 
  List, 
  Type, 
  Radio, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ArrowUp,
  Volume2
} from 'lucide-react';

export default function ReaderPage() {
  const {
    surahData,
    loading,
    error,
    retryFetch,
    targetAyahToScroll,
    setTargetAyahToScroll,
    currentAyahNumber,
    playAyah,
    isPlaying,
    viewMode,
    setViewMode,
    selectedTranslation,
    setSelectedTranslation,
    selectedReciter,
    changeReciter,
    showTransliteration,
    setShowTransliteration,
    arabicFontSize,
    setArabicFontSize,
    updateLastRead
  } = useQuran();

  // Filters
  const [selectedJuz, setSelectedJuz] = useState('all'); // all | 1 | 2 | 3
  const [selectedRuku, setSelectedRuku] = useState('all'); // all | 1..40
  const [focusAyahIndex, setFocusAyahIndex] = useState(1);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle Target Ayah scroll
  useEffect(() => {
    if (targetAyahToScroll && surahData) {
      setFocusAyahIndex(targetAyahToScroll);
      setTimeout(() => {
        const el = document.getElementById(`ayah-${targetAyahToScroll}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTargetAyahToScroll(null);
      }, 200);
    }
  }, [targetAyahToScroll, surahData]);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-emerald-300">
          Loading verified Quran text & translations...
        </p>
      </div>
    );
  }

  if (error || !surahData) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center max-w-lg mx-auto text-center p-8 bg-white dark:bg-[#0c1e17] rounded-3xl border border-rose-200 dark:border-rose-950/80 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          Unable to Load Quran Verses
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {error || 'English translation and Quran text is currently unavailable.'}
        </p>
        <button
          onClick={retryFetch}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  // Filter Ayahs by Juz & Ruku
  const allAyahs = surahData.ayahs || [];
  const filteredAyahs = allAyahs.filter((ayah) => {
    if (selectedJuz !== 'all' && ayah.juz !== parseInt(selectedJuz, 10)) {
      return false;
    }
    if (selectedRuku !== 'all' && ayah.ruku !== parseInt(selectedRuku, 10)) {
      return false;
    }
    return true;
  });

  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  const cycleFontSize = () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
    const nextIdx = (sizes.indexOf(arabicFontSize) + 1) % sizes.length;
    setArabicFontSize(sizes[nextIdx]);
  };

  return (
    <div className="space-y-6 pb-28">
      
      {/* 1. READER TOOLBAR */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-[#07130e]/95 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-emerald-950/80 p-3 sm:p-4 shadow-sm transition">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: View Mode Switches */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/40">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-500 dark:text-emerald-300/80 hover:text-slate-900'
              }`}
              title="Card View: Full verse breakdown"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Card View</span>
            </button>

            <button
              onClick={() => setViewMode('focus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'focus'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-500 dark:text-emerald-300/80 hover:text-slate-900'
              }`}
              title="Focus Mode: Single verse reading"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Focus Mode</span>
            </button>

            <button
              onClick={() => setViewMode('mushaf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'mushaf'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-500 dark:text-emerald-300/80 hover:text-slate-900'
              }`}
              title="Mushaf View: Continuous text flow"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Mushaf Flow</span>
            </button>
          </div>

          {/* Center / Right: Filters & Preferences */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Juz Filter */}
            <select
              value={selectedJuz}
              onChange={(e) => setSelectedJuz(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-xs font-medium text-slate-700 dark:text-emerald-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Juzs (1-3)</option>
              <option value="1">Juz 1 (Ayah 1-141)</option>
              <option value="2">Juz 2 (Ayah 142-252)</option>
              <option value="3">Juz 3 (Ayah 253-286)</option>
            </select>

            {/* Ruku Filter */}
            <select
              value={selectedRuku}
              onChange={(e) => setSelectedRuku(e.target.value)}
              className="hidden md:block px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-xs font-medium text-slate-700 dark:text-emerald-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Rukus (1-40)</option>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((r) => (
                <option key={r} value={r}>
                  Ruku {r}
                </option>
              ))}
            </select>

            {/* Translation Picker */}
            <select
              value={selectedTranslation}
              onChange={(e) => setSelectedTranslation(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-xs font-medium text-slate-700 dark:text-emerald-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[150px] sm:max-w-none truncate"
            >
              {TRANSLATION_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Transliteration Toggle */}
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                showTransliteration
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title="Show or hide Latin transliteration"
            >
              Translit: {showTransliteration ? 'ON' : 'OFF'}
            </button>

            {/* Font Size Quick Switcher */}
            <button
              onClick={cycleFontSize}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-bold hover:text-emerald-600 transition flex items-center gap-1"
              title="Change Arabic font size"
            >
              <Type className="w-4 h-4" />
              <span className="uppercase text-[10px]">{arabicFontSize}</span>
            </button>

          </div>

        </div>

        {/* Translation Banner Attribution */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-emerald-950/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-emerald-400/80">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700 dark:text-emerald-300">Active Translation:</span>
            <span>{translatorMeta.name}</span>
            <span className="text-slate-300 dark:text-emerald-800">•</span>
            <span className="italic text-slate-400 dark:text-emerald-500/70">{translatorMeta.description}</span>
          </div>

          <div className="font-semibold text-emerald-700 dark:text-gold-400">
            Showing {filteredAyahs.length} of 286 Ayahs
          </div>
        </div>
      </div>

      {/* 2. SURAH HEADING (BISMILLAH) */}
      {selectedJuz === 'all' && selectedRuku === 'all' && viewMode !== 'focus' && (
        <div className="text-center py-6 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-[#0c1e17] dark:to-[#091812] rounded-3xl border border-slate-200 dark:border-emerald-950/80 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>سُورَةُ البَقَرَة – Al-Baqarah (The Cow)</span>
          </div>
          <h2 className="font-arabic text-3xl sm:text-4xl text-slate-900 dark:text-emerald-50 font-normal tracking-wide" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h2>
          <p className="text-xs text-slate-400 dark:text-emerald-500/80 italic mt-2">
            In the Name of Allah, the Entirely Merciful, the Especially Merciful
          </p>
        </div>
      )}

      {/* 3. READER MAIN CONTENT */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {filteredAyahs.map((ayah, index) => (
            <AyahCard key={ayah.numberInSurah} ayah={ayah} index={index} />
          ))}
        </div>
      )}

      {viewMode === 'focus' && (
        <FocusReader 
          currentAyahIndex={focusAyahIndex} 
          onSelectAyah={(newNum) => setFocusAyahIndex(newNum)} 
        />
      )}

      {viewMode === 'mushaf' && (
        <MushafView ayahs={filteredAyahs} />
      )}

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 lg:bottom-10 right-6 z-40 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-110 transition-all active:scale-95"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
