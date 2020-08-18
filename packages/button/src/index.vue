<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script lang="ts">
  interface elForm {
    elFormItemSize?: number,
    disabled?: boolean
  }
  interface elFormItem {
    elFormItemSize?: number
  }
  import { defineComponent, inject, computed } from 'vue'
  // @ts-ignore
  import elementOptions from '@src/elementOptions'
  export default defineComponent({
    name: 'ElButton',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    setup(props, cxt) {
      const elForm: elForm | void = inject('elForm', {})
      const elFormItem: elFormItem | void = inject('elFormItem', {})
      const _elFormItemSize = computed(() => {
        return (elFormItem instanceof Object ? elFormItem : {}).elFormItemSize
      })
      const buttonSize = computed(() => {
        return props.size || _elFormItemSize || elementOptions.size
      })
      const buttonDisabled = computed(() => {
        return props.disabled || (elForm instanceof Object ? elForm : {}).disabled
      })
      const handleClick = (evt: Event) => {
        cxt.emit('click', evt)
      }
      return {
        elForm,
        elFormItem,
        _elFormItemSize,
        buttonSize,
        buttonDisabled,
        handleClick
      }
    }
  })
</script>
<style lang="scss">
@import 'theme/button.scss';
</style>

