<template>
  <div
    class="el-select-dropdown el-popper"
    :class="[{ 'is-multiple': multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import Popper from '@/utils/vue-popper'
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  ref,
  VNode,
  watch
} from 'vue'

export default defineComponent({
  name: 'ElSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        }
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const {props: selectProps, state: selectState, emitter} = inject('elSelect', {} as anyObject)
    const instance = getCurrentInstance() as ComponentInternalInstance
    const popperElm = ref(null as HTMLElement | null)
    const referenceElm = ref(null as HTMLElement | null)
    const minWidth = ref('')
    const popperClass = computed(() => selectProps.popperClass)
    const multiple = computed(() => selectProps.multiple)
    // @ts-ignore
    const proxy = instance.proxy
    watch(() => selectState.inputWidth, width => {
      minWidth.value = width + 'px'
    })
    onMounted(() => {
      popperElm.value = instance.vnode.el as HTMLElement
      const parent = instance.parent as ComponentInternalInstance
      referenceElm.value = (parent?.refs
        .reference as ComponentInternalInstance)?.vnode.el as HTMLElement || parent?.vnode.el
      emitter.on('destroyPopper', proxy.destroyPopper)
      emitter.on('updatePopper', () => {
        if (selectState.visible) proxy.updatePopper()
      })
    })
    return {
      multiple,
      minWidth,
      popperClass
    }
  }
})
</script>
