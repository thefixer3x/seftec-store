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
      setLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase.functions.invoke('stripe-subscription', {
        body: { action: 'get_subscription' }
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
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
    refetch
  };
};