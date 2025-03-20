
import React, { useState } from 'react';
import { Bot, TrendingUp, Lock, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AIChatInterfaceProps {
  marketInsight: string;
  hasNotification: boolean;
  onClearNotification: () => void;
}

const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ 
  marketInsight, 
  hasNotification, 
  onClearNotification 
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userTrainingEnabled, setUserTrainingEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const { toast } = useToast();

  // Mock AI response generation with learning simulation
  const handleAskAI = () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    setResponse("");
    
    // Simulate AI thinking and typing
    const fullResponse = getAIResponse(query, isPremium);
    let i = 0;
    
    if (userTrainingEnabled) {
      // Simulate storing the query for improving future responses
      console.log("Learning from user query:", query);
    }
    
    const typingInterval = setInterval(() => {
      if (i < fullResponse.length) {
        setResponse(prev => prev + fullResponse.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 15);
  };

  // Mock AI responses with premium tier differentiation
  const getAIResponse = (query: string, isPremium: boolean) => {
    const standardResponses = [
      "Based on your current cash flow patterns, I recommend allocating 15% more resources to digital marketing channels which are showing a 2.3x ROI compared to traditional methods.",
      "Analysis of your inventory turnover indicates potential for a 12% reduction in carrying costs. Consider implementing a just-in-time system with your top 3 suppliers.",
      "Market trend analysis suggests an emerging opportunity in sustainable products. Companies in your sector that pivoted early saw an average 18% revenue growth over 24 months.",
      "Your current debt-to-equity ratio of 1.5 is slightly higher than industry average (1.2). Restructuring your short-term debt could save approximately $25,000 in interest annually.",
      "Based on seasonal patterns in your industry, I recommend increasing inventory by 22% in Q3 to prepare for the projected demand spike in Q4."
    ];
    
    const premiumResponses = [
      "PREMIUM INSIGHT: Our AI has analyzed your cash flow patterns against 1,247 similar businesses and identified 3 strategic opportunities: 1) Reallocate 15.7% of marketing budget to digital channels (2.7x ROI potential), 2) Consolidate vendor payments to qualify for a 3.2% early payment discount, 3) Implement tiered pricing strategy with potential 8.3% revenue increase.",
      "PREMIUM INSIGHT: Comprehensive inventory analysis shows you can reduce carrying costs by 17.3% by implementing dynamic reorder points for your top 8 SKUs. Additionally, supplier diversification for raw materials could reduce risk exposure by 24% while maintaining just-in-time efficiency.",
      "PREMIUM INSIGHT: Deep market analysis shows your sector is experiencing a paradigm shift toward sustainable offerings, with early adopters gaining 22.6% market share growth. We've identified 5 specific product categories where sustainability credentials would generate premium pricing potential of 12-18%.",
      "PREMIUM INSIGHT: Financial restructuring simulation indicates you could save $42,750 annually by refinancing current debt. Additionally, our algorithm has identified $127,000 in trapped working capital that could be released through optimized payment terms and collections processes.",
      "PREMIUM INSIGHT: Predictive demand modeling based on 5-year historical data and 12 market variables suggests increasing inventory selectively - 32% for product lines A and C, while reducing line B by 15%. This optimization would improve cash flow by $36,000 per quarter while maintaining 99.2% fill rates."
    ];
    
    // Determine if the response should be premium
    const responses = isPremium ? premiumResponses : standardResponses;
    
    // Return a response that somewhat relates to the query
    if (query.toLowerCase().includes("cash") || query.toLowerCase().includes("money"))
      return responses[0];
    else if (query.toLowerCase().includes("inventory") || query.toLowerCase().includes("stock"))
      return responses[1];
    else if (query.toLowerCase().includes("market") || query.toLowerCase().includes("trend"))
      return responses[2];
    else if (query.toLowerCase().includes("debt") || query.toLowerCase().includes("loan"))
      return responses[3];
    else
      return responses[4];
  };

  // Toggle premium mode
  const handlePremiumToggle = () => {
    if (!isPremium) {
      toast({
        title: "Premium Features Activated",
        description: "You now have access to advanced business insights and recommendations.",
        duration: 3000,
      });
    }
    setIsPremium(!isPremium);
  };

  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">BizGenie AI Assistant</h3>
            {hasNotification && (
              <span 
                className="relative flex h-3 w-3 cursor-pointer" 
                onClick={onClearNotification}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs">Notifications</span>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled} 
                className="data-[state=checked]:bg-seftec-teal"
              />
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="text-xs">Premium</span>
              <Switch 
                checked={isPremium} 
                onCheckedChange={handlePremiumToggle} 
                className="data-[state=checked]:bg-amber-400"
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Live Market Insight Alert */}
          <Alert className="bg-seftec-navy/5 dark:bg-white/5 border-seftec-teal/30">
            <TrendingUp className="h-4 w-4 text-seftec-teal" />
            <AlertTitle className="text-seftec-navy dark:text-white">Live Market Insight</AlertTitle>
            <AlertDescription className="text-seftec-navy/70 dark:text-white/70">
              {marketInsight}
            </AlertDescription>
          </Alert>
        
          <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[100px] max-h-[250px] overflow-y-auto">
            {response ? (
              <>
                <p className="text-xs text-seftec-navy/60 dark:text-white/60 mb-2">BizGenie:</p>
                <p className="text-seftec-navy dark:text-white/90">{response}</p>
                {isTyping && <span className="inline-block animate-pulse">▋</span>}
              </>
            ) : (
              <p className="text-seftec-navy/50 dark:text-white/50 italic">
                Ask a question about your business finances, market trends, or strategic opportunities...
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={userTrainingEnabled} 
                  onCheckedChange={setUserTrainingEnabled} 
                  className="data-[state=checked]:bg-seftec-navy dark:data-[state=checked]:bg-seftec-teal"
                />
                <span className="text-xs text-seftec-navy/70 dark:text-white/70">
                  Allow BizGenie to learn from my queries to improve future responses
                </span>
              </div>
            </div>
          
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How can I improve my company's cash flow?"
              className="resize-none h-[80px] border-seftec-slate/50 dark:border-white/20"
            />
            
            <Button 
              className={cn(
                "w-full text-white hover:bg-opacity-90 dark:hover:opacity-90",
                isPremium 
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-400 dark:to-amber-500" 
                  : "bg-seftec-navy dark:bg-gradient-teal-purple"
              )}
              onClick={handleAskAI}
              disabled={isTyping || !query.trim()}
            >
              {isTyping ? "Processing..." : `Ask BizGenie ${isPremium ? "(Premium)" : ""}`}
            </Button>
            
            <p className="text-xs text-seftec-navy/60 dark:text-white/60 text-center">
              Your data is analyzed securely using enterprise-grade encryption
              {isPremium && " • Premium insights powered by advanced analytics"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
