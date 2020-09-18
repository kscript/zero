<script lang="ts">
  import ElementUIOptions from 'packages/ElementUIOptions'
  import { defineComponent, computed, inject, provide, watch } from 'vue'
  import { ElFormItem, CheckboxGroup } from './type'
  
  export default defineComponent({
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    props: {
      modelValue: {
        type: [Object, Boolean, Array],
        default: () => undefined
      },
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    setup(props, { emit }) {
      const elFormItem = inject('elFormItem', {}) as ElFormItem
      const elFormItemSize = computed(() => {
        return (elFormItem || {}).elFormItemSize
      })
      const checkboxGroupSize = computed(() => {
        return props.size || elFormItemSize.value || ElementUIOptions.value.size
      })

      watch(() => props.modelValue, (value) => {
        elFormItem.emitter?.emit('el.form.change', [value])
      })

      const realModelValue = computed({
        get () {
          return props.modelValue
        },
        set (value) {
          emit('input', value)
          emit('update:modelValue', value)
        }
      })
      // modelValue 引用会被丢弃, 不能直接使用
      provide('checkboxGroup', {
        ...props,
        realModelValue,
        emit
      } as CheckboxGroup)
    }
  })
</script>

<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
