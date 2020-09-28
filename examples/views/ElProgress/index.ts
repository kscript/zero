import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Inside from './Inside.vue'
import Color from './Color.vue'
import Circle from './Circle.vue'
import Dashboard from './Dashboard.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Inside,
  Color,
  Circle,
  Dashboard
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElProgress',
  demoComponents,
  demoMarkdowns
}
export default entry