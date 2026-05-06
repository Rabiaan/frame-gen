import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const prerender = require('vite-plugin-prerender')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
      hostname: 'https://www.frame-gen.com',
      dynamicRoutes: routes,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
      exclude: ['/privacy', '/terms'],
    }),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routes,
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 5000,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--headless',
          '--single-process',
          '--no-zygote',
        ],
      },
      postProcess(renderedRoute) {
        // Remove script tags to avoid double hydration issues if needed
        // but here we just want to ensure it runs
        console.log(`[prerender] Rendered: ${renderedRoute.route}`);
        return renderedRoute;
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,   // smaller builds for production
    rollupOptions: {
      output: {
        manualChunks: {
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
