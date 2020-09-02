import { ComponentOptions, VNode } from 'vue'
import Base from './Base.vue'
import Image from './Image.vue'
import Simple from './Simple.vue'
import Shadow from './Shadow.vue'
import index from './index.md'
import { DemoEntry, Markdown } from '../type'
export const demoComponents: ComponentOptions[] = [
  Base,
  Image,
  Simple,
  Shadow
]
export const demoMarkdowns: Markdown[] = [
  index
]
const entry: DemoEntry = {
  name: 'ElCard',
  demoComponents,
  demoMarkdowns
}
export default entry