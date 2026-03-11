import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Lang } from "@/i18n/translations";

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("equifund-lang");
    return (saved as Lang) || "en";
  });

  const setLanguage = useCallback((lang: Lang) => {
    setLang(lang);
    localStorage.setItem("equifund-lang", lang);
    // Set dir attribute for RTL languages
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
