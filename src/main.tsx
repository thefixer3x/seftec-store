
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import App from './App';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FeatureFlagProvider } from './components/ui/feature-flags/FeatureFlagProvider';
import { I18nProvider } from './components/ui/language-toggle';
import { SentryErrorBoundary } from './components/sentry';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  ignoreErrors: [
    'ResizeObserver loop',
    'Non-Error promise rejection captured',
    'The user aborted a request',
  ],
  beforeSend(event) {
    if (event.exception) {
      console.error('🚨 Sentry captured error:', event.exception);
    }
    return event;
  },
});

console.log('🚀 SeftechHub: main.tsx executing');
console.log('📍 Root element:', document.getElementById('root'));
console.log('🔧 Environment check:', {
  viteSupabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  hasViteEnv: !!import.meta.env.VITE_SUPABASE_URL,
  mode: import.meta.env.MODE,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN ? 'configured' : 'missing',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('✅ Root element found, mounting React...');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SentryErrorBoundary>
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
      </SentryErrorBoundary>
    </React.StrictMode>,
  );
  console.log('🎉 React app mounted successfully');
} else {
  console.error('❌ Root element not found!');
}
