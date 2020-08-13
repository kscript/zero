<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
import { defineComponent, computed, Slot } from 'vue'
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
        ? slot().some(vnode => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag;
          return tag === 'el-header' || tag === 'el-footer';
        })
        : false;
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
