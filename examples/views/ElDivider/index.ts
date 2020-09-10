import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Custom from './Custom.vue'
import Direction from './Direction.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Custom,
  Direction
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElDivider',
  demoComponents,
  demoMarkdowns
}
export default entry