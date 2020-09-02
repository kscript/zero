import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import All from './All.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  All
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElIcon',
  demoComponents,
  demoMarkdowns
}
export default entry