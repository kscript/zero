import elementOptions from '@/elementOptions'
import { ref, computed, inject, getCurrentInstance, ComponentInternalInstance } from 'vue'

const isEmpty = (obj: anyObject) => {
  for(let k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false
    }
  }
  return true
}

export const useElement = () => elementOptions

export const useInstance = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { emit, refs, attrs, type, props, vnode } = instance || {}
  return { instance, emit, refs, attrs, type, props, vnode }
}

export const useInject = () => {
  const elForm = inject('elForm', {}) as anyObject
  const elFormItem = inject('elFormItem', {}) as anyObject
  const _radioGroup = inject('RadioGroup', {}) as anyObject
  return { elForm, elFormItem, _radioGroup }
}

export const useState = (props: anyObject) => {
  const { elForm, elFormItem, _radioGroup } = useInject()
  const isGroup = computed(() => !isEmpty(_radioGroup))
  const _elFormItemSize = computed(() => {
    return (elFormItem || {}).elFormItemSize
  })
  const size = computed(() => {
    return _radioGroup.radioGroupSize.value || _elFormItemSize.value || elementOptions.size
  })
  const isDisabled = computed(() => {
    return isGroup.value
      ? _radioGroup.disabled || props.disabled || elForm.disabled
      : props.disabled || elForm.disabled
  })
  const tabIndex = computed(() => {
    return (isDisabled.value || (_radioGroup.value && props.modelValue !== props.label)) ? -1 : 0;
  })
  return { _radioGroup, isGroup, _elFormItemSize, size, isDisabled, tabIndex }
}

export const useRadio = (props: anyObject) => {
  const { emit, refs } = useInstance()
  const { isGroup, _radioGroup, ...state } = useState(props)
  const focus = ref(false)
  const realModelValue = computed({
    get() {
      return isGroup.value ? _radioGroup.realModelValue.value : props.modelValue
    },
    set(val) {
      if (isGroup.value) {
        _radioGroup.emit?.('update:modelValue', val)
      } else {
        emit('update:modelValue', val)
      }
      refs.radio && ((refs.radio as HTMLInputElement).checked = realModelValue.value === props.label)
    }
  })
  return {
    ...state,

    focus,
    elementOptions,

    isGroup,
    _radioGroup,

    realModelValue
  }
}

export default useRadio