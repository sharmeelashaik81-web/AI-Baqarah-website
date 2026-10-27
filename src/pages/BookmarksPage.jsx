import React from 'react';
import { useQuran, TRANSLATION_OPTIONS } from '../context/QuranContext';
import { 
  Bookmark, 
  BookmarkX, 
  Play, 
  Pause, 
  BookOpen, 
  Copy, 
  Share2, 
  Sparkles, 
  Trash2, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function BookmarksPage() {
  const { 
    bookmarks, 
    surahData, 
    removeBookmark, 
    clearAllBookmarks, 
    navigateToAyah, 
    playAyah, 
    currentAyahNumber, 
    isPlaying,
    selectedTranslation,
    copyAyah,
    shareAyah,
    showToast,
    setActivePage
  } = useQuran();

  const ayahs = surahData?.ayahs || [];
  const translatorMeta = TRANSLATION_OPTIONS.find(t => t.id === selectedTranslation) || TRANSLATION_OPTIONS[0];

  const bookmarkedAyahs = bookmarks
    .map(b => {
      const ayah = ayahs.find(a => a.numberInSurah === b.number);
      return ayah ? { ...ayah, savedAt: b.timestamp } : null;
    })
    .filter(Boolean);

  const handleExportBookmarks = () => {
    if (bookmarkedAyahs.length === 0) return;
    const exportText = bookmarkedAyahs.map(a => {
      const tr = a.translations?.[selectedTranslation] || a.translations?.sahih;
      return `[Surah Al-Baqarah 2:${a.numberInSurah}]\n${a.arabic}\n\nTranslation (${tr.name}):\n"${tr.text}"\n`;
    }).join('\n----------------------------------------\n\n');

    navigator.clipboard.writeText(exportText).then(() => {
      showToast('All bookmarked verses copied to clipboard!', 'success');
    });
  };

  return (
    <div className="space-y-6 pb-28">
      
      {/* Header */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 dark:bg-gold-950 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Bookmark className="w-6 h-6 fill-gold-500" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-emerald-50">
                Saved Bookmarks
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-400/80">
                You have {bookmarkedAyahs.length} saved {bookmarkedAyahs.length === 1 ? 'verse' : 'verses'} stored locally on your device
              </p>
            </div>
          </div>

          {bookmarkedAyahs.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportBookmarks}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950/60 hover:bg-emerald-100 text-slate-700 dark:text-emerald-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Export Verses</span>
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove all bookmarks?')) {
                    clearAllBookmarks();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bookmarked List */}
      {bookmarkedAyahs.length > 0 ? (
        <div className="space-y-4">
          {bookmarkedAyahs.map((ayah) => {
            const isPlayingThis = currentAyahNumber === ayah.numberInSurah && isPlaying;
            const translation = ayah.translations?.[selectedTranslation] || ayah.translations?.sahih;

            return (
              <article
                key={ayah.numberInSurah}
                className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-5 sm:p-7 shadow-sm hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-emerald-950">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-950 text-gold-700 dark:text-gold-300 text-xs font-bold border border-gold-300/50">
                      Ayah 2:{ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-emerald-400/80">
                      Juz {ayah.juz} • Ruku {ayah.ruku}
                    </span>
                    {ayah.keyVerseTitle && (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold hidden sm:inline-block">
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
                      onClick={() => copyAyah(ayah)}
                      className="p-2 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-slate-500 hover:text-emerald-600"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => removeBookmark(ayah.numberInSurah)}
                      className="p-2 rounded-xl border bg-slate-50 dark:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/40 text-rose-500 hover:bg-rose-50"
                      title="Remove from bookmarks"
                    >
                      <BookmarkX className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigateToAyah(ayah.numberInSurah)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 hover:bg-emerald-100 text-slate-700 dark:text-emerald-200 text-xs font-bold"
                    >
                      Open in Reader
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="my-4 text-right" dir="rtl">
                  <p className="font-arabic-text text-2xl sm:text-3xl text-slate-900 dark:text-emerald-50 leading-[2.3]">
                    {ayah.arabic}
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
                    {translation?.text}
                  </p>
                </div>

              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-emerald-950/60 text-slate-400 dark:text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-emerald-100 mb-1">
            No Bookmarks Saved Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Click the bookmark icon on any Ayah in the Reader or Home page to save verses for quick access during your reflection and daily recitation.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setActivePage('reader')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
            >
              Browse Surah Al-Baqarah
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
