/* istanbul ignore next */
/// <reference path="../../packages/global.d.ts" />
const isServer = false
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.DOCUMENT_NODE)

const trim = function(text: string | void) {
  return (text || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
const camelCase = function(name: string) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: Document | HTMLElementX, event: string, handler: any) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element: Document | HTMLElementX, event: string, handler: any) {
      if (element && event && handler) {
        (element as HTMLElementX).attachEvent('on' + event, handler)
      }
    }
  }
})()


export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element: Document | HTMLElementX, event: string, handler: any) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element: Document | HTMLElementX, event: string, handler: any) {
      if (element && event) {
        (element as HTMLElementX).detachEvent('on' + event, handler)
      }
    }
  }
})()

export const once = function(el: HTMLElementX, event: string, fn: Function) {
  var listener = function() {
    if (fn) {
      // @ts-ignore
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}


export function hasClass(el: HTMLElementX, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass(el: HTMLElementX, cls: string) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el: HTMLElementX, cls: string) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const getStyle = ieVersion < 9 ? function(element: HTMLElementX, styleName: string) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'styleFloat'
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100
        } catch (e) {
          return 1.0
        }
      default:
        return ((element.style as anyObject)[styleName] || element.currentStyle ? (element.currentStyle as anyObject)[styleName] : null)
    }
  } catch (e) {
    return (element.style as anyObject)[styleName]
  }
} : function(element: HTMLElementX, styleName: string) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    // @ts-ignore
    var computed = document.defaultView?.getComputedStyle(element, '')
    // @ts-ignore
    return (element.style as anyObject)[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return (element.style as anyObject)[styleName]
  }
}

export function setStyle(element: HTMLElementX, styleName: anyObject | string, value: number) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      // @ts-ignore
      element.style[styleName] = value
    }
  }
}

export const isScroll = (el: HTMLElementX, vertical: boolean) => {
  if (isServer) return

  const determinedDirection = vertical !== null || vertical !== undefined
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

export const getScrollContainer = (el: HTMLElementX, vertical: boolean) => {
  if (isServer) return

  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentNode as HTMLElementX
  }

  return parent
}

export const isInContainer = (el: HTMLElementX, container: any) => {
  if (isServer || !el || !container) return false

  const elRect = el.getBoundingClientRect()
  let containerRect

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
}
