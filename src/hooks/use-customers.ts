import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type Customer = {
  id: string;
  user_id: string;
  customer_name: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  customer_type: 'individual' | 'business' | 'wholesale' | 'retail' | null;
  status: 'active' | 'inactive' | 'blocked';
  billing_address: string | null;
  shipping_address: string | null;
  tax_id: string | null;
  credit_limit: number;
  current_balance: number;
  lifetime_value: number;
  total_orders: number;
  last_order_date: string | null;
  first_purchase_date: string | null;
  preferred_payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CustomerInteraction = {
  id: string;
  customer_id: string;
  interaction_type: 'call' | 'email' | 'meeting' | 'chat' | 'note' | 'order' | 'complaint' | 'feedback';
  subject: string | null;
  description: string;
  outcome: string | null;
  follow_up_date: string | null;
  is_completed: boolean;
  created_at: string;
};

export type CustomerTag = {
  id: string;
  customer_id: string;
  tag_name: string;
  tag_color: string;
};

export type CreateCustomerInput = {
  customer_name: string;
  email?: string;
  phone?: string;
  company_name?: string;
  customer_type?: Customer['customer_type'];
  billing_address?: string;
  shipping_address?: string;
  notes?: string;
};

export type UpdateCustomerInput = Partial<CreateCustomerInput> & {
  status?: Customer['status'];
  credit_limit?: number;
};

/**
 * Hook to fetch and manage customers
 */
export function useCustomers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's customers
  const {
    data: customers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["customers", user?.id],
    queryFn: async (): Promise<Customer[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching customers:", error);
        throw error;
      }

      return (data as Customer[]) || [];
    },
    enabled: !!user,
  });

  // Create customer mutation
  const createCustomerMutation = useMutation({
    mutationFn: async (input: CreateCustomerInput) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("customers")
        .insert({
          user_id: user.id,
          customer_name: input.customer_name,
          email: input.email || null,
          phone: input.phone || null,
          company_name: input.company_name || null,
          customer_type: input.customer_type || null,
          billing_address: input.billing_address || null,
          shipping_address: input.shipping_address || null,
          notes: input.notes || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
      toast({
        title: "Customer created",
        description: "Customer has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating customer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update customer mutation
  const updateCustomerMutation = useMutation({
    mutationFn: async ({ id, ...input }: UpdateCustomerInput & { id: string }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("customers")
        .update(input)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
      toast({
        title: "Customer updated",
        description: "Customer has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating customer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete customer mutation
  const deleteCustomerMutation = useMutation({
    mutationFn: async (customerId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", customerId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
      toast({
        title: "Customer deleted",
        description: "Customer has been removed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting customer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    customers: customers || [],
    isLoading,
    error,
    refetch,
    createCustomer: createCustomerMutation.mutate,
    updateCustomer: updateCustomerMutation.mutate,
    deleteCustomer: deleteCustomerMutation.mutate,
    isCreating: createCustomerMutation.isPending,
    isUpdating: updateCustomerMutation.isPending,
    isDeleting: deleteCustomerMutation.isPending,
  };
}

/**
 * Hook to fetch customer interactions
 */
export function useCustomerInteractions(customerId: string | null) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: interactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer-interactions", customerId],
    queryFn: async (): Promise<CustomerInteraction[]> => {
      if (!user || !customerId) return [];

      const { data, error } = await supabase
        .from("customer_interactions")
        .select("*")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching interactions:", error);
        throw error;
      }

      return (data as CustomerInteraction[]) || [];
    },
    enabled: !!user && !!customerId,
  });

  const addInteractionMutation = useMutation({
    mutationFn: async (input: Omit<CustomerInteraction, 'id' | 'created_at'>) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("customer_interactions")
        .insert({
          ...input,
          user_id: user.id,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-interactions", customerId] });
      toast({
        title: "Interaction added",
        description: "Customer interaction has been recorded.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding interaction",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    interactions: interactions || [],
    isLoading,
    error,
    addInteraction: addInteractionMutation.mutate,
    isAdding: addInteractionMutation.isPending,
  };
}
