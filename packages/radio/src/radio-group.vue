<template>
  <component
    :is="_elTag"
    class="el-radio-group"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, provide, watch } from 'vue'
import { useInject, useInstance, useElement } from './useRadio'
  const keyCode = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });
  export default defineComponent({
    name: 'ElRadioGroup',

    componentName: 'ElRadioGroup',

    props: {
      modelValue: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean
    },

    setup(props, { emit }) {
      const { elFormItem } = useInject()
      const ELEMENT = useElement()
      const { vnode, type } = useInstance()
      const _elFormItemSize = computed(() => elFormItem.elFormItemSize)
      const _elTag = computed(() => 'div')

      const radioGroupSize = computed(() => props.size || _elFormItemSize.value || ELEMENT.size)
      
      const handleChange = (value: any) => {
        emit('change', value)
      }
      const handleKeydown = (e: KeyboardEvent) => {
        const el = vnode.el as HTMLLIElement
        const target = e.target as HTMLInputElement
        const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
        const radios = el.querySelectorAll(className)
        const length = radios.length;
        const index = ([] as HTMLInputElement[]).indexOf.call(radios, target)
        const roleRadios = el.querySelectorAll('[role=radio]')
        switch (e.keyCode) {
          case keyCode.LEFT:
          case keyCode.UP:
            e.stopPropagation();
            e.preventDefault();
            const radioUp = roleRadios[(index === 0 ? length : index) - 1] as HTMLLIElement
            radioUp.click()
            radioUp.focus()
            break;
          case keyCode.RIGHT:
          case keyCode.DOWN:
            const radioDown = roleRadios[index === (length - 1) ? 0 : index + 1] as HTMLLIElement
            if (index === (length - 1)) {
              e.stopPropagation()
              e.preventDefault()
            }
            radioDown.click()
            radioDown.focus()
            break;
          default:
            break;
        }
      }
      const realModelValue = computed({
        get () {
          return props.modelValue
        },
        set (value) {
          emit('update:modelValue', value)
        }
      })
      watch(() => props.modelValue, (value) => {
        elFormItem.emitter?.emit('el.form.change', [value])
      })
      provide('RadioGroup', {
        emit,
        handleChange,
        radioGroupSize,
        realModelValue
      })
      onMounted(() => {
        const el = vnode.el
        // 当radioGroup没有默认选项时，第一个可以选中Tab导航
        const radios = el?.querySelectorAll('[type=radio]')
        const firstLabel = el?.querySelectorAll('[role=radio]')[0]
        if (![].some.call(radios, (radio: HTMLInputElement) => radio.checked) && firstLabel) {
          firstLabel.tabIndex = 0
        }
      })

      return {
        _elTag,
        handleKeydown
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/radio-group.scss';
</style>
