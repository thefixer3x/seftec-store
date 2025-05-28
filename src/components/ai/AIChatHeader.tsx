
import React from 'react';
import { Bot, Bell, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AIChatHeaderProps {
  hasNotification: boolean;
  onClearNotification: () => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  isPremium: boolean;
  handlePremiumToggle: () => void;
}

const AIChatHeader: React.FC<AIChatHeaderProps> = ({
  hasNotification,
  onClearNotification,
  notificationsEnabled,
  setNotificationsEnabled,
  isPremium,
  handlePremiumToggle
}) => {
  return (
    <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5" />
        <h3 className="font-medium">BizGenie AI Assistant</h3>
        {hasNotification && (
          <button 
            className="relative flex h-3 w-3 cursor-pointer focus:outline-none" 
            onClick={onClearNotification}
            aria-label="Clear notification"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="text-xs hidden sm:inline">Notifications</span>
          <Switch 
            checked={notificationsEnabled} 
            onCheckedChange={setNotificationsEnabled} 
            className="data-[state=checked]:bg-seftec-teal"
          />
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="text-xs hidden sm:inline">Premium</span>
          <Switch 
            checked={isPremium} 
            onCheckedChange={handlePremiumToggle} 
            className="data-[state=checked]:bg-amber-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatHeader;
