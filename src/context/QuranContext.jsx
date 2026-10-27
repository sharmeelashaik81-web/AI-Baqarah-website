import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const QuranContext = createContext(null);

export const TRANSLATION_OPTIONS = [
  {
    id: 'sahih',
    name: 'Saheeh International',
    author: 'Saheeh International',
    description: 'Published by Dar Abul-Qasim, Saudi Arabia. Recognized standard modern translation.',
    badge: 'Published & Verified'
  },
  {
    id: 'itani',
    name: "Clear Qur'an",
    author: 'Talal Itani',
    description: "Published translation by Talal Itani. Modern, clear, and easy to read English.",
    badge: 'Published Translation'
  },
  {
    id: 'hilali',
    name: 'Taqi-ud-Din al-Hilali & Muhsin Khan',
    author: 'Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan',
    description: 'Published by King Fahd Complex for Printing the Holy Quran, Madinah.',
    badge: 'King Fahd Complex'
  },
  {
    id: 'yusufali',
    name: 'Abdullah Yusuf Ali',
    author: 'Abdullah Yusuf Ali',
    description: 'Historic published translation with classic literary English phrasing.',
    badge: 'Historic Standard'
  },
  {
    id: 'pickthall',
    name: 'Pickthall',
    author: 'Mohammed Marmaduke William Pickthall',
    description: 'The Meaning of the Glorious Quran. Classic literary translation.',
    badge: 'Classic Translation'
  }
];

export const RECITERS = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    style: 'Murattal',
    quality: '128kbps Studio'
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    style: 'Murattal',
    quality: '192kbps High-Fidelity'
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    style: 'Murattal / Tajweed',
    quality: '128kbps Standard'
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq El-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    style: 'Murattal',
    quality: '128kbps Standard'
  },
  {
    id: 'shatri',
    name: 'Abu Bakr Al-Shatri',
    arabicName: 'أبو بكر الشاطري',
    style: 'Murattal',
    quality: '128kbps Standard'
  }
];

