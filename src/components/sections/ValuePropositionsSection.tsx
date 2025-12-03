
import React from 'react';
import SectionHeading from '@/components/ui/section-heading';
import { Brain, Globe, CreditCard, UserPlus, Store, Bot, FileText, TrendingUp, Shield, Building, Banknote, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlareCard } from '@/components/ui/glare-card';

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
  {
    icon: <FileText className="h-10 w-10 text-seftec-teal" />,
    title: 'Business Plan Review & Drafting',
    description: 'Comprehensive business plan creation, review, and strategic planning services powered by AI to ensure your business strategy is optimized for success.'
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-seftec-purple" />,
    title: 'In-Depth Cashflow Management',
    description: 'Advanced cashflow analytics, forecasting, and management tools to maintain healthy liquidity and optimize working capital.'
  },
  {
    icon: <Building className="h-10 w-10 text-seftec-gold" />,
    title: 'Multi-Country Business Registration',
    description: 'Complete business incorporation and regulatory alignment support for US, UK & EU markets - exclusive for Pro users.'
  },
  {
    icon: <Shield className="h-10 w-10 text-seftec-teal" />,
    title: 'Global Compliance & Risk Analytics',
    description: 'Highly tuned, context-aware AI for global business practices, risk analytics, and regulatory compliance suited for growing businesses.'
  },
  {
    icon: <Banknote className="h-10 w-10 text-seftec-purple" />,
    title: 'DeFi & Open Banking Integration',
    description: 'Leverage decentralized finance and open banking solutions, bringing your business to the future of financial technology.'
  },
  {
    icon: <Users className="h-10 w-10 text-seftec-gold" />,
    title: 'Instant Settlement for Verified Businesses',
    description: 'Lightning-fast payment settlements available exclusively for fully verified businesses, ensuring optimal cash flow management.'
  },
];

const ValuePropositionsSection = () => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto">
        <SectionHeading
          label="Our Value Propositions"
          title="Empowering Your Business Growth"
          subtitle="Discover how our comprehensive platform can transform your business operations and drive unprecedented success."
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {valuePropositions.map((prop, index) => (
            <GlareCard 
              key={index}
              className="p-4 sm:p-6 lg:p-8 shadow-lg transition-all duration-300 touch-manipulation min-h-[280px] flex flex-col"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">{prop.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-seftec-navy dark:text-white">{prop.title}</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 flex-1">{prop.description}</p>
              </div>
            </GlareCard>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-seftec-navy/80 dark:text-white/80 font-medium">
            And much more advanced features coming in our phased rollout stages
          </p>
          <p className="text-sm text-seftec-navy/60 dark:text-white/60 mt-2">
            Trade finance offers from multiple vendors • Comparative benefits • Lowest interest rates • Curated for business growth
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;
