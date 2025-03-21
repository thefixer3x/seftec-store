
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ChatInputFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleAskAI: () => void;
  isTyping: boolean;
  isPremium: boolean;
  userTrainingEnabled: boolean;
  setUserTrainingEnabled: (enabled: boolean) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  query,
  setQuery,
  handleAskAI,
  isTyping,
  isPremium,
  userTrainingEnabled,
  setUserTrainingEnabled
}) => {
  return (
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
  );
};

export default ChatInputForm;
