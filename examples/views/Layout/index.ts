import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Gutter from './Gutter.vue'
import Mix from './Mix.vue'
import Offset from './Offset.vue'
import Justify from './Justify.vue'
import Respond from './Respond.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Gutter,
  Mix,
  Offset,
  Justify,
  Respond
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'Layout',
  demoComponents,
  demoMarkdowns
}
export default entry