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
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    // Inline small assets (< 8 KB) directly into CSS/JS — saves round trips
    assetsInlineLimit: 8192,
    chunkSizeWarningLimit: 600,
    // Don't spend time computing compressed sizes in CI output
    reportCompressedSize: false,
    // Target modern browsers only — smaller, faster output; no legacy polyfills
    target: ['es2020', 'chrome80', 'firefox78', 'safari13'],
    // Use esbuild minifier (fastest, default in Vite — explicit for clarity)
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Content-hash all chunk filenames so Vercel can serve them immutably
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          // Recharts + d3 — only used on specific pages
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
          // Supabase — separate so it can be cached independently
          if (id.includes('@supabase')) return 'vendor-supabase';
          // Radix UI — many small packages, group them
          if (id.includes('@radix-ui')) return 'vendor-radix';
          // Everything else in node_modules stays together so React.createContext
          // is always available to components in the same chunk
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0',
    allowedHosts: true,
    proxy: {
      // Use the deployed API by default so the Vite preview does not depend
      // on a second local process listening on port 8080. Set
      // VITE_API_PROXY_TARGET when developing against a local API server.
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://ihtisham-api-server.vercel.app',
        changeOrigin: true,
        secure: true,
        // No rewrite — the API server accepts the full /api/* path.
      },
    },
  },
  preview: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0',
  },
});
