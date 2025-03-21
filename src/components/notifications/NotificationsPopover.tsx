
import React, { useState, useRef } from 'react';
import { Bell, Filter, Clock, Check, X, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useNotifications, NotificationFilter, NotificationSort } from '@/context/NotificationsContext';
import NotificationItem from './NotificationItem';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // Load more when scrolled to bottom
  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const getFilterLabel = () => {
    if (activeFilter === 'all') return 'All';
    if (activeFilter === 'group' && activeGroup) return `Group: ${activeGroup}`;
    return activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
  };

  const getSortLabel = () => {
    switch (activeSort) {
      case 'newest': return 'Newest first';
      case 'oldest': return 'Oldest first';
      case 'unread': return 'Unread first';
      case 'type': return 'Group by type';
      default: return 'Sort';
    }
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="text-xs">{getFilterLabel()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={activeFilter} onValueChange={(value) => {
                  setActiveFilter(value as NotificationFilter);
                  if (value !== 'group') setActiveGroup(null);
                }}>
                  <DropdownMenuRadioItem value="all">All notifications</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="info">Info only</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="success">Success only</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="warning">Warning only</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="error">Error only</DropdownMenuRadioItem>
                  
                  {notificationGroups.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span>Filter by group</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          {notificationGroups.map(group => (
                            <DropdownMenuItem key={group} onClick={() => {
                              setActiveFilter('group');
                              setActiveGroup(group);
                            }}>
                              {group}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">{getSortLabel()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={activeSort} onValueChange={(value) => setActiveSort(value as NotificationSort)}>
                  <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="unread">Unread first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="type">Group by type</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {activeFilter !== 'all' && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => {
                setActiveFilter('all');
                setActiveGroup(null);
              }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <div className={cn(
          "flex-1 overflow-y-auto",
          notifications.length === 0 && !loading ? "flex items-center justify-center" : ""
        )}>
          {loading && notifications.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">
              <p>No notifications</p>
            </div>
          ) : (
            <>
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
              
              {/* Loading indicator at bottom for infinite scroll */}
              <div ref={ref} className="h-10 flex items-center justify-center">
                {loading && hasMore && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationsPopover;
