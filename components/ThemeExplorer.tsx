import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getVersesByTheme } from '../services/geminiService';
import { CompassIcon } from './icons/CompassIcon';
import { QURANIC_THEMES } from '../constants';

const ThemeExplorer: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [verses, setVerses] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleThemeClick = async (theme: string) => {
    setSelectedTheme(theme);
    setIsLoading(true);
    setVerses('');
    setError('');

    try {
      const result = await getVersesByTheme(theme);
      setVerses(result);
    } catch (err) {
      setError('Gagal mendapatkan huraian tema. Sila cuba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-10 max-w-4xl mx-auto">
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <CompassIcon className="h-8 w-8 text-sky-500" />
          <h2 className="text-2xl font-bold text-slate-900">
            Jelajah Tema Al-Quran
          </h2>
        </div>
        <p className="text-slate-600 mb-6">
          Pilih satu tema untuk melihat bagaimana Al-Quran membincangkannya secara menyeluruh di pelbagai surah.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {QURANIC_THEMES.map((theme, i) => (
            <button
              key={i}
              onClick={() => handleThemeClick(theme)}
              disabled={isLoading}
              className={`text-sm px-4 py-2 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50
                ${selectedTheme === theme && !isLoading
                  ? 'bg-sky-500 text-white' 
                  : 'bg-sky-100 text-sky-800 hover:bg-sky-200'}`
              }
            >
              {isLoading && selectedTheme === theme ? 'Mengkaji...' : theme}
            </button>
          ))}
        </div>

        {(isLoading || verses || error) && (
          <div className="mt-6 p-6 bg-white rounded-lg min-h-[100px]">
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sky-400"></div>
                <span>AI sedang mengumpul ayat-ayat berkaitan "{selectedTheme}"...</span>
              </div>
            )}
            {error && <p className="text-red-400">{error}</p>}
            {verses && (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{verses}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeExplorer;