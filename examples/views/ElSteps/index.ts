import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Status from './Status.vue'
import Desc from './Desc.vue'
import Icon from './Icon.vue'
import Center from './Center.vue'
import Vertical from './Vertical.vue'
import Simple from './Simple.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Status,
  Desc,
  Icon,
  Center,
  Vertical,
  Simple
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElSteps',
  demoComponents,
  demoMarkdowns
}
export default entry