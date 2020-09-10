<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="el-dialog__footer" v-if="slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  // @ts-ignore
  import Popup from '@/utils/popup'
  import { broadcast } from '@/utils/broadcast'
  import Migrating from '@/mixins/migrating'
  import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'

  export default defineComponent({
    name: 'ElDialog',

    mixins: [Popup, Migrating],

    emits: ['open', 'opened', 'close', 'closed', 'update:visible', 'update:modelValue'],
    props: {
      title: {
        type: String,
        default: ''
      },
      
      visible: {
        type: Boolean,
        default: false
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean
    },

    setup(props, { emit, slots }) {
      const closed = ref(false)
      const key = ref(0)
      const instance = getCurrentInstance() as ComponentInternalInstance 

      watch(() => props.visible, (val) => {
        const el = instance.vnode.el as HTMLElement
        if (val) {
          closed.value = false
          emit('open')
          el?.addEventListener('scroll', updatePopper)
          nextTick(() => {
            (instance.refs.dialog as HTMLElement).scrollTop = 0
          });
          if (props.appendToBody) {
            document.body.appendChild(el)
          }
        } else {
          el?.removeEventListener('scroll', updatePopper)
          if (!closed.value) emit('close')
          if (props.destroyOnClose) {
            nextTick(() => {
              key.value++
            })
          }
        }
      })
      const style = computed(() => {
        let style = {} as anyObject
        if (!props.fullscreen) {
          style.marginTop = props.top
          if (props.width) {
            style.width = props.width
          }
        }
        return style
      })

      const getMigratingConfig = () => {
        return {
          props: {
            'size': 'size is removed.'
          }
        }
      }
      const handleWrapperClick = () => {
        if (!props.closeOnClickModal) return;
        handleClose()
      }
      const handleClose = () => {
        if (typeof props.beforeClose === 'function') {
          props.beforeClose(hide)
        } else {
          hide()
        }
      }
      const hide = (cancel?: boolean) => {
        if (cancel !== false) {
          emit('update:visible', false)
          emit('close')
          closed.value = true
        }
      }
      const updatePopper = () => {
        broadcast.emit('updatePopper')
      }
      const afterEnter = () => {
        emit('opened')
      }
      const afterLeave = () => {
        emit('closed')
      }
      const rendered = ref(false)
      onMounted(() => {
        if (props.visible) {
          rendered.value = true
          open()
          if (props.appendToBody) {
            document.body.appendChild(instance.vnode.el as HTMLElement)
          }
        }
      })
      onUnmounted(() => {
        const el = instance.vnode.el
        if (props.appendToBody && el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
      return {
        slots,
        key,
        style,
        rendered,
        afterEnter,
        afterLeave,
        handleClose,
        handleWrapperClick
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/dialog.scss';
</style>
