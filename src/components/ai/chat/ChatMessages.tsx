
import React from 'react';
import { CardContent } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import ChatLoading from './ChatLoading';
import EmptyChat from './EmptyChat';
import { BizGenieChatMessage } from '@/hooks/use-bizgenie-chat';

interface ChatMessagesProps {
  messages: BizGenieChatMessage[];
  isLoading: boolean;
  isPremium: boolean;
  onFeedback: (messageId: string, rating: number, feedbackText?: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  isPremium,
  onFeedback
}) => {
  return (
    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <EmptyChat isPremium={isPremium} />
      ) : (
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onFeedback={onFeedback} 
            />
          ))}

          {isLoading && <ChatLoading />}
        </div>
      )}
    </CardContent>
  );
};

export default ChatMessages;
