import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'Layout',
  demoComponents,
  demoMarkdowns
}
export default entry