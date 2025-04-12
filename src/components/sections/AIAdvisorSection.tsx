
import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AIFeaturesList from "@/components/ai/AIFeaturesList";
import EnhancedBizGenieChat from "@/components/ai/EnhancedBizGenieChat";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AIAdvisorSection: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [marketInsight, setMarketInsight] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const insights = [
      "USD/EUR exchange rate changed by +0.7% in the last hour. Consider adjusting your pricing strategy.",
      "Semiconductor industry showing 12% growth this quarter. Opportunity for technology sector suppliers.",
      "New tariff agreement between US-China affects import duties. Check your supply chain exposure.",
      "Commodity prices for aluminum decreased 3.2%. Potential savings opportunity for manufacturers."
    ];
    
    setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    
    const marketInterval = setInterval(() => {
      setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, 30000);
    
    return () => clearInterval(marketInterval);
  }, []);

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
    }, 45000);
    
    return () => clearInterval(notificationInterval);
  }, [notificationsEnabled, toast, user]);

  return (
    <section id="ai-advisor" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="AI-Powered Insights"
          title="BizGenie AI: Your Personalised Business Advisor"
          subtitle="Our AI assistant analyzes your financial data and business operations to deliver actionable insights, alerts, and strategic recommendations."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 reveal">
          <div className="lg:col-span-5">
            <AIFeaturesList />
          </div>
          
          <div className="lg:col-span-7 animate-fade-up animate-delay-300">
            <EnhancedBizGenieChat 
              marketInsight={marketInsight}
              isPremium={isPremium}
            />
            
            {!user && (
              <Alert className="mt-4 bg-white/5 backdrop-blur-sm border-seftec-teal/30">
                <AlertCircle className="h-4 w-4 text-seftec-teal" />
                <AlertDescription className="flex justify-between items-center">
                  <span>Sign in to unlock premium features, personalized insights, and save your conversation history.</span>
                  <Link to="/login">
                    <Button size="sm" className="ml-4 bg-seftec-teal hover:bg-seftec-teal/90">
                      Sign In
                    </Button>
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisorSection;
