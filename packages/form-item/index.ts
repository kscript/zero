import { App } from 'vue'
import Component from '../form/src/form-item.vue'
export const install = function (app: App) {
  app.component(Component.name as string, Component)
}

export default Component
