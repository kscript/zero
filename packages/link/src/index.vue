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

    <span v-if="slot" class="el-link--inner">
      <slot></slot>
    </span>

    <template v-if="icon"><slot v-if="icon" name="icon"></slot></template>
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
    const icon = slots.icon?.() || ''
    const slot = slots.default?.() || ''
    return {
      attrs,
      icon,
      slot,
      handleClick
    }
  }
})
</script>

<style lang="scss">
@import 'theme/link.scss';
</style>
