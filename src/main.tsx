
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FeatureFlagProvider } from './components/ui/feature-flags/FeatureFlagProvider';
import { I18nProvider } from './components/ui/language-toggle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

console.log('🚀 SeftechHub: main.tsx executing');
console.log('📍 Root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('✅ Root element found, mounting React...');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <I18nProvider>
              <FeatureFlagProvider>
                <AuthProvider>
                  <CartProvider>
                    <App />
                    <Toaster />
                  </CartProvider>
                </AuthProvider>
              </FeatureFlagProvider>
            </I18nProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
  console.log('🎉 React app mounted successfully');
} else {
  console.error('❌ Root element not found!');
}
