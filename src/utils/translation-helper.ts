/**
 * Translation Helper Utilities
 * 
 * This file provides utilities to help developers work with translations
 * and identify components that need translation updates.
 */

import { useTranslation } from '@/hooks/useTranslation';

/**
 * Helper function to create translation-ready text with fallback
 * Usage: const text = tr('key.path', 'Default English text');
 */
export const tr = (key: string, fallback: string) => {
    // This is a simple wrapper that can be used in components
    // The actual translation will be handled by the useTranslation hook
    return { key, fallback };
};

/**
 * Hook that provides translation with automatic fallback
 * This is a convenience wrapper around useTranslation
 */
export const useT = () => {
    const { t } = useTranslation();

    return {
        t,
        // Helper for translating objects with multiple keys
        tObj: (keyPrefix: string, obj: Record<string, string>) => {
            const translated: Record<string, string> = {};
            Object.entries(obj).forEach(([key, fallback]) => {
                translated[key] = t(`${keyPrefix}.${key}`, fallback);
            });
            return translated;
        },
        // Helper for translating arrays
        tArray: (keyPrefix: string, items: string[]) => {
            return items.map((item, index) => t(`${keyPrefix}.${index}`, item));
        }
    };
};

/**
 * Common translation patterns for UI components
 */
export const commonTranslations = {
    // Common buttons
    buttons: {
        save: 'common.save',
        cancel: 'common.cancel',
        delete: 'common.delete',
        edit: 'common.edit',
        view: 'common.view',
        close: 'common.close',
        back: 'common.back',
        next: 'common.next',
        previous: 'common.previous',
        search: 'common.search',
        filter: 'common.filter',
        sort: 'common.sort',
        export: 'common.export',
        import: 'common.import',
        refresh: 'common.refresh'
    },

    // Common states
    states: {
        loading: 'common.loading',
        error: 'common.error',
        success: 'common.success'
    },

    // Navigation
    nav: {
        home: 'nav.home',
        solutions: 'nav.solutions',
        about: 'nav.about',
        contact: 'nav.contact',
        products: 'nav.products',
        services: 'nav.services'
    },

    // Auth
    auth: {
        signIn: 'auth.sign_in',
        signUp: 'auth.sign_up',
        signOut: 'auth.sign_out',
        email: 'auth.email',
        password: 'auth.password'
    }
};

/**
 * Development helper to log missing translations
 * Only works in development mode
 */
export const logMissingTranslation = (key: string, fallback: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(`🌐 Missing translation for key: ${key}, fallback: "${fallback}"`);
    }
};