import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Desc from './Desc.vue'
import Value from './Value.vue'
import Disabled from './Disabled.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Desc,
  Value,
  Disabled
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElSwitch',
  demoComponents,
  demoMarkdowns
}
export default entry