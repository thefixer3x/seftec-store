
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  notification_group?: string;
  expires_at?: string;
  metadata?: {
    path?: string;
    [key: string]: any;
  };
}

export interface NotificationSettings {
  id: string;
  user_id: string;
  info_enabled: boolean;
  warning_enabled: boolean;
  success_enabled: boolean;
  error_enabled: boolean;
}

export type NotificationSort = 'newest' | 'oldest' | 'unread' | 'type';
export type NotificationFilter = 'all' | NotificationType | 'group';

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  notificationGroups: string[];
  settings: NotificationSettings | null;
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  activeFilter: NotificationFilter;
  setActiveFilter: (filter: NotificationFilter) => void;
  activeSort: NotificationSort;
  setActiveSort: (sort: NotificationSort) => void;
  activeGroup: string | null;
  setActiveGroup: (group: string | null) => void;
}

const PAGE_SIZE = 10;

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationGroups, setNotificationGroups] = useState<string[]>([]);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [activeSort, setActiveSort] = useState<NotificationSort>('newest');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch notification settings
  useEffect(() => {
    if (!user) {
      setSettings(null);
      return;
    }

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('notification_settings')
          .select('*')
          .eq('user_id', user.id as string)
          .single();

        if (error) throw error;
        
        // Type safety check
        if (data) {
          setSettings(data as NotificationSettings);
        }
      } catch (error: any) {
        console.error('Error fetching notification settings:', error.message);
      }
    };

    fetchSettings();
  }, [user]);

  // Fetch notifications with pagination, filtering and sorting
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      setHasMore(false);
      setPage(0);
      return;
    }

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id as string)
          .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

        // Apply filters
        if (activeFilter !== 'all' && activeFilter !== 'group') {
          query = query.eq('type', activeFilter as string);
        }

        // Apply group filter
        if (activeFilter === 'group' && activeGroup) {
          query = query.eq('notification_group', activeGroup as string);
        }

        // Apply sorting
        if (activeSort === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else if (activeSort === 'oldest') {
          query = query.order('created_at', { ascending: true });
        } else if (activeSort === 'unread') {
          query = query.order('is_read', { ascending: true }).order('created_at', { ascending: false });
        } else if (activeSort === 'type') {
          query = query.order('type').order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;
        
        if (data) {
          const typedNotifications = data.map(item => ({
            ...item,
            type: (item.type || 'info') as NotificationType
          })) as Notification[];
          
          setNotifications(prev => page === 0 ? typedNotifications : [...prev, ...typedNotifications]);
          setHasMore(typedNotifications.length === PAGE_SIZE);
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching notifications:', error.message);
        setLoading(false);
      }
    };

    // Fetch notification groups for filtering
    const fetchNotificationGroups = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('notification_group')
          .eq('user_id', user.id as string)
          .not('notification_group', 'is', null)
          .order('notification_group');

        if (error) throw error;
        
        if (data) {
          // Extract unique groups
          const groups = data
            .map(item => item.notification_group)
            .filter((group): group is string => !!group);
            
          const uniqueGroups = [...new Set(groups)];
          setNotificationGroups(uniqueGroups);
        }
      } catch (error: any) {
        console.error('Error fetching notification groups:', error.message);
      }
    };

    fetchNotifications();
    fetchNotificationGroups();

    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (!payload.new) return;
        
        const newNotification = {
          ...payload.new,
          type: (payload.new.type || 'info') as NotificationType
        } as Notification;
        
        // Check if notification type is enabled in user settings
        if (settings && !settings[`${newNotification.type}_enabled` as keyof NotificationSettings]) {
          return; // Skip notifications of disabled types
        }
        
        // Only add to current view if it matches the current filter
        if (shouldShowNotification(newNotification)) {
          setNotifications(prev => [newNotification, ...prev]);
        }
        
        // Always show toast for new notifications
        toast({
          title: newNotification.title,
          description: newNotification.message,
          variant: newNotification.type === 'error' ? 'destructive' : 'default',
        });
        
        // Update groups if this is a new group
        if (newNotification.notification_group && !notificationGroups.includes(newNotification.notification_group)) {
          setNotificationGroups(prev => [...prev, newNotification.notification_group!]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, page, activeFilter, activeSort, activeGroup, settings, toast, notificationGroups]);

  const shouldShowNotification = (notification: Notification) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'group' && activeGroup && notification.notification_group === activeGroup) return true;
    if (activeFilter !== 'group' && notification.type === activeFilter) return true;
    return false;
  };

  const loadMore = async () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const markAsRead = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true } as any)
        .eq('id', id as string)
        .eq('user_id', user.id as string);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true } as any)
        .eq('user_id', user.id as string)
        .eq('is_read', false as any);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, is_read: true }))
      );
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error.message);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id as string)
        .eq('user_id', user.id as string);

      if (error) throw error;

      setNotifications(prev => prev.filter(notif => notif.id !== id));
    } catch (error: any) {
      console.error('Error deleting notification:', error.message);
    }
  };

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    if (!user || !settings) return;

    try {
      const { error } = await supabase
        .from('notification_settings')
        .update(newSettings as any)
        .eq('user_id', user.id as string);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      toast({
        title: 'Settings updated',
        description: 'Your notification preferences have been saved',
      });
    } catch (error: any) {
      console.error('Error updating notification settings:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to update notification preferences',
        variant: 'destructive',
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      notificationGroups,
      settings,
      updateSettings,
      loading,
      hasMore,
      loadMore,
      activeFilter,
      setActiveFilter,
      activeSort,
      setActiveSort,
      activeGroup,
      setActiveGroup
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
