'use client';

import { Language, translations } from '@/src/lib/dictionary';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  lang: Language;
  t: typeof translations['en'];
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const value = {
    lang,
    t: translations[lang],
    toggleLanguage,
  };
  
  return (
    <LanguageContext.Provider value={value}>
      <div className="h-full flex flex-col" style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}