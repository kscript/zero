import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Theme from './Theme.vue'
import Custom from './Custom.vue'
import Icon from './Icon.vue'
import Center from './Center.vue'
import Assist from './Assist.vue'
import AssistIcon from './AssistIcon.vue'
import md from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Theme,
  Custom,
  Icon,
  Center,
  Assist,
  AssistIcon,
]
export const demoMarkdowns: Markdown[] = [
  md
]
const entry: DemoEntry = {
  name: 'ElAlert',
  demoComponents,
  demoMarkdowns
}
export default entry