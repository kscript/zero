<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': isFixed,
            'is-dot': isDot
          }
        ]">
      </sup>
    </transition>
  </div>
</template>


<script>
  import { defineComponent, computed, ref } from 'vue'
  export default defineComponent({
    name: 'ElBadge',

    props: {
      value: [String, Number],
      max: Number,
      isDot: Boolean,
      hidden: Boolean,
      type: {
        type: String,
        validator(val) {
          return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1;
        }
      }
    },

    setup(props, cxt) {
      const content = computed(() => {
        if (props.isDot) return;

        const value = props.value;
        const max = props.max;

        if (typeof value === 'number' && typeof max === 'number') {
          return max < value ? `${max}+` : value;
        }

        return value;
      })
      const isFixed = ref(!!cxt.slots.default)
      return {
        content,
        isFixed
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/badge.scss';
</style>
