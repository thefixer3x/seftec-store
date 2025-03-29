import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface UserPreferences {
  id?: string;
  user_id: string;
  industry_focus?: string[];
  regions_of_interest?: string[];
  business_size?: 'small' | 'medium' | 'large' | 'enterprise';
  risk_tolerance?: 'low' | 'medium' | 'high';
  payment_methods?: string[];
  preferred_currencies?: string[];
  trade_volume?: 'low' | 'medium' | 'high';
  trade_frequency?: 'occasional' | 'regular' | 'frequent';
  created_at?: string;
  updated_at?: string;
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch user preferences
  const fetchPreferences = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) throw error;
      
      setPreferences(data);
    } catch (err) {
      console.error('Error fetching user preferences:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Save or update user preferences
  const savePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // If we already have preferences, update them
      if (preferences?.id) {
        const { error } = await supabase
          .from('user_preferences')
          .update({
            ...newPreferences,
            updated_at: new Date().toISOString()
          })
          .eq('id', preferences.id);
          
        if (error) throw error;
      } else {
        // Otherwise, insert new preferences
        const { error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            ...newPreferences,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      // Refetch to get the updated data
      await fetchPreferences();
      toast({
        title: "Preferences saved",
        description: "Your personalization settings have been updated."
      });
      
    } catch (err) {
      console.error('Error saving user preferences:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast({
        title: "Failed to save preferences",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of preferences
  useEffect(() => {
    if (user?.id) {
      fetchPreferences();
    } else {
      setPreferences(null);
      setLoading(false);
    }
  }, [user?.id]);

  return {
    preferences,
    loading,
    error,
    fetchPreferences,
    savePreferences
  };
};
