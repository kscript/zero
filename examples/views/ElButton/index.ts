import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import Text from './Text.vue'
import Icon from './Icon.vue'
import Group from './Group.vue'
import Size from './Size.vue'
import Loading from './Loading.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  Text,
  Icon,
  Group,
  Size,
  Loading
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElButton',
  demoComponents,
  demoMarkdowns
}
export default entry