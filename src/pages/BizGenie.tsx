
import React from "react";
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";

const BizGenie = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-seftec-navy dark:text-white">
          BizGenie AI: Your Intelligent Business Assistant
        </h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-seftec-navy/70 dark:text-white/70">
          Enhanced business intelligence and personalized recommendations powered by advanced AI
        </p>
      </div>
      
      <AIAdvisorSection />
      
      <Footer />
    </div>
  );
};

export default BizGenie;
