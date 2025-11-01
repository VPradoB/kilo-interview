import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@awards': path.resolve(__dirname, './src/awards'),
      '@applications': path.resolve(__dirname, './src/applications'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@zones': path.resolve(__dirname, './src/zones')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  }
})
