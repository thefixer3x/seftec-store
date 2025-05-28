
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ChatInputProps {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  query,
  setQuery,
  onSubmit,
  isLoading,
  placeholder = 'Ask BizGenie about business strategies, financial advice, or market insights...'
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && query.trim()) {
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        onSubmit(syntheticEvent);
      }
    }
  };

  return (
    <>
      <Separator />
      <CardFooter className="p-4">
        <form onSubmit={onSubmit} className="flex w-full space-x-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${placeholder} (Press Enter to send)`}
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
    </>
  );
};

export default ChatInput;
