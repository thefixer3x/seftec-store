import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type Invoice = {
  id: string;
  user_id: string;
  customer_id: string | null;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
  currency_code: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  payment_terms: string | null;
  notes: string | null;
  terms_and_conditions: string | null;
  footer_text: string | null;
  sent_at: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  customers?: {
    id: string;
    customer_name: string;
    email: string | null;
    company_name: string | null;
  };
  invoice_items?: InvoiceItem[];
};

export type InvoiceItem = {
  id: string;
  invoice_id: string;
  product_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  discount_percentage: number;
  line_total: number;
  sort_order: number;
};

export type CreateInvoiceInput = {
  customer_id?: string;
  invoice_date?: string;
  due_date: string;
  currency_code?: string;
  tax_rate?: number;
  discount_amount?: number;
  shipping_cost?: number;
  payment_terms?: string;
  notes?: string;
  terms_and_conditions?: string;
  footer_text?: string;
  items: CreateInvoiceItemInput[];
};

export type CreateInvoiceItemInput = {
  description: string;
  quantity: number;
  unit_price: number;
  product_id?: string;
  tax_rate?: number;
  discount_percentage?: number;
};

export type UpdateInvoiceInput = Partial<Omit<CreateInvoiceInput, 'items'>> & {
  status?: Invoice['status'];
};

/**
 * Hook to fetch and manage invoices
 */
export function useInvoices() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's invoices
  const {
    data: invoices,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoices", user?.id],
    queryFn: async (): Promise<Invoice[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customers (
            id,
            customer_name,
            email,
            company_name
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching invoices:", error);
        throw error;
      }

      return (data as Invoice[]) || [];
    },
    enabled: !!user,
  });

  // Get invoice with items
  const getInvoiceWithItems = async (invoiceId: string): Promise<Invoice | null> => {
    if (!user) return null;

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select(`
        *,
        customers (
          id,
          customer_name,
          email,
          company_name
        )
      `)
      .eq("id", invoiceId)
      .eq("user_id", user.id)
      .single();

    if (invoiceError) {
      console.error("Error fetching invoice:", invoiceError);
      return null;
    }

    const { data: items, error: itemsError } = await supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("sort_order", { ascending: true });

    if (itemsError) {
      console.error("Error fetching invoice items:", itemsError);
    }

    return {
      ...(invoice as Invoice),
      invoice_items: (items as InvoiceItem[]) || [],
    };
  };

  // Create invoice mutation - uses atomic RPC function
  const createInvoiceMutation = useMutation({
    mutationFn: async (input: CreateInvoiceInput) => {
      if (!user) throw new Error("User not authenticated");

      // Use atomic RPC function to create invoice with items
      const { data, error } = await supabase.rpc('create_invoice_with_items', {
        p_user_id: user.id,
        p_customer_id: input.customer_id || null,
        p_invoice_date: input.invoice_date || new Date().toISOString().split('T')[0],
        p_due_date: input.due_date,
        p_currency_code: input.currency_code || 'USD',
        p_tax_rate: input.tax_rate || 0,
        p_discount_amount: input.discount_amount || 0,
        p_shipping_cost: input.shipping_cost || 0,
        p_payment_terms: input.payment_terms || null,
        p_notes: input.notes || null,
        p_terms_and_conditions: input.terms_and_conditions || null,
        p_footer_text: input.footer_text || null,
        p_items: JSON.stringify(input.items.map(item => ({
          product_id: item.product_id || null,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          tax_rate: item.tax_rate || 0,
          discount_percentage: item.discount_percentage || 0,
        }))),
      });

      if (error) throw error;

      // Check for application-level errors in the response
      if (data && !data.success) {
        throw new Error(data.error || 'Invoice creation failed');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
      toast({
        title: "Invoice created",
        description: "Invoice has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update invoice mutation
  const updateInvoiceMutation = useMutation({
    mutationFn: async ({ id, ...input }: UpdateInvoiceInput & { id: string }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("invoices")
        .update(input)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
      toast({
        title: "Invoice updated",
        description: "Invoice has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete invoice mutation
  const deleteInvoiceMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
      toast({
        title: "Invoice deleted",
        description: "Invoice has been removed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Send invoice mutation
  const sendInvoiceMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("invoices")
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq("id", invoiceId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
      toast({
        title: "Invoice sent",
        description: "Invoice has been marked as sent.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error sending invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mark as paid mutation - uses atomic RPC function
  const markAsPaidMutation = useMutation({
    mutationFn: async ({ invoiceId, amount }: { invoiceId: string; amount?: number }) => {
      if (!user) throw new Error("User not authenticated");

      // Use atomic RPC function to record payment
      const { data, error } = await supabase.rpc('record_invoice_payment', {
        p_invoice_id: invoiceId,
        p_user_id: user.id,
        p_amount: amount || null,
        p_payment_method: 'other',
        p_payment_date: new Date().toISOString().split('T')[0],
      });

      if (error) throw error;

      // Check for application-level errors in the response
      if (data && !data.success) {
        throw new Error(data.error || 'Payment recording failed');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
      toast({
        title: "Payment recorded",
        description: "Payment has been recorded successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error recording payment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Calculate stats
  const stats = {
    total: invoices?.length || 0,
    draft: invoices?.filter(i => i.status === 'draft').length || 0,
    sent: invoices?.filter(i => i.status === 'sent').length || 0,
    paid: invoices?.filter(i => i.status === 'paid').length || 0,
    overdue: invoices?.filter(i => i.status === 'overdue' || (i.status === 'sent' && new Date(i.due_date) < new Date())).length || 0,
    totalRevenue: invoices?.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total_amount, 0) || 0,
    totalOutstanding: invoices?.filter(i => ['sent', 'overdue'].includes(i.status)).reduce((sum, i) => sum + i.balance_due, 0) || 0,
  };

  return {
    invoices: invoices || [],
    stats,
    isLoading,
    error,
    refetch,
    getInvoiceWithItems,
    createInvoice: createInvoiceMutation.mutate,
    updateInvoice: updateInvoiceMutation.mutate,
    deleteInvoice: deleteInvoiceMutation.mutate,
    sendInvoice: sendInvoiceMutation.mutate,
    markAsPaid: markAsPaidMutation.mutate,
    isCreating: createInvoiceMutation.isPending,
    isUpdating: updateInvoiceMutation.isPending,
    isDeleting: deleteInvoiceMutation.isPending,
    isSending: sendInvoiceMutation.isPending,
    isRecordingPayment: markAsPaidMutation.isPending,
  };
}
