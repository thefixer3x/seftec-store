
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { ShieldCheck, CreditCard, FileSignature, Calculator, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18nContext } from "@/components/ui/language-toggle";

const SolutionsSection: React.FC = () => {
  const { t } = useI18nContext();
  const [forceUpdate, setForceUpdate] = React.useState(0);

  // Listen for language changes and force re-render
  React.useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('language-updated', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'seftec-language') {
        setForceUpdate(prev => prev + 1);
      }
    });

    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('language-updated', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  // Translate solutions data
  const translatedSolutionsData = [
    {
      title: t('solutions.verified_marketplace.title', 'Verified B2B Marketplace'),
      description: t('solutions.verified_marketplace.description', 'Connect with pre-verified businesses, access company profiles, and build trust through transparent ratings and reviews.'),
      icon: <ShieldCheck size={24} />
    },
    {
      title: t('solutions.secure_payments.title', 'Secure Payment Solutions'),
      description: t('solutions.secure_payments.description', 'Multi-currency transactions with escrow protection, instant settlements, and fraud prevention.'),
      icon: <CreditCard size={24} />
    },
    {
      title: t('solutions.smart_contracts.title', 'Smart Contract Automation'),
      description: t('solutions.smart_contracts.description', 'Automated workflows for orders, invoices, and agreements with blockchain-backed security.'),
      icon: <FileSignature size={24} />
    },
    {
      title: t('solutions.trade_finance.title', 'Integrated Trade Finance'),
      description: t('solutions.trade_finance.description', 'Access working capital, invoice factoring, and supply chain financing tailored for SMEs.'),
      icon: <Calculator size={24} />
    },
    {
      title: t('solutions.global_reach.title', 'Global Payment Network'),
      description: t('solutions.global_reach.description', 'Low-cost international transfers with real-time FX rates and multi-currency wallets.'),
      icon: <Globe size={24} />
    },
    {
      title: t('solutions.ai_matching.title', 'AI-Powered Matching'),
      description: t('solutions.ai_matching.description', 'Find ideal trading partners with intelligent recommendations based on your business needs.'),
      icon: <Users size={24} />
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <SectionHeading
          label={t('solutions.title', 'Our Solutions')}
          title="Seamless Access for Every Business"
          subtitle="Use-case driven marketplace options tailored to your business needs."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-5xl mx-auto reveal">
          {translatedSolutionsData.map((solution, index) => (
            <div 
              key={index} 
              className="relative bg-white dark:bg-seftec-darkNavy/80 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md" 
            >
              <div className="absolute -top-6 left-8 bg-seftec-navy dark:bg-gradient-to-br dark:from-seftec-teal dark:to-seftec-purple text-white p-3 rounded-lg shadow-lg">
                {solution.icon}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">{solution.title}</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-6">{solution.description}</p>
                <Button 
                  variant="outline" 
                  className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300"
                >
                  {t('cta.learn_more', 'Learn More')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
