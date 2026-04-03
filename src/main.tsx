
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

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    enabled: true,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 0.2,
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: import.meta.env.PROD ? 1.0 : 0,
    ignoreErrors: [
      'ResizeObserver loop',
      'Non-Error promise rejection captured',
      'The user aborted a request',
    ],
  });
}

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
} else {
  console.error('Root element not found.');
}
