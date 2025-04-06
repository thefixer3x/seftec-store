
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkle, Send, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const PROMPT_LIMIT = 5;
const PROMPT_STORAGE_KEY = 'bizgenie-demo-prompts';

const AIDemoPromptBox: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [promptCount, setPromptCount] = useState<number>(0);
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load prompt count from localStorage on component mount
  useEffect(() => {
    try {
      const savedPrompts = localStorage.getItem(PROMPT_STORAGE_KEY);
      if (savedPrompts) {
        const count = JSON.parse(savedPrompts).length;
        setPromptCount(count);
        setLimitReached(count >= PROMPT_LIMIT);
      }
    } catch (err) {
      console.error("Error loading saved prompts:", err);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || limitReached) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In demo mode, simulate API call with a mock response instead of making a real API call
      // This avoids API errors while still demonstrating the functionality
      setTimeout(() => {
        const demoResponses = [
          "Based on current market trends, I recommend focusing on sustainable supply chain solutions. This could increase your market appeal by up to 23% according to recent industry reports.",
          "Your business might benefit from exploring trade financing options. With current interest rates, you could optimize cash flow while expanding operations into new markets.",
          "For your industry, implementing a just-in-time inventory system could reduce holding costs by approximately 15-20%. Would you like me to analyze your specific use case in more detail?",
          "Have you considered expanding into the Southeast Asian market? Recent trade agreements have opened up significant opportunities for businesses in your sector.",
          "Based on your business profile, I recommend exploring strategic partnerships with logistics providers to reduce shipping costs and improve delivery times."
        ];
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        setResponse(randomResponse);
        
        // Save prompt to localStorage
        try {
          const savedPrompts = localStorage.getItem(PROMPT_STORAGE_KEY);
          const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];
          prompts.push({ prompt, timestamp: new Date().toISOString() });
          localStorage.setItem(PROMPT_STORAGE_KEY, JSON.stringify(prompts));
          
          // Update prompt count
          const newCount = prompts.length;
          setPromptCount(newCount);
          setLimitReached(newCount >= PROMPT_LIMIT);
        } catch (err) {
          console.error("Error saving prompt:", err);
          toast({
            title: "Warning",
            description: "Unable to save your prompt history.",
            variant: "destructive",
          });
        }
        
        // Clear input
        setPrompt('');
        setIsLoading(false);
        
        // Scroll to response
        if (responseRef.current) {
          responseRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md bg-white dark:bg-seftec-darkNavy/30 border-seftec-slate dark:border-seftec-charcoal overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkle className="h-4 w-4 sm:h-5 sm:w-5 text-seftec-gold dark:text-white animate-sparkle" />
            <CardTitle className="text-base sm:text-lg font-medium">BizGenie AI Demo</CardTitle>
          </div>
          <div className="text-2xs sm:text-xs font-medium bg-white/10 px-2 py-1 rounded-full">
            {promptCount}/{PROMPT_LIMIT} Prompts
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-5">
        {response && (
          <div 
            ref={responseRef}
            className="bg-seftec-slate/30 dark:bg-white/5 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 text-seftec-navy dark:text-white/90 max-h-[150px] sm:max-h-[200px] overflow-y-auto text-sm sm:text-base"
          >
            <div className="flex items-center gap-2 text-2xs sm:text-xs text-seftec-navy/60 dark:text-white/60 mb-2">
              <span>BizGenie:</span>
            </div>
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={limitReached ? "Prompt limit reached. Sign up for more." : "Ask BizGenie about business strategies, market trends..."}
              className={cn(
                "resize-none min-h-[60px] sm:min-h-[80px] text-sm sm:text-base focus:border-seftec-gold dark:focus:border-seftec-teal",
                limitReached && "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
              )}
              disabled={limitReached || isLoading}
              aria-label="AI prompt input"
            />
          </div>
          
          {error && (
            <div className="flex items-start space-x-2 text-red-500 dark:text-red-400 text-xs sm:text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {limitReached ? (
              <div className="w-full bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-2 sm:p-3 rounded-lg text-center">
                <span className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-medium">🚫 Limit Reached. Sign up to unlock personalized advice.</span>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="mt-2 text-xs sm:text-sm bg-seftec-navy text-white hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:text-white dark:hover:bg-seftec-teal/90"
                  onClick={() => window.location.href = "/register"}
                >
                  Sign Up Now
                </Button>
              </div>
            ) : (
              <>
                <div className="text-2xs sm:text-xs text-seftec-navy/50 dark:text-white/50">
                  Demo Mode: {PROMPT_LIMIT - promptCount} prompts remaining
                </div>
                <Button 
                  type="submit" 
                  disabled={!prompt.trim() || isLoading}
                  className="text-xs sm:text-sm bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white"
                  aria-label="Submit prompt"
                  size="sm"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {isLoading ? "Processing..." : "Ask BizGenie"}
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIDemoPromptBox;
