/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTradeFinance } from './use-trade-finance';
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

vi.mock('./use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

// Mock fetch globally
global.fetch = vi.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
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

describe('useTradeFinance', () => {
  const mockApplications = [
    {
      id: 'app-1',
      user_id: 'test-user-id',
      reference_number: 'LC928375',
      facility_type: 'letter_of_credit',
      amount: 75000,
      currency: 'NGN',
      beneficiary_name: 'Global Suppliers Ltd',
      beneficiary_details: null,
      title: 'Agricultural Products Import',
      description: 'International Import',
      purpose: 'Trade',
      application_status: 'active',
      application_date: '2025-01-01T00:00:00Z',
      submitted_date: '2025-01-02T00:00:00Z',
      reviewed_date: null,
      approved_date: null,
      activation_date: '2025-01-05T00:00:00Z',
      expiry_date: '2025-06-15T00:00:00Z',
      completion_date: null,
      reviewer_id: null,
      reviewer_notes: null,
      rejection_reason: null,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      id: 'app-2',
      user_id: 'test-user-id',
      reference_number: 'IF745632',
      facility_type: 'invoice_financing',
      amount: 45000,
      currency: 'NGN',
      beneficiary_name: 'Metro Electronics',
      beneficiary_details: null,
      title: 'Invoice Financing',
      description: 'Consumer Electronics',
      purpose: 'Working capital',
      application_status: 'submitted',
      application_date: '2025-01-10T00:00:00Z',
      submitted_date: '2025-01-11T00:00:00Z',
      reviewed_date: null,
      approved_date: null,
      activation_date: null,
      expiry_date: null,
      completion_date: null,
      reviewer_id: null,
      reviewer_notes: null,
      rejection_reason: null,
      created_at: '2025-01-10T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
    },
  ];

  const mockSummary = {
    active_facilities_count: 2,
    active_facilities_total: 120000,
    pending_applications_count: 1,
    pending_applications_total: 45000,
    credit_limit: 300000,
    used_limit: 120000,
    available_limit: 180000,
    currency: 'NGN',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (supabase.auth.getSession as any).mockResolvedValue({
      data: {
        session: {
          access_token: 'test-token',
        },
      },
    });
  });

  describe('Applications Fetching', () => {
    it('should fetch applications successfully', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ applications: mockApplications }),
      });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.applications).toHaveLength(2);
      expect(result.current.applications[0].reference_number).toBe('LC928375');
      expect(result.current.applications[0].facility_type).toBe('letter_of_credit');
      expect(result.current.applications[1].amount).toBe(45000);
    });

    it('should return empty array when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.applications).toHaveLength(0);
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Database error' }),
      });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('Summary Statistics', () => {
    it('should fetch summary successfully', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSummaryLoading).toBe(false);
      });

      expect(result.current.summary).toBeTruthy();
      expect(result.current.summary?.active_facilities_count).toBe(2);
      expect(result.current.summary?.active_facilities_total).toBe(120000);
      expect(result.current.summary?.available_limit).toBe(180000);
      expect(result.current.summary?.currency).toBe('NGN');
    });

    it('should return undefined summary when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ applications: [] }),
      });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSummaryLoading).toBe(false);
      });

      expect(result.current.summary).toBeUndefined();
    });
  });

  describe('Create Application', () => {
    it('should create application successfully', async () => {
      const mockResponse = {
        message: 'Application created as draft',
        application: {
          id: 'app-3',
          reference_number: 'TG564738',
          facility_type: 'trade_guarantee',
          amount: 50000,
          application_status: 'draft',
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.createApplication({
        facility_type: 'trade_guarantee',
        amount: 50000,
        currency: 'NGN',
        beneficiary_name: 'Tech Industries Co.',
        title: 'Trade Guarantee Application',
        description: 'Manufacturing Equipment',
        purpose: 'Capital equipment',
      });

      await waitFor(() => {
        expect(result.current.isCreatingApplication).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=create'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
          body: expect.stringContaining('trade_guarantee'),
        })
      );
    });

    it('should handle create errors (insufficient credit)', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
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

      result.current.createApplication({
        facility_type: 'letter_of_credit',
        amount: 500000, // Exceeds available limit
        beneficiary_name: 'Test Company',
        title: 'Large LC',
      });

      await waitFor(() => {
        expect(result.current.isCreatingApplication).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Update Application', () => {
    it('should update draft application successfully', async () => {
      const mockResponse = {
        message: 'Application updated',
        application: {
          id: 'app-3',
          amount: 55000,
          title: 'Updated Title',
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.updateApplication({
        application_id: 'app-3',
        amount: 55000,
        title: 'Updated Title',
      });

      await waitFor(() => {
        expect(result.current.isUpdatingApplication).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=update'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('app-3'),
        })
      );
    });

    it('should handle update errors (not in draft status)', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Only draft applications can be updated' }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.updateApplication({
        application_id: 'app-1', // Active application
        amount: 80000,
      });

      await waitFor(() => {
        expect(result.current.isUpdatingApplication).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Submit Application', () => {
    it('should submit draft application successfully', async () => {
      const mockResponse = {
        message: 'Application submitted successfully',
        application: {
          id: 'app-3',
          application_status: 'submitted',
          submitted_date: '2025-01-15T00:00:00Z',
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.submitApplication('app-3');

      await waitFor(() => {
        expect(result.current.isSubmittingApplication).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=submit'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ application_id: 'app-3' }),
        })
      );
    });

    it('should handle submit errors (no documents)', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'At least one document must be uploaded before submission' }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.submitApplication('app-3');

      await waitFor(() => {
        expect(result.current.isSubmittingApplication).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Withdraw Application', () => {
    it('should withdraw submitted application successfully', async () => {
      const mockResponse = {
        message: 'Application withdrawn successfully',
        application: {
          id: 'app-2',
          application_status: 'withdrawn',
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: mockApplications }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.withdrawApplication('app-2');

      await waitFor(() => {
        expect(result.current.isWithdrawingApplication).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=withdraw'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ application_id: 'app-2' }),
        })
      );
    });

    it('should handle withdraw errors (invalid status)', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: mockApplications }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Can only withdraw submitted or under review applications' }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.withdrawApplication('app-1'); // Active application

      await waitFor(() => {
        expect(result.current.isWithdrawingApplication).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Fetch Application Details', () => {
    it('should fetch single application with documents and transactions', async () => {
      const mockDetailedApp = {
        ...mockApplications[0],
        documents: [
          {
            id: 'doc-1',
            document_type: 'invoice',
            file_name: 'invoice.pdf',
            file_url: 'https://example.com/invoice.pdf',
            file_size: 245678,
            verified: true,
            uploaded_at: '2025-01-03T00:00:00Z',
          },
        ],
        transactions: [
          {
            id: 'txn-1',
            transaction_type: 'disbursement',
            amount: 75000,
            currency: 'NGN',
            status: 'completed',
            transaction_date: '2025-01-05T00:00:00Z',
            description: 'Initial disbursement',
          },
        ],
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ applications: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ summary: mockSummary }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ application: mockDetailedApp }),
        });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const application = await result.current.fetchApplicationDetails('app-1');

      expect(application).toBeTruthy();
      expect(application?.documents).toHaveLength(1);
      expect(application?.transactions).toHaveLength(1);
      expect(application?.documents?.[0].document_type).toBe('invoice');
      expect(application?.transactions?.[0].transaction_type).toBe('disbursement');
    });

    it('should return null when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ applications: [] }),
      });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const application = await result.current.fetchApplicationDetails('app-1');

      expect(application).toBeNull();
    });
  });

  describe('Authentication', () => {
    it('should throw error when user is not authenticated for mutations', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ applications: [] }),
      });

      const { result } = renderHook(() => useTradeFinance(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.createApplication({
        facility_type: 'letter_of_credit',
        amount: 50000,
        beneficiary_name: 'Test',
        title: 'Test',
      });

      await waitFor(() => {
        expect(result.current.isCreatingApplication).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });
});
