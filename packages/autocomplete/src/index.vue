<template>
  <div
    class="el-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <el-input
      ref="input"
      v-bind="binding"
      v-model="modelValue"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
    >
      <template #prepend v-if="slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template #append v-if="slots.append">
        <slot name="append"></slot>
      </template>
      <template #prefix v-if="slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template #suffix v-if="slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
    <el-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestionRef"
      :placement="placement"
      :id="id">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click.native="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item ? item[valueKey] : 1 }}
        </slot>
      </li>
    </el-autocomplete-suggestions>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, getCurrentInstance, ComponentInternalInstance, watch, nextTick, VNode, ComponentPublicInstance, onBeforeUnmount, onMounted, Directive, ObjectDirective, provide, ref, toRefs } from 'vue'
  // @ts-ignore
  import { debounce } from 'throttle-debounce'
  import Clickoutside from '@/utils/clickoutside'
  import mitt, { Emitter } from 'mitt'
  import Migrating from '@/mixins/migrating'
  // @ts-ignore
  import { generateId } from '@/utils/util'

  export default defineComponent({
    name: 'ElAutocomplete',

    mixins: [ Migrating ],

    inheritAttrs: false,

    componentName: 'ElAutocomplete',

    emits: ['change', 'input', 'focus', 'blur', 'clear', 'select', 'update:modelValue'],

    directives: { Clickoutside } as anyObject<ObjectDirective>,

    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      popperOptions: Object,
      placeholder: String,
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      },
      placement: {
        type: String,
        default: 'bottom-start'
      },
      hideLoading: Boolean,
      popperAppendToBody: {
        type: Boolean,
        default: true
      },
      highlightFirstItem: {
        type: Boolean,
        default: false
      }
    },

    setup(props, { emit, slots, attrs }) {
      const state = reactive({
        activated: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1,
        suggestionDisabled: false,
        modelValue: ''
      })
      const instance = getCurrentInstance() as ComponentInternalInstance 
      const emitter = mitt() as Emitter
      
      const suggestionVisible = computed(() => {
        const suggestions = state.suggestions
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0
        return (isValidData || state.loading) && state.activated
      })
      const id = computed(() => `el-autocomplete-${generateId()}`)
      
      const getInput = () => {
        const input = instance.refs.input as anyObject
        return input?.getInput() as HTMLElement | void
      }
      const getMigratingConfig = () => {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        }
      }
      const focus = () => {
        (instance?.refs.input as HTMLInputElement).focus()
      }
      const debouncedGetData = debounce(props.debounce, (queryString: string) => {
        if (state.suggestionDisabled) {
          return;
        }
        state.loading = true;
        props.fetchSuggestions?.(queryString, (suggestions: any[]) => {
          state.loading = false
          if (state.suggestionDisabled) {
            return
          }
          if (Array.isArray(suggestions)) {
            // @ts-ignore
            state.suggestions = suggestions
            state.highlightedIndex = props.highlightFirstItem ? 0 : -1
          } else {
            console.error('[Element Error][Autocomplete]autocomplete suggestions must be an array')
          }
        })
      })
      const setNativeInputValue = (value: string) => {
        const input = getInput() as HTMLInputElement
        console.log(input, value)
        debugger
        if (!input) return
        if (input.value === value) return
        input.value = value
      }
      const handleInput = (value: string) => {
        state.modelValue = value
        emit('input', value)
        state.suggestionDisabled = false
        if (!props.triggerOnFocus && !value) {
          state.suggestionDisabled = true
          state.suggestions = []
          return
        }
        debouncedGetData(value)
      }
      const handleChange = (value: string) => {
        emit('change', value)
      }
      const handleFocus = (event: Event) => {
        state.activated = true
        emit('focus', event)
        if (props.triggerOnFocus) {
          debouncedGetData(state.modelValue)
        }
      }
      const handleBlur = (event: Event) => {
        emit('blur', event)
      }
      const handleClear = () => {
        state.activated = false
        emit('clear')
      }
      const close = () => {
        state.activated = false
      }
      const handleKeyEnter = (event: Event) => {
        if (suggestionVisible.value && state.highlightedIndex >= 0 && state.highlightedIndex < state.suggestions.length) {
          event.preventDefault()
          select(state.suggestions[state.highlightedIndex])
        } else if (props.selectWhenUnmatched) {
          emit('select', {value: props.value})
          nextTick(() => {
            state.suggestions = []
            state.highlightedIndex = -1
          })
        }
      }
      const select = (item: any) => {
        handleInput(item[props.valueKey])
        emit('select', item)
        nextTick(() => {
          state.suggestions = []
          state.highlightedIndex = -1
        })
      }
      const highlight = (index: number) => {
        if (!suggestionVisible.value || state.loading) { return }
        if (index < 0) {
          state.highlightedIndex = -1
          return
        }
        if (index >= state.suggestions.length) {
          index = state.suggestions.length - 1
        }
        const suggestions = instance.refs.suggestionRef as ComponentPublicInstance
        const suggestion = suggestions.$el.querySelector('.el-autocomplete-suggestion__wrap')
        const suggestionList = suggestion.querySelectorAll('.el-autocomplete-suggestion__list li')
        
        let highlightItem = suggestionList[index]
        let scrollTop = suggestion.scrollTop
        let offsetTop = highlightItem.offsetTop

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight
        }
        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight
        }
        state.highlightedIndex = index
        let input = getInput()
        input && input.setAttribute('aria-activedescendant', `${id.value}-item-${state.highlightedIndex}`)
      }
      watch(() => props.value, () => {
        if (props.value) {
          state.modelValue = props.value
        }
      })
      watch(() => suggestionVisible.value, (val) => {
        let input = getInput()
        if (input) {
          emitter.emit('visible', [val, input.offsetWidth])
        }
      })
      provide('autocomplete', {
        emitter
      })
      onMounted(() => {
        emitter.on('item-click', item => {
          select(item)
        })
        let $input = getInput()
        if ($input) {
          $input.setAttribute('role', 'textbox')
          $input.setAttribute('aria-autocomplete', 'list')
          $input.setAttribute('aria-controls', 'id')
          $input.setAttribute('aria-activedescendant', `${id.value}-item-${state.highlightedIndex}`)
        }
      })
      onBeforeUnmount(() => {
        // (instance.refs.suggestionRef as anyObject)?.destroy()
      })
      const binding = ref(Object.assign({}, props, attrs))
      return {
        ...toRefs(state),
        slots,
        attrs,
        props,
        binding,
        suggestionVisible,
        id,
        close,
        focus,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleClear,
        handleKeyEnter,
        highlight,
        select
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/autocomplete.scss';
</style>
