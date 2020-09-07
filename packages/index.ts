import 'theme/reset.scss'
import 'theme/icon.scss'
import 'theme/common/transition.scss'

import { App } from 'vue'
import alert from './alert'
import aside from './aside'
import autocomplete from './autocomplete'
import autocompleteSuggestions from './autocomplete-suggestions'
import avatar from './avatar'
import backTop from './backtop'
import badge from './badge'
import breadcrumb from './breadcrumb'
import breadcrumbItem from './breadcrumb-item'
import button from './button'
import buttonGroup from './button-group'
import calendar from './calendar'
import card from './card'
import code from './code'
import col from './col'
import container from './container'
import collapse from './collapse'
import collapseItem from './collapse-item'
import collapseTransition from './collapse-transition'
import { ElementUIOptions } from './component'
import footer from './footer'
import header from './header'
import icon from './icon'
import input from './input'
import link from './link'
import main from './main'
import markdown from './markdown'
import row from './row'
import option from './option'
import optionGroup from './option-group'
import scrollbar from './scrollbar'
import select from './select'
import tag from './tag'

export const Alert = alert
export const Aside = aside
export const Autocomplete = autocomplete
export const AutocompleteSuggestions = autocompleteSuggestions
export const Avatar = avatar
export const BackTop = backTop
export const Badge = badge
export const Breadcrumb = breadcrumb
export const BreadcrumbItem = breadcrumbItem
export const Button = button
export const ButtonGroup = buttonGroup
export const Calendar = calendar
export const Card = card
export const Code = code
export const Col = col
export const Container = container
export const Collapse = collapse
export const CollapseItem = collapseItem
export const CollapseTransition = collapseTransition
export const Footer = footer
export const Header = header
export const Icon = icon
export const Input = input
export const Link = link
export const Main = main
export const Markdown = markdown
export const Row = row
export const Option = option
export const OptionGroup = optionGroup
export const Scrollbar = scrollbar
export const Select = select
export const Tag = tag

export const components = [
  Alert,
  Aside,
  Autocomplete,
  AutocompleteSuggestions,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Code,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Footer,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Markdown,
  Option,
  OptionGroup,
  Row,
  Scrollbar,
  Select,
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
export const version = '1.0.4'
export default {
  install,
  Alert,
  Aside,
  Autocomplete,
  AutocompleteSuggestions,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Code,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Footer,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Markdown,
  Option,
  OptionGroup,
  Row,
  Scrollbar,
  Select,
  Tag
}
