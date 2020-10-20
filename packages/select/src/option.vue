<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    class="el-select-dropdown__item"
    v-show="visible"
    :class="{
      selected: itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      hover: hover
    }"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
// @ts-ignore
import { getValueByPath, escapeRegexpString } from '@/utils/util'
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onUnmounted,
  reactive,
  toRefs,
  watch
} from 'vue'

export default defineComponent({
  name: 'ElOption',

  componentName: 'ElOption',

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const state = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const select = inject('elSelect', {} as anyObject)
    const { props: selectProps, state: selectState, emitter } = select
    const isObject = computed(
      () =>
        Object.prototype.toString.call(props.value).toLowerCase() ===
        '[object object]'
    )
    const currentLabel = computed(() => {
      return props.label || (isObject.value ? '' : props.value)
    })

    const currentValue = computed(() => {
      return props.value || props.label || ''
    })

    const itemSelected = computed(() => {
      if (!selectProps.multiple) {
        return isEqual(props.value, selectProps.modelValue)
      } else {
        return contains(selectProps.modelValue, props.value)
      }
    })

    const limitReached = computed(() => {
      if (selectProps.multiple) {
        return (
          !itemSelected.value &&
          (selectProps.modelValue || []).length >= selectProps.multipleLimit &&
          selectProps.multipleLimit > 0
        )
      } else {
        return false
      }
    })

    const optionInstance = Object.assign({}, instance, {
      ...props,
      currentLabel
    })
    
    const isEqual = (a: any, b: any) => {
      if (!isObject.value) {
        return a === b
      } else {
        const valueKey = selectProps.valueKey
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
      }
    }

    const contains = (arr = [] as any[], target: any) => {
      if (!isObject.value) {
        return arr && arr.indexOf(target) > -1
      } else {
        const valueKey = selectProps.valueKey
        return (
          arr &&
          arr.some(item => {
            return (
              getValueByPath(item, valueKey) ===
              getValueByPath(target, valueKey)
            )
          })
        )
      }
    }

    const handleGroupDisabled = (val: boolean) => {
      state.groupDisabled = val
    }
    const hoverItem = () => {
      if (!props.disabled && !state.groupDisabled) {
        selectState.hoverIndex = selectState.options.indexOf(instance)
      }
    }

    const selectOptionClick = () => {
      if (props.disabled !== true && state.groupDisabled !== true) {
        emitter.emit('handleOptionClick', [optionInstance, true])
      }
    }

    const queryChange = (query: string) => {
      state.visible =
        new RegExp(escapeRegexpString(query), 'i').test(
          currentLabel.value as string
        ) || props.created!
      if (!state.visible) {
        selectState.filteredOptionsCount--
      }
    }

    watch(
      () => currentLabel.value,
      () => {
        if (!props.created && !selectProps.remote)
          emitter.emit('setSelected')
      }
    )
    watch(
      () => props.value,
      (val: anyObject, oldVal: anyObject) => {
        const { remote, valueKey } = select
        if (!props.created && !remote) {
          if (
            valueKey &&
            val instanceof Object &&
            oldVal instanceof Object) {
            // @ts-ignore
            if (val[valueKey] === oldVal[valueKey]) {
              return
            }
          }
          emitter.emit('setSelected')
        }
      }
    )

    
    selectState.options.push(optionInstance)
    selectState.cachedOptions.push(optionInstance)
    selectState.optionsCount++
    selectState.filteredOptionsCount++
    // this.$on('queryChange', this.queryChange);
    // this.$on('handleGroupDisabled', this.handleGroupDisabled);
    onUnmounted(() => {
      const { selected, multiple } = select
      let selectedOptions = multiple ? selected : [selected]
      let index = selectState.cachedOptions.indexOf(instance)
      let selectedIndex = selectedOptions.indexOf(instance)

      // if option is not selected, remove it from cache
      if (index > -1 && selectedIndex < 0) {
        selectState.cachedOptions.splice(index, 1)
      }
      select.onOptionDestroy(selectState.options.indexOf(instance))
    })
    return {
      ...toRefs(state),
      hoverItem,
      selectOptionClick,
      itemSelected,
      limitReached,
      currentLabel
    }
  }
})
</script>
