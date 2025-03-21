
import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AIFeaturesList from "@/components/ai/AIFeaturesList";
import AIChatInterface from "@/components/ai/AIChatInterface";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const AIAdvisorSection: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [marketInsight, setMarketInsight] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Simulate market data fetching
  useEffect(() => {
    const insights = [
      "USD/EUR exchange rate changed by +0.7% in the last hour. Consider adjusting your pricing strategy.",
      "Semiconductor industry showing 12% growth this quarter. Opportunity for technology sector suppliers.",
      "New tariff agreement between US-China affects import duties. Check your supply chain exposure.",
      "Commodity prices for aluminum decreased 3.2%. Potential savings opportunity for manufacturers."
    ];
    
    // Set initial market insight
    setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    
    // Update market insights periodically
    const marketInterval = setInterval(() => {
      setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(marketInterval);
  }, []);

  // Simulate notification system - only for logged in users
  useEffect(() => {
    if (!notificationsEnabled || !user) return;
    
    const notifications = [
      "Payment due for Invoice #INV-2023-089 in 3 days",
      "Quarterly tax filing deadline approaching in 15 days",
      "Inventory level for SKU-78923 below minimum threshold",
      "New compliance regulation affecting your industry effective next month"
    ];
    
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        setHasNotification(true);
        
        toast({
          title: "Business Alert",
          description: notification,
          duration: 5000,
        });
      }
    }, 45000); // Every 45 seconds
    
    return () => clearInterval(notificationInterval);
  }, [notificationsEnabled, toast, user]);

  // Clear notification indicator
  const handleClearNotification = () => {
    setHasNotification(false);
  };

  return (
    <section id="ai-advisor" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="AI-Powered Insights"
          title="BizGenie AI: Your Personalised Business Advisor"
          subtitle="Our AI assistant analyzes your financial data and business operations to deliver actionable insights, alerts, and strategic recommendations."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 reveal">
          {/* AI Features */}
          <div className="lg:col-span-5">
            <AIFeaturesList />
          </div>
          
          {/* AI Chat Demo */}
          <div className="lg:col-span-7 animate-fade-up animate-delay-300">
            {user ? (
              <AIChatInterface 
                marketInsight={marketInsight}
                hasNotification={hasNotification}
                onClearNotification={handleClearNotification}
              />
            ) : (
              <div className="border rounded-xl p-6 bg-white/5 backdrop-blur-sm flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-seftec-teal mb-4" />
                <h3 className="text-xl font-medium mb-2">Sign in to access AI features</h3>
                <p className="text-muted-foreground mb-6">
                  Create an account or sign in to use our AI-powered business advisor and get personalized insights.
                </p>
                <AuthModal>
                  <Button size="lg" className="bg-seftec-teal hover:bg-seftec-teal/90">
                    Sign In to Continue
                  </Button>
                </AuthModal>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisorSection;
