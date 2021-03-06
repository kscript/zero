import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Type from './Type.vue'
import Fallback from './Fallback.vue'
import Fit from './Fit.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Type,
  Fallback,
  Fit
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElAvatar',
  demoComponents,
  demoMarkdowns
}
export default entry