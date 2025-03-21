
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

// Data for the regions we cover section with added colors
const regionsData = [
  {
    region: "Middle East & Africa",
    countries: ["UAE", "Saudi Arabia", "South Africa", "Kenya", "Cameroon", "Ghana", "Nigeria"],
    icon: <Flag className="text-white" size={24} />,
    bgColor: "bg-gradient-to-r from-orange-500 to-orange-600"
  },
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
  }
];

// Flag emoji mapping for each country
const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "Mexico": "🇲🇽",
  "United Kingdom": "🇬🇧",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Italy": "🇮🇹",
  "Spain": "🇪🇸",
  "Netherlands": "🇳🇱",
  "Australia": "🇦🇺",
  "Japan": "🇯🇵",
  "Singapore": "🇸🇬",
  "Hong Kong": "🇭🇰",
  "New Zealand": "🇳🇿",
  "UAE": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  "South Africa": "🇿🇦",
  "Kenya": "🇰🇪",
  "Cameroon": "🇨🇲",
  "Ghana": "🇬🇭",
  "Nigeria": "🇳🇬"
};

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
          <div className="relative p-4 rounded-full bg-gradient-to-r from-seftec-purple to-seftec-teal dark:from-seftec-teal dark:to-seftec-purple animate-float">
            {/* World Globe with improved appearance */}
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center overflow-hidden">
              {/* Latitude grid lines */}
              <div className="absolute inset-x-0 top-2 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 top-4 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 top-8 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 top-12 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 bottom-2 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 bottom-4 h-px bg-white/30"></div>
              <div className="absolute inset-x-0 bottom-8 h-px bg-white/30"></div>
              
              {/* Longitude grid lines */}
              <div className="absolute inset-y-0 left-2 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 left-4 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 left-8 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 left-12 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 right-2 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 right-4 w-px bg-white/30"></div>
              <div className="absolute inset-y-0 right-8 w-px bg-white/30"></div>
              
              {/* Continental shapes - more recognizable */}
              {/* North America */}
              <div className="absolute top-3 left-3 w-5 h-4 bg-emerald-500/80 rounded-sm transform rotate-12"></div>
              {/* South America */}
              <div className="absolute top-8 left-5 w-3 h-5 bg-emerald-500/80 rounded-sm transform rotate-12"></div>
              {/* Europe */}
              <div className="absolute top-3 right-7 w-3 h-2 bg-emerald-500/80 rounded-sm"></div>
              {/* Africa */}
              <div className="absolute top-6 right-6 w-4 h-5 bg-emerald-500/80 rounded-sm"></div>
              {/* Asia */}
              <div className="absolute top-4 right-3 w-5 h-4 bg-emerald-500/80 rounded-sm"></div>
              {/* Australia */}
              <div className="absolute bottom-3 right-4 w-3 h-2 bg-emerald-500/80 rounded-sm"></div>
              
              {/* Slight highlight effect to give 3D appearance */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 rounded-t-full"></div>
              
              {/* Seftec Logo in the middle - transparent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.logo className="h-8 w-8 text-white/40" />
              </div>
            </div>
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
                      <span className="text-lg" aria-label={`Flag of ${country}`}>
                        {countryFlags[country] || '🏳️'}
                      </span>
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
