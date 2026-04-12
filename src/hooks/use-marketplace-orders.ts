import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type MarketplaceOrder = {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string | null;
  order_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  quantity: number;
  unit_price: number;
  subtotal?: number;
  products?: {
    id: string;
    name: string;
    description: string | null;
    image_url: string | null;
    category: string | null;
  };
};

type OrderItemRow = Tables<"order_items">;
type ProductRow = Tables<"products">;

export type CreateOrderInput = {
  shipping_address: string;
  items?: {
    product_id: string;
    quantity: number;
    unit_price: number;
  }[];
  use_cart?: boolean;
};

/**
 * Hook to fetch and manage marketplace orders
 */
export function useMarketplaceOrders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's orders
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["marketplace-orders", user?.id],
    queryFn: async (): Promise<MarketplaceOrder[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          total_amount,
          status,
          shipping_address,
          order_date,
          created_at,
          updated_at
        `
        )
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
    staleTime: 60 * 1000, // 1 minute
  });

  // Fetch single order with details
  const fetchOrderDetails = async (orderId: string): Promise<MarketplaceOrder | null> => {
    if (!user) return null;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        `
        id,
        total_amount,
        status,
        shipping_address,
        order_date,
        created_at,
        updated_at
      `
      )
      .eq("id", orderId)
      .eq("customer_id", user.id)
      .single();

    if (orderError) {
      console.error("Error fetching order details:", orderError);
      throw orderError;
    }

    if (!order) return null;

    const { data: orderItems, error: orderItemsError } = await supabase
      .from("order_items")
      .select("id, product_id, quantity, unit_price")
      .eq("order_id", orderId);

    if (orderItemsError) {
      console.error("Error fetching order items:", orderItemsError);
      throw orderItemsError;
    }

    const productIds = Array.from(
      new Set((orderItems ?? []).map((item) => item.product_id).filter((id): id is string => !!id))
    );
    let productMap = new Map<string, ProductRow>();

    if (productIds.length > 0) {
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, description, image_url, category")
        .in("id", productIds);

      if (productsError) {
        console.error("Error fetching order products:", productsError);
        throw productsError;
      }

      productMap = new Map((products ?? []).map((product) => [product.id ?? "", product]));
    }

    return {
      id: order.id ?? orderId,
      total_amount: order.total_amount ?? 0,
      status: order.status ?? "pending",
      shipping_address: order.shipping_address,
      order_date: order.order_date,
      created_at: order.created_at,
      updated_at: order.updated_at,
      order_items: (orderItems ?? []).map((item: OrderItemRow, index: number) => {
        const product = item.product_id ? productMap.get(item.product_id) : undefined;
        return {
          id: item.id ?? `${orderId}-${item.product_id ?? "item"}-${index}`,
          quantity: item.quantity ?? 0,
          unit_price: item.unit_price ?? 0,
          subtotal: (item.quantity ?? 0) * (item.unit_price ?? 0),
          products: product
            ? {
                id: product.id ?? "",
                name: product.name ?? "Unknown Product",
                description: product.description,
                image_url: product.image_url,
                category: product.category,
              }
            : undefined,
        };
      }),
    };
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      if (!user) throw new Error("User not authenticated");

      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) throw new Error("No access token");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-orders?action=create_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Order created",
        description: "Your order has been placed successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Order creation failed",
        description: error.message,
      });
    },
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      if (!user) throw new Error("User not authenticated");

      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) throw new Error("No access token");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-orders?action=cancel_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to cancel order");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-orders"] });
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Order cancellation failed",
        description: error.message,
      });
    },
  });

  return {
    orders: orders || [],
    isLoading,
    error,
    refetch,
    fetchOrderDetails,
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    cancelOrder: cancelOrderMutation.mutate,
    isCancellingOrder: cancelOrderMutation.isPending,
  };
}
