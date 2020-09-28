import Pager from './pager.vue'
import Prev from './Prev'
import Next from './Next'
import Sizes from './Sizes'
import Jumper from './Jumper'
import Total from './Total'
import { computed, watch, defineComponent, h, PropType, nextTick, toRefs, reactive, getCurrentInstance, ComponentInternalInstance, ref, Prop, provide } from 'vue'

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
      validator(value: number) {
        return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
      },
      default: 7
    } as Prop<Number>,

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      default: 'prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    } as Prop<Number[]>,

    popperClass: String,

    prevText: String,

    nextText: String,

    background: Boolean,

    disabled: Boolean,

    hideOnSinglePage: Boolean
  },

  setup(props, { emit }) {
    const state = reactive({
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false
    })
    const internalPageCount = computed(() => {
      if (typeof props.total === 'number') {
        return Math.max(1, Math.ceil(props.total / state.internalPageSize))
      } else if (typeof props.pageCount === 'number') {
        return Math.max(1, props.pageCount)
      }
      return null
    })

    const handleCurrentChange = (val: number) => {
      state.internalCurrentPage = getValidCurrentPage(val)
      state.userChangePageSize = true
      emitChange()
    }

    const prev = () => {
      if (props.disabled) return
      const newVal = state.internalCurrentPage - 1
      state.internalCurrentPage = getValidCurrentPage(newVal)
      emit('prev-click', state.internalCurrentPage)
      emitChange()
    }

    const next = () => {
      if (props.disabled) return
      const newVal = state.internalCurrentPage + 1
      state.internalCurrentPage = getValidCurrentPage(newVal)
      emit('next-click', state.internalCurrentPage)
      emitChange()
    }

    const getValidCurrentPage = (value: string | number) => {
      value = parseInt(String(value), 10)

      const havePageCount = typeof internalPageCount.value === 'number'

      let resetValue

      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1
      } else {
        if (value < 1) {
          resetValue = 1
        } else if (internalPageCount.value && value > internalPageCount.value) {
          resetValue = internalPageCount.value
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1
      } else if (resetValue === 0) {
        resetValue = 1
      }

      return resetValue === undefined ? value : resetValue
    }

    const emitChange = () => {
      nextTick(() => {
        if (
          state.internalCurrentPage !== state.lastEmittedPage ||
          state.userChangePageSize
        ) {
          emit('current-change', state.internalCurrentPage)
          state.lastEmittedPage = state.internalCurrentPage
          state.userChangePageSize = false
        }
      })
    }

    watch(
      () => props.currentPage,
      val => {
        state.internalCurrentPage = getValidCurrentPage(val) as number
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.pageSize,
      val => {
        state.internalPageSize = isNaN(val) ? 10 : val
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.pageSize,
      newVal => {
        emit('update:currentPage', newVal)
        state.lastEmittedPage = -1
      },
      {
        immediate: true
      }
    )

    watch(
      () => internalPageCount.value,
      (newVal: number | null) => {
        /* istanbul ignore if */
        const oldPage = state.internalCurrentPage
        if (typeof newVal === 'number') {
          if (newVal > 0 && oldPage === 0) {
            state.internalCurrentPage = 1
          } else if (oldPage > newVal) {
            state.internalCurrentPage = newVal === 0 ? 1 : newVal
            state.userChangePageSize && emitChange()
          }
          state.userChangePageSize = false
        }
      }
    )
    const returnValue = {
      ...toRefs(state),
      internalPageCount,
      handleCurrentChange,
      getValidCurrentPage,
      emitChange,
      prev,
      next
    }
    provide('ElPagination', Object.assign({}, returnValue, props))
    return returnValue
  },

  render() {
    const layout = this.layout
    if (!layout) return null
    if (
      this.hideOnSinglePage &&
      (!this.internalPageCount || this.internalPageCount === 1)
    )
      return null

    let template = (
      <div
        class={[
          'el-pagination',
          {
            'is-background': this.background,
            'el-pagination--small': this.small
          }
        ]}
      ></div>
    )
    const TEMPLATE_MAP = {
      prev: <prev></prev>,
      jumper: <jumper></jumper>,
      pager: (
        <pager
          currentPage={this.internalCurrentPage}
          pageCount={this.internalPageCount}
          pagerCount={this.pagerCount}
          onChange={this.handleCurrentChange}
          disabled={this.disabled}
        ></pager>
      ),
      next: <next></next>,
      sizes: <sizes pageSizes={this.pageSizes}></sizes>,
      slot: <slot>{this.$slots.default ? this.$slots.default : ''}</slot>,
      total: <total></total>
    }
    const components = layout.split(',').map(item => item.trim())
    const rightWrapper = <div class="el-pagination__rightwrapper"></div>
    let haveRightWrapper = false

    const templateChildren = [] as any[]
    const rightWrapperChildren = [] as any[]
    components.forEach(compo => {
      if (compo === '->') {
        haveRightWrapper = true
        return
      }

      if (!haveRightWrapper) {
        // @ts-ignore
        templateChildren.push(TEMPLATE_MAP[compo])
      } else {
        // @ts-ignore
        rightWrapperChildren.push(TEMPLATE_MAP[compo])
      }
    })

    if (haveRightWrapper) {
      templateChildren.unshift(rightWrapper)
    }
    return h(template, templateChildren)
  },

  components: {
    Prev,
    Next,
    Sizes,
    Jumper,
    Total,
    Pager
  }
})
