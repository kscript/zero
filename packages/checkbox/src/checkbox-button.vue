<template>
  <label
    class="el-checkbox-button"
      :class="[
        size ? 'el-checkbox-button--' + size : '',
        { 'is-disabled': isDisabled },
        { 'is-checked': isChecked },
        { 'is-focus': focus },
      ]"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    >
    <input
      v-if="trueLabel || falseLabel"
      class="el-checkbox-button__original"
      type="checkbox"
      :name="name"
      :disabled="isDisabled"
      :true-value="trueLabel"
      :false-value="falseLabel"
      v-model="realModelValue"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false">
    <input
      v-else
      class="el-checkbox-button__original"
      type="checkbox"
      :name="name"
      :disabled="isDisabled"
      :value="label"
      v-model="realModelValue"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false">

    <span class="el-checkbox-button__inner"
      v-if="slots.default || label"
      :style="isChecked ? activeStyle : null">
      <slot>{{label}}</slot>
    </span>

  </label>
</template>
<script lang="ts">
import { computed, defineComponent, inject, toRefs } from 'vue'
import { ICheckboxProps } from './type'
import { useCheckbox } from './checkbox'

  export default defineComponent ({
    name: 'ElCheckboxButton',

    props: {
      modelValue: Boolean,
      label: {},
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number]
    },

    setup(props, { slots }) {
      const {
        state,
        size,
        isChecked,
        isDisabled,
        realModelValue,
        handleChange,
        checkboxGroup,
      } = useCheckbox(props as ICheckboxProps)
      const activeStyle = computed(() => {
        return {
          backgroundColor: checkboxGroup.fill || '',
          borderColor: checkboxGroup.fill || '',
          color: checkboxGroup.textColor || '',
          'box-shadow': '-1px 0 0 0 ' + checkboxGroup.fill
        }
      })
      return {
        ...toRefs(state),
        slots,

        size,
        isChecked,
        isDisabled,
        realModelValue,

        activeStyle,

        handleChange
      }
    }
  })
</script>
