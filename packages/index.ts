import { App } from 'vue'
import row from './row'
import col from './col'

interface anyObject<T = any> {
  [prop: string]: T
}

export const Row = row
export const Col = col

const components = [
  Row,
  Col
]

const install = function(app: App) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => app.component(component.name as string, component))
}
install.installed = false

const win: anyObject = window


if (typeof win !== 'undefined' && win.Vue) {
  install(win.Vue)
}
export default {
  install,
  Row,
  Col
}
