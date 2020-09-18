import ElementUIOptions from 'packages/ElementUIOptions'
import { ref, computed, inject, getCurrentInstance, ComponentInternalInstance } from 'vue'

const isEmpty = (obj: anyObject) => {
  for(let k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false
    }
  }
  return true
}

export const useElement = () => ElementUIOptions

export const useInstance = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { emit, refs, attrs, type, props, vnode } = instance || {}
  return { instance, emit, refs, attrs, type, props, vnode }
}

export const useInject = () => {
  const elForm = inject('elForm', {}) as anyObject
  const elFormItem = inject('elFormItem', {}) as anyObject
  const radioGroup = inject('RadioGroup', {}) as anyObject
  return { elForm, elFormItem, radioGroup }
}

export const useState = (props: anyObject) => {
  const { elForm, elFormItem, radioGroup } = useInject()
  const isGroup = computed(() => !isEmpty(radioGroup))
  const elFormItemSize = computed(() => {
    return (elFormItem || {}).elFormItemSize
  })
  const size = computed(() => {
    return radioGroup.radioGroupSize.value || elFormItemSize.value || ElementUIOptions.value.size
  })
  const isDisabled = computed(() => {
    return isGroup.value
      ? radioGroup.disabled || props.disabled || elForm.disabled
      : props.disabled || elForm.disabled
  })
  const tabIndex = computed(() => {
    return (isDisabled.value || (radioGroup.value && props.modelValue !== props.label)) ? -1 : 0;
  })
  return { radioGroup, isGroup, elFormItemSize, size, isDisabled, tabIndex }
}

export const useRadio = (props: anyObject) => {
  const { emit, refs } = useInstance()
  const { isGroup, radioGroup, ...state } = useState(props)
  const focus = ref(false)
  const realModelValue = computed({
    get() {
      return isGroup.value ? radioGroup.realModelValue.value : props.modelValue
    },
    set(val) {
      if (isGroup.value) {
        radioGroup.emit?.('update:modelValue', val)
      } else {
        emit('update:modelValue', val)
      }
      refs.radio && ((refs.radio as HTMLInputElement).checked = realModelValue.value === props.label)
    }
  })
  return {
    ...state,

    focus,
    ElementUIOptions,

    isGroup,
    radioGroup,

    realModelValue
  }
}

export default useRadio