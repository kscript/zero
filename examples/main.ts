import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'

// @ts-ignore
import zeroUI from '@zero-ui/vue'
import 'github-markdown-css'
import '@@/assets/scss/index.scss'

// @ts-ignore
window.app = createApp(App)
  .use(router)
  .use(store)
  .use(zeroUI)
  .mount('#app')
