<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div
      class="el-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && selected.length">
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions>
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions>
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </el-tag>
      </transition-group>

      <input
        type="text"
        class="el-select__input"
        :class="[selectSize ? `is-${ selectSize }` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete || autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
        ref="input">
    </div>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="(multiple && filterable) ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="options.length > 0 && !loading">
          <el-option
            :value="query"
            created
            v-if="showNewOption">
          </el-option>
          <slot></slot>
        </el-scrollbar>
        <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0 ))">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-menu>
    </transition>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, Prop, provide, reactive, toRefs, VNode, watch, watchEffect } from 'vue';
import Emitter from '@/mixins/emitter';
import Focus from '@/mixins/focus';
import Locale from '@/mixins/locale';
import ElInput from 'packages/input';
import ElSelectMenu from './select-dropdown.vue';
import ElOption from './option.vue';
import ElTag from 'packages/tag';
import ElScrollbar from 'packages/scrollbar';
// @ts-ignore
import { debounce as debounceFunc } from 'throttle-debounce';
import Clickoutside from '@/utils/clickoutside';
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';
import { t } from '@/locale';
import scrollIntoView from '@/utils/scroll-into-view';
import { getValueByPath, valueEquals, isIE, isEdge } from '@/utils/util';
import NavigationMixin from './navigation-mixin';
import { isKorean } from '@/utils/shared';
import elementOptions from '@/elementOptions';

