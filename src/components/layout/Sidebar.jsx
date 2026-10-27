import React from 'react';
import { useQuran } from '../../context/QuranContext';
import { 
  BookOpen, 
  Home, 
  Info, 
  Search, 
  Bookmark, 
  Settings, 
  HelpCircle, 
  Volume2, 
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';

export default function Sidebar() {
  const { 
    activePage, 
    setActivePage, 
    bookmarks, 
    lastReadAyah, 
    navigateToAyah,
    surahData,
    isPlaying,
    currentAyahNumber
  } = useQuran();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'reader', label: 'Read Al-Baqarah', icon: BookOpen, badge: '286 Ayahs' },
    { id: 'info', label: 'Surah Information', icon: Info, badge: null },
    { id: 'search', label: 'Search Verses', icon: Search, badge: null },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark, badge: bookmarks.length > 0 ? String(bookmarks.length) : null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    { id: 'about', label: 'About & Verified Sources', icon: HelpCircle, badge: null },
  ];

  const readingPercent = Math.min(100, Math.round((lastReadAyah / 286) * 100));

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-[#091812] border-r border-slate-200 dark:border-emerald-950/80 h-screen sticky top-0 z-40 transition-colors">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200/80 dark:border-emerald-950/80 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/30 text-gold-300 ring-1 ring-gold-400/30">
          <Sparkles className="w-6 h-6 text-gold-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="font-display font-bold text-lg text-slate-900 dark:text-emerald-50 tracking-tight leading-none">
              Al-Baqarah
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
              Surah 2
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-emerald-400/70 font-arabic mt-1 truncate">
            سُورَةُ البَقَرَة – The Cow
          </p>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-500/70">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/25 dark:bg-emerald-700 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 dark:text-emerald-400/70 group-hover:text-emerald-600 dark:group-hover:text-emerald-300'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive 
                    ? 'bg-emerald-800 text-emerald-100' 
                    : 'bg-slate-100 dark:bg-emerald-900/40 text-slate-500 dark:text-emerald-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Ayah Jump Matrix shortcut */}
        <div className="pt-6 px-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-500/70 mb-2.5">
            Key Verses
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => navigateToAyah(1)}
              className="px-2.5 py-2 text-xs rounded-lg text-left bg-slate-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 font-medium transition"
            >
              <div className="text-[10px] text-slate-400 dark:text-emerald-400">Ayah 1</div>
              <div className="truncate font-semibold">Opening</div>
            </button>
            <button
              onClick={() => navigateToAyah(255)}
              className="px-2.5 py-2 text-xs rounded-lg text-left bg-gold-50/70 dark:bg-gold-950/20 border border-gold-200/50 dark:border-gold-800/40 hover:bg-gold-100/70 dark:hover:bg-gold-900/40 text-gold-900 dark:text-gold-200 font-medium transition"
            >
              <div className="text-[10px] text-gold-600 dark:text-gold-400 font-bold">Ayah 255</div>
              <div className="truncate font-semibold">Ayat al-Kursi</div>
            </button>
            <button
              onClick={() => navigateToAyah(282)}
              className="px-2.5 py-2 text-xs rounded-lg text-left bg-slate-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 font-medium transition"
            >
              <div className="text-[10px] text-slate-400 dark:text-emerald-400">Ayah 282</div>
              <div className="truncate font-semibold">Verse of Debt</div>
            </button>
            <button
              onClick={() => navigateToAyah(285)}
              className="px-2.5 py-2 text-xs rounded-lg text-left bg-slate-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 font-medium transition"
            >
              <div className="text-[10px] text-slate-400 dark:text-emerald-400">Ayahs 285-286</div>
              <div className="truncate font-semibold">Amanar-Rasul</div>
            </button>
          </div>
        </div>
      </nav>

      {/* Reading Progress Card */}
      <div className="p-4 border-t border-slate-200/80 dark:border-emerald-950/80">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/90 to-emerald-950 text-white shadow-lg relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/10 pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs text-emerald-200/80 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Reading Progress</span>
            <span className="font-bold text-gold-300">{readingPercent}%</span>
          </div>

          <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden mb-3 border border-emerald-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-gold-400 rounded-full transition-all duration-500"
              style={{ width: `${readingPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-300 font-medium">Last read:</div>
              <div className="text-sm font-bold text-white">Ayah {lastReadAyah} of 286</div>
            </div>
            <button
              onClick={() => navigateToAyah(lastReadAyah)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 transition-colors shadow-sm flex items-center gap-1"
            >
              <span>Resume</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
