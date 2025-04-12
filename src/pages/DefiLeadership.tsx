
import React, { useEffect } from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { DefiHero } from '@/components/defi-leadership/DefiHero';
import { DefiTabs } from '@/components/defi-leadership/DefiTabs';
import { MarketLeadershipSection } from '@/components/defi-leadership/MarketLeadershipSection';
import { TechnicalSolutionSection } from '@/components/defi-leadership/TechnicalSolutionSection';
import { StrategicRoadmapSection } from '@/components/defi-leadership/StrategicRoadmapSection';

const DefiLeadership = () => {
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <DefiHero />
        
        {/* Main Content with Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <DefiTabs>
              <MarketLeadershipSection />
              <TechnicalSolutionSection />
              <StrategicRoadmapSection />
            </DefiTabs>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default DefiLeadership;
