
import React from 'react';
import { WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { useOfflineDetection } from '@/hooks/use-offline-detection';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OfflineBannerProps {
  className?: string;
  showRefreshButton?: boolean;
}

/**
 * Banner component that displays when the user is offline
 */
export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  className,
  showRefreshButton = true
}) => {
  const { isOffline, connectionStatus } = useOfflineDetection();
  
  if (!isOffline) return null;
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-amber-50 dark:bg-amber-900 border-t border-amber-200 dark:border-amber-800 p-2 z-50 animate-fade-up",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
          <WifiOff size={16} className="flex-shrink-0" />
          <p className="text-sm font-medium">You are currently offline</p>
          <span className="text-xs bg-amber-100 dark:bg-amber-800 px-1.5 py-0.5 rounded-full">
            {connectionStatus}
          </span>
        </div>
        
        {showRefreshButton && (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-amber-100 border-amber-200 hover:bg-amber-200 dark:bg-amber-800 dark:border-amber-700 dark:hover:bg-amber-700 text-amber-800 dark:text-amber-200"
            onClick={handleRefresh}
          >
            <RefreshCw size={14} className="mr-1" />
            <span>Try again</span>
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Icon component that indicates offline status in the header
 */
export const OfflineIndicator: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { isOffline } = useOfflineDetection();
  
  if (!isOffline) return null;
  
  return (
    <div className={cn("text-amber-500", className)} title="You are offline">
      <AlertCircle size={18} />
    </div>
  );
};
