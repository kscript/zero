import { ComponentOptions, VNode } from 'vue'
export interface Markdown {
  render(): VNode[]
}
export interface DemoEntry {
  name: string,
  demoComponents: ComponentOptions[];
  demoMarkdowns: Markdown[];
}