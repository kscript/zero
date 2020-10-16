import mitt from 'mitt'
import { ComponentOptions, getCurrentInstance, ComponentInternalInstance } from 'vue'

export const emitter = mitt()
export function dispatch (
  componentName: string,
  eventName: string,
  params: Array<any>
) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  let parent = instance.parent || instance.root as ComponentInternalInstance
  let name = (parent.type as ComponentOptions).name

  while (parent && (!name || name !== componentName)) {
    parent = parent.parent as ComponentInternalInstance

    if (parent) {
      name = (parent.type as ComponentOptions).name
    }
  }
  if (parent) {
    parent.emit(eventName, params)
    emitter.emit(eventName, params)
  }
}

export default {
  dispatch,
  emitter
}