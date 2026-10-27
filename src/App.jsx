import React, { useEffect } from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import AudioPlayerBar from './components/audio/AudioPlayerBar';
import Toast from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';
import SurahInfoPage from './pages/SurahInfoPage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

function AppContent() {
  const { activePage, setActivePage } = useQuran();

  // Listen for global keyboard shortcuts (e.g. '/' for search, '1-7' for pages)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        setActivePage('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePage]);

  // Page renderer
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'reader':
        return <ReaderPage />;
      case 'info':
        return <SurahInfoPage />;
      case 'search':
        return <SearchPage />;
      case 'bookmarks':
        return <BookmarksPage />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07130e] text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row transition-colors duration-200">
      
      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header / Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {renderActivePage()}
        </main>

        {/* Persistent Audio Player Bar */}
        <AudioPlayerBar />

        {/* Mobile Bottom Navigation */}
        <MobileNav />

        {/* Global Toast Feedback */}
        <Toast />

      </div>

    </div>
  );
}

export default function App() {
  return (
    <QuranProvider>
      <AppContent />
    </QuranProvider>
  );
}
