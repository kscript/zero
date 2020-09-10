<template>
  <label
    class="el-checkbox"
    :class="[
      border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    :id="id"
  >
    <span class="el-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="el-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
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
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="realModelValue"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="el-checkbox__label" v-if="slots.default || label">
      <slot></slot>
      <template v-if="!slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
import { ICheckboxProps } from './type'
import { useCheckbox, useInstance } from './useCheckbox'
  export default defineComponent({
    name: 'ElCheckbox',

    props: {
      modelValue: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number],
      id: String,
      controls: String,
      border: Boolean,
      size: String
    },

    setup(props, { emit, slots }) {
      const { vnode } = useInstance()
      const {
        state,
        isDisabled,
        isChecked,
        checkboxSize,
        realModelValue,
        handleChange
      } = useCheckbox(props as ICheckboxProps)

      onMounted(() => {
        if (props.indeterminate) {
          vnode.el?.setAttribute('aria-controls', props.controls)
        }
      })

      return {
        ...toRefs(state),
        slots,

        isDisabled,
        isChecked,
        checkboxSize,

        realModelValue,
        handleChange
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/checkbox.scss';
</style>
