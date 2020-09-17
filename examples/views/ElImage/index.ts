import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Placeholder from './Placeholder.vue'
import Error from './Error.vue'
import Lazy from './Lazy.vue'
import Big from './Big.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Placeholder,
  Error,
  Lazy,
  Big
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElImage',
  demoComponents,
  demoMarkdowns
}
export default entry