
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Notification } from '@/context/NotificationsContext';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  loading,
  hasMore,
  loadMore
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // Load more when scrolled to bottom
  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        <p>No notifications</p>
      </div>
    );
  }

  return (
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
  );
};

export default NotificationsList;
