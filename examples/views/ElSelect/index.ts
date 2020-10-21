import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import DisabledItem from './DisabledItem.vue'
import Clear from './Clear.vue'
import Multiple from './Multiple.vue'
import Custom from './Custom.vue'
import Group from './Group.vue'
import Search from './Search.vue'
import Remote from './Remote.vue'
import Create from './Create.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  DisabledItem,
  Clear,
  Multiple,
  Custom,
  Group,
  Search,
  Remote,
  Create
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElSelect',
  demoComponents,
  demoMarkdowns
}
export default entry