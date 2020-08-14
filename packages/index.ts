import 'theme/icon.scss'
import pkg from '../package.json'

import { App } from 'vue'
import alert from './alert'
import aside from './aside'
import avatar from './avatar'
import main from './main'
import container from './container'
import collapse from './collapse'
import collapseItem from './collapse-item'
import collapseTransition from './collapse-transition'
import { ElementUIOptions } from './component'

interface anyObject<T = any> {
  [prop: string]: T
}

export const Alert = alert
export const Aside = aside
export const Avatar = avatar
export const Main = main
export const Container = container
export const Collapse = collapse
export const CollapseItem = collapseItem
export const CollapseTransition = collapseTransition

export const components = [
  Alert,
  Aside,
  Avatar,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Main
]

const install = function(app: App, opts = {}) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => app.component(component.name as string, component))
  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  }
}
install.installed = false

const win: anyObject = window

if (typeof win !== 'undefined' && win.Vue) {
  install(win.Vue)
}
export const version = pkg.version
export default {
  install,
  Alert,
  Aside,
  Avatar,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Main
}
