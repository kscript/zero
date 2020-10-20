<template>
  <ul class="el-select-group__wrap" v-show="visible">
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'ElOptionGroup',

  componentName: 'ElOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const visible = ref(true)
    const children = ref([] as anyObject[])
    const { emitter } = inject('elSelect', {} as anyObject)
    watch(
      () => props.disabled,
      val => {
        emitter.emit('handleGroupDisabled', val)
      }
    )
    const queryChange = () => {
      visible.value =
        children.value &&
        Array.isArray(children.value) &&
        children.value.some(option => option.visible === true)
    }
    emitter.on('queryChange', queryChange)
    onMounted(() => {
      if (props.disabled) {
        emitter.emit('handleGroupDisabled', props.disabled)
      }
    })
    return {
      visible
    }
  }
})
</script>
