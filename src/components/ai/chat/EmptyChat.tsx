
import React from 'react';

interface EmptyChatProps {
  isPremium: boolean;
}

const EmptyChat: React.FC<EmptyChatProps> = ({ isPremium }) => {
  return (
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
  );
};

export default EmptyChat;
