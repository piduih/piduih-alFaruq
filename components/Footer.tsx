import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Al-Faruq. Dikuasakan oleh Google Gemini.</p>
      </div>
    </footer>
  );
};

export default Footer;