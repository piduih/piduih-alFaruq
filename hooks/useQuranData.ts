
import { useState, useEffect } from 'react';
import type { FullSurah, Verse } from '../types';
import { ALL_SURAHS } from '../constants';

// Using Abdullah Muhammad Basmeih translation (ID 134) from Quran.com API
const MALAY_TRANSLATION_ID = 134;

export const useQuranData = (surahId: number): { surahData: FullSurah | null; isLoading: boolean; error: string | null } => {
  const [surahData, setSurahData] = useState<FullSurah | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!surahId) return;

      setIsLoading(true);
      setError(null);

      try {
        const basicSurahInfo = ALL_SURAHS.find(s => s.id === surahId);
        if (!basicSurahInfo) {
          throw new Error('Maklumat asas surah tidak ditemui.');
        }

        const versesUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`;
        const translationsUrl = `https://api.quran.com/api/v4/quran/translations/${MALAY_TRANSLATION_ID}?chapter_number=${surahId}`;
        const tajweedUrl = `https://api.quran.com/api/v4/quran/verses/tajweed?chapter_number=${surahId}`;


        const [versesRes, translationsRes, tajweedRes] = await Promise.all([
          fetch(versesUrl),
          fetch(translationsUrl),
          fetch(tajweedUrl),
        ]);

        if (!versesRes.ok || !translationsRes.ok || !tajweedRes.ok) {
          throw new Error('Gagal menghubungi sumber data Al-Quran.');
        }

        const versesData = await versesRes.json();
        const translationsData = await translationsRes.json();
        const tajweedData = await tajweedRes.json();

        const mergedVerses: Verse[] = versesData.verses.map((verse: any, index: number) => {
          const rawTajweedHtml = tajweedData.verses[index]?.text_tajweed || verse.text_uthmani;
          // Sanitize the tajweed HTML by replacing the custom <tajweed> tag with a standard <span> tag for correct styling.
          const sanitizedTajweedHtml = rawTajweedHtml
            .replace(/<tajweed/g, '<span')
            .replace(/<\/tajweed>/g, '</span>');

          return {
            verseNumber: verse.verse_number,
            arabicText: verse.text_uthmani,
            tajweedHtml: sanitizedTajweedHtml,
            malayTranslation: translationsData.translations[index]?.text.replace(/<[^>]*>?/gm, '') || 'Terjemahan tidak ditemui.',
          };
        });
        
        const fullSurahData: FullSurah = {
            ...basicSurahInfo,
            verses: mergedVerses,
        };

        setSurahData(fullSurahData);

      } catch (e) {
        console.error("Error fetching Quran data:", e);
        setError(e instanceof Error ? e.message : 'Gagal memuatkan data surah.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahData();
  }, [surahId]);

  return { surahData, isLoading, error };
};
