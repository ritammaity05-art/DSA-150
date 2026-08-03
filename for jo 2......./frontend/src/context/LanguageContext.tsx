"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  isBengali: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  isBengali: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('codeeasy_lang') as Language;
    if (saved === 'en' || saved === 'bn') {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('codeeasy_lang', l);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'bn' : 'en';
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isBengali: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
