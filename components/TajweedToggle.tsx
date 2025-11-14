import React, { useState } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { InfoIcon } from './icons/InfoIcon';
import { CloseIcon } from './icons/CloseIcon';

interface TajweedToggleProps {
  isChecked: boolean;
  onToggle: () => void;
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

const TajweedToggle: React.FC<TajweedToggleProps> = ({ isChecked, onToggle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <label htmlFor="tajweed-toggle" className="flex items-center cursor-pointer bg-slate-200 p-1 rounded-full">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${!isChecked ? 'bg-white text-slate-800' : 'text-slate-500'}`}>
             <EyeOffIcon className="inline-block w-4 h-4 mr-1 -mt-px" />
             Biasa
          </span>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${isChecked ? 'bg-white text-slate-800' : 'text-slate-500'}`}>
            <EyeIcon className="inline-block w-4 h-4 mr-1 -mt-px" />
            Tajwid
          </span>
          <input id="tajweed-toggle" type="checkbox" checked={isChecked} onChange={onToggle} className="hidden" />
        </label>
        <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" aria-label="Petunjuk Warna Tajwid">
          <InfoIcon className="w-5 h-5" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Petunjuk Warna Tajwid</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                  <CloseIcon className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <ul className="space-y-3">
              {tajweedLegend.map((item) => (
                <li key={item.rule} className="flex items-start">
                  <div className="w-5 h-5 rounded-full mr-3 mt-1 flex-shrink-0" style={{ backgroundColor: item.color, border: '1px solid rgba(0,0,0,0.1)' }}></div>
                  <div>
                      <p className="font-semibold text-slate-800">{item.rule}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
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

export default TajweedToggle;