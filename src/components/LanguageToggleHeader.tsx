import React from 'react';
import { useI18nContext, LanguageToggle } from '@/components/ui/language-toggle';

interface LanguageToggleHeaderProps {
  className?: string;
}

/**
 * Header component with language toggle for Vite/React apps
 * Example implementation for seftec-store
 */
export const LanguageToggleHeader: React.FC<LanguageToggleHeaderProps> = ({ 
  className = '' 
}) => {
  const { t, currentLanguage } = useI18nContext();

  return (
    <header className={`bg-white shadow-sm border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('store.title', 'SefTec Store')}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#products" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              {t('nav.products', 'Products')}
            </a>
            <a 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              {t('nav.services', 'Services')}
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              {t('nav.about', 'About')}
            </a>
          </nav>

          {/* Language toggle and actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={() => {}} // Handled by context
              variant="compact"
              className="mr-2"
            />
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              {t('cta.sign_in', 'Sign In')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LanguageToggleHeader;
