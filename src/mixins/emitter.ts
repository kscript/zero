import { ComponentOptions } from 'vue'

export function dispatch (
  componentName: string,
  eventName: string,
  params: Array<any>
) {
  let parent = this.parent || this.root
  let name = (parent.type as ComponentOptions).name

  while (parent && (!name || name !== componentName)) {
    parent = parent.parent

    if (parent) {
      name = (parent.type as ComponentOptions).name
    }
  }
  if (parent) {
    parent.emit.apply(parent, [eventName].concat(params))
  }
}

export default {
  dispatch
}