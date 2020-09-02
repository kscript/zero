import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Icon from './Icon.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Icon
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElBreadcrumb',
  demoComponents,
  demoMarkdowns
}
export default entry