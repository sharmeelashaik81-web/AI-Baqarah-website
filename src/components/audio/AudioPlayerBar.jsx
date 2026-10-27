import React, { useState } from 'react';
import { useQuran, RECITERS } from '../../context/QuranContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Repeat1, 
  Sparkles,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  BookOpen,
  Sliders,
  Radio
} from 'lucide-react';

export default function AudioPlayerBar() {
  const { 
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
    navigateToAyah,
    surahData
  } = useQuran();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showReciterMenu, setShowReciterMenu] = useState(false);

  // If no ayah has been selected/played yet, don't show or show a compact standby bar
  if (!currentAyahNumber && !isPlaying) {
    return null;
  }

  const currentAyah = surahData?.ayahs?.[currentAyahNumber - 1];
  const currentReciterObj = RECITERS.find(r => r.id === selectedReciter) || RECITERS[0];

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekChange = (e) => {
    const value = parseFloat(e.target.value);
    const targetSeconds = (value / 100) * audioDuration;
    seek(targetSeconds);
  };

  const cycleRepeatMode = () => {
    if (repeatMode === 'none') setRepeatMode('single');
    else if (repeatMode === 'single') setRepeatMode('all');
    else setRepeatMode('none');
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  return (
    <div className="fixed bottom-14 lg:bottom-0 left-0 lg:left-72 right-0 z-30 bg-white/95 dark:bg-[#07130e]/95 backdrop-blur-xl border-t border-slate-200 dark:border-emerald-900/60 shadow-2xl transition-all duration-300">
      
      {/* Top micro progress scrubber line */}
      <div 
        className="w-full h-1.5 bg-slate-200 dark:bg-emerald-950/80 cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percent = (clickX / rect.width);
          seek(percent * (audioDuration || 1));
        }}
      >
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 group-hover:from-emerald-400 group-hover:to-gold-300 transition-all duration-100"
          style={{ width: `${audioProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Ayah Info & Reciter Details */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:min-w-[240px] gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Audio Wave Visualizer Icon */}
            <div 
              onClick={() => navigateToAyah(currentAyahNumber)}
              className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center cursor-pointer group flex-shrink-0"
              title="Jump to this Ayah in reader"
            >
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-5 px-1">
                  <span className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full audio-bar-1" />
                  <span className="w-1 bg-gold-500 dark:bg-gold-400 rounded-full audio-bar-2" />
                  <span className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full audio-bar-3" />
                  <span className="w-1 bg-gold-500 dark:bg-gold-400 rounded-full audio-bar-4" />
                </div>
              ) : (
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-emerald-100 truncate">
                  Ayah 2:{currentAyahNumber}
                </span>
                {currentAyah?.keyVerseTitle && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-gold-100 dark:bg-gold-950/60 text-gold-700 dark:text-gold-300 font-semibold truncate hidden md:inline-block max-w-[140px]">
                    {currentAyah.keyVerseTitle}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-emerald-400/80 truncate flex items-center gap-1">
                <span>{currentReciterObj.name}</span>
                <span className="text-slate-300 dark:text-emerald-800">•</span>
                <span className="text-[10px] text-slate-400 dark:text-emerald-500/70">{currentReciterObj.style}</span>
              </div>
            </div>
          </div>

          {/* Mobile Play Button */}
          <div className="sm:hidden flex items-center gap-1">
            <button
              onClick={playPreviousAyah}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              disabled={isAudioLoading}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            >
              {isAudioLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              )}
            </button>
            <button
              onClick={playNextAyah}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Main Playback Controls & Scrubber */}
        <div className="hidden sm:flex flex-col items-center flex-1 max-w-xl px-4">
          <div className="flex items-center gap-3 mb-1">
            {/* Repeat Mode Toggle */}
            <button
              onClick={cycleRepeatMode}
              className={`p-1.5 rounded-lg text-xs transition ${
                repeatMode === 'single'
                  ? 'bg-gold-500/20 text-gold-500 dark:text-gold-300 font-bold'
                  : repeatMode === 'all'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title={
                repeatMode === 'single'
                  ? 'Repeat: Current Ayah'
                  : repeatMode === 'all'
                  ? 'Repeat: Whole Surah'
                  : 'Repeat: Off'
              }
            >
              {repeatMode === 'single' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>

            {/* Previous Ayah */}
            <button
              onClick={playPreviousAyah}
              className="p-2 rounded-lg text-slate-600 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play / Pause Main Trigger */}
            <button
              onClick={togglePlay}
              disabled={isAudioLoading}
              className="p-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play Recitation'}
            >
              {isAudioLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Next Ayah */}
            <button
              onClick={playNextAyah}
              className="p-2 rounded-lg text-slate-600 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <button
              onClick={cycleSpeed}
              className="px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:text-emerald-600 border border-slate-200 dark:border-emerald-900/50"
              title="Recitation Speed"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Time & Scrubber slider */}
          <div className="w-full flex items-center gap-2 text-[10px] text-slate-400 dark:text-emerald-400/80 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={audioProgress || 0}
              onChange={handleSeekChange}
              className="w-full h-1 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span>{formatTime(audioDuration)}</span>
          </div>
        </div>

        {/* Right: Reciter Picker, Volume Controls & Auto-Advance */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Reciter Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowReciterMenu(!showReciterMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/50 text-xs text-slate-700 dark:text-emerald-200 hover:border-emerald-500 transition"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-500" />
              <span className="truncate max-w-[110px] font-medium">{currentReciterObj.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showReciterMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-60 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-emerald-900/70 py-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400">
                  Select Reciter
                </div>
                {RECITERS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      changeReciter(r.id);
                      setShowReciterMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-emerald-950/40 ${
                      selectedReciter === r.id ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div>{r.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-emerald-500 font-arabic">{r.arabicName}</div>
                    </div>
                    {selectedReciter === r.id && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auto-play next toggle */}
          <button
            onClick={() => setAutoPlayNext(!autoPlayNext)}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold border transition ${
              autoPlayNext
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title="Auto-play next Ayah continuously"
          >
            Auto-play {autoPlayNext ? 'ON' : 'OFF'}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="p-1.5 text-slate-500 dark:text-emerald-300 hover:text-emerald-600 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
