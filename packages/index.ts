import 'theme/icon.scss'
import 'theme/common/transition.scss'
import pkg from '../package.json'

import { App } from 'vue'
import alert from './alert'
import aside from './aside'
import avatar from './avatar'
import backTop from './backtop'
import badge from './badge'
import button from './button'
import buttonGroup from './button-group'
import card from './card'
import code from './code'
import container from './container'
import collapse from './collapse'
import collapseItem from './collapse-item'
import collapseTransition from './collapse-transition'
import { ElementUIOptions } from './component'
import icon from './icon'
import input from './input'
import main from './main'
import scrollbar from './scrollbar'
import tag from './tag'

import { anyObject } from 'packages/global'

export const Alert = alert
export const Aside = aside
export const Avatar = avatar
export const BackTop = backTop
export const Badge = badge
export const Button = button
export const ButtonGroup = buttonGroup
export const Card = card
export const Code = code
export const Container = container
export const Collapse = collapse
export const CollapseItem = collapseItem
export const CollapseTransition = collapseTransition
export const Icon = icon
export const Input = input
export const Main = main
export const Scrollbar = scrollbar
export const Tag = tag

export const components = [
  Alert,
  Aside,
  Avatar,
  BackTop,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Code,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Icon,
  Input,
  Main,
  Scrollbar,
  Tag
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
  BackTop,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Code,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Icon,
  Input,
  Main,
  Scrollbar,
  Tag
}
