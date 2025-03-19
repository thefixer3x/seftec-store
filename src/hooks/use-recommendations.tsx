
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export type Recommendation = {
  id: string;
  product_id: string;
  supplier_id: string;
  relevance_score: number;
  recommendation_type: string;
  reason: string | null;
  product_name?: string;
  product_price?: number;
  product_category?: string;
};

export function useRecommendations() {
  const [userId, setUserId] = useState<string | null>(null);

  // Check for current user
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };
    
    checkUser();
  }, []);

  // Fetch recommendations
  const { data: recommendations, isLoading, error, refetch } = useQuery({
    queryKey: ['recommendations', userId],
    queryFn: async (): Promise<Recommendation[]> => {
      if (!userId) return [];
      
      // Get recommendations with product info
      const { data, error } = await supabase
        .from('recommendations')
        .select(`
          id,
          product_id,
          supplier_id,
          relevance_score,
          recommendation_type,
          reason,
          products:product_id (
            name,
            price,
            category
          )
        `)
        .eq('user_id', userId)
        .order('relevance_score', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
      }
      
      // Format the data to flatten the structure
      return (data || []).map(rec => ({
        id: rec.id,
        product_id: rec.product_id,
        supplier_id: rec.supplier_id,
        relevance_score: rec.relevance_score,
        recommendation_type: rec.recommendation_type,
        reason: rec.reason,
        product_name: rec.products?.name,
        product_price: rec.products?.price,
        product_category: rec.products?.category
      }));
    },
    enabled: !!userId, // Only run query when we have a userId
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mark recommendation as viewed
  const markAsViewed = async (recommendationId: string) => {
    if (!userId) return;
    
    const { error } = await supabase
      .from('recommendations')
      .update({ viewed: true })
      .eq('id', recommendationId)
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error marking recommendation as viewed:", error);
    }
  };

  // Mark recommendation as clicked
  const markAsClicked = async (recommendationId: string) => {
    if (!userId) return;
    
    const { error } = await supabase
      .from('recommendations')
      .update({ clicked: true })
      .eq('id', recommendationId)
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error marking recommendation as clicked:", error);
    }
  };

  return { 
    recommendations, 
    isLoading, 
    error, 
    refetch, 
    markAsViewed, 
    markAsClicked,
    isAuthenticated: !!userId 
  };
}
