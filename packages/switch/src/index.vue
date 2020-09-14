<template>
  <div
    class="el-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <input
      class="el-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    />
    <span
      :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText"
    >
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }"></span>
    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText"
    >
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import Focus from '@/mixins/focus'
// @ts-ignore
import Migrating from '@/mixins/migrating'
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, nextTick, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ElSwitch',
  mixins: [Focus('input'), Migrating],
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String as PropType<string>,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String
  },
  
  setup(props, {emit}) {
    const elForm = inject('elForm', {} as anyObject)
    const instance = getCurrentInstance() as ComponentInternalInstance
    const coreWidth = ref(props.width)
    const checked = computed(() => {
      return props.modelValue === props.activeValue
    })
    const switchDisabled = computed(() => {
      return props.disabled || elForm.disabled
    })
    
    const handleChange = (event?: Event) => {
      const val = checked.value ? props.inactiveValue : props.activeValue
      emit('update:modelValue', val)
      emit('change', val)
      nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        (instance.refs.input as HTMLInputElement).checked = checked.value
        setBackgroundColor()
      })
    }
    const setBackgroundColor = () => {
      let newColor = checked.value ? props.activeColor : props.inactiveColor
      const core = instance.refs.core as HTMLElement
      core.style.borderColor = newColor
      core.style.backgroundColor = newColor
    }
    const switchValue = () => {
      !switchDisabled.value && handleChange()
    }
    const getMigratingConfig = () => {
      return {
        props: {
          'on-color': 'on-color is renamed to active-color.',
          'off-color': 'off-color is renamed to inactive-color.',
          'on-text': 'on-text is renamed to active-text.',
          'off-text': 'off-text is renamed to inactive-text.',
          'on-value': 'on-value is renamed to active-value.',
          'off-value': 'off-value is renamed to inactive-value.',
          'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
          'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
        }
      }
    }
    if (!~[props.activeValue, props.inactiveValue].indexOf(props.modelValue)) {
      emit('update:modelValue', props.inactiveValue)
    }
    onMounted(() => {
      coreWidth.value = props.width || 40
      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor()
      }
      (instance.refs.input as HTMLInputElement).checked = checked.value
    })
    return {
      coreWidth,
      switchDisabled,
      checked,
      switchValue,
      handleChange
    }
  }
})
</script>

<style lang="scss">
@import 'theme/switch.scss';
</style>