export function QuranProvider({ children }) {
  // Data state
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active page
  const [activePage, setActivePage] = useState('home'); // home | reader | info | search | bookmarks | settings | about
  
  // Audio state
  const [currentAyahNumber, setCurrentAyahNumber] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [repeatMode, setRepeatMode] = useState('none'); // none | single | all
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  // User Preferences / Settings (persisted in LocalStorage)
  const [theme, setTheme] = useState(() => localStorage.getItem('albaqarah_theme') || 'dark');
  const [arabicFontSize, setArabicFontSize] = useState(() => localStorage.getItem('albaqarah_arabic_size') || 'lg'); // sm | md | lg | xl | 2xl
  const [englishFontSize, setEnglishFontSize] = useState(() => localStorage.getItem('albaqarah_english_size') || 'md'); // sm | md | lg | xl
  const [arabicFontFamily, setArabicFontFamily] = useState(() => localStorage.getItem('albaqarah_arabic_font') || 'amiri'); // amiri | scheherazade
  const [showTransliteration, setShowTransliteration] = useState(() => {
    const val = localStorage.getItem('albaqarah_transliteration');
    return val !== null ? val === 'true' : true;
  });
  const [selectedTranslation, setSelectedTranslation] = useState(() => localStorage.getItem('albaqarah_translation') || 'sahih');
  const [selectedReciter, setSelectedReciter] = useState(() => localStorage.getItem('albaqarah_reciter') || 'alafasy');
  const [autoPlayNext, setAutoPlayNext] = useState(() => {
    const val = localStorage.getItem('albaqarah_autoplay');
    return val !== null ? val === 'true' : true;
  });
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('albaqarah_view_mode') || 'list'); // list | focus | mushaf

  // Bookmarks & Reading Progress
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('albaqarah_bookmarks')) || [];
    } catch {
      return [];
    }
  });

  const [lastReadAyah, setLastReadAyah] = useState(() => {
    try {
      const saved = localStorage.getItem('albaqarah_last_read');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Target Ayah to highlight / scroll to in Reader
  const [targetAyahToScroll, setTargetAyahToScroll] = useState(null);

  // Audio HTML Element Ref
  const audioRef = useRef(new Audio());

  // Show a momentary feedback toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.id === prev?.id ? null : prev));
    }, 3000);
  };

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'emerald', 'sepia');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'emerald') {
      root.classList.add('dark'); // Emerald variant builds on dark
    }
    localStorage.setItem('albaqarah_theme', theme);
  }, [theme]);

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('albaqarah_arabic_size', arabicFontSize);
  }, [arabicFontSize]);

  useEffect(() => {
    localStorage.setItem('albaqarah_english_size', englishFontSize);
  }, [englishFontSize]);

  useEffect(() => {
    localStorage.setItem('albaqarah_arabic_font', arabicFontFamily);
  }, [arabicFontFamily]);

  useEffect(() => {
    localStorage.setItem('albaqarah_transliteration', String(showTransliteration));
  }, [showTransliteration]);

  useEffect(() => {
    localStorage.setItem('albaqarah_translation', selectedTranslation);
  }, [selectedTranslation]);

  useEffect(() => {
    localStorage.setItem('albaqarah_reciter', selectedReciter);
  }, [selectedReciter]);

  useEffect(() => {
    localStorage.setItem('albaqarah_autoplay', String(autoPlayNext));
  }, [autoPlayNext]);

  useEffect(() => {
    localStorage.setItem('albaqarah_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('albaqarah_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('albaqarah_last_read', String(lastReadAyah));
  }, [lastReadAyah]);

  // Fetch Surah Al-Baqarah data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try to load from bundled verified JSON
      const res = await fetch('/data/surah_al_baqarah.json');
      if (!res.ok) {
        throw new Error('Local dataset fetch failed');
      }
      const data = await res.json();
      setSurahData(data);
      setLoading(false);
    } catch (err) {
      console.warn('Falling back to live Quran API endpoint:', err);
      // Fallback: Direct fetch from Quran API
      try {
        const [r1, r2] = await Promise.all([
          fetch('https://api.alquran.cloud/v1/surah/2/editions/quran-uthmani,en.sahih,en.transliteration,ar.alafasy'),
          fetch('https://api.alquran.cloud/v1/surah/2/editions/en.itani,en.hilali,en.yusufali,en.pickthall')
        ]);
        const [d1, d2] = await Promise.all([r1.json(), r2.json()]);

        if (d1.code === 200 && d2.code === 200) {
          const uthmani = d1.data[0].ayahs;
          const sahih = d1.data[1].ayahs;
          const transliteration = d1.data[2].ayahs;
          const alafasy = d1.data[3].ayahs;
          const itani = d2.data[0].ayahs;
          const hilali = d2.data[1].ayahs;
          const yusufali = d2.data[2].ayahs;
          const pickthall = d2.data[3].ayahs;

          const ayahs = uthmani.map((ayah, i) => {
            const num = i + 1;
            const padded = String(num).padStart(3, '0');
            return {
              numberInSurah: num,
              numberInQuran: ayah.number,
              juz: ayah.juz,
              manzil: ayah.manzil,
              page: ayah.page,
              ruku: ayah.ruku,
              hizbQuarter: ayah.hizbQuarter,
              sajda: ayah.sajda,
              arabic: ayah.text,
              transliteration: transliteration[i].text,
              translations: {
                sahih: { name: 'Saheeh International', author: 'Saheeh International', text: sahih[i].text },
                itani: { name: "Clear Qur'an", author: 'Talal Itani', text: itani[i].text },
                hilali: { name: 'Taqi-ud-Din al-Hilali & Muhsin Khan', author: 'Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan', text: hilali[i].text },
                yusufali: { name: 'Abdullah Yusuf Ali', author: 'Abdullah Yusuf Ali', text: yusufali[i].text },
                pickthall: { name: 'Pickthall', author: 'Mohammed Marmaduke William Pickthall', text: pickthall[i].text }
              },
              audio: {
                alafasy: alafasy[i].audio,
                abdulbasit: `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/002${padded}.mp3`,
                husary: `https://everyayah.com/data/Husary_128kbps/002${padded}.mp3`,
                minshawi: `https://everyayah.com/data/Minshawy_Murattal_128kbps/002${padded}.mp3`,
                shatri: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/002${padded}.mp3`
              }
            };
          });

          setSurahData({
            surahInfo: {
              number: 2,
              name: 'سُورَةُ البَقَرَة',
              englishName: 'Al-Baqarah',
              englishNameTranslation: 'The Cow',
              numberOfAyahs: 286,
              revelationType: 'Madani',
              juzRange: 'Juz 1 - Juz 3',
              rukuCount: 40,
              description: 'The longest Surah of the Noble Quran, revealed in Madinah.'
            },
            ayahs
          });
          setLoading(false);
        } else {
          throw new Error('Could not parse Quran API response');
        }
      } catch (fallbackErr) {
        console.error('All Quran data fetches failed:', fallbackErr);
        setError('English translation and Quran data is currently unavailable. Please check your internet connection and try again.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Audio Event Listeners Setup
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration || 0);
      setIsAudioLoading(false);
    };

    const handleWaiting = () => {
      setIsAudioLoading(true);
    };

    const handlePlaying = () => {
      setIsAudioLoading(false);
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      if (repeatMode === 'single') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else if (autoPlayNext) {
        playNextAyah();
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = (e) => {
      console.warn('Audio playback error:', e);
      setIsAudioLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentAyahNumber, repeatMode, autoPlayNext, selectedReciter, surahData]);

  // Sync volume and playbackRate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  // Audio Controls
  const getAyahAudioUrl = (ayahNum, reciterId = selectedReciter) => {
    if (!surahData || !surahData.ayahs[ayahNum - 1]) return null;
    const ayah = surahData.ayahs[ayahNum - 1];
    return ayah.audio?.[reciterId] || ayah.audio?.alafasy || `https://everyayah.com/data/Alafasy_128kbps/002${String(ayahNum).padStart(3, '0')}.mp3`;
  };

  const playAyah = (ayahNum) => {
    if (ayahNum < 1 || ayahNum > 286) return;
    const url = getAyahAudioUrl(ayahNum, selectedReciter);
    if (!url) return;

    if (currentAyahNumber === ayahNum && audioRef.current.src.includes(url)) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      return;
    }

    setCurrentAyahNumber(ayahNum);
    updateLastRead(ayahNum);
    setIsAudioLoading(true);

    audioRef.current.src = url;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setIsAudioLoading(false);
    }).catch(err => {
      console.warn('Playback initiation error:', err);
      setIsAudioLoading(false);
      setIsPlaying(false);
    });
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && currentAyahNumber) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    } else {
      playAyah(lastReadAyah || 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const playNextAyah = () => {
    if (!currentAyahNumber) {
      playAyah(1);
    } else if (currentAyahNumber < 286) {
      playAyah(currentAyahNumber + 1);
    } else if (repeatMode === 'all') {
      playAyah(1);
    } else {
      setIsPlaying(false);
      showToast('Completed Surah Al-Baqarah recitation!', 'success');
    }
  };

  const playPreviousAyah = () => {
    if (!currentAyahNumber) {
      playAyah(1);
    } else if (currentAyahNumber > 1) {
      playAyah(currentAyahNumber - 1);
    } else {
      playAyah(1);
    }
  };

  const seek = (seconds) => {
    if (audioRef.current && audioDuration) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setAudioVolume = (newVol) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // Change Reciter mid-stream
  const changeReciter = (reciterId) => {
    setSelectedReciter(reciterId);
    if (currentAyahNumber) {
      const url = getAyahAudioUrl(currentAyahNumber, reciterId);
      if (url && audioRef.current) {
        const wasPlaying = isPlaying;
        audioRef.current.src = url;
        if (wasPlaying) {
          audioRef.current.play().catch(console.error);
        }
      }
    }
    showToast(`Reciter switched to ${RECITERS.find(r => r.id === reciterId)?.name}`, 'info');
  };

  // Bookmark functions
  const toggleBookmark = (ayahNumber, note = '') => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.number === ayahNumber);
      if (exists) {
        showToast(`Removed Ayah ${ayahNumber} from Bookmarks`, 'info');
        return prev.filter(b => b.number !== ayahNumber);
      } else {
        showToast(`Saved Ayah ${ayahNumber} to Bookmarks!`, 'success');
        return [
          ...prev,
          {
            number: ayahNumber,
            timestamp: Date.now(),
            note: note || ''
          }
        ].sort((a, b) => a.number - b.number);
      }
    });
  };

  const isBookmarked = (ayahNumber) => {
    return bookmarks.some(b => b.number === ayahNumber);
  };

  const removeBookmark = (ayahNumber) => {
    setBookmarks(prev => prev.filter(b => b.number !== ayahNumber));
    showToast(`Bookmark for Ayah ${ayahNumber} removed`, 'info');
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    showToast('All bookmarks cleared', 'info');
  };

  // Last read progress tracking
  const updateLastRead = (ayahNumber) => {
    if (ayahNumber >= 1 && ayahNumber <= 286) {
      setLastReadAyah(ayahNumber);
    }
  };

  // Navigate to reader and jump to a specific Ayah
  const navigateToAyah = (ayahNumber, shouldPlay = false) => {
    setTargetAyahToScroll(ayahNumber);
    updateLastRead(ayahNumber);
    setActivePage('reader');
    if (shouldPlay) {
      setTimeout(() => {
        playAyah(ayahNumber);
      }, 300);
    }
  };

  // Copy Ayah Text
  const copyAyah = async (ayah) => {
    const translation = ayah.translations[selectedTranslation] || ayah.translations.sahih;
    const textToCopy = `Surah Al-Baqarah (2:${ayah.numberInSurah})\n\n${ayah.arabic}\n\nTransliteration:\n${ayah.transliteration}\n\nEnglish Translation (${translation.name}):\n"${translation.text}"\n\n[Al-Baqarah – Read, Understand & Reflect]`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast(`Ayah 2:${ayah.numberInSurah} copied to clipboard!`, 'success');
      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Could not copy to clipboard', 'error');
      return false;
    }
  };

  // Share Ayah
  const shareAyah = async (ayah) => {
    const translation = ayah.translations[selectedTranslation] || ayah.translations.sahih;
    const shareData = {
      title: `Surah Al-Baqarah - Ayah ${ayah.numberInSurah}`,
      text: `${ayah.arabic}\n\n"${translation.text}"\n\n- Surah Al-Baqarah (2:${ayah.numberInSurah}) [Translation: ${translation.name}]`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!', 'success');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyAyah(ayah);
        }
      }
    } else {
      copyAyah(ayah);
    }
  };

  const value = {
    // Data
    surahData,
    loading,
    error,
    retryFetch: fetchData,
    
    // Routing
    activePage,
    setActivePage,
    navigateToAyah,
    targetAyahToScroll,
    setTargetAyahToScroll,

    // Audio
    currentAyahNumber,
    isPlaying,
    isAudioLoading,
    audioProgress,
    currentTime,
    audioDuration,
    volume,
    isMuted,
    playbackRate,
    repeatMode,
    selectedReciter,
    autoPlayNext,
    playAyah,
    pauseAudio,
    resumeAudio,
    togglePlay,
    playNextAyah,
    playPreviousAyah,
    seek,
    setAudioVolume,
    toggleMute,
    setPlaybackRate,
    setRepeatMode,
    setAutoPlayNext,
    changeReciter,

    // Bookmarks & Progress
    bookmarks,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    clearAllBookmarks,
    lastReadAyah,
    updateLastRead,

    // Settings
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
    viewMode,
    setViewMode,

    // Utilities
    copyAyah,
    shareAyah,
    showToast,
    toastMessage
  };

  return (
    <QuranContext.Provider value={value}>
      {children}
    </QuranContext.Provider>
  );
}

export function useQuran() {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
}
