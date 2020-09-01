<template>
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="attrs"
    @click="handleClick"
  >

    <i :class="icon" v-if="icon"></i>

    <span v-if="slots.default" class="el-link--inner">
      <slot></slot>
    </span>

    <template v-if="slots.icon"><slot v-if="slots.icon" name="icon"></slot></template>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElLink',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },
  setup(props, { emit, attrs, slots }) {
    const handleClick = (event: Event)=> {
      if (!props.disabled) {
        if (!props.href) {
          emit('click', event)
        }
      }
    }
    return {
      attrs,
      slots,
      handleClick
    }
  }
})
</script>

<style lang="scss">
@import 'theme/link.scss';
</style>
