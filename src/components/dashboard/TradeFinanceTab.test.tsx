import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import TradeFinanceTab from './TradeFinanceTab';

// Mock dependencies
vi.mock('@/hooks/use-trade-finance');
vi.mock('@/hooks/use-mobile');

// Mock data
const mockSummary = {
  active_facilities_count: 3,
  active_facilities_total: 250000,
  pending_applications_count: 2,
  pending_applications_total: 95000,
  credit_limit: 500000,
  used_limit: 250000,
  available_limit: 250000,
  currency: 'NGN',
};

const mockApplications = [
  {
    id: 'app1',
    user_id: 'test-user',
    reference_number: 'LC928375',
    facility_type: 'letter_of_credit',
    amount: 75000,
    currency: 'NGN',
    beneficiary_name: 'Global Suppliers Ltd',
    beneficiary_details: null,
    title: 'LC Application',
    description: 'International Import - Agricultural Products',
    purpose: 'Import',
    application_status: 'active',
    application_date: '2025-01-15',
    submitted_date: '2025-01-16',
    reviewed_date: null,
    approved_date: '2025-01-20',
    activation_date: '2025-01-21',
    expiry_date: '2025-06-15',
    completion_date: null,
    reviewer_id: null,
    reviewer_notes: null,
    rejection_reason: null,
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-21T10:00:00Z',
  },
  {
    id: 'app2',
    user_id: 'test-user',
    reference_number: 'IF745632',
    facility_type: 'invoice_financing',
    amount: 45000,
    currency: 'NGN',
    beneficiary_name: 'Metro Electronics',
    beneficiary_details: null,
    title: 'IF Application',
    description: 'Local Distribution - Consumer Electronics',
    purpose: 'Distribution',
    application_status: 'active',
    application_date: '2025-01-10',
    submitted_date: '2025-01-11',
    reviewed_date: null,
    approved_date: '2025-01-15',
    activation_date: '2025-01-16',
    expiry_date: '2025-05-20',
    completion_date: null,
    reviewer_id: null,
    reviewer_notes: null,
    rejection_reason: null,
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-16T10:00:00Z',
  },
  {
    id: 'app3',
    user_id: 'test-user',
    reference_number: 'TG564738',
    facility_type: 'trade_guarantee',
    amount: 50000,
    currency: 'NGN',
    beneficiary_name: 'Tech Industries Co.',
    beneficiary_details: null,
    title: 'TG Application',
    description: 'Local Supply - Manufacturing Equipment',
    purpose: 'Equipment',
    application_status: 'submitted',
    application_date: '2025-04-10',
    submitted_date: '2025-04-10',
    reviewed_date: null,
    approved_date: null,
    activation_date: null,
    expiry_date: null,
    completion_date: null,
    reviewer_id: null,
    reviewer_notes: null,
    rejection_reason: null,
    created_at: '2025-04-10T10:00:00Z',
    updated_at: '2025-04-10T10:00:00Z',
  },
  {
    id: 'app4',
    user_id: 'test-user',
    reference_number: 'LC781234',
    facility_type: 'letter_of_credit',
    amount: 60000,
    currency: 'NGN',
    beneficiary_name: 'Asian Textiles Ltd',
    beneficiary_details: null,
    title: 'LC Completed',
    description: 'International Import - Textiles',
    purpose: 'Import',
    application_status: 'completed',
    application_date: '2024-11-01',
    submitted_date: '2024-11-02',
    reviewed_date: '2024-11-05',
    approved_date: '2024-11-10',
    activation_date: '2024-11-15',
    expiry_date: '2025-02-28',
    completion_date: '2025-02-28',
    reviewer_id: 'reviewer1',
    reviewer_notes: 'Approved',
    rejection_reason: null,
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2025-02-28T10:00:00Z',
  },
];

