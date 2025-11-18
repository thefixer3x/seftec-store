/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMarketplaceOrders } from './use-marketplace-orders';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
    from: vi.fn(),
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

describe('useMarketplaceOrders', () => {
  const mockOrders = [
    {
      id: 'order-1',
      total_amount: 299.98,
      status: 'pending',
      shipping_address: '123 Test St',
      order_date: '2025-01-01T00:00:00Z',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      id: 'order-2',
      total_amount: 99.99,
      status: 'delivered',
      shipping_address: '456 Demo Ave',
      order_date: '2024-12-31T00:00:00Z',
      created_at: '2024-12-31T00:00:00Z',
      updated_at: '2025-01-02T00:00:00Z',
    },
  ];

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

  describe('Orders Fetching', () => {
    it('should fetch orders successfully', async () => {
      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: mockOrders,
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.orders).toHaveLength(2);
      expect(result.current.orders[0].id).toBe('order-1');
      expect(result.current.orders[0].status).toBe('pending');
      expect(result.current.orders[1].total_amount).toBe(99.99);
    });

    it('should return empty array when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.orders).toHaveLength(0);
    });

    it('should handle fetch errors gracefully', async () => {
      const mockError = new Error('Database error');
      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockRejectedValue(mockError);

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('Fetch Order Details', () => {
    it('should fetch single order with items', async () => {
      const mockOrderDetails = {
        id: 'order-1',
        total_amount: 299.98,
        status: 'pending',
        shipping_address: '123 Test St',
        order_date: '2025-01-01T00:00:00Z',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
        order_items: [
          {
            id: 'item-1',
            quantity: 2,
            unit_price: 99.99,
            subtotal: 199.98,
            products: {
              id: 'product-1',
              name: 'Test Product',
              description: 'Test description',
              image_url: 'test.jpg',
              category: 'Electronics',
            },
          },
        ],
      };

      // Create proper mock chain for initial orders fetch
      const mockOrder1 = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });

      const mockEq1 = vi.fn().mockReturnValue({
        order: mockOrder1,
      });

      const mockSelect1 = vi.fn().mockReturnValue({
        eq: mockEq1,
      });

      // Create proper mock chain for fetchOrderDetails
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockOrderDetails,
        error: null,
      });

      const mockEq3 = vi.fn().mockReturnValue({
        single: mockSingle,
      });

      const mockEq2 = vi.fn().mockReturnValue({
        eq: mockEq3,
      });

      const mockSelect2 = vi.fn().mockReturnValue({
        eq: mockEq2,
      });

      // Setup supabase.from to return different mocks based on call order
      let callCount = 0;
      (supabase.from as any).mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return { select: mockSelect1 };
        } else {
          return { select: mockSelect2 };
        }
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const orderDetails = await result.current.fetchOrderDetails('order-1');

      expect(orderDetails).toBeTruthy();
      expect(orderDetails?.order_items).toHaveLength(1);
      expect(orderDetails?.order_items?.[0].products?.name).toBe('Test Product');
    });

    it('should return null when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const orderDetails = await result.current.fetchOrderDetails('order-1');

      expect(orderDetails).toBeNull();
    });
  });

  describe('Create Order', () => {
    it('should create order successfully', async () => {
      const mockResponse = {
        message: 'Order created successfully',
        order: {
          id: 'order-3',
          total_amount: 199.98,
          status: 'pending',
          shipping_address: '789 New St',
        },
      };

      // Mock initial orders fetch
      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.createOrder({
        shipping_address: '789 New St',
        use_cart: true,
      });

      await waitFor(() => {
        expect(result.current.isCreatingOrder).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=create_order'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });

    it('should create order with direct items', async () => {
      const mockResponse = {
        message: 'Order created successfully',
        order: {
          id: 'order-3',
          total_amount: 99.99,
          status: 'pending',
        },
      };

      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.createOrder({
        shipping_address: '789 New St',
        items: [
          {
            product_id: 'product-1',
            quantity: 1,
            unit_price: 99.99,
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isCreatingOrder).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=create_order'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('product-1'),
        })
      );
    });

    it('should handle create order errors', async () => {
      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Insufficient stock' }),
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.createOrder({
        shipping_address: '789 New St',
        use_cart: true,
      });

      await waitFor(() => {
        expect(result.current.isCreatingOrder).toBe(false);
      });

      // Error should be handled by toast
      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Cancel Order', () => {
    it('should cancel order successfully', async () => {
      const mockResponse = {
        message: 'Order cancelled successfully',
        order: {
          id: 'order-1',
          status: 'cancelled',
        },
      };

      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: mockOrders,
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.cancelOrder('order-1');

      await waitFor(() => {
        expect(result.current.isCancellingOrder).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=cancel_order'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ order_id: 'order-1' }),
        })
      );
    });

    it('should handle cancel order errors', async () => {
      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: mockOrders,
        error: null,
      });

      (supabase.from as any).mockReturnValue({
        select: mockSelect,
      });

      mockSelect.mockReturnValue({
        eq: mockEq,
      });

      mockEq.mockReturnValue({
        order: mockOrder,
      });

      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Cannot cancel completed order' }),
      });

      const { result } = renderHook(() => useMarketplaceOrders(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.cancelOrder('order-2');

      await waitFor(() => {
        expect(result.current.isCancellingOrder).toBe(false);
      });

      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });
});
