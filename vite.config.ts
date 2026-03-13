import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@theme': path.resolve(__dirname, 'src/theme'),
    },
  },
})
