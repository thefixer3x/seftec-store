
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { ShieldCheck, Wallet, Building, Globe, Handshake, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

// Data for the problems section
const problemsData = [
  {
    title: 'Lack of Trust',
    description: 'Businesses struggle with unverified buyers and sellers, making it difficult to establish reliable trading relationships.',
    icon: <ShieldCheck className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    title: 'Payment Uncertainty',
    description: 'Delayed or fraudulent transactions limit business growth and create unnecessary financial risks.',
    icon: <Wallet className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    title: 'Manual Trade Processes',
    description: 'Slow onboarding, negotiation, and contract execution waste valuable time and resources.',
    icon: <Building className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    title: 'Trade Financing Gaps',
    description: 'Lack of trade financing options for SMEs limits their ability to take on larger opportunities.',
    icon: <Wallet className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    title: 'Cross-Border Challenges',
    description: 'SMEs face high fees & delays in international payments, hindering global expansion.',
    icon: <Globe className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    title: 'Limited Market Access',
    description: 'Difficulty finding and connecting with relevant global trading partners.',
    icon: <Handshake className="text-seftec-navy dark:text-white" size={24} />
  }
];

const ProblemsSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="problems" className="py-20 bg-seftec-slate dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="The Challenge"
          title="Challenges in B2B Trade"
          subtitle="Businesses face significant obstacles that limit their growth potential and efficiency in global trade."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          {problemsData.map((problem, index) => (
            isMobile ? (
              <Collapsible key={index} className="w-full">
                <Card className="p-4 bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-apple transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-seftec-navy/10 dark:bg-white/10">
                          {problem.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-seftec-navy dark:text-white">{problem.title}</h3>
                      </div>
                      <ChevronDown className="h-5 w-5 text-seftec-navy dark:text-white transition-transform duration-200" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pt-4 pl-12">
                      <p className="text-seftec-navy/70 dark:text-white/70">{problem.description}</p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ) : (
              <Card key={index} className="p-8 bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-apple transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-seftec-navy/10 dark:bg-white/10">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">{problem.title}</h3>
                    <p className="text-seftec-navy/70 dark:text-white/70">{problem.description}</p>
                  </div>
                </div>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