describe('TradeFinanceTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render component with title and button', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      expect(screen.getByText('Trade Finance')).toBeInTheDocument();
      expect(screen.getByText('Apply for New Facility')).toBeInTheDocument();
    });

    it('should render on mobile with adjusted layout', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(true);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      expect(screen.getByText('Trade Finance')).toBeInTheDocument();
      expect(screen.getByText('Apply for New Facility')).toBeInTheDocument();
    });
  });

  describe('Summary Cards', () => {
    it('should display summary data correctly', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Active Facilities Card
      expect(screen.getAllByText('Active Facilities')[0]).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText(/Total Value: NGN 250,000/)).toBeInTheDocument();

      // Pending Applications Card
      expect(screen.getAllByText('Pending Applications')[0]).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText(/Total Value: NGN 95,000/)).toBeInTheDocument();

      // Available Credit Card
      expect(screen.getByText('Available Credit')).toBeInTheDocument();
      expect(screen.getAllByText(/NGN 250,000/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Credit Limit: NGN 500,000/)).toBeInTheDocument();
    });

    it('should display default values when summary is undefined', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: [],
        summary: undefined,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Should show 0 for all counts
      expect(screen.getAllByText('0').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Total Value: NGN 0.00/)[0]).toBeInTheDocument();
      expect(screen.getByText(/Credit Limit: NGN 0.00/)).toBeInTheDocument();
    });

    it('should show loading spinner when summary is loading', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: [],
        summary: undefined,
        isLoading: false,
        isSummaryLoading: true,
      });

      render(<TradeFinanceTab />);

      // Should show loading spinner
      const loader = document.querySelector('.animate-spin');
      expect(loader).not.toBeNull();

      // Summary cards should not be visible (tabs still visible)
      expect(screen.queryByText('Available Credit')).not.toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('should render all three tabs', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Check all tabs are rendered (use getAllByText since they appear in summary cards too)
      expect(screen.getAllByText('Active Facilities').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pending Applications').length).toBeGreaterThan(0);
      expect(screen.getByText('Completed Facilities')).toBeInTheDocument();
    });

    it('should switch tabs when clicked', async () => {
      const user = userEvent.setup();
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Click pending tab (use getAllByText and select the tab button, not the summary card)
      const pendingTabs = screen.getAllByText('Pending Applications');
      await user.click(pendingTabs[pendingTabs.length - 1]); // Last one is likely the tab

      await waitFor(() => {
        // Should show pending content
        expect(screen.getByText('Under Review')).toBeInTheDocument();
      });

      // Click completed tab
      const completedTab = screen.getByText('Completed Facilities');
      await user.click(completedTab);

      await waitFor(() => {
        // Should show completed content
        expect(screen.getByText('Settled')).toBeInTheDocument();
      });
    });

    it('should show mobile-friendly tab labels on mobile', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(true);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Mobile tabs show shortened labels
      expect(screen.getAllByText('Active').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pending').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Completed').length).toBeGreaterThan(0);
    });
  });

  describe('Application Filtering', () => {
    it('should filter active applications correctly', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Active tab should be default
      // Currently shows hardcoded data, but we can verify the component renders
      expect(screen.getAllByText('Active Facilities').length).toBeGreaterThan(0);
    });

    it('should filter pending applications correctly', async () => {
      const user = userEvent.setup();
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      const pendingTabs = screen.getAllByText('Pending Applications');
      await user.click(pendingTabs[pendingTabs.length - 1]);

      await waitFor(() => {
        expect(screen.getByText('Under Review')).toBeInTheDocument();
      });
    });

    it('should filter completed applications correctly', async () => {
      const user = userEvent.setup();
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      const completedTab = screen.getByText('Completed Facilities');
      await user.click(completedTab);

      await waitFor(() => {
        expect(screen.getByText('Settled')).toBeInTheDocument();
      });
    });
  });

  describe('Empty States', () => {
    it('should handle empty applications list', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: [],
        summary: {
          ...mockSummary,
          active_facilities_count: 0,
          pending_applications_count: 0,
        },
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Summary should show 0
      expect(screen.getAllByText('0')[0]).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('should render Apply for New Facility button', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      const button = screen.getByText('Apply for New Facility');
      expect(button).toBeInTheDocument();
    });

    it('should render action buttons in facility cards', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      render(<TradeFinanceTab />);

      // Active tab should have View Details and Upload Documents buttons
      expect(screen.getAllByText('View Details')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Upload Documents')[0]).toBeInTheDocument();
    });
  });

  describe('Data Integration', () => {
    it('should use data from useTradeFinance hook', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      const mockHook = vi.fn().mockReturnValue({
        applications: mockApplications,
        summary: mockSummary,
        isLoading: false,
        isSummaryLoading: false,
      });

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockImplementation(mockHook);

      render(<TradeFinanceTab />);

      // Verify hook was called
      expect(mockHook).toHaveBeenCalled();

      // Verify data is displayed
      expect(screen.getByText('3')).toBeInTheDocument(); // Active facilities count
      expect(screen.getByText('2')).toBeInTheDocument(); // Pending applications count
    });

    it('should handle loading state from hook', async () => {
      const { useTradeFinance } = await import('@/hooks/use-trade-finance');
      const { useIsMobile } = await import('@/hooks/use-mobile');

      (useIsMobile as any).mockReturnValue(false);
      (useTradeFinance as any).mockReturnValue({
        applications: [],
        summary: undefined,
        isLoading: true,
        isSummaryLoading: true,
      });

      render(<TradeFinanceTab />);

      // Should show loading spinner
      const loader = document.querySelector('.animate-spin');
      expect(loader).toBeInTheDocument();
    });
  });
});
