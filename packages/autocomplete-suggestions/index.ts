import { App } from 'vue'
import Component from '../autocomplete/src/autocomplete-suggestions.vue'
export const install = function (app: App) {
  app.component(Component.name as string, Component)
}

export default Component
