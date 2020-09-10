import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Nest from './Nest.vue'
import Center from './Center.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Nest,
  Center
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElDialog',
  demoComponents,
  demoMarkdowns
}
export default entry