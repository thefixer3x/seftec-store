
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Globe, MapPin, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Data for the regions we cover section with added colors
const regionsData = [
  {
    region: "North America",
    countries: ["United States", "Canada", "Mexico"],
    icon: <Flag className="text-white" size={24} />,
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  {
    region: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands"],
    icon: <Flag className="text-white" size={24} />,
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    region: "Asia Pacific",
    countries: ["Australia", "Japan", "Singapore", "Hong Kong", "New Zealand"],
    icon: <Flag className="text-white" size={24} />,
    bgColor: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    region: "Middle East & Africa",
    countries: ["UAE", "Saudi Arabia", "South Africa", "Kenya", "Cameroon", "Ghana", "Nigeria"],
    icon: <Flag className="text-white" size={24} />,
    bgColor: "bg-gradient-to-r from-orange-500 to-orange-600"
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
          <div className="p-4 rounded-full bg-gradient-to-r from-seftec-purple to-seftec-teal dark:from-seftec-teal dark:to-seftec-purple animate-float">
            <Globe className="text-white h-16 w-16" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {regionsData.map((region, index) => (
            <Card 
              key={index} 
              className={cn(
                "overflow-hidden border-none shadow-apple hover:shadow-apple-hover transition-all duration-500 animate-fade-up", 
                `delay-[${index * 100}ms]`
              )}
            >
              <div className={cn("p-4 text-white", region.bgColor)}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    {region.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{region.region}</h3>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-seftec-darkNavy/80">
                <div className="grid grid-cols-1 gap-2">
                  {region.countries.map((country, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Flag className="text-seftec-navy/60 dark:text-white/60" size={14} />
                      <span className="text-seftec-navy/80 dark:text-white/80">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsCoveredSection;
