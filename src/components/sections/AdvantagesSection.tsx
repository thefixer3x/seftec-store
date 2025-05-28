
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle2, Star, Shield, Globe, Building, TrendingUp, Banknote, FileText, Users, Brain } from "lucide-react";

// Data for the advantages section
const advantagesData = [
  {
    title: 'First AI-Powered B2B Trade Hub',
    description: 'Smart analytics drive better deals and match businesses with ideal trading partners using advanced machine learning.',
    icon: Brain
  },
  {
    title: 'Escrow & Secure Payments',
    description: 'Eliminates fraud & transaction disputes with protected payment processing and instant settlement for verified businesses.',
    icon: Shield
  },
  {
    title: 'Integrated Cross-Border Payments',
    description: 'Instant vendor payouts worldwide with optimized exchange rates, low fees, and DeFi integration.',
    icon: Globe
  },
  {
    title: 'KYC/KYB Verified Network',
    description: 'Only legitimate businesses trade, creating a trusted marketplace environment with comprehensive verification.',
    icon: Users
  },
  {
    title: 'Built-in Financing Solutions',
    description: 'Trade finance offers from multiple vendors with competitive rates (4-6%) and flexible BNPL options.',
    icon: Banknote
  },
  {
    title: 'Multi-Country Business Registration',
    description: 'Complete incorporation and regulatory alignment support for US, UK & EU markets for Pro users.',
    icon: Building,
    premium: true
  },
  {
    title: 'Advanced Cashflow Management',
    description: 'In-depth cashflow analytics, forecasting, and working capital optimization tools for financial health.',
    icon: TrendingUp
  },
  {
    title: 'Business Plan & Strategy Services',
    description: 'AI-powered business plan review, drafting, and strategic planning to optimize your business strategy.',
    icon: FileText
  },
  {
    title: 'Global Compliance & Risk Analytics',
    description: 'Context-aware AI for global business practices, risk assessment, and regulatory compliance across markets.',
    icon: Shield,
    premium: true
  },
  {
    title: 'Premium AI Business Advisor',
    description: 'Strategic business and financial advisory powered by advanced algorithms that analyze your financial data, predict market trends, and help manage risks to enhance profitability. Includes real-time notifications, market insights, and deep learning capabilities.',
    icon: Star,
    premium: true
  }
];

const AdvantagesSection: React.FC = () => {
  return (
    <section id="advantages" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="Why Choose Us"
          title="Competitive Advantage"
          subtitle="Our marketplace stands out with unique features designed to make B2B trade secure, efficient, and profitable while ensuring global compliance and scalability."
        />
        
        <div className="max-w-6xl mx-auto reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantagesData.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-seftec-darkNavy/60 border border-seftec-slate dark:border-white/10 hover:shadow-lg transition-all duration-300 animate-fade-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-3 rounded-full text-white flex-shrink-0 ${advantage.premium ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-seftec-navy dark:bg-gradient-to-br dark:from-seftec-teal dark:to-seftec-purple'}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-seftec-navy dark:text-white">{advantage.title}</h3>
                      {advantage.premium && (
                        <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full">Premium</span>
                      )}
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70 text-sm leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-seftec-gold/10 to-seftec-teal/10 rounded-xl border border-seftec-gold/20">
            <h4 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Coming Soon in Phased Rollouts</h4>
            <p className="text-seftec-navy/80 dark:text-white/80">
              Enhanced DeFi integration • Advanced open banking solutions • Multi-vendor trade finance comparison • 
              Real-time global market insights • Automated compliance monitoring • And much more!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
