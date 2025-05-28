import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export interface BankConsent {
  id: string;
  bank_name: string;
  bank_code: string;
  account_name?: string;
  account_number_masked?: string;
  consent_status: 'created' | 'active' | 'revoked' | 'error' | 'expired';
  import_complete: boolean;
  last_sync_at?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  transaction_date: string;
  amount: number;
  is_credit: boolean;
  running_balance?: number;
  narration: string;
  reference_number?: string;
  category?: string;
  subcategory?: string;
  merchant_name?: string;
}

export interface CashFlowSummary {
  total_inflow: number;
  total_outflow: number;
  net_flow: number;
  transaction_count: number;
}

export interface TransactionAnalytics {
  period: string;
  summary: CashFlowSummary;
  category_breakdown: Record<string, { total: number; count: number; is_income: boolean }>;
  daily_cash_flow: Record<string, { inflow: number; outflow: number; net: number }>;
}

export const useEdocIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Initialize bank consent
  const initializeBankConsent = useCallback(async (
    email: string,
    bankCode: string,
    bankName: string
  ): Promise<{ consent_id: string; authorization_url: string } | null> => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-consent', {
        body: {
          action: 'initialize_consent',
          email,
          bank_code: bankCode,
          bank_name: bankName
        }
      });

      if (error) throw new Error(error.message);
      if (!data.success) throw new Error(data.message || 'Failed to initialize bank consent');

      return {
        consent_id: data.consent_id,
        authorization_url: data.authorization_url
      };
    }, 'Bank connection initialized successfully');
  }, [handleApiCall]);

  // Check consent status
  const checkConsentStatus = useCallback(async (consentId: string) => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-consent', {
        body: {
          action: 'check_consent_status',
          consent_id: consentId
        }
      });

      if (error) throw new Error(error.message);
      return data;
    });
  }, [handleApiCall]);

  // List user's bank consents
  const listBankConsents = useCallback(async (): Promise<BankConsent[] | null> => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-consent', {
        body: {
          action: 'list_consents'
        }
      });

      if (error) throw new Error(error.message);
      return data.consents || [];
    });
  }, [handleApiCall]);

  // Revoke bank consent
  const revokeBankConsent = useCallback(async (consentId: string) => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-consent', {
        body: {
          action: 'revoke_consent',
          consent_id: consentId
        }
      });

      if (error) throw new Error(error.message);
      return data;
    }, 'Bank consent revoked successfully');
  }, [handleApiCall]);

  // Sync transactions
  const syncTransactions = useCallback(async (
    consentId: string,
    startDate?: string,
    endDate?: string
  ) => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-transactions', {
        body: {
          action: 'sync_transactions',
          consent_id: consentId,
          start_date: startDate,
          end_date: endDate
        }
      });

      if (error) throw new Error(error.message);
      return data;
    }, 'Transactions synchronized successfully');
  }, [handleApiCall]);

  // Get transactions
  const getTransactions = useCallback(async (
    consentId: string,
    options?: {
      limit?: number;
      offset?: number;
      category?: string;
      start_date?: string;
      end_date?: string;
    }
  ) => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-transactions', {
        body: {
          action: 'get_transactions',
          consent_id: consentId,
          ...options
        }
      });

      if (error) throw new Error(error.message);
      return data;
    });
  }, [handleApiCall]);

  // Get analytics
  const getTransactionAnalytics = useCallback(async (
    consentId: string,
    period: '7d' | '30d' | '90d' = '30d'
  ): Promise<TransactionAnalytics | null> => {
    return handleApiCall(async () => {
      const { data, error } = await supabase.functions.invoke('edoc-transactions', {
        body: {
          action: 'get_analytics',
          consent_id: consentId,
          period
        }
      });

      if (error) throw new Error(error.message);
      return data;
    });
  }, [handleApiCall]);

  // Check if user has required subscription
  const checkSubscriptionAccess = useCallback(async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('plan_name, status')
        .eq('user_id', user.id)
        .maybeSingle();

      return data && data.plan_name !== 'free' && data.status === 'active';
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  }, [user]);

  // Check if user has granted bank data consent
  const checkBankDataConsent = useCallback(async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from('user_consents')
        .select('granted')
        .eq('user_id', user.id)
        .eq('consent_type', 'bank_data_processing')
        .maybeSingle();

      return data?.granted || false;
    } catch (error) {
      console.error('Error checking bank data consent:', error);
      return false;
    }
  }, [user]);

  return {
    loading,
    error,
    initializeBankConsent,
    checkConsentStatus,
    listBankConsents,
    revokeBankConsent,
    syncTransactions,
    getTransactions,
    getTransactionAnalytics,
    checkSubscriptionAccess,
    checkBankDataConsent
  };
};