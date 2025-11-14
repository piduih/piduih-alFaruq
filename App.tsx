import React, { useState, useMemo, useEffect } from 'react';
import type { Surah } from './types';
import { ALL_SURAHS } from './constants';
import Header from './components/Header';
import SurahList from './components/SurahList';
import SurahDetail from './components/SurahDetail';
import GeminiInsights from './components/GeminiInsights';
import Footer from './components/Footer';
import { SearchIcon } from './components/icons/SearchIcon';
import SoulHealer from './components/SoulHealer';
import ThemeExplorer from './components/ThemeExplorer';
import DailyWisdom from './components/DailyWisdom';

const App: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = useMemo(() => {
    return ALL_SURAHS.filter(surah =>
      surah.nameRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.nameMalay.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.id.toString().includes(searchTerm)
    );
  }, [searchTerm]);

  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedSurah(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedSurah ? (
          <SurahDetail surah={selectedSurah} onBack={handleBackToList} />
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-500 mb-2">Terokai Al-Quran bersama Al-Faruq</h1>
              <p className="text-center text-slate-500 text-lg">Pilih surah, cari pencerahan, atau ajukan soalan kepada AI.</p>
            </div>
            
            <DailyWisdom />
            <SoulHealer />
            <ThemeExplorer />
            
            <div className="relative my-10 max-w-2xl mx-auto">
               <h2 className="text-xl font-bold text-center text-slate-700 mb-4">Atau Cari Surah Pilihan Anda</h2>
              <input
                type="text"
                placeholder="Cari surah (e.g., Al-Fatihah, 1, Pembukaan)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-300 rounded-full text-slate-900 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </div>
            </div>

            <SurahList surahs={filteredSurahs} onSelectSurah={handleSelectSurah} />
            <GeminiInsights />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;