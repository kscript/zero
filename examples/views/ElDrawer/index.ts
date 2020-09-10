import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Title from './Title.vue'
import Custom from './Custom.vue'
import Nest from './Nest.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Title,
  Custom,
  Nest
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElDrawer',
  demoComponents,
  demoMarkdowns
}
export default entry