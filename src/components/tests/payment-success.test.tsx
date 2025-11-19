
/// <reference types="vitest" />

// Import jest-dom for extended matchers
import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeAll } from 'vitest';
// Import testing library with proper type support
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaymentSuccess from '@/pages/PaymentSuccess';
import { I18nProvider } from '@/components/ui/language-toggle';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Mock the useSearchParams hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ session_id: 'test_session_123' }),
      vi.fn()
    ]
  };
});

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
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    }),
  },
}));

// Mock window.matchMedia for mobile detection
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Create wrapper with all required providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </I18nProvider>
    </QueryClientProvider>
  );
};

describe('PaymentSuccess Component', () => {
  it('renders success message', () => {
    const Wrapper = createWrapper();
    render(<PaymentSuccess />, { wrapper: Wrapper });
    
    // Check if success message is displayed
    expect(screen.getByText(/Payment Successful!/i)).toBeInTheDocument();
  });

  it('displays the session ID', () => {
    const Wrapper = createWrapper();
    render(<PaymentSuccess />, { wrapper: Wrapper });

    // Check if session ID is displayed
    expect(screen.getByText(/test_session_123/i)).toBeInTheDocument();
  });

  it('includes navigation buttons', () => {
    const Wrapper = createWrapper();
    render(<PaymentSuccess />, { wrapper: Wrapper });

    // Check if navigation buttons are present
    expect(screen.getByText(/Return to Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
  });
});
