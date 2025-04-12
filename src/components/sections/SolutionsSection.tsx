
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Rocket, Handshake, Building, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data for the solutions section
const solutionsData = [
  {
    title: 'Self-Serve Trading Platform',
    description: 'Businesses list & negotiate deals independently with our secure transaction infrastructure.',
    icon: <Rocket size={24} />
  },
  {
    title: 'Managed Trade Services',
    description: 'AI-Matching for verified buyers & sellers with personalized support.',
    icon: <Handshake size={24} />
  },
  {
    title: 'Enterprise White-Label Solutions',
    description: 'Large businesses create branded B2B platforms leveraging our technology.',
    icon: <Building size={24} />
  },
  {
    title: 'API-Integrated Trade Finance',
    description: 'Businesses access financing on-demand through our integrated financial services.',
    icon: <Wallet size={24} />
  }
];

const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="py-20 bg-white dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="Our Solutions"
          title="Seamless Access for Every Business"
          subtitle="Use-case driven marketplace options tailored to your business needs."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-5xl mx-auto reveal">
          {solutionsData.map((solution, index) => (
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
                  Learn More
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
