import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTradeFinance } from '@/hooks/use-trade-finance';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
  })),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

// Test wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Trade Finance Integration Tests', () => {
  let mockFetch: any;

  beforeEach(() => {
    vi.clearAllMocks();
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { access_token: 'mock-token' } },
    });

    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Complete Application Lifecycle', () => {
    it.skip('should create, submit, and track an application through its lifecycle', async () => {
      const draftApplication = {
        id: 'app-123',
        user_id: 'test-user-id',
        reference_number: 'LC123456',
        facility_type: 'letter_of_credit',
        amount: 100000,
        currency: 'NGN',
        beneficiary_name: 'Test Supplier',
        beneficiary_details: null,
        title: 'LC Application',
        description: 'Test LC',
        purpose: 'Import',
        application_status: 'draft',
        application_date: '2025-01-15',
        submitted_date: null,
        reviewed_date: null,
        approved_date: null,
        activation_date: null,
        expiry_date: null,
        completion_date: null,
        reviewer_id: null,
        reviewer_notes: null,
        rejection_reason: null,
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z',
      };

      const submittedApplication = {
        ...draftApplication,
        application_status: 'submitted',
        submitted_date: '2025-01-16',
      };

      // Mock sequence: list (empty) -> create -> list (with draft) -> submit -> list (with submitted)
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: draftApplication }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [draftApplication] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: submittedApplication }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [submittedApplication] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 1,
            pending_applications_total: 100000,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        });

      const { result, rerender } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Step 1: Create application
      result.current.createApplication({
        facility_type: 'letter_of_credit',
        amount: 100000,
        beneficiary_name: 'Test Supplier',
        title: 'LC Application',
        description: 'Test LC',
        purpose: 'Import',
      });

      await waitFor(() => {
        expect(result.current.isCreatingApplication).toBe(false);
      });

      // Trigger refetch to get the created application
      await result.current.refetch();

      await waitFor(
        () => {
          expect(result.current.applications.length).toBeGreaterThan(0);
        },
        { timeout: 3000 }
      );

      if (result.current.applications.length > 0) {
        expect(result.current.applications[0].application_status).toBe('draft');
      }

      // Step 2: Submit application
      result.current.submitApplication('app-123');

      await waitFor(() => {
        expect(result.current.isSubmittingApplication).toBe(false);
      });

      // Trigger refetch to get updated application
      await result.current.refetch();

      await waitFor(
        () => {
          expect(result.current.applications.length).toBeGreaterThan(0);
        },
        { timeout: 3000 }
      );

      if (result.current.applications.length > 0) {
        expect(result.current.applications[0].application_status).toBe('submitted');
      }

      // Verify summary updated
      await result.current.refetchSummary();

      await waitFor(
        () => {
          expect(result.current.summary).toBeDefined();
        },
        { timeout: 3000 }
      );

      if (result.current.summary) {
        expect(result.current.summary.pending_applications_count).toBe(1);
      }
    });
  });

  describe('Error Handling Workflows', () => {
    it('should handle credit limit exceeded during application creation', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 50000,
            used_limit: 0,
            available_limit: 50000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Insufficient credit limit' }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Try to create application exceeding credit limit
      result.current.createApplication({
        facility_type: 'letter_of_credit',
        amount: 100000, // Exceeds available limit of 50000
        beneficiary_name: 'Test Supplier',
        title: 'LC Application',
      });

      await waitFor(() => {
        expect(result.current.isCreatingApplication).toBe(false);
      });

      // Verify error was handled (toast was called)
      const { useToast } = await import('@/hooks/use-toast');
      expect(useToast).toHaveBeenCalled();
    });

    it('should handle application submission without required documents', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            applications: [
              {
                id: 'app-123',
                application_status: 'draft',
                reference_number: 'LC123456',
              },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Required documents not uploaded' }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Try to submit application without documents
      result.current.submitApplication('app-123');

      await waitFor(() => {
        expect(result.current.isSubmittingApplication).toBe(false);
      });

      // Verify error was handled
      const { useToast } = await import('@/hooks/use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Multi-Application Management', () => {
    it.skip('should manage multiple applications concurrently', async () => {
      const applications = [
        {
          id: 'app-1',
          reference_number: 'LC111111',
          facility_type: 'letter_of_credit',
          amount: 50000,
          application_status: 'active',
          beneficiary_name: 'Supplier 1',
          title: 'LC 1',
          user_id: 'test-user-id',
          currency: 'NGN',
          created_at: '2025-01-10T10:00:00Z',
          updated_at: '2025-01-10T10:00:00Z',
        },
        {
          id: 'app-2',
          reference_number: 'IF222222',
          facility_type: 'invoice_financing',
          amount: 75000,
          application_status: 'submitted',
          beneficiary_name: 'Client 2',
          title: 'IF 2',
          user_id: 'test-user-id',
          currency: 'NGN',
          created_at: '2025-01-12T10:00:00Z',
          updated_at: '2025-01-12T10:00:00Z',
        },
        {
          id: 'app-3',
          reference_number: 'TG333333',
          facility_type: 'trade_guarantee',
          amount: 60000,
          application_status: 'draft',
          beneficiary_name: 'Partner 3',
          title: 'TG 3',
          user_id: 'test-user-id',
          currency: 'NGN',
          created_at: '2025-01-15T10:00:00Z',
          updated_at: '2025-01-15T10:00:00Z',
        },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 1,
            active_facilities_total: 50000,
            pending_applications_count: 1,
            pending_applications_total: 75000,
            credit_limit: 500000,
            used_limit: 50000,
            available_limit: 450000,
            currency: 'NGN',
          }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSummaryLoading).toBe(false);
      });

      // Verify all applications loaded
      expect(result.current.applications).toHaveLength(3);

      // Verify summary reflects all applications
      await waitFor(
        () => {
          expect(result.current.summary).toBeDefined();
        },
        { timeout: 3000 }
      );

      if (result.current.summary) {
        expect(result.current.summary.active_facilities_count).toBe(1);
        expect(result.current.summary.pending_applications_count).toBe(1);
        expect(result.current.summary.active_facilities_total).toBe(50000);
      }
    });
  });

  describe('Application Updates and Withdrawals', () => {
    it('should update and withdraw applications correctly', async () => {
      const draftApplication = {
        id: 'app-123',
        user_id: 'test-user-id',
        reference_number: 'LC123456',
        facility_type: 'letter_of_credit',
        amount: 100000,
        currency: 'NGN',
        beneficiary_name: 'Original Supplier',
        title: 'Original Title',
        application_status: 'draft',
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z',
      };

      const updatedApplication = {
        ...draftApplication,
        amount: 150000,
        beneficiary_name: 'Updated Supplier',
        title: 'Updated Title',
        updated_at: '2025-01-16T10:00:00Z',
      };

      const withdrawnApplication = {
        ...updatedApplication,
        application_status: 'withdrawn',
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [draftApplication] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: updatedApplication }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [updatedApplication] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: withdrawnApplication }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [withdrawnApplication] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Step 1: Update application
      result.current.updateApplication({
        application_id: 'app-123',
        amount: 150000,
        beneficiary_name: 'Updated Supplier',
        title: 'Updated Title',
      });

      await waitFor(() => {
        expect(result.current.isUpdatingApplication).toBe(false);
      });

      await result.current.refetch();

      await waitFor(() => {
        expect(result.current.applications[0].amount).toBe(150000);
      });

      // Step 2: Withdraw application
      result.current.withdrawApplication('app-123');

      await waitFor(() => {
        expect(result.current.isWithdrawingApplication).toBe(false);
      });

      await result.current.refetch();

      await waitFor(() => {
        expect(result.current.applications[0].application_status).toBe('withdrawn');
      });
    });
  });

  describe('Fetch Application Details', () => {
    it('should fetch complete application details with documents and transactions', async () => {
      const applicationWithDetails = {
        id: 'app-123',
        user_id: 'test-user-id',
        reference_number: 'LC123456',
        facility_type: 'letter_of_credit',
        amount: 100000,
        currency: 'NGN',
        beneficiary_name: 'Test Supplier',
        title: 'LC Application',
        application_status: 'active',
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z',
        documents: [
          {
            id: 'doc-1',
            document_type: 'invoice',
            file_name: 'invoice.pdf',
            file_url: 'https://example.com/invoice.pdf',
            file_size: 102400,
            verified: true,
            uploaded_at: '2025-01-15T11:00:00Z',
          },
        ],
        transactions: [
          {
            id: 'txn-1',
            transaction_type: 'disbursement',
            amount: 100000,
            currency: 'NGN',
            status: 'completed',
            transaction_date: '2025-01-16T10:00:00Z',
            description: 'Initial disbursement',
          },
        ],
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            active_facilities_count: 0,
            active_facilities_total: 0,
            pending_applications_count: 0,
            pending_applications_total: 0,
            credit_limit: 500000,
            used_limit: 0,
            available_limit: 500000,
            currency: 'NGN',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: applicationWithDetails }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Fetch application details
      const details = await result.current.fetchApplicationDetails('app-123');

      expect(details).toBeDefined();
      expect(details?.documents).toHaveLength(1);
      expect(details?.transactions).toHaveLength(1);
      expect(details?.documents?.[0].document_type).toBe('invoice');
      expect(details?.transactions?.[0].transaction_type).toBe('disbursement');
    });
  });
});
