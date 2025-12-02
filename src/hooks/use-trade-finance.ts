import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./use-toast";

export type TradeFinanceApplication = {
  id: string;
  user_id: string;
  reference_number: string;
  facility_type: string;
  amount: number;
  currency: string;
  beneficiary_name: string;
  beneficiary_details: any | null;
  title: string;
  description: string | null;
  purpose: string | null;
  application_status: string;
  application_date: string | null;
  submitted_date: string | null;
  reviewed_date: string | null;
  approved_date: string | null;
  activation_date: string | null;
  expiry_date: string | null;
  completion_date: string | null;
  reviewer_id: string | null;
  reviewer_notes: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  documents?: TradeFinanceDocument[];
  transactions?: TradeFinanceTransaction[];
};

export type TradeFinanceDocument = {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  verified: boolean | null;
  uploaded_at: string;
};

export type TradeFinanceTransaction = {
  id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  status: string;
  transaction_date: string;
  description: string | null;
};

export type CreateApplicationInput = {
  facility_type: string;
  amount: number;
  currency?: string;
  beneficiary_name: string;
  beneficiary_details?: any;
  title: string;
  description?: string;
  purpose?: string;
  expiry_date?: string;
};

export type UpdateApplicationInput = {
  application_id: string;
  amount?: number;
  beneficiary_name?: string;
  beneficiary_details?: any;
  title?: string;
  description?: string;
  purpose?: string;
  expiry_date?: string;
};

export type TradeFinanceSummary = {
  active_facilities_count: number;
  active_facilities_total: number;
  pending_applications_count: number;
  pending_applications_total: number;
  credit_limit: number;
  used_limit: number;
  available_limit: number;
  currency: string;
};

/**
 * Hook to manage trade finance applications
 */
export function useTradeFinance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getAuthToken = async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (!token) throw new Error("No access token");
    return token;
  };

  // Fetch applications list
  const {
    data: applications,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trade-finance-applications", user?.id],
    queryFn: async (): Promise<TradeFinanceApplication[]> => {
      if (!user) return [];

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=list`,
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
        throw new Error(error.error || "Failed to fetch applications");
      }

      const data = await response.json();
      return data.applications || [];
    },
    enabled: !!user,
    staleTime: 60 * 1000, // 1 minute
  });

  // Fetch dashboard summary
  const {
    data: summary,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ["trade-finance-summary", user?.id],
    queryFn: async (): Promise<TradeFinanceSummary> => {
      if (!user) {
        return {
          active_facilities_count: 0,
          active_facilities_total: 0,
          pending_applications_count: 0,
          pending_applications_total: 0,
          credit_limit: 0,
          used_limit: 0,
          available_limit: 0,
          currency: "NGN",
        };
      }

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=get_summary`,
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
        throw new Error(error.error || "Failed to fetch summary");
      }

      const data = await response.json();
      return data.summary;
    },
    enabled: !!user,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Fetch single application details
  const fetchApplicationDetails = async (
    applicationId: string
  ): Promise<TradeFinanceApplication | null> => {
    if (!user) return null;

    const token = await getAuthToken();

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=get&application_id=${applicationId}`,
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
      throw new Error(error.error || "Failed to fetch application");
    }

    const data = await response.json();
    return data.application;
  };

  // Create application mutation
  const createApplicationMutation = useMutation({
    mutationFn: async (input: CreateApplicationInput) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=create`,
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
        throw new Error(error.error || "Failed to create application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-finance-applications"] });
      queryClient.invalidateQueries({ queryKey: ["trade-finance-summary"] });
      toast({
        title: "Application created",
        description: "Your application has been saved as a draft",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to create application",
        description: error.message,
      });
    },
  });

  // Update application mutation
  const updateApplicationMutation = useMutation({
    mutationFn: async (input: UpdateApplicationInput) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=update`,
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
        throw new Error(error.error || "Failed to update application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-finance-applications"] });
      toast({
        title: "Application updated",
        description: "Your changes have been saved",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update application",
        description: error.message,
      });
    },
  });

  // Submit application mutation
  const submitApplicationMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ application_id: applicationId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-finance-applications"] });
      queryClient.invalidateQueries({ queryKey: ["trade-finance-summary"] });
      toast({
        title: "Application submitted",
        description: "Your application is now under review",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to submit application",
        description: error.message,
      });
    },
  });

  // Withdraw application mutation
  const withdrawApplicationMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ application_id: applicationId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to withdraw application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-finance-applications"] });
      queryClient.invalidateQueries({ queryKey: ["trade-finance-summary"] });
      toast({
        title: "Application withdrawn",
        description: "Your application has been withdrawn",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to withdraw application",
        description: error.message,
      });
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: async ({
      applicationId,
      file,
      documentType,
    }: {
      applicationId: string;
      file: File;
      documentType: string;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const token = await getAuthToken();

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/${documentType}_${Date.now()}.${fileExt}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('trade-finance-documents')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('trade-finance-documents')
        .getPublicUrl(fileName);

      // Save document metadata
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trade-finance-applications?action=upload_document`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            application_id: applicationId,
            document_type: documentType,
            file_name: file.name,
            file_url: publicUrl,
            file_size: file.size,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save document metadata");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-finance-applications"] });
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to upload document",
        description: error.message,
      });
    },
  });

  return {
    // Data
    applications: applications || [],
    summary,
    isLoading,
    isSummaryLoading,
    error,

    // Actions
    fetchApplicationDetails,
    refetch,
    refetchSummary,

    createApplication: createApplicationMutation.mutate,
    isCreatingApplication: createApplicationMutation.isPending,

    updateApplication: updateApplicationMutation.mutate,
    isUpdatingApplication: updateApplicationMutation.isPending,

    submitApplication: submitApplicationMutation.mutate,
    isSubmittingApplication: submitApplicationMutation.isPending,

    withdrawApplication: withdrawApplicationMutation.mutate,
    isWithdrawingApplication: withdrawApplicationMutation.isPending,

    uploadDocument: uploadDocumentMutation.mutate,
    isUploadingDocument: uploadDocumentMutation.isPending,
  };
}
