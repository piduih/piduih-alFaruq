import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askGemini } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface GeminiInsightsProps {
  surahName?: string;
}

const GeminiInsights: React.FC<GeminiInsightsProps> = ({ surahName }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generalQuestions = [
    "Berapa kali kalimah 'Allah' disebut dalam Al-Quran?",
    "Apakah surah terpanjang dan terpendek dalam Al-Quran?",
    "Ceritakan tentang Asbabun Nuzul ayat pertama yang diturunkan.",
    "Apakah perbezaan antara surah Makkiyah dan Madaniyah?"
  ];

  const surahSpecificQuestions = (name: string) => [
    `Apakah tema utama Surah ${name}?`,
    `Ceritakan Asbabun Nuzul (sebab turun) Surah ${name}.`,
    `Apakah kelebihan atau fadhilat mengamalkan Surah ${name}?`,
    `Sebutkan beberapa pengajaran penting dari Surah ${name}.`
  ];

  const questions = surahName ? surahSpecificQuestions(surahName) : generalQuestions;

  const handleSubmit = async (currentPrompt: string) => {
    if (!currentPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError('');
    
    try {
      const fullPrompt = surahName 
        ? `Berkenaan dengan Surah ${surahName}, ${currentPrompt}`
        : currentPrompt;
      const result = await askGemini(fullPrompt);
      setResponse(result);
    } catch (err) {
      setError('Gagal mendapatkan jawapan. Sila cuba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(prompt);
  };

  const handlePresetClick = (question: string) => {
    setPrompt(question);
    handleSubmit(question);
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <SparklesIcon className="h-8 w-8 text-amber-400" />
          <h2 className="text-2xl font-bold text-slate-900">
            Kaji Al-Quran dengan AI
          </h2>
        </div>
        <p className="text-slate-600 mb-6">
          {surahName ? `Ajukan soalan spesifik mengenai Surah ${surahName} atau pilih cadangan di bawah.` : 'Tanya apa sahaja mengenai Al-Quran untuk mendapatkan fakta dan pencerahan.'}
        </p>

        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={surahName ? `Soalan tentang Surah ${surahName}...` : "Cth: Siapakah nabi yang digelar Ulul Azmi?"}
            className="flex-grow w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? 'Memuat...' : 'Tanya'}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => handlePresetClick(q)}
              disabled={isLoading}
              className="text-xs px-3 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 disabled:opacity-50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {(isLoading || response || error) && (
          <div className="mt-6 p-6 bg-white rounded-lg min-h-[100px]">
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-400"></div>
                  <span>AI sedang menganalisis...</span>
              </div>
            )}
            {error && <p className="text-red-400">{error}</p>}
            {response && (
              <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiInsights;