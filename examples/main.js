import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import zeroUI from 'zero-ui'

Vue.config.productionTip = false
Vue.use(zeroUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
