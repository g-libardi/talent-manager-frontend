import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@layouts': path.resolve(__dirname, '/src/layouts'),
    },
  },

  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://192.168.15.5:5000',
        changeOrigin: true,
      },
    },
  },
})
