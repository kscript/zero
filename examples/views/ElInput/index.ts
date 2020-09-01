import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import Clear from './Clear.vue'
import Password from './Password.vue'
import Icon from './Icon.vue'
import Textarea from './Textarea.vue'
import Autosize from './Autosize.vue'
import Compound from './Compound.vue'
import Size from './Size.vue'
import Length from './Length.vue'
import md from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  Clear,
  Password,
  Icon,
  Textarea,
  Autosize,
  Compound,
  Size,
  Length
]
export const demoMarkdowns: Markdown[] = [
  md
]
const entry: DemoEntry = {
  name: 'ElInput',
  demoComponents,
  demoMarkdowns
}
export default entry