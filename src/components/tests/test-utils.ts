
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

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Export testing utilities
export * from '@testing-library/react';
export { customRender as render };

// Mock for Supabase client
export const mockSupabase = {
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    then: jest.fn().mockImplementation(cb => cb({ data: null, error: null })),
  }),
  functions: {
    invoke: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
};

// Use this to mock context providers in tests
export const mockAuthContext = {
  user: null,
  profile: null,
  loading: false,
  refreshProfile: jest.fn(),
};

// Helper to simulate responsive viewport
export const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
  window.dispatchEvent(new Event('resize'));
};

// Mock cart context
export const mockCartContext = {
  cart: [],
  cartCount: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  updateQuantity: jest.fn(),
  cartTotal: 0,
};
