import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDailyWisdom } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';

const DailyWisdom: React.FC = () => {
  const [wisdom, setWisdom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWisdom = async () => {
      const today = new Date().toISOString().split('T')[0];
      const storedWisdom = localStorage.getItem('dailyWisdom');
      const storedDate = localStorage.getItem('wisdomDate');

      if (storedWisdom && storedDate === today) {
        setWisdom(storedWisdom);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError('');
        try {
          const result = await getDailyWisdom();
          setWisdom(result);
          localStorage.setItem('dailyWisdom', result);
          localStorage.setItem('wisdomDate', today);
        } catch (err) {
          setError('Gagal mendapatkan hikmah harian. Sila cuba lagi.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWisdom();
  }, []);

  return (
    <div className="mb-10 max-w-4xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <LightbulbIcon className="h-8 w-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-slate-900">
            Hikmah Harian
          </h2>
        </div>
        
        <div className="min-h-[80px] flex items-center justify-center">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-slate-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
              <span>AI sedang mencari inspirasi untuk anda...</span>
            </div>
          )}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {wisdom && !isLoading && (
            <blockquote className="prose prose-slate max-w-none text-center">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{wisdom}</ReactMarkdown>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;