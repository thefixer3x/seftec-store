
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { BizGenieChatMessage } from '@/hooks/use-bizgenie-chat';

interface ChatMessageProps {
  message: BizGenieChatMessage;
  onFeedback: (messageId: string, rating: number, feedbackText?: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const [feedbackText, setFeedbackText] = React.useState('');
  const [feedbackRating, setFeedbackRating] = React.useState<number | null>(null);

  const handleFeedbackSubmit = () => {
    if (feedbackRating !== null) {
      onFeedback(message.id, feedbackRating, feedbackText);
      setFeedbackText('');
      setFeedbackRating(null);
    }
  };

  const getModelBadgeColor = (model?: string) => {
    if (!model) return 'bg-gray-500';
    // BizGenie branding - show tier/complexity, not vendor models
    if (model.includes('perplexity')) return 'bg-emerald-600';
    if (model.includes('mini') || model.includes('o1') || model.includes('o3')) return 'bg-blue-500';
    if (model.includes('4') || model.includes('premium')) return 'bg-purple-600';
    return 'bg-emerald-600'; // Default BizGenie color
  };

  const getModelDisplayName = (model?: string) => {
    if (!model) return 'BizGenie';
    // Hide vendor-specific names, show only tier
    if (model.includes('perplexity')) return 'Pro+';
    if (model.includes('mini') || model.includes('o1') || model.includes('o3')) return 'Pro';
    if (model.includes('4') || model.includes('premium')) return 'Premium';
    return 'BizGenie';
  };

  return (
    <div
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
                <Badge variant="secondary" className={`text-xs ${getModelBadgeColor(message.model)} text-white`}>
                  {getModelDisplayName(message.model)}
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
                    onClick={() => setFeedbackRating(1)}
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
                    onClick={() => setFeedbackRating(-1)}
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
  );
};

export default ChatMessage;
