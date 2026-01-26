
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: __dirname,
  server: {
    host: "127.0.0.1",
    port: 8080,
    strictPort: false,
    hmr: {
      clientPort: 8080,
    },
    allowedHosts: [
      "440284790815.ngrok-free.app",
      ".ngrok-free.app",
      "localhost",
      "127.0.0.1",
      "192.168.1.13"
    ],
  },
  base: '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "../../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      external: [],
      // Exclude test files from production build
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    // Suppress warnings about missing tables (unimplemented features)
    chunkSizeWarningLimit: 1000,
  },
  // Exclude test files
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
}));
