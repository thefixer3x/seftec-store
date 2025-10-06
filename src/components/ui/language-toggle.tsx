import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGES, getTranslation, loadSharedTranslations } from '@/lib/translations';

// Translation context
interface I18nContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);


// I18n Provider
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('seftec-language') || 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Persist language choice
    if (typeof window !== 'undefined') {
      localStorage.setItem('seftec-language', lang);
    }
    
    // Force a re-render by dispatching events and triggering state updates
    window.dispatchEvent(new CustomEvent('language-changed', { 
      detail: { language: lang } 
    }));
    
    // Force React components to re-render by triggering a storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'seftec-language',
      newValue: lang,
      storageArea: localStorage
    }));
    
    // Additional force re-render with setTimeout to ensure state updates
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('language-updated', { 
        detail: { language: lang, timestamp: Date.now() } 
      }));
    }, 50);
  };

  const t = (key: string, fallback?: string) => {
    return getTranslation(currentLanguage, key, fallback);
  };

  // Initialize language settings on mount
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  // Load shared translations on mount
  useEffect(() => {
    loadSharedTranslations();
  }, []);

  return (
    <I18nContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook to use i18n context
export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
};

// Language Toggle Component
interface LanguageToggleProps {
  currentLanguage?: string;
  onLanguageChange?: () => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const { currentLanguage, setLanguage } = useI18nContext();
  const current = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={variant === 'compact' ? 'sm' : 'default'}
          className={`gap-2 ${className}`}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{current.flag}</span>
          <span className="text-xs font-medium">{current.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`flex items-center gap-3 ${
              currentLanguage === language.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="text-xs text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};