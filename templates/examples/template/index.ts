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
  name: '文档名或组件名',
  demoComponents,
  demoMarkdowns
}
export default entry