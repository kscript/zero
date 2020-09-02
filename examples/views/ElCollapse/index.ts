import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Accordion from './Accordion.vue'
import Custom from './Custom.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Accordion,
  Custom
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElCollapse',
  demoComponents,
  demoMarkdowns
}
export default entry