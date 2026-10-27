import React, { useState } from 'react';
import { useQuran, TRANSLATION_OPTIONS, RECITERS } from '../../context/QuranContext';
import { 
  Search, 
  Moon, 
  Sun, 
  Volume2, 
  Sparkles, 
  Bookmark, 
  Layers, 
  SlidersHorizontal,
  ChevronDown,
  BookOpen
} from 'lucide-react';

export default function Navbar({ onOpenQuickSearch }) {
  const { 
    theme, 
    setTheme, 
    lastReadAyah, 
    navigateToAyah, 
    isPlaying, 
    currentAyahNumber,
    selectedTranslation,
    setSelectedTranslation,
    selectedReciter,
    changeReciter,
    activePage,
    setActivePage
  } = useQuran();

  const [jumpInput, setJumpInput] = useState('');

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= 286) {
      navigateToAyah(num);
      setJumpInput('');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentTranslator = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation);
  const currentReciterObj = RECITERS.find(r => r.id === selectedReciter);

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#07130e]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Title / Surah Badge */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-gold-300 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-emerald-100 leading-tight">
                Al-Baqarah
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-arabic">
                سُورَةُ البَقَرَة
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-emerald-400/80">
            <span className="font-semibold text-slate-800 dark:text-emerald-200">Surah 2: Al-Baqarah</span>
            <span>•</span>
            <span>286 Ayahs</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium text-[11px]">
              Madani
            </span>
          </div>
        </div>

        {/* Center: Search / Jump to Ayah */}
        <div className="flex-1 max-w-md hidden sm:flex items-center gap-2">
          {/* Global Search Shortcut Button */}
          <button
            onClick={() => setActivePage('search')}
            className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50 text-slate-500 dark:text-emerald-300 text-xs hover:border-emerald-500 transition group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
              <span>Search Arabic, English, or Ayah #...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-emerald-900 text-slate-500 dark:text-emerald-300 border border-slate-200 dark:border-emerald-800">
              /
            </kbd>
          </button>

          {/* Jump to Ayah Form */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="286"
                placeholder="Ayah #"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-20 px-2.5 py-2 text-xs rounded-xl bg-slate-100/90 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-center"
              />
            </div>
            <button
              type="submit"
              disabled={!jumpInput}
              className="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold transition"
            >
              Go
            </button>
          </form>
        </div>

        {/* Right Actions: Translation Selector, Audio Status, Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Translation Pill */}
          <div className="hidden md:flex items-center text-xs">
            <select
              value={selectedTranslation}
              onChange={(e) => setSelectedTranslation(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              title="Select Published English Translation"
            >
              {TRANSLATION_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id} className="dark:bg-slate-900">
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Reciter Pill */}
          <div className="hidden xl:flex items-center text-xs">
            <select
              value={selectedReciter}
              onChange={(e) => changeReciter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              title="Select Reciter"
            >
              {RECITERS.map(rec => (
                <option key={rec.id} value={rec.id} className="dark:bg-slate-900">
                  🎙️ {rec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gold-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-emerald-800" />
            )}
          </button>

          {/* Search Trigger for Mobile */}
          <button
            onClick={() => setActivePage('search')}
            aria-label="Search"
            className="sm:hidden p-2 rounded-xl text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
