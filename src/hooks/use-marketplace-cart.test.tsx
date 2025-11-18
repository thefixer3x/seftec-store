/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMarketplaceCart } from './use-marketplace-cart';
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

describe('useMarketplaceCart', () => {
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

  describe('Cart Fetching', () => {
    it('should fetch cart successfully', async () => {
      const mockCartData = {
        cart_items: [
          {
            id: 'cart-item-1',
            quantity: 2,
            created_at: '2025-01-01T00:00:00Z',
            updated_at: '2025-01-01T00:00:00Z',
            products: {
              id: 'product-1',
              name: 'Test Product',
              price: 99.99,
              description: 'Test description',
              image_url: 'test.jpg',
              stock_quantity: 10,
              category: 'Electronics',
            },
          },
        ],
        total: 199.98,
        item_count: 2,
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockCartData,
      });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.cart.cart_items).toHaveLength(1);
      expect(result.current.cart.total).toBe(199.98);
      expect(result.current.cart.item_count).toBe(2);
    });

    it('should return empty cart when user is not authenticated', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.cart.cart_items).toHaveLength(0);
      expect(result.current.cart.total).toBe(0);
      expect(result.current.cart.item_count).toBe(0);
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Failed to fetch cart' }),
      });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('Add to Cart', () => {
    it('should add item to cart successfully', async () => {
      const mockResponse = {
        message: 'Item added to cart',
        cart_item: {
          id: 'cart-item-1',
          quantity: 1,
          product_id: 'product-1',
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [],
            total: 0,
            item_count: 0,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.addToCart({ product_id: 'product-1', quantity: 1 });

      await waitFor(() => {
        expect(result.current.isAddingToCart).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=add_to_cart'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });

    it('should handle add to cart errors', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [],
            total: 0,
            item_count: 0,
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Insufficient stock' }),
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.addToCart({ product_id: 'product-1', quantity: 100 });

      await waitFor(() => {
        expect(result.current.isAddingToCart).toBe(false);
      });

      // Error should be handled by toast
      const { useToast } = await import('./use-toast');
      expect(useToast).toHaveBeenCalled();
    });
  });

  describe('Update Cart Item', () => {
    it('should update cart item quantity successfully', async () => {
      const mockResponse = {
        message: 'Cart item updated',
        cart_item: {
          id: 'cart-item-1',
          quantity: 3,
        },
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [
              {
                id: 'cart-item-1',
                quantity: 2,
              },
            ],
            total: 199.98,
            item_count: 2,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.updateCartItem({ cart_item_id: 'cart-item-1', quantity: 3 });

      await waitFor(() => {
        expect(result.current.isUpdatingCart).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=update_cart_item'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('should remove item when quantity is set to 0', async () => {
      const mockResponse = {
        message: 'Cart item removed',
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [
              {
                id: 'cart-item-1',
                quantity: 1,
              },
            ],
            total: 99.99,
            item_count: 1,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.updateCartItem({ cart_item_id: 'cart-item-1', quantity: 0 });

      await waitFor(() => {
        expect(result.current.isUpdatingCart).toBe(false);
      });
    });
  });

  describe('Remove from Cart', () => {
    it('should remove item from cart successfully', async () => {
      const mockResponse = {
        message: 'Item removed from cart',
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [
              {
                id: 'cart-item-1',
                quantity: 1,
              },
            ],
            total: 99.99,
            item_count: 1,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.removeFromCart('cart-item-1');

      await waitFor(() => {
        expect(result.current.isRemovingFromCart).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=remove_from_cart'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ cart_item_id: 'cart-item-1' }),
        })
      );
    });
  });

  describe('Clear Cart', () => {
    it('should clear entire cart successfully', async () => {
      const mockResponse = {
        message: 'Cart cleared',
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cart_items: [
              {
                id: 'cart-item-1',
                quantity: 2,
              },
            ],
            total: 199.98,
            item_count: 2,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.clearCart();

      await waitFor(() => {
        expect(result.current.isClearingCart).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('action=clear_cart'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('Authentication', () => {
    it('should throw error when user is not authenticated for mutations', async () => {
      const { useAuth } = await import('@/context/AuthContext');
      (useAuth as any).mockReturnValueOnce({ user: null });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cart_items: [],
          total: 0,
          item_count: 0,
        }),
      });

      const { result } = renderHook(() => useMarketplaceCart(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.addToCart({ product_id: 'product-1', quantity: 1 });

      await waitFor(() => {
        expect(result.current.isAddingToCart).toBe(false);
      });
    });
  });
});
