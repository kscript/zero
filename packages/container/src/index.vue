<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, Slot, VNode } from 'vue'
export default defineComponent({
  name: 'ElContainer',

  componentName: 'ElContainer',

  props: {
    direction: String
  },

  setup(props, cxt) {
    const isVertical = computed(() => {
      const { direction } = props
      if (direction === 'vertical') {
        return true;
      } else if (direction === 'horizontal') {
        return false;
      }
      const slot = cxt.slots.default
      return slot
        ? slot().some((vnode: VNode) => {
          const type = vnode.type
          let name = ''
          if (typeof type === 'string') {
            name = type
          } else if (type instanceof Object) {
            name = (type as anyObject).name
          }
          return name === 'ElHeader' || name === 'ElFooter'
        })
        : false
    })
    return {
      isVertical
    }
  }
})
</script>
<style lang="scss">
@import 'theme/container.scss';
</style>
