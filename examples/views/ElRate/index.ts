import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Text from './Text.vue'
import Icon from './Icon.vue'
import Disabled from './Disabled.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Text,
  Icon,
  Disabled
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElRate',
  demoComponents,
  demoMarkdowns
}
export default entry