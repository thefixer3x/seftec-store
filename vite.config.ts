
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    },
  },
}));
