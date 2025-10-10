import { useI18nContext } from '@/components/ui/language-toggle';

/**
 * Simple hook that provides the translation function
 * This is a convenience hook to make it easier to use translations in components
 */
export const useTranslation = () => {
    const { t, currentLanguage, setLanguage } = useI18nContext();

    return {
        t,
        currentLanguage,
        setLanguage,
        // Helper function for common patterns
        tWithFallback: (key: string, fallback: string) => t(key, fallback)
    };
};