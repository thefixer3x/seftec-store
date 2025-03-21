
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { NotificationFilter } from '@/context/NotificationsContext';

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  setActiveFilter: (filter: NotificationFilter) => void;
  activeGroup: string | null;
  setActiveGroup: (group: string | null) => void;
  notificationGroups: string[];
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  setActiveFilter,
  activeGroup,
  setActiveGroup,
  notificationGroups
}) => {
  // Helper to get the filter label
  const getFilterLabel = () => {
    if (activeFilter === 'all') return 'All';
    if (activeFilter === 'group' && activeGroup) return `Group: ${activeGroup}`;
    return activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
  };

  // Reset filters to show all notifications
  const resetFilters = () => {
    setActiveFilter('all');
    setActiveGroup(null);
  };

  return (
    <>
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

      {activeFilter !== 'all' && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={resetFilters}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </>
  );
};

export default NotificationFilters;
