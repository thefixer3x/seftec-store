import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.DEV': false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    // Dummy values for testing only. These are not real credentials.
    env: {
      VITE_SUPABASE_URL: 'https://example.com',
      VITE_SUPABASE_ANON_KEY: 'dummy-test-key',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/components/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '**/dist',
        '**/build',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
