/// <reference path="../../packages/global.d.ts" />

import { on } from './dom'
import { VNode, ObjectDirective } from 'vue'

const nodeList: HTMLElementX[] = []
const ctx = '@@clickoutsideContext'

let startClick: Event | null
let seed = 0
const isServer = false

!isServer && on(document, 'mousedown', (e: Event) => (startClick = e))

!isServer && on(document, 'mouseup', (e: Event) => {
  nodeList.forEach((node: HTMLElementX) => node[ctx].documentHandler(e, startClick))
})

function createDocumentHandler(el: HTMLElementX, binding: any, vnode: any) {
  return function(mouseup: MouseEvent, mousedown: MouseEvent) {
    if (!vnode ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target as HTMLElementX) ||
      el.contains(mousedown.target as HTMLElementX) ||
      el === mouseup.target || 
      (vnode.el.popperElm &&
      (vnode.el.popperElm.contains(mouseup.target) ||
      vnode.el.popperElm.contains(mousedown.target)))
    ) return
    // vue3 指令的binding上没有expression
    if (binding.expression &&
      el[ctx].methodName &&
      vnode.el[el[ctx].methodName]) {
      vnode.el[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

const clickoutside: ObjectDirective = {
  mounted(el: HTMLElementX, binding: anyObject, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  updated(el: HTMLElementX, binding: anyObject, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },

  unmounted(el: HTMLElementX) {
    let len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx]?.id === el[ctx]?.id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default clickoutside
