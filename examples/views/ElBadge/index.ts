import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Max from './Max.vue'
import Custom from './Custom.vue'
import Dot from './Dot.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Max,
  Custom,
  Dot
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElBadge',
  demoComponents,
  demoMarkdowns
}
export default entry