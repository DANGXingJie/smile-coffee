/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_ENV: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
