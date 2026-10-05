import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/drive-folder': {
        target: 'https://drive.google.com',
        changeOrigin: true,
        rewrite: () => '/embeddedfolderview?id=1Wy0fI8J6GbNNNmHGWiyrQeG2TYKa4en_'
      },
      '/api/drive': {
        target: 'https://drive.usercontent.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/drive/, '')
      }
    }
  }
})
