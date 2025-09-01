import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Language configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Translation context
interface I18nContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Simple translation function (can be extended with actual translation files)
const translations: Record<string, Record<string, string>> = {
  en: {
    'store.title': 'SefTec Store',
    'nav.home': 'Home',
    'nav.solutions': 'Solutions',
    'nav.biztools': 'BizTools',
    'nav.defi': 'Enterprise DeFi',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'cta.sign_in': 'Sign In',
    'cta.sign_up': 'Sign Up',
    'hero.title': 'Transform Your Business with Advanced Technology',
    'hero.subtitle': 'Enterprise DeFi access platform with AI-powered B2B marketplace',
  },
  ar: {
    'store.title': 'متجر سيفتك',
    'nav.home': 'الرئيسية',
    'nav.solutions': 'الحلول',
    'nav.biztools': 'أدوات الأعمال',
    'nav.defi': 'تمويل لامركزي للمؤسسات',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.services': 'الخدمات',
    'nav.contact': 'اتصل بنا',
    'cta.sign_in': 'تسجيل الدخول',
    'cta.sign_up': 'اشتراك',
    'hero.title': 'تحويل أعمالك بالتكنولوجيا المتقدمة',
    'hero.subtitle': 'منصة الوصول للتمويل اللامركزي للمؤسسات مع سوق B2B مدعوم بالذكاء الاصطناعي',
  },
  es: {
    'store.title': 'Tienda SefTec',
    'nav.home': 'Inicio',
    'nav.solutions': 'Soluciones',
    'nav.biztools': 'Herramientas de Negocios',
    'nav.defi': 'DeFi Empresarial',
    'nav.about': 'Acerca de',
    'nav.products': 'Productos',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'cta.sign_in': 'Iniciar Sesión',
    'cta.sign_up': 'Registrarse',
    'hero.title': 'Transforma tu Negocio con Tecnología Avanzada',
    'hero.subtitle': 'Plataforma de acceso DeFi empresarial con marketplace B2B impulsado por IA',
  },
  fr: {
    'store.title': 'Magasin SefTec',
    'nav.home': 'Accueil',
    'nav.solutions': 'Solutions',
    'nav.biztools': 'Outils Business',
    'nav.defi': 'DeFi Entreprise',
    'nav.about': 'À propos',
    'nav.products': 'Produits',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'cta.sign_in': 'Se connecter',
    'cta.sign_up': 'S\'inscrire',
    'hero.title': 'Transformez votre Entreprise avec la Technologie Avancée',
    'hero.subtitle': 'Plateforme d\'accès DeFi d\'entreprise avec marketplace B2B alimenté par l\'IA',
  },
  de: {
    'store.title': 'SefTec Shop',
    'nav.home': 'Startseite',
    'nav.solutions': 'Lösungen',
    'nav.biztools': 'Business-Tools',
    'nav.defi': 'Unternehmens-DeFi',
    'nav.about': 'Über uns',
    'nav.products': 'Produkte',
    'nav.services': 'Dienstleistungen',
    'nav.contact': 'Kontakt',
    'cta.sign_in': 'Anmelden',
    'cta.sign_up': 'Registrieren',
    'hero.title': 'Transformieren Sie Ihr Unternehmen mit fortschrittlicher Technologie',
    'hero.subtitle': 'Enterprise DeFi-Zugangsplattform mit KI-gestütztem B2B-Marktplatz',
  },
  pt: {
    'store.title': 'Loja SefTec',
    'nav.home': 'Início',
    'nav.solutions': 'Soluções',
    'nav.biztools': 'Ferramentas de Negócios',
    'nav.defi': 'DeFi Empresarial',
    'nav.about': 'Sobre',
    'nav.products': 'Produtos',
    'nav.services': 'Serviços',
    'nav.contact': 'Contato',
    'cta.sign_in': 'Entrar',
    'cta.sign_up': 'Cadastrar',
    'hero.title': 'Transforme seu Negócio com Tecnologia Avançada',
    'hero.subtitle': 'Plataforma de acesso DeFi empresarial com marketplace B2B alimentado por IA',
  },
  ja: {
    'store.title': 'SefTecストア',
    'nav.home': 'ホーム',
    'nav.solutions': 'ソリューション',
    'nav.biztools': 'ビジネスツール',
    'nav.defi': 'エンタープライズDeFi',
    'nav.about': '会社概要',
    'nav.products': '製品',
    'nav.services': 'サービス',
    'nav.contact': '連絡先',
    'cta.sign_in': 'サインイン',
    'cta.sign_up': 'サインアップ',
    'hero.title': '先進テクノロジーでビジネスを変革',
    'hero.subtitle': 'AI搭載B2Bマーケットプレイスを備えたエンタープライズDeFiアクセスプラットフォーム',
  },
  zh: {
    'store.title': 'SefTec商店',
    'nav.home': '首页',
    'nav.solutions': '解决方案',
    'nav.biztools': '商业工具',
    'nav.defi': '企业DeFi',
    'nav.about': '关于我们',
    'nav.products': '产品',
    'nav.services': '服务',
    'nav.contact': '联系我们',
    'cta.sign_in': '登录',
    'cta.sign_up': '注册',
    'hero.title': '用先进技术改变您的业务',
    'hero.subtitle': '企业级DeFi访问平台，配备AI驱动的B2B市场',
  },
};

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
    
    // Force a re-render by updating a timestamp
    window.dispatchEvent(new CustomEvent('language-changed', { 
      detail: { language: lang } 
    }));
  };

  const t = (key: string, fallback?: string) => {
    return translations[currentLanguage]?.[key] || fallback || key;
  };

  // Initialize language settings on mount
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

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