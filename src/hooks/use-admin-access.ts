import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useAdminAccess = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAdminStatus();
    }
  }, [user]);

  const fetchAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data); // Ensure it's a boolean value
      }
    } catch (error) {
      console.error('Unexpected error fetching admin status:', error);
      setIsAdmin(false);
    }
  };

  return {
    isAdmin,
    isLoading: loading,
  };
};
