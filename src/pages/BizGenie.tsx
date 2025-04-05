
import React from "react";
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import BizGenieDashboard from "@/components/ai/BizGenieDashboard";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BizGenie = () => {
  const { user } = useAuth();

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

        {user ? (
          <div className="max-w-3xl mx-auto mb-16">
            <BizGenieDashboard />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <div className="bg-seftec-slate/50 dark:bg-white/5 p-6 rounded-lg border border-seftec-navy/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">Sign in to access your personalized AI business assistant</h2>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                Get customized business recommendations, detailed market analyses, and AI-powered insights tailored to your specific business needs.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AIAdvisorSection />
      
      <Footer />
    </div>
  );
};

export default BizGenie;
