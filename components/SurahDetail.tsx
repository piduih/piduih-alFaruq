
import React, { useState } from 'react';
import type { Surah } from '../types';
import GeminiInsights from './GeminiInsights';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { useQuranData } from '../hooks/useQuranData';
import Verse from './Verse';
import TajweedToggle from './TajweedToggle';

interface SurahDetailProps {
  surah: Surah;
  onBack: () => void;
}

const SurahDetail: React.FC<SurahDetailProps> = ({ surah, onBack }) => {
  const { surahData, isLoading, error } = useQuranData(surah.id);
  const [showTajweed, setShowTajweed] = useState(true);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center space-x-2 text-amber-600 hover:text-amber-500 transition-colors"
      >
        <ArrowLeftIcon />
        <span>Kembali ke Senarai Surah</span>
      </button>

      <div className="text-center mb-8 bg-slate-100 border border-slate-200 rounded-xl p-8">
        <h1 className="font-arabic text-5xl text-amber-500 mb-2">{surah.nameArabic}</h1>
        <h2 className="text-3xl font-bold text-slate-900">{surah.nameRoman}</h2>
        <p className="text-lg text-slate-600">{surah.nameMalay}</p>
        <p className="text-sm text-slate-500 mt-1">{surah.verseCount} ayat</p>
      </div>

      <div className="flex justify-center mb-6">
        <TajweedToggle isChecked={showTajweed} onToggle={() => setShowTajweed(!showTajweed)} />
      </div>

      <div className="space-y-4 mb-12">
        {isLoading && <p className="text-center">Memuatkan ayat...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {surahData ? (
          surahData.verses.map((verse) => (
            <Verse key={verse.verseNumber} surahName={surahData.nameRoman} verse={verse} isTajweedEnabled={showTajweed} />
          ))
        ) : (
          !isLoading && <p className="text-center text-slate-500 p-8">Maaf, data untuk surah ini belum tersedia.</p>
        )}
      </div>

      <GeminiInsights surahName={surah.nameRoman} />
    </div>
  );
};

export default SurahDetail;