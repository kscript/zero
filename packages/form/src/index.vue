<template>
  <form
    class="el-form"
    :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]"
  >
    <slot></slot>
  </form>
</template>
<script lang="ts">
import { broadcast } from '@/utils/broadcast'
// @ts-ignore
import objectAssign from '@/utils/merge'
import mitt from 'mitt'
import { computed, defineComponent, provide, reactive, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'ElForm',
  componentName: 'ElForm',
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const emitter = mitt()
    const fields = ref([] as anyObject[])
    const potentialLabelWidthArr = ref([] as number[])
    const autoLabelWidth = computed(() => {
      if (!potentialLabelWidthArr.value.length) return 0
      const max = Math.max(...potentialLabelWidthArr.value)
      return max ? `${max}px` : ''
    })
    const resetFields = () => {
      if (!props.model) {
        console.warn(
          '[Element Warn][Form]model is required for resetFields to work.'
        )
        return
      }
      fields.value.forEach(field => {
        field.setupState.resetField()
      })
    }
    const clearValidate = (props: any[] = []) => {
      (props.length
        ? typeof props === 'string'
          ? fields.value.filter(field => props === field.prop)
          : fields.value.filter(field => props.indexOf(field.prop) > -1)
        : fields.value).forEach(field => {
        field.clearValidate()
      })
    }
    const validate = (callback: Function) => {
      if (!props.model) {
        console.warn(
          '[Element Warn][Form]model is required for validate to work!'
        )
        return
      }

      let promise
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (valid: any) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }

      let valid = true
      let count = 0
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (fields.value.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      fields.value.forEach(field => {
        field.setupState.validate('', (message: string, field: anyObject) => {
          if (message) {
            valid = false
          }
          invalidFields = objectAssign({}, invalidFields, field)
          if (
            typeof callback === 'function' &&
            ++count === fields.value.length
          ) {
            callback(valid, invalidFields)
          }
        })
      })

      if (promise) {
        return promise
      }
    }
    const validateField = (props: anyObject, cb: Function) => {
      const vprops = Array.isArray(props) ? props : [props]
      const vfields = fields.value.filter(
        field => vprops.indexOf(field.prop) !== -1
      )
      if (!vfields.length) {
        console.warn('[Element Warn]please pass correct props!')
        return
      }

      vfields.forEach(field => {
        field.validate('', cb)
      })
    }
    const getLabelWidthIndex = (width: number) => {
      const index = potentialLabelWidthArr.value.indexOf(width)
      // it's impossible
      if (index === -1) {
        throw new Error('[ElementForm]unpected width ' + width)
      }
      return index
    }
    const registerLabelWidth = (val: number, oldVal: number) => {
      if (val && oldVal) {
        const index = getLabelWidthIndex(oldVal)
        potentialLabelWidthArr.value.splice(index, 1, val)
      } else if (val) {
        potentialLabelWidthArr.value.push(val)
      }
    }
    const deregisterLabelWidth = (val: number) => {
      const index = getLabelWidthIndex(val)
      potentialLabelWidthArr.value.splice(index, 1)
    }
   
    watch(() => props.rules, () => {
      // remove then add event listeners on form-item after form rules change
      fields.value.forEach(field => {
        field.removeValidateEvents()
        field.addValidateEvents()
      })

      if (props.validateOnRuleChange) {
        validate(() => {})
      }
    })
    const itemProps = reactive({} as anyObject)
    emitter.on('el.form.addField', field => {
      if (field) {
        const prop = field.props.prop
        itemProps[prop] = (props.model || {})[prop]
        fields.value.push(field)
      }
    })
    emitter.on('el.form.removeField', field => {
      if (field.props.prop) {
        fields.value.splice(fields.value.indexOf(field), 1)
      }
    })
    provide('elForm', {
      emitter,
      autoLabelWidth,
      props,
      size: props.size,
      deregisterLabelWidth,
      registerLabelWidth
    })
    return {
      ...toRefs(props.model || {}),
      validate,
      resetFields,
      validateField,
      clearValidate,
    }
  }
 })
</script>

<style lang="scss">
@import 'theme/form.scss';
</style>
