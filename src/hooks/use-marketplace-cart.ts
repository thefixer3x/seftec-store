import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type CartItem = {
  id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    image_url: string | null;
    stock_quantity: number;
    category: string | null;
  };
};

export type CartSummary = {
  cart_items: CartItem[];
  total: number;
  item_count: number;
};

/**
 * Hook to manage marketplace shopping cart
 */
export function useMarketplaceCart() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getAuthToken = async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (!token) throw new Error("No access token");
    return token;
  };

  // Fetch cart
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["marketplace-cart", user?.id],
    queryFn: async (): Promise<CartSummary> => {
      if (!user) {
        return { cart_items: [], total: 0, item_count: 0 };
      }

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-cart?action=get_cart`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch cart");
      }

      return response.json();
    },
    enabled: !!user,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ product_id, quantity }: { product_id: string; quantity: number }) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-cart?action=add_to_cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id, quantity }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add to cart");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-cart"] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add to cart",
        description: error.message,
      });
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ cart_item_id, quantity }: { cart_item_id: string; quantity: number }) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-cart?action=update_cart_item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart_item_id, quantity }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update cart item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-cart"] });
      toast({
        title: "Cart updated",
        description: "Item quantity has been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update cart",
        description: error.message,
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (cart_item_id: string) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-cart?action=remove_from_cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart_item_id }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove from cart");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-cart"] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to remove from cart",
        description: error.message,
      });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-cart?action=clear_cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to clear cart");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to clear cart",
        description: error.message,
      });
    },
  });

  return {
    cart: cart || { cart_items: [], total: 0, item_count: 0 },
    isLoading,
    error,
    refetch,
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    updateCartItem: updateCartItemMutation.mutate,
    isUpdatingCart: updateCartItemMutation.isPending,
    removeFromCart: removeFromCartMutation.mutate,
    isRemovingFromCart: removeFromCartMutation.isPending,
    clearCart: clearCartMutation.mutate,
    isClearingCart: clearCartMutation.isPending,
  };
}
