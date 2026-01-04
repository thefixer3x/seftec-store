import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type InventoryItem = {
  id: string;
  product_id: string | null;
  user_id: string;
  sku: string;
  barcode: string | null;
  stock_quantity: number;
  reorder_point: number;
  reorder_quantity: number;
  unit_cost: number;
  location: string | null;
  supplier_name: string | null;
  supplier_contact: string | null;
  last_restocked_at: string | null;
  created_at: string;
  updated_at: string;
  products?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
  };
};

export type StockAlert = {
  id: string;
  inventory_item_id: string;
  alert_type: 'low_stock' | 'out_of_stock' | 'overstock';
  current_quantity: number;
  threshold_quantity: number;
  is_resolved: boolean;
  resolved_at: string | null;
  created_at: string;
};

export type InventoryAdjustment = {
  id: string;
  inventory_item_id: string;
  adjustment_type: 'restock' | 'sale' | 'return' | 'damage' | 'theft' | 'adjustment';
  quantity_change: number;
  previous_quantity: number;
  new_quantity: number;
  unit_cost: number | null;
  total_value: number | null;
  reason: string | null;
  reference_id: string | null;
  notes: string | null;
  created_at: string;
};

export type CreateInventoryItemInput = {
  sku: string;
  product_id?: string;
  barcode?: string;
  stock_quantity?: number;
  reorder_point?: number;
  reorder_quantity?: number;
  unit_cost?: number;
  location?: string;
  supplier_name?: string;
  supplier_contact?: string;
};

export type UpdateInventoryItemInput = Partial<CreateInventoryItemInput>;

export type CreateAdjustmentInput = {
  inventory_item_id: string;
  adjustment_type: InventoryAdjustment['adjustment_type'];
  quantity_change: number;
  reason?: string;
  notes?: string;
};

/**
 * Hook to fetch and manage inventory items
 */
export function useInventory() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's inventory items
  const {
    data: items,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["inventory", user?.id],
    queryFn: async (): Promise<InventoryItem[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("inventory_items")
        .select(`
          *,
          products (
            id,
            name,
            description,
            price,
            image_url
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching inventory:", error);
        throw error;
      }

      return (data as InventoryItem[]) || [];
    },
    enabled: !!user,
  });

  // Fetch stock alerts
  const {
    data: alerts,
    isLoading: isLoadingAlerts,
  } = useQuery({
    queryKey: ["stock-alerts", user?.id],
    queryFn: async (): Promise<StockAlert[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("stock_alerts")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_resolved", false)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
        throw error;
      }

      return (data as StockAlert[]) || [];
    },
    enabled: !!user,
  });

  // Create inventory item mutation
  const createItemMutation = useMutation({
    mutationFn: async (input: CreateInventoryItemInput) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("inventory_items")
        .insert({
          user_id: user.id,
          sku: input.sku,
          product_id: input.product_id || null,
          barcode: input.barcode || null,
          stock_quantity: input.stock_quantity || 0,
          reorder_point: input.reorder_point || 10,
          reorder_quantity: input.reorder_quantity || 50,
          unit_cost: input.unit_cost || 0,
          location: input.location || null,
          supplier_name: input.supplier_name || null,
          supplier_contact: input.supplier_contact || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.id] });
      toast({
        title: "Item added",
        description: "Inventory item has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update inventory item mutation
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, ...input }: UpdateInventoryItemInput & { id: string }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("inventory_items")
        .update(input)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["stock-alerts", user?.id] });
      toast({
        title: "Item updated",
        description: "Inventory item has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete inventory item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("inventory_items")
        .delete()
        .eq("id", itemId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["stock-alerts", user?.id] });
      toast({
        title: "Item deleted",
        description: "Inventory item has been removed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Adjust stock mutation
  const adjustStockMutation = useMutation({
    mutationFn: async (input: CreateAdjustmentInput) => {
      if (!user) throw new Error("User not authenticated");

      // Get current item to calculate new quantity
      const { data: item } = await supabase
        .from("inventory_items")
        .select("stock_quantity, unit_cost")
        .eq("id", input.inventory_item_id)
        .single();

      if (!item) throw new Error("Item not found");

      const newQuantity = item.stock_quantity + input.quantity_change;
      if (newQuantity < 0) throw new Error("Stock cannot be negative");

      // Create adjustment record
      const { error: adjustmentError } = await supabase
        .from("inventory_adjustments")
        .insert({
          inventory_item_id: input.inventory_item_id,
          user_id: user.id,
          created_by: user.id,
          adjustment_type: input.adjustment_type,
          quantity_change: input.quantity_change,
          previous_quantity: item.stock_quantity,
          new_quantity: newQuantity,
          unit_cost: item.unit_cost,
          total_value: Math.abs(input.quantity_change) * (item.unit_cost || 0),
          reason: input.reason || null,
          notes: input.notes || null,
        });

      if (adjustmentError) throw adjustmentError;

      // Update stock quantity
      const updateData: { stock_quantity: number; last_restocked_at?: string } = {
        stock_quantity: newQuantity,
      };

      if (input.adjustment_type === 'restock') {
        updateData.last_restocked_at = new Date().toISOString();
      }

      const { error: updateError } = await supabase
        .from("inventory_items")
        .update(updateData)
        .eq("id", input.inventory_item_id);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["stock-alerts", user?.id] });
      toast({
        title: "Stock adjusted",
        description: "Inventory has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adjusting stock",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Resolve alert mutation
  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("stock_alerts")
        .update({
          is_resolved: true,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", alertId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-alerts", user?.id] });
      toast({
        title: "Alert resolved",
        description: "Stock alert has been marked as resolved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error resolving alert",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    items: items || [],
    alerts: alerts || [],
    isLoading,
    isLoadingAlerts,
    error,
    refetch,
    createItem: createItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    adjustStock: adjustStockMutation.mutate,
    resolveAlert: resolveAlertMutation.mutate,
    isCreating: createItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
    isDeleting: deleteItemMutation.isPending,
    isAdjusting: adjustStockMutation.isPending,
  };
}
