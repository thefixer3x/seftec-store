
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  CardTitle, 
  CardHeader 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ChatHeaderProps {
  isPremium: boolean;
  onReset: () => void;
  disabled: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isPremium, 
  onReset, 
  disabled 
}) => {
  return (
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
              onClick={onReset}
              disabled={disabled}
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
  );
};

export default ChatHeader;
