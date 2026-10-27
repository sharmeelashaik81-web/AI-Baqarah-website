import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  Heart
} from 'lucide-react';
import { TRANSLATION_OPTIONS, RECITERS } from '../context/QuranContext';

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-28">
      
      {/* Header Banner */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Authenticity & Transparency
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-emerald-50">
              About & Data Verification
            </h1>
          </div>
        </div>

        {/* Primary Required Statement */}
        <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100">
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            "This application provides Quran text, translation and audio using external verified Quran data sources."
          </p>
        </div>
      </section>

      {/* 1. NON-AI TRANSLATION POLICY */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-950">
          <Lock className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Strict Non-AI Quranic Translation Guarantee
          </h2>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The Noble Quran is the direct, unalterable word of Allah. In accordance with strict scholarly integrity:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-emerald-200">
              <strong>100% Published Translations:</strong> Every English meaning is rendered directly from recognized, published scholarly translations.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-emerald-200">
              <strong>Zero AI Generation:</strong> No artificial intelligence models are used to generate, summarize, paraphrase, or interpret any Quran verse.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-emerald-200">
              <strong>Exact Arabic Preservation:</strong> The Arabic Uthmani text is preserved with exact diacritics, punctuation, and verse numbering.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-emerald-200">
              <strong>Transparent Attribution:</strong> The translator's name and publication source are visibly labeled on every single verse.
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRANSLATION DATA SOURCES */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-950">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Published English Translation Sources
          </h2>
        </div>

        <div className="space-y-3">
          {TRANSLATION_OPTIONS.map((trans) => (
            <div
              key={trans.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-sm text-slate-900 dark:text-emerald-100">{trans.name}</div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold">
                  {trans.badge}
                </span>
              </div>
              <div className="text-xs text-slate-600 dark:text-emerald-300/80">
                <strong>Publisher / Author:</strong> {trans.author} — {trans.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUDIO RECITERS & APIS */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-950">
          <Volume2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
            Quran Reciters & Audio APIs
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Audio recitations are provided through high-fidelity Quran audio servers (Islamic Network / EveryAyah / Quran.com Audio CDN):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RECITERS.map((rec) => (
            <div
              key={rec.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-900/40 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-emerald-100">{rec.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-emerald-400">{rec.style} • {rec.quality}</div>
              </div>
              <div className="font-arabic text-base text-emerald-700 dark:text-emerald-300">
                {rec.arabicName}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL SPECIFICATIONS & OPEN SOURCE */}
      <section className="bg-white dark:bg-[#0c1e17] rounded-3xl border border-slate-200 dark:border-emerald-950/80 p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-emerald-50">
          Application Architecture & Privacy
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Built with React 19, Vite, Tailwind CSS, and Lucide React. Reading progress and bookmarks are stored entirely locally on your device via browser <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-emerald-950 text-emerald-600 font-mono text-xs">LocalStorage</code>. No personal data, tracking cookies, or reading logs are transmitted to any third-party marketing servers.
        </p>
      </section>

    </div>
  );
}
