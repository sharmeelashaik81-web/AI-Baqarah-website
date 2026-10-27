import React from 'react';
import { useQuran, TRANSLATION_OPTIONS, RECITERS } from '../context/QuranContext';
import { 
  Settings, 
  Type, 
  BookOpen, 
  Volume2, 
  Moon, 
  Sun, 
  Sparkles, 
  Radio, 
  Layers, 
  RefreshCw, 
  CheckCircle2,
  Trash2,
  HelpCircle
} from 'lucide-react';

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    arabicFontSize,
    setArabicFontSize,
    englishFontSize,
    setEnglishFontSize,
    arabicFontFamily,
    setArabicFontFamily,
    showTransliteration,
    setShowTransliteration,
    selectedTranslation,
    setSelectedTranslation,
    selectedReciter,
    changeReciter,
    autoPlayNext,
    setAutoPlayNext,
    lastReadAyah,
    updateLastRead,
    showToast
  } = useQuran();

  const resetAllSettings = () => {
    if (window.confirm('Reset all display, audio, and reading settings to defaults?')) {
      setTheme('dark');
      setArabicFontSize('lg');
      setEnglishFontSize('md');
      setArabicFontFamily('amiri');
      setShowTransliteration(true);
      setSelectedTranslation('sahih');
      changeReciter('alafasy');
      setAutoPlayNext(true);
      updateLastRead(1);
      showToast('Settings reset to default values', 'info');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-28">
      
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-emerald-50">
              Reader & Application Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-400/80">
              Customize typography, themes, published translations, and audio recitation preferences
            </p>
          </div>
        </div>
      </section>

      {/* 1. TYPOGRAPHY & TEXT DISPLAY */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-emerald-950">
          <Type className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Arabic & English Typography
          </h2>
        </div>

        {/* Live Typography Preview */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50 text-right" dir="rtl">
          <div className="text-[10px] text-slate-400 dark:text-emerald-400 font-sans mb-1 text-left" dir="ltr">
            Live Typography Preview (Ayah 2:255):
          </div>
          <p className={`${arabicFontFamily === 'scheherazade' ? 'font-arabic-scheherazade' : 'font-arabic-text'} text-3xl sm:text-4xl text-slate-900 dark:text-emerald-50 font-normal`}>
            ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ
          </p>
          <p className="text-xs text-slate-600 dark:text-emerald-300/80 font-sans mt-2 text-left" dir="ltr">
            Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.
          </p>
        </div>

        {/* Arabic Font Size Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-emerald-300 mb-2.5">
            Arabic Font Size
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { id: 'sm', label: 'Small' },
              { id: 'md', label: 'Medium' },
              { id: 'lg', label: 'Large' },
              { id: 'xl', label: 'X-Large' },
              { id: '2xl', label: '2X-Large' }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setArabicFontSize(size.id)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                  arabicFontSize === size.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-emerald-300 hover:border-emerald-400'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* English Font Size Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-emerald-300 mb-2.5">
            English Translation Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'sm', label: 'Compact' },
              { id: 'md', label: 'Standard' },
              { id: 'lg', label: 'Large' },
              { id: 'xl', label: 'Spacious' }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setEnglishFontSize(size.id)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                  englishFontSize === size.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-emerald-300 hover:border-emerald-400'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Arabic Font Style (Calligraphy Face) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-emerald-300 mb-2.5">
            Arabic Script Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setArabicFontFamily('amiri')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                arabicFontFamily === 'amiri'
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">Amiri Naskh Style</div>
                <div className="text-xs text-slate-500 dark:text-emerald-400">Classical Quranic Typography</div>
              </div>
              <span className="font-arabic text-2xl text-slate-800 dark:text-emerald-200">القرآن</span>
            </button>

            <button
              onClick={() => setArabicFontFamily('scheherazade')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                arabicFontFamily === 'scheherazade'
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">Scheherazade New</div>
                <div className="text-xs text-slate-500 dark:text-emerald-400">Traditional Uthmanic Rendering</div>
              </div>
              <span className="font-arabic-scheherazade text-2xl text-slate-800 dark:text-emerald-200">القرآن</span>
            </button>
          </div>
        </div>

        {/* Transliteration Toggle */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">
              Display Latin Transliteration
            </div>
            <div className="text-xs text-slate-500 dark:text-emerald-400">
              Show phonetics for pronunciation assistance under each Ayah
            </div>
          </div>
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              showTransliteration ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                showTransliteration ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

      </section>

      {/* 2. PUBLISHED TRANSLATION SOURCE SELECTION */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-emerald-950">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
              Published Translation Source
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-400">
              All translations come strictly from recognized printed and licensed Islamic publishers (No AI interpretation)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {TRANSLATION_OPTIONS.map((trans) => {
            const isSelected = selectedTranslation === trans.id;
            return (
              <button
                key={trans.id}
                onClick={() => setSelectedTranslation(trans.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40 hover:border-emerald-400'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-emerald-100">{trans.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold">
                      {trans.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-1">
                    {trans.description}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. AUDIO RECITATION & PLAYBACK PREFERENCES */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-emerald-950">
          <Volume2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Audio Recitation & Auto-Play
          </h2>
        </div>

        {/* Reciter Grid */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-emerald-300 mb-2.5">
            Default Reciter (Qari)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RECITERS.map((rec) => {
              const isSelected = selectedReciter === rec.id;
              return (
                <button
                  key={rec.id}
                  onClick={() => changeReciter(rec.id)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">{rec.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-emerald-400">{rec.style} • {rec.quality}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-arabic text-lg text-slate-700 dark:text-emerald-300">{rec.arabicName}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auto-Play Next Ayah Toggle */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">
              Auto-Play Next Verse Continuously
            </div>
            <div className="text-xs text-slate-500 dark:text-emerald-400">
              Automatically advance to the subsequent Ayah when recitation completes
            </div>
          </div>
          <button
            onClick={() => setAutoPlayNext(!autoPlayNext)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              autoPlayNext ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                autoPlayNext ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {/* 4. THEME & DISPLAY MODE */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-emerald-950">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Color Theme & Mode
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
              theme === 'dark'
                ? 'bg-[#091812] border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800'
            }`}
          >
            <Moon className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="font-bold text-sm">Islamic Dark Theme</div>
              <div className="text-[11px] text-emerald-500/80">Emerald & Gold Deep Night</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
              theme === 'light'
                ? 'bg-emerald-50/70 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Sun className="w-6 h-6 text-gold-500" />
            <div>
              <div className="font-bold text-sm">Clean Light Theme</div>
              <div className="text-[11px] text-slate-500">Daylight High Contrast</div>
            </div>
          </button>
        </div>
      </section>

      {/* 5. RESET & CACHE MANAGEMENT */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-emerald-100">
            Reset Preferences
          </h3>
          <p className="text-xs text-slate-500 dark:text-emerald-400">
            Restore all default typography, audio reciters, and themes
          </p>
        </div>
        <button
          onClick={resetAllSettings}
          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-900 text-slate-700 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-950 text-xs font-bold transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Defaults</span>
        </button>
      </section>

    </div>
  );
}
