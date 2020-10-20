<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul class="el-dropdown-menu el-popper"
     :class="[size && `el-dropdown-menu--${size}`]"
     v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>
<script lang="ts">
import { broadcast } from '@/utils/broadcast'
// @ts-ignore
import Popper from '@/utils/vue-popper'
import { ComponentInternalInstance, defineComponent, getCurrentInstance, inject, onMounted, ref, watch } from 'vue'
import { ElDropdownProvide } from './type'

export default defineComponent({
  name: 'ElDropdownMenu',

  componentName: 'ElDropdownMenu',

  emits: ['input'],
  mixins: [Popper],

  props: {
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { emitter, dropdownSize, placement, initDomOperation, setPopperElm } = inject('elDropdown', {} as ElDropdownProvide)
    const instance = getCurrentInstance() as ComponentInternalInstance
    const size = dropdownSize
    const proxy = (instance as anyObject).proxy
    const showPopper = ref(false)
    broadcast.on('ElDropdownMenu:updatePopper', () => {
      if (proxy.showPopper.value) {
        proxy.updatePopper(instance.vnode.el as HTMLElement)
      }
    })
    emitter.on('visible', val => {
      showPopper.value = val
    })
    const currentPlacement = ref('top')
    watch(() => proxy.placement.value, (val) => {
      currentPlacement.value = val
    }, {
      immediate: true
    })
    onMounted(() => {
      setPopperElm(instance.vnode.el as HTMLElement)
    })
    return {
      size,
      showPopper,
      doDestroy: proxy.doDestroy
    }
  }
})
</script>

<style lang="scss">
@import 'theme/dropdown-menu.scss';
</style>
