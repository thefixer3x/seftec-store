
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle2 } from "lucide-react";

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
    title: 'AI Business Advisor',
    description: 'Strategic business and financial advisory powered by AI that analyzes data, predicts market trends, and helps manage risks to enhance profitability.'
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
              <div className="p-2 bg-seftec-navy dark:bg-gradient-to-br dark:from-seftec-teal dark:to-seftec-purple rounded-full text-white flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">{advantage.title}</h3>
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
