import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import didPlugin from './vite-plugin-did'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), didPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4943', // dfx 默认端口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'dfinity': ['@dfinity/agent', '@dfinity/auth-client'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@dfinity/agent', '@dfinity/auth-client']
  },
}) 