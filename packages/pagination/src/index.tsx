import Pager from './index.vue';
import ElSelect from 'packages/select';
import ElOption from 'packages/option';
import ElInput from 'packages/input';
// @ts-ignore
import Locale from '@/mixins/locale';
// @ts-ignore
import { valueEquals } from '@/utils/util';
import { computed, watch, defineComponent, h, Prop, PropType, nextTick, toRefs, VNode } from 'vue';

export default defineComponent({
  name: 'ElPagination',

  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    small: Boolean,

    total: Number,

    pageCount: Number as PropType<Number>,

    pagerCount: {
      type: Number,
      // validator(value: number) {
      //   return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
      // },
      default: 7
    },

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      default: 'prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      // default() {
      //   return [10, 20, 30, 40, 50, 100];
      // }
    },

    popperClass: String,

    prevText: String,

    nextText: String,

    background: Boolean,

    disabled: Boolean,

    hideOnSinglePage: Boolean
  },

  setup(props, { emit }) {
    const state = {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false
    }
    const internalPageCount = computed(() => {
      if (typeof props.total === 'number') {
        return Math.max(1, Math.ceil(props.total / state.internalPageSize));
      } else if (typeof props.pageCount === 'number') {
        return Math.max(1, props.pageCount);
      }
      return null;
    })

    watch(() => props.currentPage, 
      (val) => {
        state.internalCurrentPage = getValidCurrentPage(val) as number
    }, {
      immediate: true
    })

    watch(() => props.pageSize, 
      (val) => {
        state.internalPageSize = isNaN(val) ? 10 : val;
    }, {
      immediate: true
    })

    watch(() => props.pageSize, 
      (newVal) => {
        emit('update:currentPage', newVal);
        state.lastEmittedPage = -1;
    }, {
      immediate: true
    })

    watch(() => internalPageCount.value, 
      (newVal: number | null) => {
        /* istanbul ignore if */
        const oldPage = state.internalCurrentPage;
        if (typeof newVal === 'number') {
          if (newVal > 0 && oldPage === 0) {
            state.internalCurrentPage = 1;
          } else if (oldPage > newVal) {
            state.internalCurrentPage = newVal === 0 ? 1 : newVal;
            state.userChangePageSize && emitChange();
          }
          state.userChangePageSize = false;
        }
    })

    const handleCurrentChange = (val: number) => {
      state.internalCurrentPage = getValidCurrentPage(val);
      state.userChangePageSize = true;
      emitChange();
    }

    const prev = () => {
      if (props.disabled) return;
      const newVal = state.internalCurrentPage - 1;
      state.internalCurrentPage = getValidCurrentPage(newVal);
      emit('prev-click', state.internalCurrentPage);
      emitChange();
    }

    const next = () => {
      if (props.disabled) return;
      const newVal = state.internalCurrentPage + 1;
      state.internalCurrentPage = getValidCurrentPage(newVal);
      emit('next-click', state.internalCurrentPage);
      emitChange();
    }

    const getValidCurrentPage = (value: string | number) => {
      value = parseInt(String(value), 10);

      const havePageCount = typeof internalPageCount.value === 'number';

      let resetValue;

      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (internalPageCount.value && value > internalPageCount.value) {
          resetValue = internalPageCount.value;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    }

    const emitChange = () => {
      nextTick(() => {
        if (state.internalCurrentPage !== state.lastEmittedPage || state.userChangePageSize) {
          emit('current-change', state.internalCurrentPage);
          state.lastEmittedPage = state.internalCurrentPage;
          state.userChangePageSize = false;
        }
      })
    }
    return {
      ...toRefs(state),
      internalPageCount,
      handleCurrentChange,
      prev,
      next
    }
  },

  render() {
    const layout = this.layout;
    if (!layout) return null;
    if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null;

    let template = <div class={['el-pagination', {
      'is-background': this.background,
      'el-pagination--small': this.small
    }] }></div> as anyObject;
    const TEMPLATE_MAP = {
      prev: <prev></prev>,
      jumper: <jumper></jumper>,
      pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange } disabled={ this.disabled }></pager>,
      next: <next></next>,
      sizes: <sizes pageSizes={ this.pageSizes }></sizes>,
      slot: <slot>{ this.$slots.default ? this.$slots.default : '' }</slot>,
      total: <total></total>
    };
    const components = layout.split(',').map((item) => item.trim());
    const rightWrapper = <div class="el-pagination__rightwrapper"></div> as anyObject;
    let haveRightWrapper = false;

    template.children = (template.children || []);
    rightWrapper.children = rightWrapper.children || [];
    components.forEach(compo => {
      if (compo === '->') {
        haveRightWrapper = true;
        return;
      }

      if (!haveRightWrapper) {
        // @ts-ignore
        template.children.push(TEMPLATE_MAP[compo]);
      } else {
        // @ts-ignore
        rightWrapper.children.push(TEMPLATE_MAP[compo]);
      }
    });

    if (haveRightWrapper) {
      template.children.unshift(rightWrapper);
    }

    return template;
  },

  components: {
    Prev: {
      render() {
        return (
          <button
            type="button"
            class="btn-prev"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage <= 1 }
            on-click={ this.$parent.prev }>
            {
              this.$parent.prevText
                ? <span>{ this.$parent.prevText }</span>
                : <i class="el-icon el-icon-arrow-left"></i>
            }
          </button>
        );
      }
    },

    Next: {
      render() {
        return (
          <button
            type="button"
            class="btn-next"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={ this.$parent.next }>
            {
              this.$parent.nextText
                ? <span>{ this.$parent.nextText }</span>
                : <i class="el-icon el-icon-arrow-right"></i>
            }
          </button>
        );
      }
    },

    Sizes: {
      mixins: [Locale],

      props: {
        pageSizes: Array
      },

      watch: {
        pageSizes: {
          immediate: true,
          handler(newVal, oldVal) {
            if (valueEquals(newVal, oldVal)) return;
            if (Array.isArray(newVal)) {
              this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1
                ? this.$parent.pageSize
                : this.pageSizes[0];
            }
          }
        }
      },

      render() {
        return (
          <span class="el-pagination__sizes">
            <el-select
              value={ this.$parent.internalPageSize }
              popperClass={ this.$parent.popperClass || '' }
              size="mini"
              on-input={ this.handleChange }
              disabled={ this.$parent.disabled }>
              {
                this.pageSizes.map((item: string) =>
                  <el-option
                    value={ item }
                    label={ item + this.t('el.pagination.pagesize') }>
                  </el-option>
                )
              }
            </el-select>
          </span>
        );
      },

      components: {
        ElSelect,
        ElOption
      },

      methods: {
        handleChange(val: string) {
          if (val !== this.$parent.internalPageSize) {
            let newVal = this.$parent.internalPageSize = parseInt(val, 10);
            this.$parent.userChangePageSize = true;
            this.$parent.$emit('update:pageSize', newVal);
            this.$parent.$emit('size-change', newVal);
          }
        }
      }
    },

    Jumper: {
      mixins: [Locale],

      components: { ElInput },

      data() {
        return {
          userInput: null
        };
      },

      watch: {
        '$parent.internalCurrentPage'() {
          this.userInput = null;
        }
      },

      methods: {
        handleKeyup({ keyCode, target }: KeyboardEvent) {
          // Chrome, Safari, Firefox triggers change event on Enter
          // Hack for IE: https://github.com/ElemeFE/element/issues/11710
          // Drop this method when we no longer supports IE
          if (keyCode === 13) {
            // target && this.handleChange(target.value);
          }
        },
        handleInput(value: string) {
          this.userInput = value;
        },
        handleChange(value: string) {
          this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(value);
          this.$parent.emitChange();
          this.userInput = null;
        }
      },

      render() {
        return (
          <span class="el-pagination__jump">
            { this.t('el.pagination.goto') }
            <el-input
              class="el-pagination__editor is-in-pagination"
              min={ 1 }
              max={ this.$parent.internalPageCount }
              value={ this.userInput !== null ? this.userInput : this.$parent.internalCurrentPage }
              type="number"
              disabled={ this.$parent.disabled }
              nativeOnKeyup={ this.handleKeyup }
              onInput={ this.handleInput }
              onChange={ this.handleChange }/>
            { this.t('el.pagination.pageClassifier') }
          </span>
        );
      }
    },

    Total: {
      mixins: [Locale],

      render() {
        return (
          typeof this.$parent.total === 'number'
            ? <span class="el-pagination__total">{ this.t('el.pagination.total', { total: this.$parent.total }) }</span>
            : ''
        );
      }
    },

    Pager
  }
})
