import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Style from './Style.vue'
import Timestamp from './Timestamp.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Style,
  Timestamp
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElTimeline',
  demoComponents,
  demoMarkdowns
}
export default entry