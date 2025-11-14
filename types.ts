
export interface Surah {
  id: number;
  nameArabic: string;
  nameRoman: string;
  nameMalay: string;
  verseCount: number;
}

export interface Verse {
  verseNumber: number;
  arabicText: string; // Rasm Uthmani
  tajweedHtml: string;
  malayTranslation: string;
}

export interface FullSurah extends Surah {
  verses: Verse[];
}
