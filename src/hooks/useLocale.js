import { create } from 'zustand';
import { setLocale as setI18nLocale, t as translate, getLocale } from '../i18n/index.js';

export const useLocaleStore = create((set) => ({
  locale: getLocale(),
  setLocale: (locale) => {
    setI18nLocale(locale);
    set({ locale });
  },
}));

/**
 * Hook that returns the t() function and triggers re-render on locale change.
 */
export function useT() {
  const locale = useLocaleStore((s) => s.locale);
  // locale in dependency ensures re-render
  return translate;
}
