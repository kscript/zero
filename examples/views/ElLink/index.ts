import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import Icon from './Icon.vue'
import Underline from './Underline.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  Icon,
  Underline
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElLink',
  demoComponents,
  demoMarkdowns
}
export default entry