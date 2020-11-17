import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Search from './Search.vue'
import Custom from './Custom.vue'
import Props from './Props.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Search,
  Custom,
  Props
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElTransfer',
  demoComponents,
  demoMarkdowns
}
export default entry