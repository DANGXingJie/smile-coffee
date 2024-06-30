import { createSSRApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/stores'
// main.js
import 'virtual:windi.css'
export function createApp() {
  const app = createSSRApp(App)
  // pinia 仓库管理
  setupStore(app)
  return {
    app,
  }
}
