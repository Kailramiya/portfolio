import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url || ''
          if (!url.startsWith('/api/')) return next()

          // Only handle stats endpoints for local dev.
          if (!url.startsWith('/api/stats') && !url.startsWith('/api/coding-stats') && !url.startsWith('/api/scrape-profile')) return next()

          const parsed = new URL(url, 'http://localhost')
          const query = Object.fromEntries(parsed.searchParams.entries())

          const modulePath = url.startsWith('/api/scrape-profile') ? './api/scrape-profile.js' : './api/stats.js'
          // Bust cache by adding timestamp query param
          const apiModule = await import(`${modulePath}?t=${Date.now()}`)
          const handler = apiModule?.default
          if (typeof handler !== 'function') return next()

          // Vercel-style request shim
          const vercelReq = {
            method: req.method,
            headers: req.headers,
            query,
          }

          return handler(vercelReq, res)
        } catch (e) {
          console.error('[local-api] Error:', e)
          server.config.logger.error(`[local-api] ${e?.message || e}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Local API error', details: String(e?.message || e) }))
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    localApi(),
    // Tailwind is configured via PostCSS (postcss.config.js)
  ],
})
