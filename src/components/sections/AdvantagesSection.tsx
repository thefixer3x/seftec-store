
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle2, Star } from "lucide-react";

// Data for the advantages section
const advantagesData = [
  {
    title: 'First AI-Powered B2B Trade Hub',
    description: 'Smart analytics drive better deals and match businesses with ideal trading partners.'
  },
  {
    title: 'Escrow & Secure Payments',
    description: 'Eliminates fraud & transaction disputes with protected payment processing.'
  },
  {
    title: 'Integrated Cross-Border Payments',
    description: 'Instant vendor payouts worldwide with optimized exchange rates and low fees.'
  },
  {
    title: 'KYC/KYB Verified Network',
    description: 'Only legitimate businesses trade, creating a trusted marketplace environment.'
  },
  {
    title: 'Built-in Financing Solutions',
    description: 'Trade now, pay later with flexible financing options for growing businesses.'
  },
  {
    title: 'Premium AI Business Advisor',
    description: 'Strategic business and financial advisory powered by advanced algorithms that analyze your financial data, predict market trends, and help manage risks to enhance profitability. Includes real-time notifications, market insights, and deep learning capabilities.',
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
          subtitle="Our marketplace stands out with unique features designed to make B2B trade secure, efficient, and profitable."
        />
        
        <div className="max-w-4xl mx-auto reveal">
          {advantagesData.map((advantage, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 mb-8 animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2 rounded-full text-white flex-shrink-0 ${advantage.premium ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-seftec-navy dark:bg-gradient-to-br dark:from-seftec-teal dark:to-seftec-purple'}`}>
                {advantage.premium ? <Star size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-seftec-navy dark:text-white">{advantage.title}</h3>
                  {advantage.premium && (
                    <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full">Premium</span>
                  )}
                </div>
                <p className="text-seftec-navy/70 dark:text-white/70">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
