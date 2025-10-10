// Translation loader system for the locales JSON files
import enTranslations from '../../locales/en.json';
import arTranslations from '../../locales/ar.json';
import esTranslations from '../../locales/es.json';
import frTranslations from '../../locales/fr.json';
import deTranslations from '../../locales/de.json';
import ptTranslations from '../../locales/pt.json';
import jaTranslations from '../../locales/ja.json';
import zhTranslations from '../../locales/zh.json';

// Define available languages
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Load all translations
export const translations: Record<string, any> = {
  en: enTranslations,
  ar: arTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  pt: ptTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
};

// Helper function to get nested translation value
export function getTranslation(language: string, key: string, fallback?: string): string {
  const keys = key.split('.');
  let value: any = translations[language] || translations.en;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // If key not found, try English fallback
      value = translations.en;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return fallback || key;
        }
      }
      return value || fallback || key;
    }
  }

  return value || fallback || key;
}

// Load additional translations from other packages if needed
export async function loadSharedTranslations() {
  // Currently no shared translations to load
  // This function is kept for future extensibility
  console.log('Translation system initialized with local translations');
}