<template>
  <div v-bind="attrs" :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'el-input-group': slots.prepend || slots.append,
      'el-input-group--append': slots.append,
      'el-input-group--prepend': slots.prepend,
      'el-input--prefix': slots.prefix || prefixIcon,
      'el-input--suffix': slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="getSuffixVisible()">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i v-if="showPwdVisible"
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="el-input__count">
            <span class="el-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="el-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script lang="ts">
  import { 
    defineComponent,
    inject,
    reactive,
    computed,
    ComputedRef,
    PropType,
    watch,
    nextTick,
    onUnmounted,
    provide,
    onMounted,
    onUpdated,
    getCurrentInstance,
    ComponentInternalInstance,
    toRefs
  } from 'vue'
  import Migrating from '@/mixins/migrating'
  // @ts-ignore
  import merge from '@/utils/merge'
  // @ts-ignore
  import {isKorean} from '@/utils/shared'
  // @ts-ignore
  import calcTextareaHeight from './calcTextareaHeight'
  
  import ElementUIOptions from 'packages/ElementUIOptions'

  import { elFormInject, elFormItemInject, ValidateState, Icons } from './type'

  import mitt, { Emitter } from 'mitt'

  export default defineComponent({
    name: 'ElInput',

    componentName: 'ElInput',

    // mixins: [emitter, Migrating],

    emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'clear'],
    inheritAttrs: false,

    props: {
      modelValue: {
        type: [String, Number] as PropType<String|Number>,
        default: ''
      },
      value: {
        type: [String, Number] as PropType<String|Number>,
        default: ''
      },
      size: String,
      resize: String,
      form: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object] as PropType<Boolean|anyObject>,
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      /** @Deprecated in next major version */
      autoComplete: {
        type: String,
        default: 'off'
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },

    setup(props, { attrs, emit, slots }) {
      const state = reactive({
        textareaCalcStyle: {},
        hovering: false,
        focused: false,
        isComposing: false,
        passwordVisible: false,
        attrs,
        slots
      })
      const emitter: Emitter = mitt()
      const elForm = inject('elForm', {}) as elFormInject
      const elFormItem = inject('elFormItem', {}) as elFormItemInject
      const elFormItemSize = computed(() => {
        return (elFormItem || {}).elFormItemSize
      })
      const validateState = computed(() => {
        return elFormItem ? elFormItem.validateState : ''
      })
      const needStatusIcon = computed(() => {
        return elForm ? elForm.statusIcon : false
      })
      const validateIcon = computed(() => {
        const icon: Icons = {
          validating: 'el-icon-loading',
          success: 'el-icon-circle-check',
          error: 'el-icon-circle-close'
        }
        return validateState.value ? icon[validateState.value] : ''
      })
      const textareaStyle = computed(() => {
        return merge({}, state.textareaCalcStyle, { resize: props.resize })
      })
      const inputSize = computed(() => {
        return props.size || elFormItemSize.value || ElementUIOptions.value.size
      })
      const inputDisabled = computed(() => {
        return props.disabled || (elForm || {}).disabled
      })
      const nativeInputValue = computed(() => {
        const value = props.modelValue === null || props.modelValue === void 0 ? '' : props.modelValue
        return value === '' && props.value ? props.value : value
      })
      const showClear = computed(() => {
        return props.clearable &&
          !inputDisabled.value &&
          !props.readonly &&
          nativeInputValue.value &&
          (state.focused || state.hovering)
      })
      const showPwdVisible = computed(() => {
        return props.showPassword &&
          !inputDisabled.value &&
          !props.readonly &&
          (!!nativeInputValue.value || state.focused)
      })
      const isWordLimitVisible = computed(() => {
        return props.showWordLimit &&
          attrs.maxlength &&
          (props.type === 'text' || props.type === 'textarea') &&
          !inputDisabled.value &&
          !props.readonly &&
          !props.showPassword
      })

      const upperLimit = computed(() => {
        return attrs.maxlength
      })
      
      const textLength = computed(() => {
        if (typeof props.modelValue === 'number') {
          return String(props.modelValue).length
        }
        return String(props.modelValue || '').length
      })

      const inputExceed = computed(() => {
        return isWordLimitVisible &&
          (textLength > upperLimit)
      })

      watch(() => props.modelValue, (val) => {
        nextTick(resizeTextarea)
        if (props.validateEvent) {
          elFormItem.emitter?.emit('el.form.change', [val])
        }
      })
      watch(() => nativeInputValue.value, () => {
        setNativeInputValue()
      })
      watch(() => props.type, () => {
        nextTick(() => {
          setNativeInputValue()
          resizeTextarea()
          updateIconOffset()
        })
      })

      const focus = () => {
        getInput().focus()
      }
      const blur = () => {
        getInput().blur()
      }
      const getMigratingConfig = () => {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        }
      }
      const handleBlur = (event: Event) => {
        state.focused = false
        emit('blur', event)
        if (props.validateEvent) {
          elFormItem.emitter?.emit('el.form.blur', [props.modelValue])
        }
      }
      const select = () => {
        getInput().select()
      }
      const instance = getCurrentInstance() as ComponentInternalInstance 
      const resizeTextarea = () => {
        // if (this.$isServer) return
        const { autosize, type } = props
        if (type !== 'textarea') return
        if (!autosize) {
          state.textareaCalcStyle = {
            minHeight: calcTextareaHeight(instance.refs.textarea).minHeight
          }
          return
        }
        const minRows = (autosize as anyObject).minRows
        const maxRows = (autosize as anyObject).maxRows

        state.textareaCalcStyle = calcTextareaHeight(instance.refs.textarea, minRows, maxRows)
      }
      const setNativeInputValue = () => {
        const input = getInput()
        if (!input) return
        if (input.value === nativeInputValue.value) return
        input.value = String(nativeInputValue.value)
      }
      const handleFocus = (event: Event) => {
        state.focused = true
        emit('focus', event)
      }
      const handleCompositionStart = () => {
        state.isComposing = true
      }
      const handleCompositionUpdate = (event: Event) => {
        const text = (event.target as HTMLInputElement)?.value
        const lastCharacter = text[text.length - 1] || ''
        state.isComposing = !isKorean(lastCharacter)
      }
      const handleCompositionEnd = (event: Event) => {
        if (state.isComposing) {
          state.isComposing = false
          handleInput(event)
        }
      }
      const handleInput = (event: Event) => {
        // should not emit input during composition
        // see: https://github.com/ElemeFE/element/issues/10516
        if (state.isComposing) return
        const value = (event.target as HTMLInputElement)?.value

        // hack for https://github.com/ElemeFE/element/issues/8548
        // should remove the following line when we don't support IE
        if (value === nativeInputValue.value) return
        const isNumber = !!(attrs.modelModifiers as anyObject)?.number
        const finalValue = isNumber ? isNaN(parseFloat(value)) ? '' : parseFloat(value) : value
        emit('update:modelValue', finalValue)
        emit('input', finalValue)
        // ensure native input value is controlled
        // see: https://github.com/ElemeFE/element/issues/12850
        nextTick(setNativeInputValue)
      }
      const handleChange = (event: Event) => {
        emit('change', (event.target as HTMLInputElement)?.value)
      }
      const calcIconOffset = (place: 'suffix' | 'prefix') => {
        const $el = instance.vnode.el
        let elList = [].slice.call($el?.querySelectorAll(`.el-input__${place}`) || []) as HTMLElement[]
        if (!elList.length) return
        let el = null
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode === $el) {
            el = elList[i]
            break
          }
        }
        if (!el) return
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        }

        const pendant = pendantMap[place]
        if (slots[pendant]) {
          el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${$el?.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`
        } else {
          el.removeAttribute('style')
        }
      }
      const updateIconOffset = () => {
        calcIconOffset('prefix')
        calcIconOffset('suffix')
      }
      const clear = () => {
        nextTick(() => {
          setNativeInputValue()
          emit('input', '')
          emit('change', '')
          emit('update:modelValue', '')
          emit('clear')
        })
      }
      const handlePasswordVisible = () => {
        state.passwordVisible = !state.passwordVisible
        focus()
      }
      const getInput = () => {
        return (instance.refs.input || instance.refs.textarea) as HTMLInputElement | HTMLTextAreaElement
      }
      const getSuffixVisible = () => {
        return slots.suffix ||
          props.suffixIcon ||
          showClear.value ||
          props.showPassword ||
          isWordLimitVisible.value ||
          (validateState.value && needStatusIcon.value)
      }

      emitter.on('inputSelect', select)
      provide('input', {
        emitter
      })
      onUpdated(() => {
        nextTick(updateIconOffset)
      })
      onMounted(() => {
        setNativeInputValue()
        resizeTextarea()
        updateIconOffset()
      })
      onUnmounted(() => {
        emitter.all.clear()
      })
      return {
        ...toRefs(state),

        elFormItemSize,
        validateState,
        needStatusIcon,
        validateIcon,
        textareaStyle,
        inputSize,
        inputDisabled,
        nativeInputValue,
        showClear,
        showPwdVisible,
        isWordLimitVisible,
        upperLimit,
        textLength,
        inputExceed,

        focus,
        blur,
        getMigratingConfig,
        handleBlur,
        select,
        resizeTextarea,
        setNativeInputValue,
        handleFocus,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
        handleInput,
        handleChange,
        calcIconOffset,
        updateIconOffset,
        clear,
        handlePasswordVisible,
        getInput,
        getSuffixVisible

      }
    },

  })
</script>
<style lang="scss">
@import 'theme/input.scss';
</style>