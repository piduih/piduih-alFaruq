import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getSoulHealingAdvice } from '../services/geminiService';
import { HeartIcon } from './icons/HeartIcon';

const SoulHealer: React.FC = () => {
  const [feeling, setFeeling] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim() || isLoading) return;

    setIsLoading(true);
    setAdvice('');
    setError('');
    
    try {
      const result = await getSoulHealingAdvice(feeling);
      setAdvice(result);
    } catch (err) {
      setError('Gagal mendapatkan nasihat. Sila cuba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const presetFeelings = [
    "Saya rasa resah dan cemas",
    "Saya perlukan motivasi",
    "Saya rasa sedih",
    "Saya rasa tidak bersyukur"
  ];

  const handlePresetClick = async (preset: string) => {
    setFeeling(preset);
    
    setIsLoading(true);
    setAdvice('');
    setError('');
    
    try {
      const result = await getSoulHealingAdvice(preset);
      setAdvice(result);
    } catch (err)
      {
      setError('Gagal mendapatkan nasihat. Sila cuba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="mb-10 max-w-4xl mx-auto">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <HeartIcon className="h-8 w-8 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-900">
            Penawar Hati
          </h2>
        </div>
        <p className="text-slate-600 mb-6">
          Luahkan perasaan anda dan biarkan AI membantu anda mencari ketenangan melalui ayat-ayat suci Al-Quran.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Cth: Saya rasa buntu dan hilang harapan..."
            className="flex-grow w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !feeling.trim()}
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? 'Mencari...' : 'Dapatkan Ketenangan'}
          </button>
        </form>
        
        <div className="flex flex-wrap gap-2 mb-8">
            {presetFeelings.map((f, i) => (
                <button
                key={i}
                onClick={() => handlePresetClick(f)}
                disabled={isLoading}
                className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full hover:bg-emerald-200 disabled:opacity-50 transition-colors"
                >
                {f}
                </button>
            ))}
        </div>

        {(isLoading || advice || error) && (
          <div className="mt-6 p-6 bg-white rounded-lg min-h-[100px]">
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-400"></div>
                  <span>AI sedang mencari ayat-ayat penenang...</span>
              </div>
            )}
            {error && <p className="text-red-400">{error}</p>}
            {advice && (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoulHealer;