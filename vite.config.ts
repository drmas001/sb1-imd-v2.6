import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      __SUPABASE_URL__: JSON.stringify(env.VITE_SUPABASE_URL),
      __SUPABASE_ANON_KEY__: JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      __S3_ACCESS_KEY_ID__: JSON.stringify(env.VITE_S3_ACCESS_KEY_ID),
      __S3_SECRET_ACCESS_KEY__: JSON.stringify(env.VITE_S3_SECRET_ACCESS_KEY)
    },
    server: {
      host: true,
      strictPort: true,
      port: 5173
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', '@supabase/supabase-js'],
            ui: ['lucide-react', 'date-fns', 'recharts'],
          }
        }
      }
    }
  };
});