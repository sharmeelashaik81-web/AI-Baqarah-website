import fs from 'fs';
import path from 'path';

async function buildData() {
  console.log('Fetching Surah Al-Baqarah complete verified dataset from AlQuran Cloud API...');

  // 1. Fetch Arabic Uthmani text, Sahih International, Transliteration, Alafasy Audio
  const res1 = await fetch('https://api.alquran.cloud/v1/surah/2/editions/quran-uthmani,en.sahih,en.transliteration,ar.alafasy');
  const d1 = await res1.json();

  // 2. Fetch Clear Quran (itani), Hilali-Khan, Yusuf Ali, Pickthall
  const res2 = await fetch('https://api.alquran.cloud/v1/surah/2/editions/en.itani,en.hilali,en.yusufali,en.pickthall');
  const d2 = await res2.json();

  if (!fs.existsSync('public/data')) {
    fs.mkdirSync('public/data', { recursive: true });
  }

  const uthmani = d1.data[0].ayahs;
  const sahih = d1.data[1].ayahs;
  const transliteration = d1.data[2].ayahs;
  const alafasy = d1.data[3].ayahs;

  const itani = d2.data[0].ayahs;
  const hilali = d2.data[1].ayahs;
  const yusufali = d2.data[2].ayahs;
  const pickthall = d2.data[3].ayahs;

  const keyVersesMap = {
    1: 'Opening of the Surah (Alif Lam Meem)',
    2: 'Guidance for the God-conscious (Muttaqeen)',
    21: 'Call to Universal Worship of the One Creator',
    30: 'Creation of Prophet Adam (AS) & The Angels',
    43: 'Establishment of Prayer, Charity & Bowing',
    143: 'The Balanced & Middle Nation (Ummatan Wasata)',
    144: 'Turning toward the Sacred Mosque (Qiblah Direction)',
    153: 'Seek Help through Patience and Prayer',
    155: 'Trial and Glad Tidings for the Patient (Sabireen)',
    156: 'Inna Lillahi wa Inna Ilayhi Rajiun',
    163: 'Your God is One God: There is No Deity but Him',
    177: 'Ayat al-Birr (The Essence & Definition of True Righteousness)',
    183: 'Obligation of Fasting during the Month of Ramadan',
    185: 'Ramadan: The Month in Which the Quran Was Revealed',
    186: 'Allah is Ever Near: Answering the Call of the Supplicant',
    197: 'The Blessed Months & Spiritual Provisions of Hajj',
    201: 'The Comprehensive Du\'a (Rabbana Atina fid-Dunya Hasanatan)',
    208: 'Enter into Peace and Islam Wholeheartedly',
    216: 'Trusting Divine Wisdom in Prescribed Matters',
    255: 'Ayat al-Kursi (The Verse of the Divine Throne)',
    256: 'No Compulsion in Religion & The Firm Handhold',
    261: 'Parable of Charity: The Single Grain Producing 700 Grains',
    267: 'Giving in Charity from Pure and Lawful Provisions',
    274: 'Reward of Spending Night and Day, Secretly and Publicly',
    275: 'Sanctity of Fair Trade & Absolute Prohibition of Usury (Riba)',
    282: 'Ayat ad-Dayn (The Verse of Debt & Contracts - Longest Ayah in Quran)',
    284: 'To Allah Belongs Everything in the Heavens and the Earth',
    285: 'Amanar-Rasul: The Noble Creed of the Messenger & Believers',
    286: 'The Ultimate Supplication of Relief and Mercy (Rabbana La Tuakhidhna)'
  };

  const ayahs = [];

  for (let i = 0; i < 286; i++) {
    const num = i + 1;
    const padded = String(num).padStart(3, '0');
    ayahs.push({
      numberInSurah: num,
      numberInQuran: uthmani[i].number,
      juz: uthmani[i].juz,
      manzil: uthmani[i].manzil,
      page: uthmani[i].page,
      ruku: uthmani[i].ruku,
      hizbQuarter: uthmani[i].hizbQuarter,
      sajda: uthmani[i].sajda,
      keyVerseTitle: keyVersesMap[num] || null,
      arabic: uthmani[i].text,
      transliteration: transliteration[i].text,
      translations: {
        sahih: {
          name: 'Saheeh International',
          author: 'Saheeh International',
          source: 'Published by Dar Abul-Qasim / Quran.com Verified Dataset',
          text: sahih[i].text
        },
        itani: {
          name: 'Clear Qur\'an',
          author: 'Talal Itani',
          source: 'Published Translation by Talal Itani / AlQuran Cloud',
          text: itani[i].text
        },
        hilali: {
          name: 'Taqi-ud-Din al-Hilali & Muhsin Khan',
          author: 'Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan',
          source: 'Published by King Fahd Complex for Printing the Holy Quran',
          text: hilali[i].text
        },
        yusufali: {
          name: 'Abdullah Yusuf Ali',
          author: 'Abdullah Yusuf Ali',
          source: 'Published Historical Translation by Abdullah Yusuf Ali',
          text: yusufali[i].text
        },
        pickthall: {
          name: 'Pickthall',
          author: 'Mohammed Marmaduke William Pickthall',
          source: 'Published Translation: The Meaning of the Glorious Quran',
          text: pickthall[i].text
        }
      },
      audio: {
        alafasy: alafasy[i].audio,
        abdulbasit: `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/002${padded}.mp3`,
        husary: `https://everyayah.com/data/Husary_128kbps/002${padded}.mp3`,
        minshawi: `https://everyayah.com/data/Minshawy_Murattal_128kbps/002${padded}.mp3`,
        shatri: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/002${padded}.mp3`
      }
    });
  }

  const payload = {
    surahInfo: {
      number: 2,
      name: 'سُورَةُ البَقَرَة',
      englishName: 'Al-Baqarah',
      englishNameTranslation: 'The Cow',
      numberOfAyahs: 286,
      revelationType: 'Madani',
      juzRange: 'Juz 1 (Ayah 1-141), Juz 2 (Ayah 142-252), Juz 3 (Ayah 253-286)',
      rukuCount: 40,
      description: 'The longest Surah of the Noble Quran, revealed in Madinah over several years. It lays the cornerstone of Islamic belief, worship, legislation, social justice, and ethics, containing pivotal verses like Ayat al-Kursi (255) and the concluding supplications (285-286).'
    },
    ayahs
  };

  fs.writeFileSync('public/data/surah_al_baqarah.json', JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`Successfully generated public/data/surah_al_baqarah.json with ${ayahs.length} verified Ayahs!`);
}

buildData().catch(err => {
  console.error('Error generating Quran data:', err);
  process.exit(1);
});
