
import React from 'react';
import SectionHeading from '@/components/ui/section-heading';
import { Brain, Globe, CreditCard, UserPlus, Store, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const valuePropositions = [
  {
    icon: <Brain className="h-10 w-10 text-seftec-teal" />,
    title: 'AI-Powered Smart Matching',
    description: 'Our advanced algorithms connect you with the perfect business partners based on your needs, preferences, and transaction history.'
  },
  {
    icon: <Globe className="h-10 w-10 text-seftec-purple" />,
    title: 'Cross-Border Sourcing & Export',
    description: 'Connect with global suppliers and buyers, facilitating international trade across borders with ease and confidence.'
  },
  {
    icon: <CreditCard className="h-10 w-10 text-seftec-gold" />,
    title: 'Embedded Vendor Financing',
    description: 'Access instant credit for inventory purchases with competitive interest rates between 4% to 6%, improving your cash flow.'
  },
  {
    icon: <UserPlus className="h-10 w-10 text-seftec-teal" />,
    title: 'Direct Vendor Access',
    description: 'Manufacturers can promote products directly to high-potential vendors through targeted advertising and bulk special offers.'
  },
  {
    icon: <Store className="h-10 w-10 text-seftec-purple" />,
    title: 'Marketplace for Local & Global Sourcing',
    description: 'Access international brands and export locally produced goods, expanding your business reach globally.'
  },
  {
    icon: <Bot className="h-10 w-10 text-seftec-gold" />,
    title: 'AI Business Advisor',
    description: 'Our intelligent assistant analyzes financial data, market trends, and operations to provide strategic recommendations that optimize performance and enhance profitability.'
  },
];

const ValuePropositionsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-seftec-slate dark:from-seftec-darkNavy dark:to-seftec-darkNavy/90">
      <div className="container mx-auto">
        <SectionHeading
          label="Our Value Propositions"
          title="Empowering Your Business Growth"
          subtitle="Discover how our platform can transform your business operations and drive success."
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {valuePropositions.map((prop, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white dark:bg-seftec-darkNavy/80 rounded-xl p-8 shadow-apple hover:shadow-apple-hover",
                "transition-all duration-300 transform hover:-translate-y-1",
                "border border-seftec-slate dark:border-white/10",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">{prop.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-seftec-navy dark:text-white">{prop.title}</h3>
              <p className="text-seftec-navy/70 dark:text-white/70">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;
