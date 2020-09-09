import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Indicator from './Indicator.vue'
import Arrow from './Arrow.vue'
import Card from './Card.vue'
import Direction from './Direction.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Indicator,
  Arrow,
  Card,
  Direction
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElCarousel',
  demoComponents,
  demoMarkdowns
}
export default entry