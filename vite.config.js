import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,   // smaller builds for production
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate heavy 3D library so it never blocks the main bundle
          'vendor-spline': ['@splinetool/react-spline'],
          // Isolate charting library
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          // Core React runtime in its own chunk
          'vendor-react': ['react', 'react-dom'],
          // Routing
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
