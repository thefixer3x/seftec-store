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
  try {
    // We can dynamically import shared translations if needed
    const sharedEn = await import('@/../../packages/shared/locales/en.json');
    const sharedAr = await import('@/../../packages/shared/locales/ar.json');
    const sharedEs = await import('@/../../packages/shared/locales/es.json');
    const sharedFr = await import('@/../../packages/shared/locales/fr.json');
    const sharedDe = await import('@/../../packages/shared/locales/de.json');
    const sharedPt = await import('@/../../packages/shared/locales/pt.json');
    const sharedJa = await import('@/../../packages/shared/locales/ja.json');
    const sharedZh = await import('@/../../packages/shared/locales/zh.json');

    // Merge shared translations with app-specific ones
    translations.en = { ...sharedEn.default, ...translations.en };
    translations.ar = { ...sharedAr.default, ...translations.ar };
    translations.es = { ...sharedEs.default, ...translations.es };
    translations.fr = { ...sharedFr.default, ...translations.fr };
    translations.de = { ...sharedDe.default, ...translations.de };
    translations.pt = { ...sharedPt.default, ...translations.pt };
    translations.ja = { ...sharedJa.default, ...translations.ja };
    translations.zh = { ...sharedZh.default, ...translations.zh };
  } catch (error) {
    console.warn('Could not load shared translations:', error);
  }
}