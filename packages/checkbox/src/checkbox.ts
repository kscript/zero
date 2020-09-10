import { ComponentInternalInstance, computed, ComputedRef, defineComponent, getCurrentInstance, inject, nextTick, onMounted, reactive, ref, toRefs, watch, Prop } from 'vue';
import { ElForm, ElFormItem, CheckboxGroup, ICheckboxProps } from './type'
import elementOptions from '@/elementOptions'


export const useCheckbox = (props: ICheckboxProps) => {
  const elForm = inject('ElForm', {}) as ElForm
  const elFormItem = inject('elFormItem', {}) as ElFormItem
  const checkboxGroup = inject('checkboxGroup', {}) as CheckboxGroup
  const instance = getCurrentInstance() as ComponentInternalInstance 
  const { emit } = instance
  const state = reactive({
    selfModel: false,
    focus: false,
    isLimitExceeded: false
  })
  
  const isChecked = computed(() => {
    let result
    if ({}.toString.call(realModelValue.value) === '[object Boolean]') {
      result = realModelValue.value;
    } else if (Array.isArray(realModelValue.value)) {
      result = realModelValue.value.indexOf(props.label) > -1;
    } else if (realModelValue.value !== null && realModelValue.value !== undefined) {
      result = realModelValue.value === props.checked;
    }
    return result
  })
  
  const isGroup = computed(() => {
    let parent = instance.parent
    while (parent) {
      if (parent.type.name !== 'ElCheckboxGroup') {
        parent = parent.parent
      } else {
        return true;
      }
    }
    return false;
  })

  const store = computed(() => {
    return checkboxGroup.hasOwnProperty('modelValue') ? checkboxGroup.realModelValue.value : props.modelValue;
  })

  /* used to make the isDisabled judgment under max/min props */
  const isLimitDisabled = computed(() => {
    const { max, min } = checkboxGroup;
    return !!(max || min) && Array.isArray(realModelValue.value) && (
      (realModelValue.value.length >= max && !isChecked.value) ||
      (realModelValue.value.length <= min && isChecked.value));
  })

  const isDisabled = computed(() => {
    return isGroup.value
      ? checkboxGroup.disabled || props.disabled || (elForm || {}).disabled || isLimitDisabled.value
      : props.disabled || (elForm || {}).disabled;
  })

  const elFormItemSize = computed(() => {
    return (elFormItem || {}).elFormItemSize;
  })
  const size = computed(() => checkboxGroup?.size || elFormItemSize.value || elementOptions.size)
  const checkboxSize = computed(() => {
    const temCheckboxSize = props.size || elFormItemSize.value || elementOptions.size;
    return isGroup.value
      ? checkboxGroup.size || temCheckboxSize
      : temCheckboxSize;
  })
  const realModelValue = computed({
    get() {
      return isGroup.value ? store.value : props.modelValue !== undefined ? props.modelValue : state.selfModel
    },
    set(val) {
      const vals = Array.isArray(val) ? val : [val]
      if (isGroup.value) {
        state.isLimitExceeded = false;
        (checkboxGroup.min !== undefined &&
          vals.length < checkboxGroup.min &&
          (state.isLimitExceeded = true));

        (checkboxGroup.max !== undefined &&
          vals.length > checkboxGroup.max &&
          (state.isLimitExceeded = true));
        if (state.isLimitExceeded === false) {
          checkboxGroup.emit?.('update:modelValue', ([] as any).concat(val))
        }
      } else {
        emit('update:modelValue', vals[0])
        state.selfModel = vals[0]
      }
    }
  })
  const addToStore = () => {
    if (
      Array.isArray(realModelValue.value) &&
      realModelValue.value.indexOf(props.label) === -1
    ) {
      realModelValue.value.push(props.label);
    } else {
      realModelValue.value = props.checked || true
    }
  }
  const handleChange = (ev: MouseEvent) => {
    if (state.isLimitExceeded) return;
    let value;
    if ((ev.target as HTMLInputElement).checked) {
      value = props.trueLabel === undefined ? true : props.trueLabel;
    } else {
      value = props.falseLabel === undefined ? false : props.falseLabel;
    }
    emit('change', value, ev);
    nextTick(() => {
      if (isGroup.value) {
        checkboxGroup.emit?.('change', realModelValue.value);
      }
    });
    ev.stopPropagation();
  }
  
  watch(() => props.modelValue, (value) => {
    elFormItem.emitter?.emit('el.form.change', value)
  })
  
  props.checked && addToStore()
  return {
    state,
    isDisabled,
    isChecked,
    checkboxSize,
    realModelValue,
    size,
    handleChange,
    checkboxGroup,
    instance,
  }
}