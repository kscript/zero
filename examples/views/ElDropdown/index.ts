import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Trigger from './Trigger.vue'
import Reference from './Reference.vue'
import Hide from './Hide.vue'
import Command from './Command.vue'
import Size from './Size.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Trigger,
  Reference,
  Hide,
  Command,
  Size
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElDropdown',
  demoComponents,
  demoMarkdowns
}
export default entry