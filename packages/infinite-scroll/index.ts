import { App } from 'vue'
import Component from './src'
export const install = function (app: App) {
  app.directive(Component.name, Component.directive)
}

export default Component
