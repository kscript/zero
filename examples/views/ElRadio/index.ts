import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import GroupDemo from './GroupDemo.vue'
import ButtonDemo from './ButtonDemo.vue'
import Border from './Border.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  GroupDemo,
  ButtonDemo,
  Border
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElRadio',
  demoComponents,
  demoMarkdowns
}
export default entry