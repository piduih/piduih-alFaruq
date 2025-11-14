import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-8 w-8 text-amber-400" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Al-<span className="text-amber-400">Faruq</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;