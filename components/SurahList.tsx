import React from 'react';
import type { Surah } from '../types';

interface SurahListProps {
  surahs: Surah[];
  onSelectSurah: (surah: Surah) => void;
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSelectSurah }) => {
  if (surahs.length === 0) {
    return <p className="text-center text-slate-500 mt-8">Tiada surah ditemui.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map(surah => (
        <div
          key={surah.id}
          onClick={() => onSelectSurah(surah)}
          className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-amber-400/50 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-200 group-hover:bg-amber-400/10 rounded-md flex items-center justify-center text-amber-500 font-bold text-lg transition-colors">
                {surah.id}
              </div>
              <div>
                <p className="font-semibold text-lg text-slate-800">{surah.nameRoman}</p>
                <p className="text-sm text-slate-500">{surah.nameMalay}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-arabic text-amber-500">{surah.nameArabic}</p>
              <p className="text-xs text-slate-500">{surah.verseCount} ayat</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurahList;