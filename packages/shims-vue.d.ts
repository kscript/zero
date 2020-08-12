declare module '*.vue' {
  import { ComponentPublicInstance } from '@vue/runtime-dom'
  const app: new () => ComponentPublicInstance
  export default app
}