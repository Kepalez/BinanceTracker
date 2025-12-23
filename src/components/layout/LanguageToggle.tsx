'use client';

import { useLanguage } from '../providers/LanguageProvider';

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-2.5 h-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold border border-transparent dark:border-slate-700 uppercase"
      aria-label="Change Language"
    >
      {lang}
    </button>
  );
}