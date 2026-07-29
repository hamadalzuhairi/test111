import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "../data/types";
import { dictionaries } from "./dictionaries";
import type { Copy } from "./en";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Copy;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * English is the default on load, per brief. The toggle swaps the whole app
 * and flips document direction for structural RTL mirroring. State lives in
 * memory only (no localStorage) so the app matches the artifact runtime
 * constraint and also always starts fresh in English on the kiosk.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, t: dictionaries[lang], toggleLang, setLang }),
    [lang, dir, toggleLang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
