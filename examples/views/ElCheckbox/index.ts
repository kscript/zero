import { ComponentOptions } from 'vue'
import Base from './Base.vue'
import Disabled from './Disabled.vue'
import Multi from './Multi.vue'
import Indeterminate from './Indeterminate.vue'
import Quantity from './Quantity.vue'
import Button from './Button.vue'
import Border from './Border.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Disabled,
  Multi,
  Indeterminate,
  Quantity,
  Button,
  Border
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElCheckbox',
  demoComponents,
  demoMarkdowns
}
export default entry