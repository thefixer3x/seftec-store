import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
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

type RecommendationRow = Tables<'recommendations'>;
type ProductRow = Tables<'products'>;

const hydrateRecommendationsWithProducts = async (
  rows: RecommendationRow[]
): Promise<Recommendation[]> => {
  const productIds = Array.from(
    new Set(rows.map((row) => row.product_id).filter((id): id is string => !!id))
  );

  let productMap = new Map<string, ProductRow>();
  if (productIds.length > 0) {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, category')
      .in('id', productIds);

    if (productsError) {
      console.error('Error fetching recommendation products:', productsError);
      throw productsError;
    }

    productMap = new Map((products ?? []).map((product) => [product.id ?? '', product]));
  }

  return rows.map((rec) => {
    const product = rec.product_id ? productMap.get(rec.product_id) : undefined;
    return {
      id: rec.id ?? '',
      product_id: rec.product_id ?? '',
      supplier_id: rec.supplier_id ?? '',
      relevance_score: rec.relevance_score ?? 0,
      recommendation_type: rec.recommendation_type ?? 'based_on_history',
      reason: rec.reason,
      viewed: rec.viewed ?? false,
      clicked: rec.clicked ?? false,
      product_name: product?.name ?? undefined,
      product_price: product?.price ?? undefined,
      product_category: product?.category ?? undefined,
    };
  });
};

export function useRecommendations() {
  const { user } = useAuth();
  const userId = user?.id || null;

  // Fetch recommendations
  const { data: recommendations, isLoading, error, refetch } = useQuery({
    queryKey: ['recommendations', userId],
    queryFn: async (): Promise<Recommendation[]> => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('recommendations')
        .select('id, product_id, supplier_id, relevance_score, recommendation_type, reason, viewed, clicked')
        .eq('user_id', userId as string)
        .order('relevance_score', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
      }
      
      if (!data) return [];

      return hydrateRecommendationsWithProducts(data);
    },
    enabled: !!userId, // Only run query when we have a userId
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch recommendations by type
  const getRecommendationsByType = async (type: RecommendationType, limit: number = 3): Promise<Recommendation[]> => {
    if (!userId) return [];
    
    const { data, error } = await supabase
      .from('recommendations')
      .select('id, product_id, supplier_id, relevance_score, recommendation_type, reason, viewed, clicked')
      .eq('user_id', userId as string)
      .eq('recommendation_type', type as string)
      .order('relevance_score', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error(`Error fetching ${type} recommendations:`, error);
      return [];
    }
    
    if (!data) return [];

    return hydrateRecommendationsWithProducts(data);
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
      .eq('id', recommendationId as string)
      .eq('user_id', userId as string);
      
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
      .eq('id', recommendationId as string)
      .eq('user_id', userId as string);
      
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
