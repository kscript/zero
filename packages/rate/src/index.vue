<template>
  <div
    class="el-rate"
    @keydown="handleKey"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
  >
    <span
      v-for="(item, key) in max"
      class="el-rate__item"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
      :key="key"
    >
      <i
        :class="[classes[item - 1], { hover: hoverIndex === item }]"
        class="el-rate__icon"
        :style="getIconStyle(item)"
      >
        <i
          v-if="showDecimalIcon(item)"
          :class="decimalIconClass"
          :style="decimalStyle"
          class="el-rate__decimal"
        >
        </i>
      </i>
    </span>
    <span
      v-if="showText || showScore"
      class="el-rate__text"
      :style="{ color: textColor }"
      >{{ text }}</span
    >
  </div>
</template>

<script lang="ts">
import { hasClass } from '@/utils/dom'
// @ts-ignore
import { isObject } from '@/utils/types'
import Migrating from '@/mixins/migrating'
import { computed, defineComponent, inject, Prop, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'ElRate',

  mixins: [Migrating],

  emits: ['input', 'update:modelValue'],

  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    lowThreshold: {
      type: Number,
      default: 2
    },
    highThreshold: {
      type: Number,
      default: 4
    },
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: [Array, Object],
      default() {
        return ['#F7BA2A', '#F7BA2A', '#F7BA2A']
      }
    } as Prop<string[] | anyObject<string>>,
    voidColor: {
      type: String,
      default: '#C6D1DE'
    },
    disabledVoidColor: {
      type: String,
      default: '#EFF2F7'
    },
    iconClasses: {
      type: [Array, Object],
      default() {
        return ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']
      }
    } as Prop<string[] | anyObject<string>>,
    voidIconClass: {
      type: String,
      default: 'el-icon-star-off'
    },
    disabledVoidIconClass: {
      type: String,
      default: 'el-icon-star-on'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: '#1f2d3d'
    },
    texts: {
      type: Array,
      default() {
        return ['极差', '失望', '一般', '满意', '惊喜']
      }
    } as Prop<string[]>,
    scoreTemplate: {
      type: String,
      default: '{value}'
    }
  },

  setup(props, { emit }) {
    const ElForm = inject('ElForm', {} as anyObject)
    const state = reactive({
      pointerAtLeftHalf: true,
      currentValue: props.modelValue,
      hoverIndex: -1
    })
    const text = computed(() => {
      let result = ''
      if (props.showScore) {
        result = props.scoreTemplate.replace(
          /\{\s*value\s*\}/,
          String(rateDisabled.value ? props.modelValue : state.currentValue)
        )
      } else if (props.showText) {
        result = props.texts![Math.ceil(state.currentValue) - 1]
      }
      return result
    })
    const decimalStyle = computed(() => {
      let width = ''
      if (rateDisabled.value) {
        width = `${valueDecimal.value}%`
      } else if (props.allowHalf) {
        width = '50%'
      }
      return {
        color: activeColor.value,
        width
      }
    })
    const valueDecimal = computed(() => {
      return props.modelValue * 100 - Math.floor(props.modelValue) * 100
    })
    const classMap = computed(() => {
      return Array.isArray(props.iconClasses)
        ? {
            [props.lowThreshold]: props.iconClasses[0],
            [props.highThreshold]: {
              value: props.iconClasses[1],
              excluded: true
            },
            [props.max]: props.iconClasses[2]
          }
        : props.iconClasses
    })
    const decimalIconClass = computed(() => {
      return getValueFromMap(props.modelValue, classMap.value)
    })
    const voidClass = computed(() => {
      return rateDisabled.value
        ? props.disabledVoidIconClass
        : props.voidIconClass
    })
    const activeClass = computed(() => {
      return getValueFromMap(state.currentValue, classMap.value)
    })
    const colorMap = computed(() => {
      return Array.isArray(props.colors)
        ? {
            [props.lowThreshold]: props.colors[0],
            [props.highThreshold]: { value: props.colors[1], excluded: true },
            [props.max]: props.colors[2]
          }
        : props.colors
    })
    const activeColor = computed(() => {
      return getValueFromMap(state.currentValue, colorMap.value)
    })
    const classes = computed(() => {
      let result = []
      let i = 0
      let threshold = state.currentValue
      if (
        props.allowHalf &&
        state.currentValue !== Math.floor(state.currentValue)
      ) {
        threshold--
      }
      for (; i < threshold; i++) {
        result.push(activeClass.value)
      }
      for (; i < props.max; i++) {
        result.push(voidClass.value)
      }
      return result
    })
    const rateDisabled = computed(() => {
      return props.disabled || (ElForm || {}).disabled
    })
    const getMigratingConfig = () => {
      return {
        props: {
          'text-template': 'text-template is renamed to score-template.'
        }
      }
    }
    const getValueFromMap = (value: number, map: anyObject = {}) => {
      const matchedKeys = Object.keys(map)
        .filter(key => {
          const val = map[key]
          const excluded = isObject(val) ? val.excluded : false
          return excluded ? value < Number(key) : value <= Number(key)
        })
        .sort((a, b) => Number(a) - Number(b))
      const matchedValue = map[matchedKeys[0]]
      return isObject(matchedValue) ? matchedValue.value : matchedValue || ''
    }
    const showDecimalIcon = (item: number) => {
      let showWhenDisabled =
        rateDisabled.value &&
        valueDecimal.value > 0 &&
        item - 1 < props.modelValue &&
        item > props.modelValue
      /* istanbul ignore next */
      let showWhenAllowHalf =
        props.allowHalf &&
        state.pointerAtLeftHalf &&
        item - 0.5 <= state.currentValue &&
        item > state.currentValue
      return showWhenDisabled || showWhenAllowHalf
    }
    const getIconStyle = (item: number) => {
      const voidColor = rateDisabled.value
        ? props.disabledVoidColor
        : props.voidColor
      return {
        color: item <= state.currentValue ? activeColor.value : voidColor
      }
    }
    const selectValue = (value: number) => {
      if (rateDisabled.value) {
        return
      }
      if (props.allowHalf && state.pointerAtLeftHalf) {
        emit('input', state.currentValue)
        emit('update:modelValue', state.currentValue)
      } else {
        emit('input', value)
        emit('update:modelValue', value)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (rateDisabled.value) {
        return
      }
      let currentValue = state.currentValue
      const keyCode = e.keyCode
      if (keyCode === 38 || keyCode === 39) {
        // left / down
        if (props.allowHalf) {
          currentValue += 0.5
        } else {
          currentValue += 1
        }
        e.stopPropagation()
        e.preventDefault()
      } else if (keyCode === 37 || keyCode === 40) {
        if (props.allowHalf) {
          currentValue -= 0.5
        } else {
          currentValue -= 1
        }
        e.stopPropagation()
        e.preventDefault()
      }
      currentValue = currentValue < 0 ? 0 : currentValue
      currentValue = currentValue > props.max ? props.max : currentValue

      emit('input', currentValue)
      emit('update:modelValue', currentValue)
    }
    const setCurrentValue = (value: number, event: MouseEvent) => {
      if (rateDisabled.value) {
        return
      }
      /* istanbul ignore if */
      if (props.allowHalf) {
        let target = event.target as HTMLElementX
        if (hasClass(target, 'el-rate__item')) {
          target = target.querySelector('.el-rate__icon') as HTMLElement
        }
        if (hasClass(target, 'el-rate__decimal')) {
          target = target.parentNode as HTMLElement
        }
        state.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth
        state.currentValue = state.pointerAtLeftHalf ? value - 0.5 : value
      } else {
        state.currentValue = value
      }
      state.hoverIndex = value
    }
    const resetCurrentValue = () => {
      if (rateDisabled.value) {
        return
      }
      if (props.allowHalf) {
        state.pointerAtLeftHalf = props.modelValue !== Math.floor(props.modelValue)
      }
      state.currentValue = props.modelValue
      state.hoverIndex = -1
    }
    watch(
      () => props.modelValue,
      val => {
        state.currentValue = val
        state.pointerAtLeftHalf = props.modelValue !== Math.floor(props.modelValue)
      }
    )
    if (!props.modelValue) {
      emit('input', 0)
    }
    return {
      ...toRefs(state),
      text,
      rateDisabled,
      classes,
      decimalIconClass,
      decimalStyle,

      handleKey,
      setCurrentValue,
      resetCurrentValue,
      selectValue,
      getIconStyle,
      showDecimalIcon,
    }
  }
})
</script>

<style lang="scss">
@import 'theme/rate.scss';
</style>
