
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Flag, Globe, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { motion } from "framer-motion";

// Data for the regions we cover section with added colors
const regionsData = [
  {
    region: "Middle East & Africa",
    countries: ["UAE", "Saudi Arabia", "South Africa", "Kenya", "Cameroon", "Ghana", "Nigeria"],
    icon: <Flag className="text-white" size={20} />,
    bgColor: "bg-gradient-to-br from-orange-500 via-orange-600 to-red-500",
    glowColor: "shadow-orange-500/20"
  },
  {
    region: "North America",
    countries: ["United States", "Canada", "Mexico"],
    icon: <Flag className="text-white" size={20} />,
    bgColor: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
    glowColor: "shadow-blue-500/20"
  },
  {
    region: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands"],
    icon: <Flag className="text-white" size={20} />,
    bgColor: "bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600",
    glowColor: "shadow-purple-500/20"
  },
  {
    region: "Asia Pacific",
    countries: ["Australia", "Japan", "Singapore", "Hong Kong", "New Zealand"],
    icon: <Flag className="text-white" size={20} />,
    bgColor: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600",
    glowColor: "shadow-green-500/20"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const globeVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 1.2
    }
  }
};

const RegionsCoveredSection: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Glass Panel Background */}
      <div className="absolute inset-0 glass-panel">
        <div className="absolute inset-0 bg-gradient-to-br from-seftec-slate/90 via-seftec-slate/70 to-white/50 dark:from-seftec-darkNavy/90 dark:via-seftec-darkNavy/70 dark:to-seftec-charcoal/50" />
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-seftec-purple/10 dark:bg-seftec-teal/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-seftec-gold/10 dark:bg-seftec-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeading
            label="Global Presence"
            title="Regions We Cover"
            subtitle="Our platform supports businesses across multiple regions, providing localized insights and global perspectives."
          />
        </motion.div>
        
        {/* Enhanced Globe Section */}
        <motion.div 
          className="flex justify-center mb-16"
          variants={globeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-seftec-purple/20 via-seftec-teal/20 to-seftec-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative p-8 rounded-full bg-gradient-to-br from-seftec-purple/20 to-seftec-teal/20 dark:from-seftec-teal/20 dark:to-seftec-purple/20 backdrop-blur-sm border border-white/20 dark:border-white/10 group-hover:scale-105 transition-all duration-500">
              {/* Enhanced Globe */}
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-b from-sky-400 via-blue-500 to-blue-700 flex items-center justify-center overflow-hidden shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                {/* Animated grid lines */}
                <div className="absolute inset-0">
                  {/* Latitude lines */}
                  {[2, 6, 10, 14].map((top, i) => (
                    <div key={`lat-${i}`} className={`absolute inset-x-0 h-px bg-white/40 animate-pulse`} style={{ top: `${top * 4}px`, animationDelay: `${i * 0.2}s` }} />
                  ))}
                  {/* Longitude lines */}
                  {[2, 6, 10, 14].map((left, i) => (
                    <div key={`lng-${i}`} className={`absolute inset-y-0 w-px bg-white/40 animate-pulse`} style={{ left: `${left * 4}px`, animationDelay: `${i * 0.3}s` }} />
                  ))}
                </div>
                
                {/* Continental shapes with hover effects */}
                <div className="absolute top-3 left-3 w-5 h-4 bg-emerald-400/90 rounded-sm transform rotate-12 group-hover:bg-emerald-300 transition-colors duration-300" />
                <div className="absolute top-8 left-5 w-3 h-5 bg-emerald-400/90 rounded-sm transform rotate-12 group-hover:bg-emerald-300 transition-colors duration-300" />
                <div className="absolute top-3 right-7 w-3 h-2 bg-emerald-400/90 rounded-sm group-hover:bg-emerald-300 transition-colors duration-300" />
                <div className="absolute top-6 right-6 w-4 h-5 bg-emerald-400/90 rounded-sm group-hover:bg-emerald-300 transition-colors duration-300" />
                <div className="absolute top-4 right-3 w-5 h-4 bg-emerald-400/90 rounded-sm group-hover:bg-emerald-300 transition-colors duration-300" />
                <div className="absolute bottom-3 right-4 w-3 h-2 bg-emerald-400/90 rounded-sm group-hover:bg-emerald-300 transition-colors duration-300" />
                
                {/* Globe highlight */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-white/20 rounded-t-full" />
                
                {/* Seftec Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icons.logo className="h-8 w-8 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {regionsData.map((region, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group"
            >
              <Card className={cn(
                "overflow-hidden border-none backdrop-blur-sm bg-white/60 dark:bg-seftec-darkNavy/60 shadow-2xl transition-all duration-500 group-hover:shadow-3xl",
                region.glowColor,
                "group-hover:shadow-2xl"
              )}>
                {/* Header with enhanced gradient */}
                <div className={cn(
                  "p-6 text-white relative overflow-hidden",
                  region.bgColor
                )}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="absolute bottom-0 right-0 w-1 h-full bg-white/30 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      {region.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold group-hover:scale-105 transition-transform duration-300">
                        {region.region}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 opacity-80">
                        <MapPin size={14} />
                        <span className="text-sm">{region.countries.length} countries</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content with glass effect */}
                <div className="p-6 glass-panel">
                  <div className="space-y-3">
                    {region.countries.map((country, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        <span 
                          className="text-xl group-hover/item:scale-125 transition-transform duration-300" 
                          aria-label={`Flag of ${country}`}
                        >
                          {countryFlags[country] || '🏳️'}
                        </span>
                        <span className="text-seftec-navy/80 dark:text-white/80 group-hover/item:text-seftec-navy dark:group-hover/item:text-white transition-colors duration-300 font-medium">
                          {country}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RegionsCoveredSection;
