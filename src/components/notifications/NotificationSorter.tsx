
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';
import { NotificationSort } from '@/context/NotificationsContext';

interface NotificationSorterProps {
  activeSort: NotificationSort;
  setActiveSort: (sort: NotificationSort) => void;
}

export const NotificationSorter: React.FC<NotificationSorterProps> = ({
  activeSort,
  setActiveSort
}) => {
  // Helper to get the sort label
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
  );
};

export default NotificationSorter;
