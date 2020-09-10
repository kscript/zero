<template functional>
  <div
    v-bind="attrs"
    :class="['el-divider', `el-divider--${direction}`]"
  >
    <div
      v-if="slots.default && direction !== 'vertical'"
      :class="['el-divider__text', `is-${contentPosition}`]"
     >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val: string) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val: string) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    }
  },
  setup(props, { slots, attrs }) {
    return {
      slots,
      attrs
    }
  }
})

</script>

<style lang="scss">
@import 'theme/divider.scss';
</style>
