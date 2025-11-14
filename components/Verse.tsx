
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Verse as VerseType } from '../types';
import { getVerseTafsir } from '../services/geminiService';
import { InfoIcon } from './icons/InfoIcon';

interface VerseProps {
  surahName: string;
  verse: VerseType;
  isTajweedEnabled: boolean;
}

const Verse: React.FC<VerseProps> = ({ surahName, verse, isTajweedEnabled }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tafsir, setTafsir] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleTafsir = async () => {
    // If we are opening it and there's no tafsir yet, fetch it.
    if (!isExpanded && !tafsir) {
      setIsExpanded(true);
      setIsLoading(true);
      setError('');
      try {
        const result = await getVerseTafsir(surahName, verse.verseNumber);
        setTafsir(result);
      } catch (err) {
        setError('Gagal memuatkan tafsir.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Just toggle visibility
      setIsExpanded(!isExpanded);
    }
  };

  const renderTranslationWithSuperscript = (text: string) => {
    // Split the text by sequences of digits. The capturing group (\d+) ensures the digits are kept in the array.
    const parts = text.split(/(\d+)/g);

    return (
      <>
        {parts.map((part, index) => {
          if (/\d+/.test(part)) {
            // If the part is a number, wrap it in a sup tag with specific styling.
            return <sup key={index} className="font-sans text-xs -top-1 relative mx-px">{part}</sup>;
          }
          // Otherwise, return the text part as is.
          return part;
        })}
      </>
    );
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 transition-colors duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center text-amber-500 font-bold">
          {verse.verseNumber}
        </div>
        <div className="flex-grow">
          {isTajweedEnabled ? (
             <div 
                className="text-right font-arabic mb-3 tajweed-verse" 
                dangerouslySetInnerHTML={{ __html: verse.tajweedHtml }} 
            />
          ) : (
             <p className="text-right font-arabic text-slate-800 mb-3">{verse.arabicText}</p>
          )}

          <p className="text-sm text-slate-600 italic">"{renderTranslationWithSuperscript(verse.malayTranslation)}"</p>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleToggleTafsir}
          className="inline-flex items-center space-x-2 text-xs px-3 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 disabled:opacity-50 transition-colors"
        >
          <InfoIcon className="h-4 w-4" />
          <span>{isExpanded ? 'Tutup Tafsir' : 'Tafsir AI'}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          {isLoading && (
             <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
                <span>AI sedang menyediakan tafsir...</span>
            </div>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
          {tafsir && (
             <div className="prose prose-sm prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{tafsir}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verse;