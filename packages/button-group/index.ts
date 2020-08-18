import { App } from 'vue'
import Component from '../button/src/button-group.vue'
export const install = function (app: App) {
  app.component(Component.name as string, Component)
}

export default Component
