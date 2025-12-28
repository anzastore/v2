'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ID' | 'EN';
type Currency = 'IDR' | 'USD';

interface SettingsContextType {
    language: Language;
    currency: Currency;
    toggleLanguage: () => void;
    toggleCurrency: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ID');
    const [currency, setCurrency] = useState<Currency>('IDR');

    // Load from localStorage on mount
    useEffect(() => {
        const storedLang = localStorage.getItem('anza_language') as Language;
        const storedCurr = localStorage.getItem('anza_currency') as Currency;
        if (storedLang) setLanguage(storedLang);
        if (storedCurr) setCurrency(storedCurr);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'ID' ? 'EN' : 'ID';
        setLanguage(newLang);
        localStorage.setItem('anza_language', newLang);
    };

    const toggleCurrency = () => {
        const newCurr = currency === 'IDR' ? 'USD' : 'IDR';
        setCurrency(newCurr);
        localStorage.setItem('anza_currency', newCurr);
        // Note: In a real app, this would trigger a re-fetch or context update for prices.
    };

    return (
        <SettingsContext.Provider value={{ language, currency, toggleLanguage, toggleCurrency }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
