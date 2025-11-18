
/// <reference types="vitest" />

// Import jest-dom for extended matchers
import '@testing-library/jest-dom/vitest';

// Import directly from testing-library without type declaration module augmentation
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { FeatureFlagProvider } from '@/components/ui/feature-flags/FeatureFlagProvider';
import { CartProvider } from '@/context/CartContext';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <FeatureFlagProvider>
                {children}
              </FeatureFlagProvider>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Added proper type annotations and fixed generic syntax
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Export testing utilities
export * from '@testing-library/react';
export { customRender as render };

import { vi } from 'vitest';

// Mock for Supabase client with proper method signatures
export const mockSupabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    then: vi.fn().mockImplementation(cb => cb({ data: null, error: null })),
  }),
  functions: {
    invoke: vi.fn().mockResolvedValue({ data: {}, error: null }),
  },
};

// Use this to mock context providers in tests
export const mockAuthContext = {
  user: null,
  profile: null,
  loading: false,
  refreshProfile: vi.fn(),
};

// Helper to simulate responsive viewport with proper type annotations
export const setViewport = (width: number, height: number): void => {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
  window.dispatchEvent(new Event('resize'));
};

// Mock cart context
export const mockCartContext = {
  cart: [],
  cartCount: 0,
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
  updateQuantity: vi.fn(),
  cartTotal: 0,
};
