<template>
  <li
    class="el-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'el-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue'
import { ElDropdownProvide } from './type'
export default defineComponent({
  name: 'ElDropdownItem',

  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  emits: ['input'],

  setup(props) {
    const { emitter } = inject('elDropdown', {} as ElDropdownProvide)
    const instance = getCurrentInstance()
    const handleClick = (e: Event) => {
      emitter.emit('menu-item-click', [props.command, instance])
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss">
@import 'theme/dropdown-item.scss';
</style>
