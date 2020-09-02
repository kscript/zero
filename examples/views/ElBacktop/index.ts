import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Custom from './Custom.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Custom
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElBacktop',
  demoComponents,
  demoMarkdowns
}
export default entry