import { computed, onMounted, watch, ref, VNode, ComponentInternalInstance, provide, getCurrentInstance } from 'vue'
import mitt from 'mitt'
// @ts-ignore
import { generateId } from '@/utils/util'
import ElementUIOptions from 'packages/ElementUIOptions'

import { IElDropdownProps, ElDropdownProvide } from './type'
import { RefElement } from 'packages/popper/src/popper'

export const getMigratingConfig = () => {
  return {
    props: {
      'menu-align': 'menu-align is renamed to placement.'
    }
  }
}

export const useDropDown = (props: IElDropdownProps) => {
  let timeout = 0
  const listId = `dropdown-menu-${generateId()}`

  const visible = ref(false)
  const focusing = ref(false)
  const emitter = mitt()
  const triggerElm = ref(null as HTMLInputElement | null)
  const dropdownElm = ref(null as HTMLElement | null)
  const menuItems = ref(null as NodeListOf<HTMLElement> | null)
  const menuItemsArray = ref([] as HTMLElement[])
  const popperElm = ref(null as HTMLElement | null)
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { emit, slots, vnode, refs } = instance
  const el = vnode.el as HTMLElement
  const dropdownSize = computed(() => {
    return props.size || ElementUIOptions.value.size
  })
  const show = () => {
    if (triggerElm.value?.disabled) return
    clearTimeout(timeout)
    timeout = setTimeout(
      () => {
        visible.value = true
      },
      props.trigger === 'click' ? 0 : props.showTimeout
    )
  }
  const hide = () => {
    if (triggerElm.value?.disabled) return
    removeTabindex()
    if (props.tabindex >= 0) {
      resetTabindex(triggerElm.value)
    }
    clearTimeout(timeout)
    timeout = setTimeout(
      () => {
        visible.value = false
      },
      props.trigger === 'click' ? 0 : props.hideTimeout
    )
  }
  const handleClick = () => {
    if (triggerElm.value?.disabled) return
    if (visible.value) {
      hide()
    } else {
      show()
    }
  }

  const handleTriggerKeyDown = (ev: KeyboardEvent) => {
    const keyCode = ev.keyCode
    if ([38, 40].indexOf(keyCode) > -1) {
      // up/down
      removeTabindex()
      resetTabindex(menuItems.value?.[0] || null)
      menuItems.value?.[0].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (keyCode === 13) {
      // space enter选中
      handleClick()
    } else if ([9, 27].indexOf(keyCode) > -1) {
      // tab || esc
      hide()
    }
  }
  const triggerElmFocus = () => {
    triggerElm.value?.focus && triggerElm.value?.focus()
  }
  const handleItemKeyDown = (ev: KeyboardEvent) => {
    const keyCode = ev.keyCode
    const target = ev.target as HTMLElement
    const currentIndex = menuItemsArray.value.indexOf(target)
    const max = menuItemsArray.value.length - 1
    let nextIndex
    if ([38, 40].indexOf(keyCode) > -1) {
      // up/down
      if (keyCode === 38) {
        // up
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
      } else {
        // down
        nextIndex = currentIndex < max ? currentIndex + 1 : max
      }
      removeTabindex()
      resetTabindex(menuItems.value?.[nextIndex] || null)
      menuItems.value?.[nextIndex].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (keyCode === 13) {
      // enter选中
      triggerElmFocus()
      ~ (target as HTMLElement).click()
      if (props.hideOnClick) {
        // click关闭
        visible.value = false
      }
    } else if ([9, 27].indexOf(keyCode) > -1) {
      // tab // esc
      hide()
      triggerElmFocus()
    }
  }
  const resetTabindex = (ele: HTMLElement | null) => {
    // 下次tab时组件聚焦元素
    removeTabindex()
    ele?.setAttribute('tabindex', '0') // 下次期望的聚焦元素
  }
  const removeTabindex = () => {
    triggerElm.value?.setAttribute('tabindex', '-1')
    menuItemsArray.value.forEach((item: HTMLElement) => {
      item.setAttribute('tabindex', '-1')
    })
  }
  const initAria = () => {
    (dropdownElm.value as HTMLElement | null)?.setAttribute('id', listId)
    triggerElm.value?.setAttribute('aria-haspopup', 'list')
    triggerElm.value?.setAttribute('aria-controls', listId)

    if (!props.splitButton) {
      // 自定义
      triggerElm.value?.setAttribute('role', 'button')
      triggerElm.value?.setAttribute('tabindex', String(props.tabindex))
      triggerElm.value?.setAttribute(
        'class',
        (triggerElm.value?.getAttribute('class') || '') +
          ' el-dropdown-selfdefine'
      ) // 控制
    }
  }

  const initEvent = () => {
    const { trigger, splitButton } = props
    const { refs } = getCurrentInstance() as ComponentInternalInstance

    triggerElm.value = (splitButton ? (refs?.trigger as RefElement)?.$el : instance.vnode.el) as HTMLInputElement
    triggerElm.value?.addEventListener('keydown', handleTriggerKeyDown)
    dropdownElm.value?.addEventListener('keydown', handleItemKeyDown, true)
    // 控制自定义元素的样式
    if (!splitButton) {
      triggerElm.value?.addEventListener('focus', () => {
        focusing.value = true
      })
      triggerElm.value?.addEventListener('blur', () => {
        focusing.value = false
      })
      triggerElm.value?.addEventListener('click', () => {
        focusing.value = false
      })
    }
    if (trigger === 'hover') {
      triggerElm.value?.addEventListener('mouseenter', show)
      triggerElm.value?.addEventListener('mouseleave', hide)
      dropdownElm.value?.addEventListener('mouseenter', show)
      dropdownElm.value?.addEventListener('mouseleave', hide)
    } else if (trigger === 'click') {
      triggerElm.value?.addEventListener('click', handleClick)
    }
  }
  const handleMenuItemClick = ([command, instance]: [string, ComponentInternalInstance]) => {
    if (props.hideOnClick) {
      visible.value = false
    }
    emit('command', command, instance)
  }
  const initDomOperation = () => {
    dropdownElm.value = popperElm.value
    menuItems.value = dropdownElm.value?.querySelectorAll("[tabindex='-1']") || null
    menuItemsArray.value = [].slice.call(menuItems.value)
    initEvent()
    initAria()
  }
  const setPopperElm = (el: HTMLElement | null) => {
    popperElm.value = el
  }

  provide('elDropdown', {
    emitter,
    dropdownSize,
    placement: props.placement,
    setPopperElm
  } as ElDropdownProvide)

  watch(() => focusing.value, (val) => {
    const selfDefine = el?.querySelector('.el-dropdown-selfdefine')
    if (selfDefine) {
      // 自定义
      if (val) {
        selfDefine.className += ' focusing'
      } else {
        selfDefine.className = selfDefine.className.replace('focusing', '')
      }
    }
  })
  watch(() => visible.value, (val) => {
    emitter.emit('visible', val)
  })
  onMounted(() => {
    initDomOperation()
    emitter.on('menu-item-click', (...rest) => {
      handleMenuItemClick(...rest)
    })
  })
  const handleMainButtonClick = (event: Event) => {
    emit('click', event)
    hide()
  }
  return {
    handleMainButtonClick,
    hide,
    dropdownSize
  }
}
export default useDropDown