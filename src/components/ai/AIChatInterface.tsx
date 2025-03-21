import React, { useState } from 'react';
import { Bot, TrendingUp, Lock, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    setResponse("");
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { query, isPremium }
      });
      
      if (error) throw new Error(error.message);
      if (!data || !data.response) throw new Error('No response received');
      
      const fullResponse = data.response;
      let i = 0;
      
      if (userTrainingEnabled) {
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
    } catch (error) {
      console.error('Error calling AI service:', error);
      setResponse("I apologize, but I'm having trouble processing your request right now. Please try again later.");
      setIsTyping(false);
      
      toast({
        title: "Error",
        description: "There was a problem connecting to the AI service.",
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
