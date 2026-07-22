import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep framer-motion in its own chunk — it's large and only used by some pages
          if (id.includes('framer-motion')) return 'vendor-framer';
          // Recharts + d3 — only used on specific pages
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
          // Supabase — separate so it can be cached independently
          if (id.includes('@supabase')) return 'vendor-supabase';
          // Everything else in node_modules (React, Radix, etc.) stays together
          // so React.createContext is always available to components in the same chunk
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0',
  },
});
