import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Dynamic from './Dynamic.vue'
import Remove from './Remove.vue'
import Size from './Size.vue'
import Theme from './Theme.vue'
import md from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Dynamic,
  Remove,
  Size,
  Theme
]
export const demoMarkdowns: Markdown[] = [
  md
]
const entry: DemoEntry = {
  name: 'ElTag',
  demoComponents,
  demoMarkdowns
}
export default entry