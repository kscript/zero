<template>
  <label
    class="el-radio-button"
    :class="[
      size ? 'el-radio-button--' + size : '',
      { 'is-active': realModelValue === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="realModelValue === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="realModelValue = isDisabled ? realModelValue : label"
  >
    <input
      class="el-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="realModelValue"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    >
    <span
      class="el-radio-button__inner"
      :style="realModelValue === label ? activeStyle : null"
      @keydown.stop>
      <slot></slot>
      <template v-if="!slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import useRadio from './useRadio'
  export default defineComponent({
    name: 'ElRadioButton',

    props: {
      label: {},
      disabled: Boolean,
      name: String
    },
    setup(props, { emit, slots }) {
      const { focus, size, isGroup, isDisabled, tabIndex, radioGroup, ElementUIOptions } = useRadio(props)
      const realModelValue = computed({
        get() {
          return radioGroup.realModelValue.value
        },
        set(value) {
          radioGroup.emit('update:modelValue', value)
        }
      })
      const activeStyle = computed(() => {
        return {
          backgroundColor: radioGroup.fill || '',
          borderColor: radioGroup.fill || '',
          color: radioGroup.textColor || '',
          'box-shadow': '-1px 0 0 0 ' + radioGroup.fill
        }
      })
      const handleChange = () => {
        radioGroup.trigger?.('handleChange', realModelValue.value)
      }
      return {
        slots,
        focus, size, isGroup, isDisabled, tabIndex,
        realModelValue, 
        activeStyle,
        handleChange
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/radio-button.scss';
</style>