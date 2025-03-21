
import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { Check, Info, AlertTriangle, XCircle, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNotifications, Notification } from '@/context/NotificationsContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead, deleteNotification } = useNotifications();
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleNavigation = () => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    
    // Extract target path from notification data if available
    if (notification.metadata && notification.metadata.path) {
      navigate(notification.metadata.path);
    } else {
      // Fallback navigation based on notification content
      if (notification.message.toLowerCase().includes('order')) {
        navigate('/orders');
      } else if (notification.message.toLowerCase().includes('profile')) {
        navigate('/profile');
      } else if (notification.message.toLowerCase().includes('product') || 
                notification.message.toLowerCase().includes('shop')) {
        navigate('/shop');
      } else if (notification.message.toLowerCase().includes('payment') || 
                notification.message.toLowerCase().includes('invoice')) {
        navigate('/cart');
      } else if (notification.message.toLowerCase().includes('biztool') || 
                notification.message.toLowerCase().includes('tool')) {
        navigate('/biz-tools');
      } else if (notification.message.toLowerCase().includes('bizgenie') || 
                notification.message.toLowerCase().includes('ai')) {
        navigate('/value-propositions/bizgenie');
      }
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(notification.id);
  };

  // Check if notification has an expiration date
  const hasExpiration = !!notification.expires_at;
  const isExpiringSoon = hasExpiration && 
    new Date(notification.expires_at!).getTime() - Date.now() < 24 * 60 * 60 * 1000;

  return (
    <div 
      className={cn(
        "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex",
        !notification.is_read && "bg-slate-50 dark:bg-slate-800/30"
      )}
      onClick={handleNavigation}
    >
      <div className="mr-3 pt-1">{getIcon()}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h5 className={cn("text-sm font-medium", !notification.is_read && "font-semibold")}>{notification.title}</h5>
            {notification.notification_group && (
              <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                {notification.notification_group}
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 -mr-2 opacity-50 hover:opacity-100"
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.message}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(notification.created_at)}</p>
          
          {hasExpiration && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center gap-1 text-xs", 
                    isExpiringSoon ? "text-amber-500" : "text-slate-400"
                  )}>
                    <Clock className="h-3 w-3" />
                    <span>Expires {format(new Date(notification.expires_at!), 'MMM d')}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This notification will expire on {format(new Date(notification.expires_at!), 'MMMM d, yyyy')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
