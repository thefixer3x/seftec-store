
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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
  viewed?: boolean;
  clicked?: boolean;
};

export type RecommendationType = 'similar_products' | 'frequently_bought_together' | 'trending' | 'based_on_history' | 'price_drop';

export function useRecommendations() {
  const { user } = useAuth();
  const userId = user?.id || null;

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
          viewed,
          clicked,
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
        viewed: rec.viewed,
        clicked: rec.clicked,
        product_name: rec.products?.name,
        product_price: rec.products?.price,
        product_category: rec.products?.category
      }));
    },
    enabled: !!userId, // Only run query when we have a userId
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch recommendations by type
  const getRecommendationsByType = async (type: RecommendationType, limit: number = 3): Promise<Recommendation[]> => {
    if (!userId) return [];
    
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        id,
        product_id,
        supplier_id,
        relevance_score,
        recommendation_type,
        reason,
        viewed,
        clicked,
        products:product_id (
          name,
          price,
          category
        )
      `)
      .eq('user_id', userId)
      .eq('recommendation_type', type)
      .order('relevance_score', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error(`Error fetching ${type} recommendations:`, error);
      return [];
    }
    
    return (data || []).map(rec => ({
      id: rec.id,
      product_id: rec.product_id,
      supplier_id: rec.supplier_id,
      relevance_score: rec.relevance_score,
      recommendation_type: rec.recommendation_type,
      reason: rec.reason,
      viewed: rec.viewed,
      clicked: rec.clicked,
      product_name: rec.products?.name,
      product_price: rec.products?.price,
      product_category: rec.products?.category
    }));
  };

  // Mark recommendation as viewed
  const markAsViewed = async (recommendationId: string) => {
    if (!userId) return;
    
    // Only update if not already viewed
    const recommendation = recommendations?.find(r => r.id === recommendationId);
    if (recommendation?.viewed) return;
    
    const { error } = await supabase
      .from('recommendations')
      .update({ viewed: true })
      .eq('id', recommendationId)
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error marking recommendation as viewed:", error);
    } else {
      // Update local state to avoid unnecessary refetch
      refetch();
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
    } else {
      // Update local state to avoid unnecessary refetch
      refetch();
    }
  };

  return { 
    recommendations, 
    isLoading, 
    error, 
    refetch, 
    markAsViewed, 
    markAsClicked,
    getRecommendationsByType,
    isAuthenticated: !!userId 
  };
}
