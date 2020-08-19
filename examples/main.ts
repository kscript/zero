import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import zeroUI from 'zero-ui'
// import 'zero-ui/lib/zero.css'

// @ts-ignore
window.app = createApp(App)
  .use(router)
  .use(store)
  .use(zeroUI)
  .mount('#app')
