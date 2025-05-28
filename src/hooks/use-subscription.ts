
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Subscription {
  status: string;
  plan_id: string;
  plan_name: string;
  current_period_end?: string;
  trial_end?: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
      setError(null);
    }
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching subscription for user:', user.id);
      
      const { data, error: fetchError } = await supabase.functions.invoke('stripe-subscription', {
        body: { action: 'get_subscription' }
      });

      if (fetchError) {
        console.error('Subscription fetch error:', fetchError);
        throw new Error(fetchError.message || 'Failed to fetch subscription');
      }

      console.log('Subscription data received:', data);
      setSubscription(data);
    } catch (err) {
      console.error('Error in fetchSubscription:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch subscription';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (user) {
      fetchSubscription();
    }
  };

  return {
    subscription,
    loading,
    error,
    refetch,
    isAuthenticated: !!user
  };
};
