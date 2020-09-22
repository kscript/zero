import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'InfiniteScroll',
  demoComponents,
  demoMarkdowns
}
export default entry