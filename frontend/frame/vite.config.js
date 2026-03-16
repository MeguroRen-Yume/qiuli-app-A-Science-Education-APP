import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false, // 禁用压缩
    sourcemap: true, // 如果需要，可以开启 sourcemap 方便调试
    terserOptions: {
      compress: false, // 如果你使用了 terser 压缩，也可以在这里配置
    },
  },
})
