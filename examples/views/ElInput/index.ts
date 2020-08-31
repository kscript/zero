import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import md from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base
]
export const demoMarkdowns: Markdown[] = [
  md
]
const entry: DemoEntry = {
  name: 'ElInput',
  demoComponents,
  demoMarkdowns
}
export default entry