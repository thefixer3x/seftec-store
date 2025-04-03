
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AIFeaturesList } from '@/components/ai/AIFeaturesList';
import { Link } from 'react-router-dom';
import { Sparkle } from 'lucide-react';

const PersonalizedAIAdvisorSection = () => {
  const { user } = useAuth();
  
  return (
    <section id="ai-advisor" className="py-16 md:py-24 bg-gradient-to-b from-white to-seftec-slate/30 dark:from-seftec-darkNavy dark:to-seftec-darkNavy/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90 mb-4">
            <Sparkle size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal animate-sparkle" />
            AI-Powered Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-4">Meet Your Personal AI Business Advisor</h2>
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
            Get personalized recommendations, market insights, and business analysis from our advanced AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <AIFeaturesList />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {user ? (
                <Link to="/profile/dashboard">
                  <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                    Access Your AI Advisor
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                    Sign In To Access AI
                  </Button>
                </Link>
              )}
              <Link to="/value-propositions/bizgenie">
                <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 bg-white dark:bg-seftec-darkNavy/50 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 max-w-md mx-auto lg:mx-0 lg:ml-auto relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-seftec-gold/20 to-seftec-purple/20 dark:from-seftec-teal/20 dark:to-seftec-purple/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="bg-seftec-gold/20 dark:bg-seftec-teal/20 p-2 rounded-full">
                  <Sparkle className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 text-seftec-navy dark:text-white">Business AI Assistant</h3>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">Available 24/7 for personalized business advice</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-seftec-slate/50 dark:bg-white/5 p-3 rounded-lg rounded-tl-none max-w-xs">
                  <p className="text-sm text-seftec-navy dark:text-white/90">How can BizGenie AI help my business today?</p>
                </div>
                
                <div className="bg-seftec-navy/5 dark:bg-white/10 p-3 rounded-lg rounded-tr-none ml-auto max-w-xs">
                  <p className="text-sm text-seftec-navy dark:text-white/90">
                    I can analyze your financial data, recommend cost-saving opportunities, and identify potential growth areas based on market trends.
                  </p>
                </div>

                <div className="p-3 border border-dashed border-seftec-navy/30 dark:border-white/20 rounded-lg text-center">
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    {user ? "Access your personalized insights in your dashboard" : "Sign in to get personalized business insights"}
                  </p>
                  {!user && (
                    <Link to="/login" className="inline-block mt-2">
                      <Button size="sm" variant="secondary">Sign In Now</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedAIAdvisorSection;
