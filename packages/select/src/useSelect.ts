import { ref, computed, getCurrentInstance, ComponentInternalInstance, watch, nextTick, reactive, inject, VNode, onMounted, onBeforeUnmount, provide, toRefs } from 'vue';

// @ts-ignore
import { debounce as debounceFunc } from 'throttle-debounce';
// @ts-ignore
import { t } from '@/locale';
// @ts-ignore
import scrollIntoView from '@/utils/scroll-into-view';
// @ts-ignore
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';
// @ts-ignore
import { getValueByPath, valueEquals, isIE, isEdge } from '@/utils/util';
// @ts-ignore
import { isKorean } from '@/utils/shared';
import elementOptions from '@/elementOptions';
import mitt from 'mitt';

export const useSelect = (props: anyObject) => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { emit } = instance
  const filteredOptionsCount = ref(0)
  const hoverIndex = ref(-1)
  const state = reactive({
    options: [],
    cachedOptions: [],
    createdLabel: null,
    createdSelected: false,
    selected: props.multiple ? [] : {},
    inputLength: 20,
    inputWidth: 0,
    initialInputHeight: 0,
    cachedPlaceHolder: '',
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: false,
    softFocus: false,
    selectedLabel: '',
    hoverIndex: -1,
    query: '',
    previousQuery: null,
    inputHovering: false,
    currentPlaceholder: '',
    menuVisibleOnFocus: false,
    isOnComposition: false,
    isSilentBlur: false
  })
  const emitter = mitt()
  const elForm = inject('elForm', {} as anyObject)
  const elFormItem = inject('elFormItem', {} as anyObject)
  const elDropdown = inject('elDropdown', {} as anyObject)
  const elFormItemSize = computed(() => {
    return (elFormItem || {}).elFormItemSize
  })
  
  const readonly = computed(() => {
    return !props.filterable || props.multiple || (!isIE() && !isEdge() && !state.visible);
  })

  const showClose = computed(() => {
    let hasValue = props.multiple
      ? Array.isArray(props.modelValue) && props.modelValue.length > 0
      : props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '';
    let criteria = props.clearable &&
      !selectDisabled.value &&
      state.inputHovering &&
      hasValue;
    return criteria;
  })

  const iconClass = computed(() => {
    return props.remote && props.filterable ? '' : (state.visible ? 'arrow-up is-reverse' : 'arrow-up');
  })

  const debounce = computed(() => {
    return props.remote ? 300 : 0;
  })

  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || t('el.select.loading');
    } else {
      if (props.remote && state.query === '' && state.options.length === 0) return false;
      if (props.filterable && state.query && state.options.length > 0 && filteredOptionsCount.value === 0) {
        return props.noMatchText || t('el.select.noMatch');
      }
      if (state.options.length === 0) {
        return props.noDataText || t('el.select.noData');
      }
    }
    return null;
  })

  const showNewOption = computed(() => {
    let hasExistingOption = state.options.filter((option: anyObject) => !option.created)
      .some((option: anyObject) => option.currentLabel === state.query);
    return props.filterable && props.allowCreate && state.query !== '' && !hasExistingOption;
  })

  const selectSize = computed(() => {
    return props.size || elFormItemSize.value || elementOptions.size;
  })

  const selectDisabled = computed(() => {
    return props.disabled || elForm.disabled;
  })

  const collapseTagSize = computed(() => {
    return ['small', 'mini'].indexOf(selectSize.value) > -1
      ? 'mini'
      : 'small';
  })
  
  const handleComposition = (event: Event) => {
    const text = (event.target as HTMLInputElement).value;
    if (event.type === 'compositionend') {
      state.isOnComposition = false;
      nextTick(() => handleQueryChange(text));
    } else {
      const lastCharacter = text[text.length - 1] || '';
      state.isOnComposition = !isKorean(lastCharacter);
    }
  }

  const handleQueryChange = (val: any) => {
    if (state.previousQuery === val || state.isOnComposition) return;
    if (
      state.previousQuery === null &&
      (typeof props.filterMethod === 'function' || typeof props.remoteMethod === 'function')
    ) {
      state.previousQuery = val;
      return;
    }
    state.previousQuery = val;
    nextTick(() => {
      if (state.visible) emitter.emit('updatePopper');
    });
    hoverIndex.value = -1;
    if (props.multiple && props.filterable) {
      nextTick(() => {
        const length = (instance.refs.input as HTMLInputElement).value.length * 15 + 20;
        state.inputLength = props.collapseTags ? Math.min(50, length) : length;
        managePlaceholder();
        resetInputHeight();
      });
    }
    if (props.remote && typeof props.remoteMethod === 'function') {
      hoverIndex.value = -1;
      props.remoteMethod(val);
    } else if (typeof props.filterMethod === 'function') {
      props.filterMethod(val);
      emitter.emit('queryChange');
    } else {
      filteredOptionsCount.value = state.optionsCount;
      emitter.emit('queryChange', val);
      emitter.emit('queryChange');
    }
    if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
      checkDefaultFirstOption();
    }
  }

  const scrollToOption = (option: anyObject) => {
    try {
      const target = Array.isArray(option) && option[0] ? option[0]?.vnode.el : option?.vnode.el;
      const popper = instance.refs.popper as VNode
      if (popper && target) {
        const menu = popper.el?.querySelector('.el-select-dropdown__wrap');
        scrollIntoView(menu, target);
      }
      instance.refs.scrollbar && (instance.refs.scrollbar as anyObject).handleScroll();
    } catch(e) {
    }
  }

  const handleMenuEnter = () => {
    nextTick(() => scrollToOption(state.selected));
  }

  const emitChange = (val: unknown) => {
    if (!valueEquals(props.modelValue, val)) {
      emit('change', val);
    }
  }

  const getOption = (value: unknown) => {
    let option;
    const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
    const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
    const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';
    const cachedOptions = state.cachedOptions as anyObject[]
    for (let i = cachedOptions.length - 1; i >= 0; i--) {
      const cachedOption = cachedOptions[i];
      const isEqual = isObject
        ? getValueByPath(cachedOption.props, props.valueKey) === getValueByPath(value, props.valueKey)
        : cachedOption.props.value === value;
      if (isEqual) {
        option = cachedOption;
        break;
      }
    }
    if (option) return option;
    const label = (!isObject && !isNull && !isUndefined)
      ? value : '';
    let newOption: anyObject = {
      value: value,
      currentLabel: label
    };
    if (props.multiple) {
      newOption.hitState = false;
    }
    return newOption;
  }

  const setSelected = () => {
    if (!props.multiple) {
      let option = getOption(props.modelValue);
      if (option.isMounted) {
        state.createdLabel = option.currentLabel;
        state.createdSelected = true;
      } else {
        state.createdSelected = false;
      }
      state.selectedLabel = option.currentLabel;
      state.selected = option;
      if (props.filterable) state.query = state.selectedLabel;
      return;
    }
    let result: anyObject[] = [];
    if (Array.isArray(props.modelValue)) {
      props.modelValue.forEach(value => {
        result.push(getOption(value));
      });
    }
    state.selected = result;
    nextTick(() => {
      resetInputHeight();
    });
  }

  const handleFocus = (event: Event) => {
    if (!state.softFocus) {
      if (props.automaticDropdown || props.filterable) {
        state.visible = true;
        if (props.filterable) {
          state.menuVisibleOnFocus = true;
        }
      }
      emit('focus', event);
    } else {
      state.softFocus = false;
    }
  }

  const blur = () => {
    state.visible = false;
    (instance.refs.reference as HTMLElement).blur();
  }

  const handleBlur = (event: Event) => {
    setTimeout(() => {
      if (state.isSilentBlur) {
        state.isSilentBlur = false;
      } else {
        emit('blur', event);
      }
    }, 50);
    state.softFocus = false;
  }

  const handleClearClick = (event: Event) => {
    deleteSelected(event);
  }

  const doDestroy = () => {
    (instance.refs.popper as anyObject)?.doDestroy?.();
  }

  const handleClose = () => {
    state.visible = false;
  }

  const toggleLastOptionHitState = (hit: boolean = true) => {
    if (!Array.isArray(state.selected)) return;
    const option = state.selected[state.selected.length - 1];
    if (!option) return;

    if (hit === true || hit === false) {
      option.hitState = hit;
      return hit;
    }

    option.hitState = !option.hitState;
    return option.hitState;
  }

  const deletePrevTag = (event: Event) => {
    if ((event.target as HTMLInputElement).value.length <= 0 && !toggleLastOptionHitState()) {
      const value = (props.modelValue as string[]).slice();
      value.pop();
      emit('update:modelValue', value);
      emitChange(value);
    }
  }

  const managePlaceholder = () => {
    if (state.currentPlaceholder !== '') {
      state.currentPlaceholder = (instance.refs.input as HTMLInputElement).value ? '' : state.cachedPlaceHolder;
    }
  }

  const resetInputState = (event: KeyboardEvent) => {
    if (event.keyCode !== 8) toggleLastOptionHitState(false);
    state.inputLength = (instance.refs.input as HTMLInputElement).value.length * 15 + 20;
    resetInputHeight();
  }

  const resetInputHeight = () => {
    if (props.collapseTags && !props.filterable) return;
    nextTick(() => {
      if (!instance.refs.reference) return;
      let inputChildNodes = (instance.refs.reference as anyObject).$el?.childNodes;
      let input = [].filter.call(inputChildNodes, (item: HTMLElement) => item.tagName === 'INPUT')[0] as HTMLInputElement;
      const tags = instance.refs.tags as HTMLElement;
      const sizeInMap = state.initialInputHeight || 40;
      if (Array.isArray(state.selected)) {
        input.style.height = state.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
      }
      if (state.visible && emptyText.value !== false) {
        emitter.emit('updatePopper');
      }
    });
  }

  const resetHoverIndex = () => {
    setTimeout(() => {
      const options: anyObject = state.options
      if (!Array.isArray(state.selected)) {
        hoverIndex.value = options.indexOf(state.selected);
      } else {
        if (state.selected.length > 0) {
          hoverIndex.value = Math.min.apply(null, state.selected.map(item => options.indexOf(item)));
        } else {
          hoverIndex.value = -1;
        }
      }
    }, 300);
  }

  const handleOptionSelect = ([option, byClick = true]: [anyObject, boolean]) => {
    const optionProps = option.props

    if (props.multiple) {
      const value = (props.modelValue as any[]).slice();
      const optionIndex = getValueIndex(value, optionProps.value);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) {
        value.push(optionProps.value);
      }
      emit('update:modelValue', value);
      emitChange(value);
      if (option.created) {
        state.query = '';
        handleQueryChange('');
        state.inputLength = 20;
      }
      if (props.filterable) (instance.refs.input as HTMLInputElement).focus();
    } else {
      emit('update:modelValue', optionProps.value);
      emitChange(optionProps.value);
      state.visible = false;
    }
    state.isSilentBlur = byClick;
    setSoftFocus();
    if (state.visible) return;
    nextTick(() => {
      scrollToOption(option);
    });
  }

  const setSoftFocus = () => {
    state.softFocus = true;
    ((instance.refs.input || instance.refs.reference) as HTMLInputElement)?.focus();
  }

  const getValueIndex = (arr: any[] = [], value: unknown) => {
    const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
    if (!isObject) {
      return arr.indexOf(value);
    } else {
      const valueKey = props.valueKey;
      let index = -1;
      arr.some((item, i) => {
        if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
          index = i;
          return true;
        }
        return false;
      });
      return index;
    }
  }

  const toggleMenu = () => {
    if (!selectDisabled.value) {
      if (state.menuVisibleOnFocus) {
        state.menuVisibleOnFocus = false;
      } else {
        state.visible = !state.visible;
      }
      if (state.visible) {
        const input = (instance.refs.input || instance.refs.reference) as HTMLInputElement | undefined;
        ((instance.refs.input || instance.refs.reference) as HTMLInputElement)?.focus();
      }
    }
  }

  const selectOption = () => {
    if (!state.visible) {
      toggleMenu();
    } else {
      if (state.options[hoverIndex.value]) {
        handleOptionSelect(state.options[hoverIndex.value]);
      }
    }
  }

  const deleteSelected = (event: Event) => {
    event.stopPropagation();
    const value = props.multiple ? [] : '';
    emit('update:modelValue', value);
    emitChange(value);
    state.visible = false;
    emit('clear');
  }

  const deleteTag = (event: Event, tag: HTMLInputElement) => {
    if (Array.isArray(state.selected)) {
      let index = state.selected.indexOf(tag);
      if (index > -1 && !selectDisabled.value) {
        const value = (props.modelValue as any[]).slice();
        value.splice(index, 1);
        emit('update:modelValue', value);
        emitChange(value);
        emit('remove-tag', tag.value);
      }
    }
    event.stopPropagation();
  }

  const onInputChange = () => {
    if (props.filterable && state.query !== state.selectedLabel) {
      state.query = state.selectedLabel;
      handleQueryChange(state.query);
    }
  }

  const onOptionDestroy = (index: number) => {
    if (index > -1) {
      state.optionsCount--;
      filteredOptionsCount.value--;
      state.options.splice(index, 1);
    }
  }

  const resetInputWidth = () => {
    state.inputWidth = (instance.refs.reference as VNode).el?.getBoundingClientRect().width;
  }

  const handleResize = () => {
    resetInputWidth();
    if (props.multiple) resetInputHeight();
  }

  const checkDefaultFirstOption = () => {
    hoverIndex.value = -1;
    // highlight the created option
    let hasCreated = false;
    const options = state.options as anyObject
    for (let i = options.length - 1; i >= 0; i--) {
      if (options[i].created) {
        hasCreated = true;
        hoverIndex.value = i;
        break;
      }
    }
    if (hasCreated) return;
    for (let i = 0; i !== options.length; ++i) {
      const option = options[i];
      if (state.query) {
        // highlight first options that passes the filter
        if (!option.disabled && !option.groupDisabled && option.visible) {
          hoverIndex.value = i;
          break;
        }
      } else {
        // highlight currently selected option
        if (option.itemSelected) {
          hoverIndex.value = i;
          break;
        }
      }
    }
  }

  const getValueKey = (item: anyObject) => {
    if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
      return item.value;
    } else {
      return getValueByPath(item.value, props.valueKey);
    }
  }
  const hoverOption = ref({})
  const optionsAllDisabled = computed(() =>
    state.options.filter((option: anyObject) => option.visible).every((option: anyObject) => option.disabled)
  )
  watch(() => hoverIndex.value, (val) => {
    if (typeof val === 'number' && val > -1) {
      hoverOption.value = state.options[val] || {};
    }
    state.options.forEach((option: anyObject) => {
      option.hover = hoverOption.value === option;
    });
  })
  const navigateOptions = (direction: string) => {
    if (!state.visible) {
      state.visible = true;
      return;
    }
    if (state.options.length === 0 || filteredOptionsCount.value === 0) return;
    if (!optionsAllDisabled.value) {
      if (direction === 'next') {
        hoverIndex.value++;
        if (hoverIndex.value === state.options.length) {
          hoverIndex.value = 0;
        }
      } else if (direction === 'prev') {
        hoverIndex.value--;
        if (hoverIndex.value < 0) {
          hoverIndex.value = state.options.length - 1;
        }
      }
      const option = state.options[hoverIndex.value] as anyObject;
      if (option.disabled === true ||
        option.groupDisabled === true ||
        !option.visible) {
        navigateOptions(direction);
      }
      nextTick(() => scrollToOption(hoverOption.value));
    }
  }

  watch(() => selectDisabled.value, () => {
    nextTick(() => {
      resetInputHeight();
    });
  });

  watch(() => props.placeholder, (val) => {
    if (val !== void 0) {
      state.cachedPlaceHolder = state.currentPlaceholder = val;
    }
  })

  watch(() => props.modelValue, (val: any, oldVal) => {
    if (props.multiple) {
      resetInputHeight();
      if ((val && val.length > 0) || (instance.refs.input && state.query !== '')) {
        state.currentPlaceholder = '';
      } else {
        state.currentPlaceholder = state.cachedPlaceHolder;
      }
      if (props.filterable && !props.reserveKeyword) {
        state.query = '';
        handleQueryChange(state.query);
      }
    }
    setSelected();
    if (props.filterable && !props.multiple) {
      state.inputLength = 20;
    }
    if (!valueEquals(val, oldVal)) {
      elFormItem.emitter?.emit('el.form.change', val)
    }
  })
  
  watch(() => state.visible, (val) => {
    const input = instance.refs.input as HTMLInputElement | undefined
    const selected = props.multiple ? state.selected as anyObject[] : state.selected as anyObject 
    if (!val) {
      emitter.emit('destroyPopper');
      input?.blur();
      state.query = '';
      state.previousQuery = null;
      state.selectedLabel = '';
      state.inputLength = 20;
      state.menuVisibleOnFocus = false;
      resetHoverIndex();
      nextTick(() => {
        if (input &&
          input.value === '' &&
          props.multiple && 
          selected.length === 0) {
          state.currentPlaceholder = state.cachedPlaceHolder;
        }
      });
      if (!props.multiple) {
        if (selected) {
          if (props.filterable && props.allowCreate &&
            state.createdSelected && state.createdLabel) {
            state.selectedLabel = state.createdLabel || '';
          } else {
            state.selectedLabel = selected.currentLabel;
          }
          if (props.filterable) state.query = state.selectedLabel;
        }

        if (props.filterable) {
          state.currentPlaceholder = state.cachedPlaceHolder;
        }
      }
    } else {
      emitter.emit('updatePopper');
      if (props.filterable) {
        state.query = props.remote ? '' : state.selectedLabel;
        handleQueryChange(state.query);
        if (props.multiple) {
          input?.focus();
        } else {
          if (!props.remote) {
            emitter.emit('queryChange', '');
            emitter.emit('queryChange');
          }

          if (state.selectedLabel) {
            state.currentPlaceholder = state.selectedLabel;
            state.selectedLabel = '';
          }
        }
      }
    }
    emit('visible-change', val);
  })

  watch(() => state.options, () => {

    // if (this.$isServer) return;
    nextTick(() => {
      emitter.emit('updatePopper');
    });
    if (props.multiple) {
      resetInputHeight();
    }
    let inputs = [].slice.apply(instance.vnode.el?.querySelectorAll('input')) as HTMLInputElement[];
    if (inputs.indexOf(document.activeElement as HTMLInputElement) === -1) {
      setSelected();
    }
    if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
      checkDefaultFirstOption();
    }
  })

  state.cachedPlaceHolder = state.currentPlaceholder = props.placeholder || '';
  if (props.multiple && !Array.isArray(props.modelValue)) {
    emit('update:modelValue', []);
  }
  if (!props.multiple && Array.isArray(props.modelValue)) {
    emit('update:modelValue', '');
  }

  const debouncedOnInputChange = debounceFunc(debounce, () => {
    onInputChange();
  });

  const debouncedQueryChange = debounceFunc(debounce, (e: Event) => {
    handleQueryChange((e.target as HTMLInputElement).value);
  });

  emitter.on('handleOptionClick', handleOptionSelect as () => void)
  emitter.on('setSelected', setSelected)
  onMounted(() => {
    const el = instance.vnode.el as HTMLElement
    const reference = instance.refs.reference as VNode;
    if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
      state.currentPlaceholder = '';
    }
    addResizeListener(el, handleResize);
    if (reference && reference.el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.el.querySelector('input');
      state.initialInputHeight = input.getBoundingClientRect().height || sizeMap[selectSize.value as keyof typeof sizeMap];
    }
    if (props.remote && props.multiple) {
      resetInputHeight();
    }
    nextTick(() => {
      if (reference && reference.el) {
        state.inputWidth = reference.el.getBoundingClientRect().width;
      }
    });
    setSelected();
  })
  onBeforeUnmount(() => {
    const el = instance.vnode.el as HTMLElement
    if (el && handleResize) removeResizeListener(el, handleResize);
  })
  
  provide('elSelect', Object.assign({
    emitter,
    onOptionDestroy
  }, {state, props, instance}))
  return {
    ...toRefs(state),
    hoverIndex,
    filteredOptionsCount,

    selectSize,
    selectDisabled,
    readonly,
    emptyText,
    showNewOption,
    collapseTagSize,
    showClose,
    iconClass,

    handleFocus,
    handleBlur,
    handleMenuEnter,
    doDestroy,
    handleClose,
    debouncedOnInputChange,
    debouncedQueryChange,
    selectOption,
    toggleMenu,
    navigateOptions,
    onOptionDestroy,
    handleClearClick,
    getValueKey,
    resetInputState,
    deletePrevTag,
    handleComposition,
    resetInputHeight,
    managePlaceholder
  }
}