export default defineComponent({
    mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

    name: 'ElSelect',

    componentName: 'ElSelect',

    components: {
      ElInput,
      ElSelectMenu,
      ElOption,
      ElTag,
      ElScrollbar
    },

    directives: { Clickoutside },

    // inject: {
    //   elForm: {
    //     default: ''
    //   },

    //   elFormItem: {
    //     default: ''
    //   }
    // },

    // provide() {
    //   return {
    //     'select': this
    //   };
    // },
    
    props: {
      name: String,
      id: String,
      // value: {
      //   required: true
      // },
      modelValue: {
        required: true
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      /** @Deprecated in next major version */
      autoComplete: {
        type: String,
        validator(val) {
          process.env.NODE_ENV !== 'production' &&
            console.warn('[Element Warn][Select]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
          return true;
        }
      } as Prop<string>,
      automaticDropdown: Boolean,
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: String,
      remote: Boolean,
      loadingText: String,
      noMatchText: String,
      noDataText: String,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: Boolean,
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default() {
          return t('el.select.placeholder');
        }
      } as Prop<string>,
      defaultFirstOption: Boolean,
      reserveKeyword: Boolean,
      valueKey: {
        type: String,
        default: 'value'
      },
      collapseTags: Boolean,
      popperAppendToBody: {
        type: Boolean,
        default: true
      }
    },

    setup(props, { slots, attrs, emit }) {
      const instance = getCurrentInstance() as ComponentInternalInstance
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
      const elForm = inject('elForm', {} as anyObject)
      const elFormItem = inject('elFormItem', {} as anyObject)
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
          if (props.filterable && state.query && state.options.length > 0 && state.filteredOptionsCount === 0) {
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
          // if (state.visible) this.broadcast('ElSelectDropdown', 'updatePopper');
        });
        state.hoverIndex = -1;
        if (props.multiple && props.filterable) {
          nextTick(() => {
            const length = (instance.refs.input as HTMLInputElement).value.length * 15 + 20;
            state.inputLength = props.collapseTags ? Math.min(50, length) : length;
            managePlaceholder();
            resetInputHeight();
          });
        }
        if (props.remote && typeof props.remoteMethod === 'function') {
          state.hoverIndex = -1;
          props.remoteMethod(val);
        } else if (typeof props.filterMethod === 'function') {
          props.filterMethod(val);
          // this.broadcast('ElOptionGroup', 'queryChange');
        } else {
          state.filteredOptionsCount = state.optionsCount;
          // this.broadcast('ElOption', 'queryChange', val);
          // this.broadcast('ElOptionGroup', 'queryChange');
        }
        if (props.defaultFirstOption && (props.filterable || props.remote) && state.filteredOptionsCount) {
          checkDefaultFirstOption();
        }
      }

      const scrollToOption = (option: anyObject) => {
        const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
        const popper = instance.refs.popper as VNode
        if (popper && target) {
          const menu = popper.el?.querySelector('.el-select-dropdown__wrap');
          scrollIntoView(menu, target);
        }
        instance.refs.scrollbar && (instance.refs.scrollbar as anyObject).handleScroll();
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
            ? getValueByPath(cachedOption.value, props.valueKey) === getValueByPath(value, props.valueKey)
            : cachedOption.value === value;
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
          if (option.created) {
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
        (instance.refs.popper as anyObject).doDestroy();
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
          emit('input', value);
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
          let inputChildNodes = (instance.refs.reference as VNode).el?.childNodes;
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
            // this.broadcast('ElSelectDropdown', 'updatePopper');
          }
        });
      }

      const resetHoverIndex = () => {
        setTimeout(() => {
          const options: anyObject = state.options
          if (!Array.isArray(state.selected)) {
            state.hoverIndex = options.indexOf(state.selected);
          } else {
            if (state.selected.length > 0) {
              state.hoverIndex = Math.min.apply(null, state.selected.map(item => options.indexOf(item)));
            } else {
              state.hoverIndex = -1;
            }
          }
        }, 300);
      }

      const handleOptionSelect = (option: anyObject, byClick: boolean = true) => {
        if (props.multiple) {
          const value = (props.modelValue as any[]).slice();
          const optionIndex = getValueIndex(value, option.value);
          if (optionIndex > -1) {
            value.splice(optionIndex, 1);
          } else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) {
            value.push(option.value);
          }
          emit('input', value);
          emitChange(value);
          if (option.created) {
            state.query = '';
            handleQueryChange('');
            state.inputLength = 20;
          }
          if (props.filterable) (instance.refs.input as HTMLInputElement).focus();
        } else {
          emit('input', option.value);
          emitChange(option.value);
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
          if (state.options[state.hoverIndex]) {
            handleOptionSelect(state.options[state.hoverIndex]);
          }
        }
      }

      const deleteSelected = (event: Event) => {
        event.stopPropagation();
        const value = props.multiple ? [] : '';
        emit('input', value);
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
            emit('input', value);
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
          state.filteredOptionsCount--;
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
        state.hoverIndex = -1;
        // highlight the created option
        let hasCreated = false;
        const options = state.options as anyObject
        for (let i = options.length - 1; i >= 0; i--) {
          if (options[i].created) {
            hasCreated = true;
            state.hoverIndex = i;
            break;
          }
        }
        if (hasCreated) return;
        for (let i = 0; i !== options.length; ++i) {
          const option = options[i];
          if (state.query) {
            // highlight first options that passes the filter
            if (!option.disabled && !option.groupDisabled && option.visible) {
              state.hoverIndex = i;
              break;
            }
          } else {
            // highlight currently selected option
            if (option.itemSelected) {
              state.hoverIndex = i;
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
          // dispatch('ElFormItem', 'el.form.change', val);
        }
      })
      watch(() => state.visible, (val) => {
        const input = instance.refs.input as HTMLInputElement | undefined
        const selected = props.multiple ? state.selected as anyObject[] : state.selected as anyObject 
        if (!val) {
          // this.broadcast('ElSelectDropdown', 'destroyPopper');
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
          // this.broadcast('ElSelectDropdown', 'updatePopper');
          if (props.filterable) {
            state.query = props.remote ? '' : state.selectedLabel;
            handleQueryChange(state.query);
            if (props.multiple) {
              input?.focus();
            } else {
              if (!props.remote) {
                // this.broadcast('ElOption', 'queryChange', '');
                // this.broadcast('ElOptionGroup', 'queryChange');
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
          // broadcast('ElSelectDropdown', 'updatePopper');
        });
        if (props.multiple) {
          resetInputHeight();
        }
        let inputs = [].slice.apply(instance.vnode.el?.querySelectorAll('input')) as HTMLInputElement[];
        if (inputs.indexOf(document.activeElement as HTMLInputElement) === -1) {
          setSelected();
        }
        if (props.defaultFirstOption && (props.filterable || props.remote) && state.filteredOptionsCount) {
          checkDefaultFirstOption();
        }
      })

      state.cachedPlaceHolder = state.currentPlaceholder = props.placeholder || '';
      if (props.multiple && !Array.isArray(props.modelValue)) {
        emit('input', []);
      }
      if (!props.multiple && Array.isArray(props.modelValue)) {
        emit('input', '');
      }

      const debouncedOnInputChange = debounceFunc(debounce, () => {
        onInputChange();
      });

      const debouncedQueryChange = debounceFunc(debounce, (e: Event) => {
        handleQueryChange((e.target as HTMLInputElement).value);
      });

      // this.$on('handleOptionClick', this.handleOptionSelect);
      // this.$on('setSelected', this.setSelected);
      
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
      
      provide('elSelect', instance)
      return {
        ...toRefs(state)
      }
    }
  })
</script>


