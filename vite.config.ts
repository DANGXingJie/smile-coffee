import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), WindiCSS(), MiniProgramTailwind()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  //在预构建中强制排除的依赖项
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
})
