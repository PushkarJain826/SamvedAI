'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Language, AccessibilitySettings } from '@/types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (settings: AccessibilitySettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [accessibility, setAccessibilityState] = useState<AccessibilitySettings>({
    textSize: 'normal',
    reducedMotion: false,
    highContrast: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('samvedai-lang') as Language | null;
      if (savedLang && ['en', 'hi', 'mr'].includes(savedLang)) {
        setLanguageState(savedLang);
      }
      const savedA11y = localStorage.getItem('samvedai-a11y');
      if (savedA11y) {
        setAccessibilityState(JSON.parse(savedA11y));
      }
    } catch {
      // Ignore errors from localStorage
    }
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    // Text size
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-x-large');
    root.classList.add(`text-size-${accessibility.textSize === 'x-large' ? 'x-large' : accessibility.textSize}`);
    // Reduced motion
    if (accessibility.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    // High contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [accessibility]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('samvedai-lang', lang);
    } catch {
      // Ignore
    }
  }, []);

  const setAccessibility = useCallback((settings: AccessibilitySettings) => {
    setAccessibilityState(settings);
    try {
      localStorage.setItem('samvedai-a11y', JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage, accessibility, setAccessibility }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
