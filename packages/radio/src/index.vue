<template>
  <label
    class="el-radio"
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': realModelValue === label }
    ]"
    role="radio"
    :aria-checked="realModelValue === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="realModelValue = isDisabled ? realModelValue : label"
  >
    <span class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': realModelValue === label
      }"
    >
      <span class="el-radio__inner"></span>
      <input
        ref="radio"
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="realModelValue"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="el-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick } from 'vue'
  import useRadio from './useRadio'
  export default defineComponent({
    name: 'ElRadio',

    componentName: 'ElRadio',

    props: {
      modelValue: {},
      label: {},
      disabled: Boolean,
      name: String,
      border: Boolean,
      size: String
    },

    setup(props, { emit, slots }) {
      const { focus, isGroup, elFormItemSize, isDisabled, tabIndex, realModelValue, radioGroup, ElementUIOptions } = useRadio(props)
      const radioSize = computed(() => {
        const temRadioSize = props.size || elFormItemSize.value || ElementUIOptions.value.size
        return isGroup.value
          ? radioGroup.radioGroupSize.value || temRadioSize
          : temRadioSize
      })
      const handleChange = () => {
        nextTick(() => {
          emit('change', realModelValue.value)
          isGroup.value && radioGroup.handleChange?.(realModelValue.value)
        })
      }

      return {
        slots,
        focus, isGroup, elFormItemSize, isDisabled, tabIndex, realModelValue,
        radioSize,
        handleChange
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/radio.scss';
</style>
