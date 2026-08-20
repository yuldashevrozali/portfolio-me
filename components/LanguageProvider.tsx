"use client";

import {
    createContext,
    createElement,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type Locale = "uz" | "en";

export const LanguageContext = createContext<{
    locale: Locale;
    setLocale: (locale: Locale) => void;
} | null>(null);

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("uz");

    useEffect(() => {
        const stored = window.localStorage.getItem("portfolio-locale") as Locale | null;
        const initial = stored === "uz" || stored === "en" ? stored : "uz";
        setLocaleState(initial);
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale === "uz" ? "uz" : "en";
        window.localStorage.setItem("portfolio-locale", locale);
    }, [locale]);

    const setLocale = (nextLocale: Locale) => {
        setLocaleState(nextLocale);
        document.documentElement.lang = nextLocale === "uz" ? "uz" : "en";
        window.localStorage.setItem("portfolio-locale", nextLocale);
    };

    const value = useMemo(() => ({ locale, setLocale }), [locale]);

    return createElement(LanguageContext.Provider, { value }, children);
}
