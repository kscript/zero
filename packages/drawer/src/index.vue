<template>
  <transition
    name="el-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      class="el-drawer__wrapper"
      tabindex="-1"
      v-show="visible">
      <div
        class="el-drawer__container"
        :class="visible && 'el-drawer__open'"
        @click.self="handleWrapperClick"
        role="document"
        tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="el-drawer__title"
          :aria-label="title"
          class="el-drawer"
          :class="[direction, customClass]"
          :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
          ref="drawer"
          role="dialog"
          tabindex="-1"
          >
          <header class="el-drawer__header" id="el-drawer__title" v-if="withHeader">
            <slot name="title">
              <span role="heading" tabindex="0" :title="title">{{ title }}</span>
            </slot>
            <button
              :aria-label="`close ${title || 'drawer'}`"
              class="el-drawer__close-btn"
              type="button"
              v-if="showClose"
              @click="closeDrawer">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </header>
          <section class="el-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import usePopup from '@/utils/popup'
// @ts-ignore
import Utils from '@/utils/aria-utils'
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, Prop, ref, watch } from 'vue'

export default defineComponent({
  name: 'ElDrawer',
  emits: ['open', 'opened', 'close', 'closed', 'update:visible'],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val: string) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
      }
    } as Prop<String>,
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { emit }) {
    const closed = ref(false)
    const prevActiveElement = ref(null as Element | HTMLElement | null)
    const rendered = ref(false)
    const isHorizontal = computed(() => {
      return props.direction === 'rtl' || props.direction === 'ltr'
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const popup = usePopup(props)
    watch(() => props.visible, (val) => {
      const el = instance.vnode.el as HTMLElement
      if (val) {
        closed.value = false
        emit('open')
        if (props.appendToBody) {
          document.body.appendChild(el)
        }
        prevActiveElement.value = document.activeElement
        nextTick(() => {
          Utils.focusFirstDescendant(instance.refs.drawer)
        })
      } else {
        if (!closed.value) emit('close')
        nextTick(() => {
          if (prevActiveElement.value) {
            (prevActiveElement.value as HTMLElement)?.focus()
          }
        })
      }
    })

    const afterEnter = () => {
      emit('opened')
    }
    const afterLeave = () => {
      emit('closed')
    }
    const hide = (cancel?:boolean) => {
      if (cancel !== false) {
        emit('update:visible', false);
        emit('close');
        if (props.destroyOnClose === true) {
          rendered.value = false
        }
        closed.value = true;
      }
    }
    const handleWrapperClick = () => {
      if (props.wrapperClosable) {
        closeDrawer()
      }
    }
    const closeDrawer = () => {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(hide)
      } else {
        hide()
      }
    }
    const handleClose = () => {
      // This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
      // pressing `ESC` will call this method, and also close the drawer.
      // This method also calls `beforeClose` if there was one.
      closeDrawer()
    }
    onMounted(() => {
      if (props.visible) {
        rendered.value = true
        open()
      }
    })
    onUnmounted(() => {
      const el = instance.vnode.el
      if (props.appendToBody && el?.parentNode) {
        el.parentNode.removeChild(el)
      }
    })

    return {
      rendered,
      isHorizontal,
      afterEnter,
      afterLeave,
      handleWrapperClick,
      closeDrawer,
      handleClose
    }
  }
})
</script>

<style lang="scss">
@import 'theme/drawer.scss';
</style>
