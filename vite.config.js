import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/', // Ensures correct routing
  server: {
    historyApiFallback: true, // Allows serving index.html for all routes
  },
  build: {
    outDir: 'dist',
  }
});
