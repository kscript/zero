import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Inline from './Inline.vue'
import Position from './Position.vue'
import Validator from './Validator.vue'
import Dynamic from './Dynamic.vue'
import Number from './Number.vue'
import Custom from './Custom.vue'
import Size from './Size.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Inline,
  Position,
  Validator,
  Dynamic,
  Number,
  Custom,
  Size
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElForm',
  demoComponents,
  demoMarkdowns
}
export default entry