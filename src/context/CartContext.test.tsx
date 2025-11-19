import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { AuthProvider } from './AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'order-123', customer_id: 'user-123', total_amount: 100, status: 'pending' },
            error: null,
          }),
        }),
      }),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    }),
  },
}));

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Cart Operations', () => {
    it('should add new item to empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: 'https://example.com/image.jpg',
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0]).toMatchObject({
        name: 'Test Product',
        price: 29.99,
        quantity: 1,
        product_id: 'prod-1',
      });
    });

    it('should add duplicate item (increase quantity)', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 2);
        result.current.addToCart(product, 3);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].quantity).toBe(5);
    });

    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      expect(result.current.cart).toHaveLength(1);

      act(() => {
        result.current.removeFromCart('prod-1');
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it('should update item quantity (positive numbers)', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      act(() => {
        result.current.updateQuantity('prod-1', 5);
      });

      expect(result.current.cart[0].quantity).toBe(5);
    });

    it('should update quantity to zero (removes item)', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 3);
      });

      act(() => {
        result.current.updateQuantity('prod-1', 0);
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it('should clear entire cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product1 = { id: 'prod-1', name: 'Product 1', price: 10, image_url: null };
      const product2 = { id: 'prod-2', name: 'Product 2', price: 20, image_url: null };

      act(() => {
        result.current.addToCart(product1, 1);
        result.current.addToCart(product2, 1);
      });

      expect(result.current.cart).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cart).toHaveLength(0);
    });
  });

  describe('Cart Calculations', () => {
    it('should calculate cart total correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 25.50,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 2);
      });

      expect(result.current.cartTotal).toBe(51);
    });

    it('should calculate cart item count', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product1 = { id: 'prod-1', name: 'Product 1', price: 10, image_url: null };
      const product2 = { id: 'prod-2', name: 'Product 2', price: 20, image_url: null };

      act(() => {
        result.current.addToCart(product1, 3);
        result.current.addToCart(product2, 2);
      });

      expect(result.current.cartCount).toBe(5);
    });

    it('should calculate cart total with multiple items', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product1 = { id: 'prod-1', name: 'Product 1', price: 10.50, image_url: null };
      const product2 = { id: 'prod-2', name: 'Product 2', price: 25.75, image_url: null };

      act(() => {
        result.current.addToCart(product1, 2); // 21.00
        result.current.addToCart(product2, 1); // 25.75
      });

      expect(result.current.cartTotal).toBe(46.75);
    });

    it('should update cart total after quantity updates', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 15,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 2);
      });

      expect(result.current.cartTotal).toBe(30);

      act(() => {
        result.current.updateQuantity('prod-1', 5);
      });

      expect(result.current.cartTotal).toBe(75);
    });
  });

  describe('Persistence', () => {
    it('should save cart to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      const savedCart = localStorage.getItem('cart');
      expect(savedCart).toBeTruthy();
      const parsedCart = JSON.parse(savedCart!);
      expect(parsedCart).toHaveLength(1);
      expect(parsedCart[0].name).toBe('Test Product');
    });

    it('should load cart from localStorage on mount', () => {
      const cartData = [
        {
          id: '123',
          name: 'Saved Product',
          price: 50,
          image_url: null,
          quantity: 2,
          product_id: 'prod-saved',
        },
      ];

      localStorage.setItem('cart', JSON.stringify(cartData));

      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].name).toBe('Saved Product');
      expect(result.current.cart[0].quantity).toBe(2);
    });

    it('should clear cart from localStorage on clearCart()', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      expect(localStorage.getItem('cart')).toBeTruthy();

      act(() => {
        result.current.clearCart();
      });

      // Cart is cleared but localStorage contains empty array due to useEffect
      expect(localStorage.getItem('cart')).toBe('[]');
    });

    it('should handle corrupted localStorage data gracefully', () => {
      localStorage.setItem('cart', 'invalid json data {{{');

      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      // Should start with empty cart instead of crashing
      expect(result.current.cart).toHaveLength(0);
      // Should clear corrupted data and set to empty array
      expect(localStorage.getItem('cart')).toBe('[]');
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative quantity by removing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 5);
      });

      act(() => {
        result.current.updateQuantity('prod-1', -1);
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it('should handle very large quantities', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 10,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1000);
      });

      expect(result.current.cart[0].quantity).toBe(1000);
      expect(result.current.cartTotal).toBe(10000);
    });

    it('should handle product with null image_url', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'No Image Product',
        price: 15,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      expect(result.current.cart[0].image_url).toBeNull();
    });

    it('should handle removing non-existent item', () => {
      const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

      const product = {
        id: 'prod-1',
        name: 'Test Product',
        price: 29.99,
        image_url: null,
      };

      act(() => {
        result.current.addToCart(product, 1);
      });

      // Try to remove a different product
      act(() => {
        result.current.removeFromCart('prod-999');
      });

      // Original cart should be unchanged
      expect(result.current.cart).toHaveLength(1);
    });
  });

  describe('useCart hook', () => {
    it('should throw error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');

      consoleSpy.mockRestore();
    });
  });
});
