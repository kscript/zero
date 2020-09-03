import { ComponentOptions, VNode } from 'vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = []
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'Installation',
  demoComponents,
  demoMarkdowns
}
export default entry