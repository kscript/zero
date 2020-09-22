// @ts-ignore
import { throttle } from 'throttle-debounce'
// @ts-ignore
import { isHtmlElement, isFunction, isUndefined, isDefined } from '@/utils/types'
// @ts-ignore
import { generateId } from '@/utils/util'
import { getScrollContainer } from '@/utils/dom'
import { ComponentPublicInstance, ObjectDirective } from 'vue'

const getStyleComputedProperty = (
  element: HTMLElement | Node | Window,
  property: keyof CSSStyleDeclaration
) => {
  if (element === window) {
    element = document.documentElement
  }

  if ((element as Node).nodeType !== 1) {
    return 0
  }
  // NOTE: 1 DOM access here
  const css = window.getComputedStyle(element as HTMLElement, null)
  return property ? css[property] : css
}

const entries = (obj: anyObject) => {
  return Object.keys(obj || {}).map(key => [key, obj[key]])
}
type ELEMENT = HTMLElement | Window | Document
const getPositionSize = (el: ELEMENT, prop: keyof ELEMENT) => {
  return Number(
    el === window || el === document ? document.documentElement[prop] : el[prop]
  )
}

const getOffsetHeight = (el: HTMLElement) => {
  return getPositionSize(el, 'offsetHeight' as keyof ELEMENT)
}

const getClientHeight = (el: HTMLElement) => {
  return getPositionSize(el, 'clientHeight' as keyof ELEMENT)
}
interface ElInfiniteScroll {
  el: HTMLElement
  vm: ComponentPublicInstance
  container: HTMLElement
  observer?: MutationObserver | null
  onScroll(evt: Event): void
}
const scope = 'elInfiniteScroll'
const elInfiniteScroll: anyObject<ElInfiniteScroll> = {}
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
}

const getScrollOptions = (el: HTMLElement, vm: ComponentPublicInstance) => {
  if (!isHtmlElement(el)) return {}
  const result = entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option
    let value = el.getAttribute(
      `infinite-scroll-${key}`
    ) as keyof ComponentPublicInstance
    let realValue = isUndefined(vm[value])
      ? value === null
        ? defaultValue
        : value
      : vm[value]

    switch (type) {
      case Number:
        realValue = Number(realValue)
        realValue = Number.isNaN(realValue) ? defaultValue : realValue
        break
      case Boolean:
        realValue = isDefined(realValue)
          ? String(realValue) === 'false'
            ? false
            : Boolean(realValue)
          : defaultValue
        break
      default:
        realValue = type(realValue)
    }
    map[key] = realValue
    return map
  }, {} as anyObject)
  return result
}

const getElementTop = (el: HTMLElement) => el.getBoundingClientRect().top

const handleScroll = function (this: any, cb: Function) {
  const id = this.elInfiniteScrollId
  const { el, vm, container, observer } = elInfiniteScroll[
    id
  ] as ElInfiniteScroll
  const { distance, disabled } = getScrollOptions(el, vm)
  if (disabled) return

  const containerInfo = container.getBoundingClientRect()
  if (!containerInfo.width && !containerInfo.height) return

  let shouldTrigger = false

  // scrollTop,getBoundingClientRect 出现小数导致始终不能触发, 四舍五入
  if (container === el) {
    const scrollBottom =
      Math.round(container.scrollTop) + getClientHeight(container)
    shouldTrigger = container.scrollHeight - scrollBottom <= distance
  } else {
    const heightBelowTop =
      getOffsetHeight(el) + Math.round(getElementTop(el)) - Math.round(getElementTop(container))
    const offsetHeight = getOffsetHeight(container)
    const borderBottom = Number.parseFloat(
      String(getStyleComputedProperty(container, 'borderBottomWidth'))
    )
    shouldTrigger = Math.ceil(heightBelowTop) - offsetHeight + borderBottom <= distance
  }
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm)
  } else if (observer) {
    observer.disconnect()
    elInfiniteScroll[id].observer = null
  }
}

export default {
  name: 'InfiniteScroll',
  directive: {
    mounted(el, binding, vnode) {
      const id = (el.elInfiniteScrollId = el.elInfiniteScrollId || generateId())
      const cb = binding.value

      const vm = binding.instance as ComponentPublicInstance
      // only include vertical scroll
      const container = getScrollContainer(el, true) as HTMLElement
      const { delay, immediate } = getScrollOptions(el, vm)
      const onScroll = throttle(delay, handleScroll.bind(el, cb))

      elInfiniteScroll[id] = { el, vm, container, onScroll }

      if (container) {
        container.addEventListener('scroll', onScroll)

        if (immediate) {
          const observer = (elInfiniteScroll[
            id
          ].observer = new MutationObserver(onScroll))
          observer.observe(container, { childList: true, subtree: true })
          onScroll()
        }
      }
    },
    unmounted(el) {
      const id = el.elInfiniteScrollId
      const { container, onScroll } = elInfiniteScroll[id]
      if (container) {
        container.removeEventListener('scroll', onScroll)
      }
    }
  }
} as {
  name: string
  directive: ObjectDirective
}