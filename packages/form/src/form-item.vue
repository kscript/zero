<template>
  <div
    class="el-form-item"
    :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': elForm && elForm.hideRequiredAsterisk
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]"
  >
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'"
    >
      <label
        :for="labelFor"
        class="el-form-item__label"
        :style="labelStyle"
        v-if="label || slots.label"
      >
        <slot name="label">{{label + elForm.labelSuffix}}</slot>
      </label>
    </label-wrap>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && elForm.showMessage"
          name="error"
          :error="validateMessage"
        >
          <div
            class="el-form-item__error"
            :class="{
              'el-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (elForm && elForm.inlineMessage || false)
            }"
          >{{validateMessage}}</div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import AsyncValidator, { ErrorList, FieldErrorList } from 'async-validator'
// @ts-ignore
import objectAssign from '@/utils/merge'
// @ts-ignore
import { noop, getPropByPath } from '@/utils/util'
import LabelWrap from './label-wrap.vue'
import ElementUIOptions from 'packages/ElementUIOptions'
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import mitt from 'mitt'
export default defineComponent({
  name: 'ElFormItem',

  componentName: 'ElFormItem',

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  components: {
    LabelWrap
  },
  setup(props, { slots }) {
    const { emitter: formEmitter, size, autoLabelWidth, props: elForm } = inject('elForm', {} as anyObject)
    const emitter = mitt()
    const instance = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: ''
    })
    const labelFor = computed(() => {
      return props.for || props.prop
    })
    const labelStyle = computed(() => {
      const ret = {} as CSSStyleDeclaration
      if (elForm.labelPosition === 'top') return ret
      const labelWidth = props.labelWidth || elForm.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    })
    const contentStyle = computed(() => {
      const ret = {} as CSSStyleDeclaration
      const label = props.label
      if (elForm.labelPosition === 'top' || elForm.inline) return ret
      if (!label && !props.labelWidth && state.isNested) return ret
      const labelWidth = props.labelWidth || elForm.labelWidth
      if (labelWidth === 'auto') {
        if (props.labelWidth === 'auto') {
          ret.marginLeft = state.computedLabelWidth
        } else if (elForm.labelWidth === 'auto') {
          ret.marginLeft = autoLabelWidth.value
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    })
    const form = computed(() => {
      let parent = instance.parent as ComponentInternalInstance
      let parentName = parent.type.name
      while (parentName !== 'ElForm') {
        if (parentName === 'ElFormItem') {
          state.isNested = true
        }
        parent = parent.parent as ComponentInternalInstance
        parentName = parent.type.name
      }
      return parent as anyObject
    })
    const fieldValue = computed(() => {
      const model = (elForm as anyObject).model 
      if (!model || !props.prop) {
        return
      }

      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      return getPropByPath(model, path, true).v
    })
    const isRequired = computed(() => {
      let rules = getRules()
      let isRequired = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    })
    const formSize = computed(() => {
      return size
    })
    const elFormItemSize = computed(() => {
      return props.size || formSize.value
    })
    const sizeClass = computed(() => {
      return elFormItemSize.value || ElementUIOptions.value.size
    })
    
    const validate = (trigger: string, callback: Function = noop) => {
      state.validateDisabled = false
      const rules = getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback()
        return true
      }

      state.validateState = 'validating'

      const descriptor = {} as anyObject
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      props.prop && 
      (descriptor[props.prop] = rules)

      const validator = new AsyncValidator(descriptor)
      const model = {} as anyObject

      props.prop && 
      (model[props.prop] = fieldValue.value)

      validator.validate(
        model,
        { firstFields: true },
        (errors: ErrorList, invalidFields: FieldErrorList) => {
          state.validateState = !errors ? 'success' : 'error'
          state.validateMessage = errors ? errors[0].message : ''
          callback(state.validateMessage, invalidFields)
          formEmitter.emit(
            'validate',
            [props.prop,
            !errors,
            state.validateMessage || null]
          )
        }
      )
    }
    const clearValidate = () => {
      state.validateState = ''
      state.validateMessage = ''
      state.validateDisabled = false
    }
    const resetField = () => {
      state.validateState = ''
      state.validateMessage = ''

      let model = (elForm as anyObject).model
      let value = fieldValue.value
      let path = props.prop || ''
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      let prop = getPropByPath(model, path, true)

      state.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = ([] as any).concat(initialValue.value)
      } else {
        prop.o[prop.k] = initialValue.value
      }
      // reset validateDisabled after onFieldChange triggered
      nextTick(() => {
        state.validateDisabled = false
      })
    }
    const getRules = () => {
      let formRules = (elForm as anyObject).rules
      const selfRules = props.rules
      const requiredRule =
        props.required !== undefined ? { required: !!props.required } : []
      const prop = getPropByPath(formRules, props.prop || '')
      formRules = formRules ? prop.o[props.prop || ''] || prop.v : []

      return ([].concat(selfRules || formRules || []) as any[]).concat(requiredRule)
    }
    const getFilteredRule = (trigger: string) => {
      const rules = getRules()

      return rules
        .filter(rule => {
          if (!rule.trigger || trigger === '') return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1
          } else {
            return rule.trigger === trigger
          }
        })
        .map(rule => objectAssign({}, rule))
    }
    const onFieldBlur = () => {
      validate('blur')
    }
    const onFieldChange = () => {
      if (state.validateDisabled) {
        state.validateDisabled = false
        return
      }

      validate('change')
    }
    const updateComputedLabelWidth = (width: number) => {
      state.computedLabelWidth = width ? `${width}px` : ''
    }
    const addValidateEvents = () => {
      const rules = getRules()

      if (rules.length || props.required !== undefined) {
        emitter.on('el.form.blur', onFieldBlur)
        emitter.on('el.form.change', onFieldChange)
      }
    }
    const removeValidateEvents = () => {
      emitter.off('el.form.blur', onFieldBlur)
      emitter.off('el.form.change', onFieldChange)
    }
  
    watch(()=> props.error, (value?: string) => {
      if (value) {
        state.validateMessage = value
        state.validateState = value ? 'error' : ''
      }
    },
    {
      immediate: true
    })
    watch(() => props.validateStatus, (value?: string) => {
      state.validateState = value!
    })
    const initialValue = ref(fieldValue.value)
    provide('elFormItem', {
      emitter,
      elFormItemSize: elFormItemSize.value,
      updateComputedLabelWidth
    })
    onMounted(() => {
      if (props.prop) {
        formEmitter.emit('el.form.addField', instance)

        if (Array.isArray(fieldValue.value)) {
          initialValue.value = ([] as any[]).concat(fieldValue.value)
        }
        addValidateEvents()
      }
    })
    onBeforeUnmount(() => {
      formEmitter.emit('el.form.removeField', instance)
    })
    // @ts-ignore
    window.getPropByPath = getPropByPath
    return {
      ...toRefs(state),
      slots,
      elForm,
      form,
      isRequired,
      sizeClass,
      labelFor,
      labelStyle,
      contentStyle,
      validate,
      resetField,
      clearValidate
    }
  }
})
</script>

<style lang="scss">
@import 'theme/form-item.scss';
</style>
