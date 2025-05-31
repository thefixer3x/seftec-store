
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { ShieldCheck, Wallet, Building, Globe, Handshake, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ResponsiveGrid, ResponsiveContainer } from "@/components/ui/mobile-optimizations/ResponsiveGrid";
import { ResponsiveSpacing } from "@/components/ui/mobile-optimizations/ResponsiveBreakpoints";

// Data for the problems section matching the image layout
const problemsData = [
  {
    title: 'Lack of Trust',
    description: 'Businesses struggle with unverified buyers and sellers, making it difficult to establish reliable trading relationships.',
    icon: <ShieldCheck className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Payment Uncertainty',
    description: 'Delayed or fraudulent transactions limit business growth and create unnecessary financial risks.',
    icon: <Wallet className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Manual Trade Processes',
    description: 'Slow onboarding, negotiation, and contract execution waste valuable time and resources.',
    icon: <Building className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    title: 'Trade Financing Gaps',
    description: 'Lack of trade financing options for SMEs limits their ability to take on larger opportunities.',
    icon: <Calculator className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    title: 'Cross-Border Challenges',
    description: 'SMEs face high fees & delays in international payments, hindering global expansion.',
    icon: <Globe className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-teal-100 dark:bg-teal-900/20'
  },
  {
    title: 'Limited Market Access',
    description: 'Difficulty finding and connecting with relevant global trading partners.',
    icon: <Handshake className="text-seftec-navy dark:text-white" size={32} />,
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/20'
  }
];

const ProblemsSection: React.FC = () => {
  return (
    <section id="problems" className="bg-gray-50 dark:bg-seftec-darkNavy/50">
      <ResponsiveSpacing
        py={{ mobile: 12, tablet: 16, desktop: 20 }}
      >
        <ResponsiveContainer>
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-up">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4 sm:mb-6">
              The Challenge
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-seftec-navy dark:text-white mb-4 sm:mb-6">
              Challenges in B2B Trade
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Businesses face significant obstacles that limit their growth potential and efficiency in global trade.
            </p>
          </div>
          
          {/* Problems Grid */}
          <ResponsiveGrid
            cols={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={{ mobile: 6, tablet: 6, desktop: 8 }}
          >
            {problemsData.map((problem, index) => (
              <Card 
                key={index} 
                className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-seftec-darkNavy/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up group touch-manipulation hover:scale-105" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-start space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${problem.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(problem.icon, { 
                      size: window.innerWidth < 640 ? 24 : 32 
                    })}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-seftec-navy dark:text-white">
                      {problem.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </ResponsiveGrid>
        </ResponsiveContainer>
      </ResponsiveSpacing>
    </section>
  );
};

export default ProblemsSection;
