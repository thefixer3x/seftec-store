
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Globe, MapPin, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";

// Data for the regions we cover section
const regionsData = [
  {
    region: "North America",
    countries: ["United States", "Canada", "Mexico"],
    icon: <Flag className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    region: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands"],
    icon: <Flag className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    region: "Asia Pacific",
    countries: ["Australia", "Japan", "Singapore", "Hong Kong", "New Zealand"],
    icon: <Flag className="text-seftec-navy dark:text-white" size={24} />
  },
  {
    region: "Middle East & Africa",
    countries: ["UAE", "Saudi Arabia", "South Africa"],
    icon: <Flag className="text-seftec-navy dark:text-white" size={24} />
  }
];

const RegionsCoveredSection: React.FC = () => {
  return (
    <section id="regions" className="py-20 bg-seftec-slate dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="Global Presence"
          title="Regions We Cover"
          subtitle="Our platform supports businesses across multiple regions, providing localized insights and global perspectives."
        />
        
        <div className="flex justify-center mb-10 reveal">
          <div className="p-4 rounded-full bg-seftec-navy/10 dark:bg-white/10 animate-float">
            <Globe className="text-seftec-navy dark:text-white h-16 w-16" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {regionsData.map((region, index) => (
            <Card 
              key={index} 
              className="p-6 bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-apple transition-all duration-500 animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-seftec-navy/10 dark:bg-white/10">
                  {region.icon}
                </div>
                <h3 className="text-xl font-semibold text-seftec-navy dark:text-white">{region.region}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {region.countries.map((country, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <MapPin className="text-seftec-navy/60 dark:text-white/60" size={14} />
                    <span className="text-seftec-navy/80 dark:text-white/80">{country}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsCoveredSection;
