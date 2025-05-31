
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { ShieldCheck, Wallet, Building, Globe, Handshake, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <section id="problems" className="py-20 bg-gray-50 dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-6">
            The Challenge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-seftec-navy dark:text-white mb-6">
            Challenges in B2B Trade
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Businesses face significant obstacles that limit their growth potential and efficiency in global trade.
          </p>
        </div>
        
        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problemsData.map((problem, index) => (
            <Card 
              key={index} 
              className="p-8 bg-white dark:bg-seftec-darkNavy/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up group" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-start space-y-4">
                {/* Icon */}
                <div className={`p-4 rounded-2xl ${problem.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  {problem.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
