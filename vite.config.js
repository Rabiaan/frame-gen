import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// All app routes for sitemap generation
const routes = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/projects/website-development',
  '/projects/digital-marketing',
  '/contact',
  '/blog',
  '/blog/choose-digital-marketing-agency-pakistan',
  '/blog/signs-business-needs-new-website-2026',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://framegen.vercel.app',
      dynamicRoutes: routes,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
      exclude: ['/privacy', '/terms'],
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,   // smaller builds for production
    rollupOptions: {
      external: ['@splinetool/runtime'],
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
