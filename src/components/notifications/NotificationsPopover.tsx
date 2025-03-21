
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNotifications } from '@/context/NotificationsContext';
import { cn } from '@/lib/utils';
import NotificationFilters from './NotificationFilters';
import NotificationSorter from './NotificationSorter';
import NotificationsList from './NotificationsList';

export function NotificationsPopover() {
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    loading, 
    hasMore, 
    loadMore,
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    notificationGroups,
    activeGroup,
    setActiveGroup
  } = useNotifications();
  
  const [open, setOpen] = useState(false);

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0 max-h-[500px] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h4 className="font-medium text-sm">Notifications</h4>
          <div className="flex space-x-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotificationFilters 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              activeGroup={activeGroup}
              setActiveGroup={setActiveGroup}
              notificationGroups={notificationGroups}
            />
            
            <NotificationSorter 
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
          </div>
        </div>
        
        <div className={cn(
          "flex-1 overflow-y-auto",
          notifications.length === 0 && !loading ? "flex items-center justify-center" : ""
        )}>
          <NotificationsList 
            notifications={notifications}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationsPopover;
