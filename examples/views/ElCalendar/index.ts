import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Custom from './Custom.vue'
import Range from './Range.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Custom,
  Range
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElCalendar',
  demoComponents,
  demoMarkdowns
}
export default entry