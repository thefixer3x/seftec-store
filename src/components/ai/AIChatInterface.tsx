import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AIChatHeader from './AIChatHeader';
import MarketInsightAlert from './MarketInsightAlert';
import ChatResponseDisplay from './ChatResponseDisplay';
import ChatInputForm from './ChatInputForm';

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
  const [error, setError] = useState<string | null>(null);
  const [isReport, setIsReport] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userTrainingEnabled, setUserTrainingEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const { toast } = useToast();

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    setResponse("");
    setError(null);
    setIsReport(false);
    
    try {
      console.log(`Sending ${generateReport ? 'premium business plan' : 'query'} to BizGenie service:`, query.substring(0, 50) + (query.length > 50 ? "..." : ""));
      
      // Prepare request data based on mode
      const requestData = generateReport ? {
        mode: 'business-plan',
        userId: null, // Will be handled by the edge function
        planData: query, // Send the query as the business idea
        generateReport: true
      } : {
        prompt: query,
        userId: null,
        isPremium,
        mode: 'chat'
      };
      
      // Use the BizGenie router
      const { data, error: edgeError } = await supabase.functions.invoke('bizgenie-router', {
        body: requestData
      });
      
      if (edgeError) {
        console.error("Edge function error:", edgeError);
        throw new Error(edgeError.message || 'Error calling BizGenie service');
      }
      
      if (!data) {
        throw new Error('No response data received from BizGenie');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Handle both chat and business plan responses
      const fullResponse = data.planHtml || data.text || 'No response received';
      setIsReport(data.isBusinessPlan || generateReport || false);
      
      let i = 0;
      
      if (userTrainingEnabled) {
        console.log("Learning from user query:", query.substring(0, 50) + (query.length > 50 ? "..." : ""));
      }
      
      // Simulate typing effect
      const typingInterval = setInterval(() => {
        if (i < fullResponse.length) {
          setResponse(prev => prev + fullResponse.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          if (data.isBusinessPlan || generateReport) {
            toast({
              title: "Premium Business Plan Generated",
              description: "Your enterprise-grade business plan has been successfully generated using SEFTEC's competitive advantage features.",
              duration: 4000,
            });
          } else {
            toast({
              title: "BizGenie Response Generated",
              description: "Your AI response has been successfully generated.",
              duration: 3000,
            });
          }
        }
      }, 15);
    } catch (error: any) {
      console.error('Error calling BizGenie service:', error);
      setError(error.message || "I apologize, but I'm having trouble processing your request right now. Please try again later.");
      setIsTyping(false);
      
      toast({
        title: "BizGenie Assistant Error",
        description: error.message || "There was a problem connecting to the AI service.",
        variant: "destructive",
      });
    }
  };

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
        <AIChatHeader 
          hasNotification={hasNotification}
          onClearNotification={onClearNotification}
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          isPremium={isPremium}
          handlePremiumToggle={handlePremiumToggle}
        />
        
        <div className="p-6 space-y-4">
          <MarketInsightAlert marketInsight={marketInsight} />
          
          <ChatResponseDisplay 
            response={response} 
            isTyping={isTyping} 
            error={error}
            isReport={isReport}
          />
          
          <ChatInputForm
            query={query}
            setQuery={setQuery}
            handleAskAI={handleAskAI}
            isTyping={isTyping}
            isPremium={isPremium}
            userTrainingEnabled={userTrainingEnabled}
            setUserTrainingEnabled={setUserTrainingEnabled}
            generateReport={generateReport}
            setGenerateReport={setGenerateReport}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
