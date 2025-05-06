
import React from 'react';
import AIChatInterface from './AIChatInterface';

interface EnhancedBizGenieChatProps {
  marketInsight: string;
  isPremium?: boolean;
}

const EnhancedBizGenieChat: React.FC<EnhancedBizGenieChatProps> = ({ 
  marketInsight, 
  isPremium = false 
}) => {
  const [hasNotification, setHasNotification] = React.useState(false);

  // Simulate notifications
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClearNotification = () => {
    setHasNotification(false);
  };

  return (
    <AIChatInterface
      marketInsight={marketInsight}
      hasNotification={hasNotification}
      onClearNotification={handleClearNotification}
    />
  );
};

export default EnhancedBizGenieChat;
