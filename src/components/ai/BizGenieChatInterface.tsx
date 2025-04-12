
import React, { useState } from 'react';
import { Send, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBizGenieChat, BizGenieChatMessage } from '@/hooks/use-bizgenie-chat';
import { useAuth } from '@/context/AuthContext';

interface BizGenieChatInterfaceProps {
  systemPrompt?: string;
  placeholder?: string;
  isPremium?: boolean;
}

const BizGenieChatInterface: React.FC<BizGenieChatInterfaceProps> = ({
  systemPrompt,
  placeholder = 'Ask BizGenie about business strategies, financial advice, or market insights...',
  isPremium = false
}) => {
  const { user } = useAuth();
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  
  const { 
    messages, 
    isLoading, 
    query, 
    setQuery, 
    sendMessage, 
    resetChat, 
    saveFeedback 
  } = useBizGenieChat({
    systemPrompt,
    isPremium
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      sendMessage(query);
      setQuery('');
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackMessageId && feedbackRating !== null) {
      saveFeedback(feedbackMessageId, feedbackRating, feedbackText);
      setFeedbackMessageId(null);
      setFeedbackText('');
      setFeedbackRating(null);
    }
  };

  const getModelBadgeColor = (model?: string) => {
    if (!model) return 'bg-gray-500';
    if (model.includes('gpt-4o-mini')) return 'bg-blue-500';
    if (model.includes('gpt-4o')) return 'bg-purple-600';
    return 'bg-emerald-600';
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl">
          BizGenie
          {isPremium && (
            <Badge className="ml-2 bg-amber-500 dark:bg-amber-600">Premium</Badge>
          )}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={resetChat}
                disabled={isLoading || messages.length === 0}
              >
                <RefreshCw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset conversation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
              <h3 className="text-lg font-medium mb-2">Welcome to BizGenie</h3>
              <p className="mb-2">How can I assist you with your business today?</p>
              <p className="text-sm">
                {isPremium 
                  ? 'Premium access: Advanced models for complex business inquiries.' 
                  : 'Free tier: Optimize your business with AI assistance.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] space-y-1 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-t-lg rounded-bl-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground rounded-t-lg rounded-br-lg'
                  } p-3`}
                >
                  <div>{message.content}</div>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-300 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        {message.model && (
                          <Badge variant="secondary" className={`text-xs ${getModelBadgeColor(message.model)}`}>
                            {message.model.split('-').pop()}
                          </Badge>
                        )}
                        {message.complexity && (
                          <Badge variant="outline" className="text-xs">
                            {message.complexity}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => {
                                setFeedbackMessageId(message.id);
                                setFeedbackRating(1);
                              }}
                            >
                              <ThumbsUp size={14} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Share Your Feedback</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Thanks for the positive feedback! Would you like to tell us more about what was helpful?
                              </p>
                              <Textarea
                                placeholder="What did you find useful about this response?"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => {
                                setFeedbackMessageId(message.id);
                                setFeedbackRating(-1);
                              }}
                            >
                              <ThumbsDown size={14} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Share Your Feedback</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                We're sorry this response wasn't helpful. Please let us know how we can improve.
                              </p>
                              <Textarea
                                placeholder="What could we improve about this response?"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <div className="animate-pulse flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">BizGenie is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <Separator />
      
      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <div className="flex items-center">
                <span className="mr-1">Sending</span>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default BizGenieChatInterface;
