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
    // Inline tiny assets as base64 to save round-trips
    assetsInlineLimit: 4096,
    // Raise the warning threshold to avoid noise (we know our pages are large)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunks keep each vendor in its own cached file.
        // When you change app code the vendor chunks stay cached.
        manualChunks(id) {
          // Supabase — used on every page (car queries)
          if (id.includes('@supabase')) return 'vendor-supabase';
          // Framer Motion — heavy animation library
          if (id.includes('framer-motion')) return 'vendor-framer';
          // Recharts + D3 — only used on specific pages
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
          // Radix UI primitives
          if (id.includes('@radix-ui')) return 'vendor-radix';
          // React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react';
          // Everything else in node_modules
          if (id.includes('node_modules')) return 'vendor-misc';
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
