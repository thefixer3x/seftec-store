
import React from 'react';

const ChatLoading: React.FC = () => {
  return (
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
  );
};

export default ChatLoading;
