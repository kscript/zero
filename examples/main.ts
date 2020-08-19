import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import zeroUI from 'zero-ui';

// @ts-ignore
window.app = createApp(App)
  .use(router)
  .use(store)
  .use(zeroUI)
  .mount('#app')
