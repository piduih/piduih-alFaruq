
import React, { useState } from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { CloseIcon } from './icons/CloseIcon';

type DisplayMode = 'uthmani' | 'imlai' | 'tajwid';

interface DisplayModeToggleProps {
  mode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
}

const tajweedLegend = [
  { rule: 'Ghunnah (Dengung)', color: '#FF6E40', description: 'Bunyi dengung yang keluar dari rongga hidung.' },
  { rule: 'Idgham (Gabung)', color: '#69F0AE', description: 'Menggabungkan bunyi nun sakinah/tanwin ke dalam huruf berikutnya.' },
  { rule: 'Ikhfa\' (Samar)', color: '#18FFFF', description: 'Menyamarkan bunyi nun sakinah/tanwin antara Izhar dan Idgham.' },
  { rule: 'Iqlab (Tukar)', color: '#B388FF', description: 'Menukarkan bunyi nun sakinah/tanwin kepada bunyi mim.' },
  { rule: 'Qalqalah (Lantunan)', color: '#448AFF', description: 'Bunyi lantunan pada huruf-huruf tertentu ketika sukun.' },
  { rule: 'Madd 2 Harakat', color: '#A7FFEB', description: 'Bacaan panjang asas sebanyak 2 harakat.' },
  { rule: 'Madd 3-6 Harakat', color: '#EC407A', description: 'Bacaan panjang melebihi 2 harakat.' },
];

const DisplayModeToggle: React.FC<DisplayModeToggleProps> = ({ mode, onModeChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options: { id: DisplayMode; label: string }[] = [
    { id: 'uthmani', label: 'Uthmani' },
    { id: 'imlai', label: 'Imla\'i' },
    { id: 'tajwid', label: 'Tajwid' },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="flex items-center cursor-pointer bg-slate-200 dark:bg-slate-700 p-1 rounded-full">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onModeChange(option.id)}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-300 relative
                ${mode === option.id 
                  ? 'text-slate-800 dark:text-slate-100' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`
              }
            >
              {mode === option.id && (
                <span className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm z-0"></span>
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          ))}
        </div>
        <button 
            onClick={() => setIsModalOpen(true)} 
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors" 
            aria-label="Petunjuk Warna Tajwid"
        >
          <InfoIcon className="w-5 h-5" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Petunjuk Warna Tajwid</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                  <CloseIcon className="w-6 h-6 text-slate-500" />
              </button>
            </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Warna-warna ini hanya akan muncul apabila mod "Tajwid" diaktifkan.</p>
            <ul className="space-y-3">
              {tajweedLegend.map((item) => (
                <li key={item.rule} className="flex items-start">
                  <div className="w-5 h-5 rounded-full mr-3 mt-1 flex-shrink-0" style={{ backgroundColor: item.color, border: '1px solid rgba(0,0,0,0.1)' }}></div>
                  <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{item.rule}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayModeToggle;
