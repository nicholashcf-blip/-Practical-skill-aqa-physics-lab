import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow tunnels (ngrok, cloudflared, localtunnel) to reach the dev/preview server.
  // Vite blocks unknown Host headers by default — we open it up because the
  // app has no secrets and is intended to be shared.
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
    port: 4173,
  },
})
