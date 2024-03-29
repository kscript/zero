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
import carousel from './carousel'
import carouselItem from './carousel-item'
import checkbox from './checkbox'
import checkboxButton from './checkbox-button'
import checkboxGroup from './checkbox-group'
import code from './code'
import col from './col'
import container from './container'
import collapse from './collapse'
import collapseItem from './collapse-item'
import collapseTransition from './collapse-transition'
import dialog from './dialog'
import divider from './divider'
import drawer from './drawer'
import dropdown from './dropdown'
import dropdownItem from './dropdown-item'
import dropdownMenu from './dropdown-menu'
import { ElementUIOptions } from './ElementUIOptions'
import footer from './footer'
import form from './form'
import formItem from './form-item'
import header from './header'
import icon from './icon'
import input from './input'
import image from './image'
import infiniteScroll from './infinite-scroll'
import link from './link'
import main from './main'
import markdown from './markdown'
import option from './option'
import optionGroup from './option-group'
import pagination from './pagination'
import progress from './progress'
import row from './row'
import radio from './radio'
import radioButton from './radio-button'
import radioGroup from './radio-group'
import rate from './rate'
import scrollbar from './scrollbar'
import select from './select'
import spinner from './spinner'
import step from './step'
import steps from './steps'
import $switch from './switch'
import tag from './tag'
import table from './table'
import tableColumn from './table-column'
import timeline from './timeline'
import timelineItem from './timeline-item'
import transfer from './transfer'

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
export const Checkbox = checkbox
export const CheckboxButton = checkboxButton
export const CheckboxGroup = checkboxGroup
export const Code = code
export const Col = col
export const Container = container
export const Collapse = collapse
export const CollapseItem = collapseItem
export const CollapseTransition = collapseTransition
export const Carousel = carousel
export const CarouselItem = carouselItem
export const Dialog = dialog
export const Divider = divider
export const Drawer = drawer
export const Dropdown = dropdown
export const DropdownItem = dropdownItem
export const DropdownMenu = dropdownMenu
export const Footer = footer
export const Form = form
export const FormItem = formItem
export const Header = header
export const Icon = icon
export const Input = input
export const Image = image
export const InfiniteScroll = infiniteScroll
export const Link = link
export const Main = main
export const Markdown = markdown
export const Option = option
export const OptionGroup = optionGroup
export const Pagination = pagination
export const Progress = progress
export const Radio = radio
export const RadioButton = radioButton
export const RadioGroup = radioGroup
export const Rate = rate
export const Row = row
export const Scrollbar = scrollbar
export const Select = select
export const Spinner = spinner
export const Step = step
export const Steps = steps
export const Switch = $switch
export const Tag = tag
export const Table = table
export const TableColumn = tableColumn
export const Timeline = timeline
export const TimelineItem = timelineItem
export const Transfer = transfer
export const directives = [
  InfiniteScroll
]
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
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Code,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Image,
  Link,
  Main,
  Markdown,
  Option,
  OptionGroup,
  Pagination,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select,
  Step,
  Steps,
  Spinner,
  Switch,
  Tag,
  Table,
  TableColumn,
  Timeline,
  TimelineItem,
  Transfer,
]
export const install = function (app: App, opts = {}) {
  // 判断是否安装
  if (install.installed) return
  directives.map(item => app.directive(item.name as string, item.directive))
  // 遍历注册全局组件
  components.map(component => app.component(component.name as string, component))

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  }
}
install.installed = false

const win: anyObject = window || {}

export const version = '1.0.9'

export const ZeroUI = {
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
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Code,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  Container,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Image,
  Link,
  Main,
  Markdown,
  Option,
  OptionGroup,
  Pagination,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select,
  Step,
  Steps,
  Spinner,
  Switch,
  Tag,
  Table,
  TableColumn,
  Timeline,
  TimelineItem,
  Transfer
}

export default ZeroUI

win.ZeroUI = ZeroUI
