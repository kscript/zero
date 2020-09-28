import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Max from './Max.vue'
import Background from './Background.vue'
import Small from './Small.vue'
import Whole from './Whole.vue'
import Hide from './Hide.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Max,
  Background,
  Small,
  Whole,
  Hide
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElPagination',
  demoComponents,
  demoMarkdowns
}
export default entry