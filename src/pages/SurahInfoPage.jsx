import React from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  Info, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Compass, 
  ArrowRight, 
  Star, 
  HeartHandshake,
  Scale,
  Calendar,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function SurahInfoPage() {
  const { navigateToAyah, surahData } = useQuran();

  const keyVersesData = [
    {
      num: 1,
      title: 'The Divine Opening: Alif-Lam-Meem',
      theme: 'Inerrancy & Divine Guidance',
      desc: 'Affirms that the Quran is a divine revelation completely free from doubt, serving as a beacon of guidance for the God-conscious (Muttaqeen).'
    },
    {
      num: 30,
      title: 'Creation of Prophet Adam (AS)',
      theme: 'Humanity\'s Stewardship on Earth',
      desc: 'The divine decree establishing humankind as trustees (Khulafa) upon the earth, the prostration of angels, and the repentance of Adam.'
    },
    {
      num: 143,
      title: 'The Middle & Balanced Nation (Ummatan Wasata)',
      theme: 'Islamic Worldview & Moderation',
      desc: 'Designating the Muslim community as a balanced and just witness over all humankind, avoiding extremism and negligence.'
    },
    {
      num: 153,
      title: 'Seeking Aid through Patience & Prayer (Sabr & Salah)',
      theme: 'Spiritual Resilience',
      desc: 'The ultimate source of spiritual strength during trials, emphasizing that Allah is truly with those who patiently persevere.'
    },
    {
      num: 177,
      title: 'Ayat al-Birr (The Essence of True Righteousness)',
      theme: 'Holistic Definition of Piety',
      desc: 'Clarifies that true piety is not mere external motion, but sound belief, voluntary charity to relatives and orphans, keeping pledges, and steadfastness.'
    },
    {
      num: 183,
      title: 'The Obligation of Fasting in Ramadan',
      theme: 'Spiritual Purification (Taqwa)',
      desc: 'Prescribes the annual fasting during the sacred month of Ramadan in which the Quran was revealed, as a vehicle to attain God-consciousness.'
    },
    {
      num: 255,
      title: 'Ayat al-Kursi (The Verse of the Throne)',
      theme: 'The Supreme Majesty of God',
      desc: 'The greatest single verse in the entire Quran, declaring Allah\'s absolute oneness, eternal life, self-subsistence, and total sovereignty over creation.'
    },
    {
      num: 256,
      title: 'No Compulsion in Religion (La Ikraha fid-Deen)',
      theme: 'Freedom of Conscience',
      desc: 'Affirms the principle of free choice in faith, as the path of truth has been made clear from error, offering a firm handhold that never breaks.'
    },
    {
      num: 261,
      title: 'Parable of Generosity in Allah\'s Cause',
      theme: 'Multiplication of Charity',
      desc: 'Compares spending in the path of Allah to a single grain that produces seven ears, each containing a hundred grains.'
    },
    {
      num: 275,
      title: 'Sanctity of Trade & Prohibition of Riba (Usury)',
      theme: 'Socio-Economic Justice',
      desc: 'Distinguishes between honest productive trade and exploitative usurious lending, establishing the ethical foundation of Islamic economics.'
    },
    {
      num: 282,
      title: 'Ayat ad-Dayn (The Verse of Loan & Contracts)',
      theme: 'Legal Governance & Documentation',
      desc: 'The longest verse in the Quran, detailing rigorous contracts, witness guidelines, and financial protections to prevent disputes and uphold justice.'
    },
    {
      num: 285,
      title: 'Amanar-Rasul & The Concluding Supplication (285–286)',
      theme: 'The Creed & Divine Mercy',
      desc: 'The profound declaration of belief by the Prophet and believers, followed by the du\'a: "Our Lord, do not lay upon us a burden like that which You laid on those before us... Forgive us; grant us mercy; You are our protector."'
    }
  ];

  const structuralThemes = [
    {
      section: 'Part 1 (Ayahs 1–39)',
      title: 'Foundations of Faith & Human Typologies',
      desc: 'Introduces the three human responses to divine guidance: true believers, stubborn rejecters, and hypocrites. Recounts the appointment of Prophet Adam (AS) as earthly custodian.'
    },
    {
      section: 'Part 2 (Ayahs 40–123)',
      title: 'The Covenant & Lessons of History',
      desc: 'Addresses the Children of Israel, detailing historical blessings, past errors, the Exodus, the golden calf, and the critical importance of keeping divine promises.'
    },
    {
      section: 'Part 3 (Ayahs 124–141)',
      title: 'The Abrahamic Legacy & The Ka\'bah',
      desc: 'Highlights Prophet Ibrahim (Abraham) and Ismail (Ishmael) building the Sacred House in Makkah, establishing pure monotheism as the foundation for the final message.'
    },
    {
      section: 'Part 4 (Ayahs 142–167)',
      title: 'The New Ummah & The Qiblah',
      desc: 'The historical shift in prayer direction towards the Ka\'bah, defining Muslims as the middle nation (Ummatan Wasata), with calls to steadfastness during adversity.'
    },
    {
      section: 'Part 5 (Ayahs 168–242)',
      title: 'Divine Legislation & Societal Welfare',
      desc: 'Comprehensive laws governing dietary halal/haram, penal justice, wills, fasting (Ramadan), pilgrimage (Hajj), defensive struggle, marriage, and family life.'
    },
    {
      section: 'Part 6 (Ayahs 243–283)',
      title: 'Divine Sovereignty & Ethical Economics',
      desc: 'Pivotal spiritual heights including Ayat al-Kursi (255), the parable of Prophet Ibrahim reviving birds, pure charity, and the absolute elimination of usury.'
    },
    {
      section: 'Part 7 (Ayahs 284–286)',
      title: 'The Great Creed & Comprehensive Supplication',
      desc: 'The climax of the Surah: acceptance of divine commandments, acknowledgment of human frailty, and the eternal prayer for forgiveness, ease, and victory.'
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-emerald-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-arabesque opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-gold-300 uppercase tracking-wider mb-3">
            <Info className="w-4 h-4 text-gold-400" />
            <span>Comprehensive Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
            Surah Al-Baqarah (The Cow)
          </h1>
          <p className="font-arabic text-2xl text-gold-200 mb-4" dir="rtl">
            سُورَةُ البَقَرَة – مَدَنِيَّة
          </p>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Surah Al-Baqarah is the second and longest chapter of the Noble Quran. It stands as the cornerstone of Islamic theology, jurisprudence, morality, and civilization, revealed primarily in Madinah following the Hijrah.
          </p>
        </div>
      </section>

      {/* Surah Metrics Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Surah Number</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-emerald-100">2</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Total Verses</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">286</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Revelation Place</div>
          <div className="text-2xl font-bold text-gold-600 dark:text-gold-300">Madinah</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Total Rukus</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-emerald-100">40</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Juz Division</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-emerald-100">Juz 1 – 3</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 text-center shadow-sm">
          <div className="text-xs text-slate-400 dark:text-emerald-400 font-semibold mb-1">Chronological Order</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-emerald-100">87th</div>
        </div>
      </section>

      {/* Virtues of Surah Al-Baqarah (Hadith Evidences) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Virtues Recorded in Authentic Hadiths</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-emerald-400/80">
            Prophetic traditions affirming the immense blessings and protection of Al-Baqarah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 shadow-sm">
            <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-emerald-500" />
              <span>Expelling Evil from the Home</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3">
              "Abu Hurairah reported: The Messenger of Allah ﷺ said: 'Do not turn your houses into graveyards. Indeed, Satan flees from the house in which Surah Al-Baqarah is recited.'"
            </p>
            <div className="text-xs font-semibold text-gold-700 dark:text-gold-400">
              Source: Sahih Muslim (Hadith 780)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 shadow-sm">
            <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-emerald-500" />
              <span>The Greatest Verse (Ayat al-Kursi)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3">
              "Ubayy ibn Ka'b reported: The Prophet ﷺ asked: 'O Abu Mundhir, which verse from the Book of Allah that is with you is greatest?' I said: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer (Ayat al-Kursi).' The Prophet struck my chest and said: 'May knowledge be pleasant for you, O Abu Mundhir!'"
            </p>
            <div className="text-xs font-semibold text-gold-700 dark:text-gold-400">
              Source: Sahih Muslim (Hadith 810)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 shadow-sm">
            <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-emerald-500" />
              <span>Sufficiency of the Last Two Verses (285–286)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3">
              "Abu Mas'ud al-Badri reported: The Prophet ﷺ said: 'Whoever recites the last two verses of Surah Al-Baqarah at night, they will be sufficient for him (against all harm and evil).'"
            </p>
            <div className="text-xs font-semibold text-gold-700 dark:text-gold-400">
              Source: Sahih al-Bukhari (5009) & Sahih Muslim (807)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 shadow-sm">
            <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-emerald-500" />
              <span>The Radiant Intercessors on Judgment Day</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3">
              "Abu Umamah reported: I heard the Messenger of Allah ﷺ say: 'Read the Quran, for it will come as an intercessor for its companions on the Day of Resurrection. Read the two radiant ones: Al-Baqarah and Al-Imran, for they will come like two clouds shading their reciters.'"
            </p>
            <div className="text-xs font-semibold text-gold-700 dark:text-gold-400">
              Source: Sahih Muslim (Hadith 804)
            </div>
          </div>
        </div>
      </section>

      {/* Structural Breakdown & Themes */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-500" />
            <span>Thematic Structure of Surah Al-Baqarah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-emerald-400/80">
            A comprehensive overview of the logical progression and divine commandments
          </p>
        </div>

        <div className="space-y-3">
          {structuralThemes.map((st, i) => (
            <div 
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {st.section}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-emerald-100">
                    {st.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-300/80 mt-1">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Verses Directory */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gold-500" />
              <span>Key Verses Directory</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-400/80">
              Click on any verse to jump directly into the reader
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyVersesData.map((kv) => (
            <div
              key={kv.num}
              onClick={() => navigateToAyah(kv.num)}
              className="p-5 rounded-2xl bg-white dark:bg-[#0c1e17] border border-slate-200 dark:border-emerald-950/80 hover:border-emerald-500 dark:hover:border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    Ayah 2:{kv.num}
                  </span>
                  <span className="text-[11px] font-semibold text-gold-600 dark:text-gold-400">
                    {kv.theme}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {kv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {kv.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Read & Listen in Reader</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
