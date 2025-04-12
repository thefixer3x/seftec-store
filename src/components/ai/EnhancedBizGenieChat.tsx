
import React, { useState } from 'react';
import { FileText, Send, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useBizGenieChat } from '@/hooks/use-bizgenie-chat';
import { useAuth } from '@/context/AuthContext';

interface EnhancedBizGenieChatProps {
  marketInsight?: string;
  isPremium?: boolean;
}

const EnhancedBizGenieChat: React.FC<EnhancedBizGenieChatProps> = ({
  marketInsight = "Commodity prices for aluminum decreased 3.2%. Potential savings opportunity for manufacturers.",
  isPremium = false
}) => {
  const { user } = useAuth();
  const [userTrainingEnabled, setUserTrainingEnabled] = useState(true);
  const [generateReport, setGenerateReport] = useState(false);
  
  const { 
    messages, 
    isLoading, 
    query, 
    setQuery, 
    sendMessage 
  } = useBizGenieChat({
    isPremium,
    systemPrompt: generateReport 
      ? "You are BizGenie, a professional AI assistant specializing in detailed business reports and analysis."
      : undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      sendMessage(query);
      setQuery('');
    }
  };

  return (
    <Card className="w-full bg-slate-900 text-white overflow-hidden">
      <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-white p-1 rounded">
            <FileText className="h-5 w-5 text-teal-500" />
          </span>
          <span className="font-semibold">BizGenie AI Assistant</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Notifications</span>
            <Switch checked={true} className="data-[state=checked]:bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>Premium</span>
            <Switch checked={isPremium} className="data-[state=checked]:bg-amber-400" />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2 text-teal-400">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium text-sm">Live Market Insight</span>
        </div>
        <p className="text-sm text-slate-300 mt-1">{marketInsight}</p>
      </div>
      
      <CardContent className="p-4 space-y-4">
        {messages.length > 0 ? (
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-900 ml-12' 
                    : 'bg-slate-700 mr-12'
                }`}
              >
                {message.content}
                {message.role === 'assistant' && message.model && (
                  <div className="mt-2 flex justify-end">
                    <Badge variant="outline" className="text-xs">
                      {message.model.split('-').pop()}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-slate-400 italic text-center">
            Ask a question about your business finances, market trends, or strategic opportunities...
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <Switch 
            checked={userTrainingEnabled} 
            onCheckedChange={setUserTrainingEnabled}
            className="data-[state=checked]:bg-teal-500"
          />
          <span className="text-sm text-slate-300">Allow BizGenie to learn from my queries</span>
          
          <div className="ml-auto flex items-center gap-2">
            <Switch 
              checked={generateReport} 
              onCheckedChange={setGenerateReport}
              className="data-[state=checked]:bg-teal-500"
            />
            <span className="text-sm text-slate-300 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Generate Report
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How can I improve my company's cash flow?"
              className="w-full bg-slate-700 border-slate-600 rounded-md resize-none h-20 pr-24"
            />
            <Button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 bottom-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:opacity-90"
            >
              {isLoading ? "..." : "Ask BizGenie"}
            </Button>
          </div>
          
          <p className="text-xs text-center text-slate-400 mt-2">
            Your data is analyzed securely using enterprise-grade encryption
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedBizGenieChat;
