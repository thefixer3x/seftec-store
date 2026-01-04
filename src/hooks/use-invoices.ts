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

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: async (input: CreateInvoiceInput) => {
      if (!user) throw new Error("User not authenticated");

      // Calculate totals
      const subtotal = input.items.reduce((sum, item) => {
        const itemTotal = item.quantity * item.unit_price;
        const discount = itemTotal * ((item.discount_percentage || 0) / 100);
        return sum + (itemTotal - discount);
      }, 0);

      const taxRate = input.tax_rate || 0;
      const taxAmount = subtotal * (taxRate / 100);
      const discountAmount = input.discount_amount || 0;
      const shippingCost = input.shipping_cost || 0;
      const totalAmount = subtotal + taxAmount + shippingCost - discountAmount;

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          user_id: user.id,
          customer_id: input.customer_id || null,
          invoice_date: input.invoice_date || new Date().toISOString().split('T')[0],
          due_date: input.due_date,
          currency_code: input.currency_code || 'USD',
          subtotal,
          tax_rate: taxRate,
          tax_amount: taxAmount,
          discount_amount: discountAmount,
          shipping_cost: shippingCost,
          total_amount: totalAmount,
          balance_due: totalAmount,
          payment_terms: input.payment_terms || null,
          notes: input.notes || null,
          terms_and_conditions: input.terms_and_conditions || null,
          footer_text: input.footer_text || null,
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice items
      const itemsToInsert = input.items.map((item, index) => {
        const itemTotal = item.quantity * item.unit_price;
        const discount = itemTotal * ((item.discount_percentage || 0) / 100);
        return {
          invoice_id: invoice.id,
          product_id: item.product_id || null,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          tax_rate: item.tax_rate || 0,
          discount_percentage: item.discount_percentage || 0,
          line_total: itemTotal - discount,
          sort_order: index,
        };
      });

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      return invoice;
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

  // Mark as paid mutation
  const markAsPaidMutation = useMutation({
    mutationFn: async ({ invoiceId, amount }: { invoiceId: string; amount?: number }) => {
      if (!user) throw new Error("User not authenticated");

      // Get current invoice
      const { data: invoice } = await supabase
        .from("invoices")
        .select("total_amount, amount_paid")
        .eq("id", invoiceId)
        .single();

      if (!invoice) throw new Error("Invoice not found");

      const paymentAmount = amount || (invoice.total_amount - invoice.amount_paid);
      const newAmountPaid = invoice.amount_paid + paymentAmount;
      const newBalanceDue = invoice.total_amount - newAmountPaid;
      const newStatus = newBalanceDue <= 0 ? 'paid' : 'sent';

      // Record payment
      const { error: paymentError } = await supabase
        .from("invoice_payments")
        .insert({
          invoice_id: invoiceId,
          user_id: user.id,
          amount: paymentAmount,
          payment_method: 'other',
          payment_date: new Date().toISOString().split('T')[0],
        });

      if (paymentError) throw paymentError;

      // Update invoice
      const { data, error } = await supabase
        .from("invoices")
        .update({
          status: newStatus,
          amount_paid: newAmountPaid,
          balance_due: newBalanceDue,
          paid_at: newBalanceDue <= 0 ? new Date().toISOString() : null,
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
