import React from 'react';
import { useQuran } from '../../context/QuranContext';
import { Home, BookOpen, Search, Bookmark, Settings, Info } from 'lucide-react';

export default function MobileNav() {
  const { activePage, setActivePage, bookmarks } = useQuran();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reader', label: 'Read', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarks.length || null },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#091812]/95 backdrop-blur-lg border-t border-slate-200 dark:border-emerald-950/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-emerald-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-full min-w-3.5 h-3.5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 font-medium">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
