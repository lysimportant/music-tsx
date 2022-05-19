import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'router': fileURLToPath(new URL('./src/router', import.meta.url)),
      'hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      'api': fileURLToPath(new URL('./src/api', import.meta.url)),
      'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      'library': fileURLToPath(new URL('./src/library', import.meta.url)),
    }
  }
})
