import { useCallback, useEffect, useState } from 'react';
import type { Lang } from '../types/hud';

const STORAGE_KEY = 'scr-portfolio-lang';

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  if (queryLang === 'es' || queryLang === 'en') return queryLang;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'es' || saved === 'en') return saved;

  const navLang = window.navigator.language.toLowerCase();
  return navLang.startsWith('es') ? 'es' : 'en';
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage quota / private mode errors
    }
    document.documentElement.lang = next;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'es' : 'en');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, setLang, toggleLang };
}
