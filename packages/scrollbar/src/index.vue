<script lang="ts">
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
import {
  defineComponent,
  h, ref, toRefs, reactive, computed,
  onMounted, onBeforeUnmount,
  getCurrentInstance, nextTick,
  PropType, ComponentInternalInstance
} from 'vue'
// @ts-ignore
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
// @ts-ignore
import scrollbarWidth from '@/utils/scrollbar-width'
// @ts-ignore
import { toObject } from '@/utils/util'
import Bar from './bar.vue'

/* istanbul ignore next */
export default defineComponent({
  name: 'ElScrollbar',

  props: {
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [Object, Array, String] as PropType<anyObject | (anyObject | String)[] | String>,
      default: ''
    },
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },

  setup(props, cxt) {
    const state = reactive({
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const wrap = ref(instance.refs.wrap as HTMLElement)

    const handleScroll = () => {
      if (!wrap.value) return
      state.moveY = (wrap.value.scrollTop * 100) / wrap.value.clientHeight
      state.moveX = (wrap.value.scrollLeft * 100) / wrap.value.clientWidth
    }

    const update = () => {
      let heightPercentage, widthPercentage
      if (!wrap.value) return

      heightPercentage = (wrap.value.clientHeight * 100) / wrap.value.scrollHeight
      widthPercentage = (wrap.value.clientWidth * 100) / wrap.value.scrollWidth

      state.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
      state.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
    }
    onMounted(() => {
      wrap.value = instance.refs.wrap as HTMLElement
      if (props.native) return
      nextTick(update)
      if (!props.noresize) {
        addResizeListener(instance.refs.resize, update)
        window.addEventListener('resize', update)
      }
    })
    onBeforeUnmount(() => {
      if (props.native) return
      if (!props.noresize) {
        removeResizeListener(instance.refs.resize, update)
        window.removeEventListener('resize', update)
      }
    })
    return {
      ...toRefs(state),
      update,
      handleScroll
    }
  },
  render() {
    const gutter = scrollbarWidth()
    let style = this.wrapStyle
    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `padding-bottom: ${gutter}px; padding-right: ${gutter}px; margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`
      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle) as anyObject
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    const view = h(this.tag, {
      ref: 'resize',
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
    }, this.$slots.default?.() || [])

    let nodes

    if (!this.native) {
      const wrap = h('div', {
        ref: 'wrap',
        style,
        class: [this.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'],
        onScroll: this.handleScroll,
      }, [view])
      nodes = ([
        wrap,
        h(Bar, {
          move: this.moveX,
          size: this.sizeWidth
        }),
        h(Bar, {
          vertical: '',
          move: this.moveY,
          size: this.sizeHeight
        })
      ])
    } else {
      nodes = [h('div', {
        ref: 'wrap',
        style,
        class: [this.wrapClass, 'el-scrollbar__wrap']
      }, [view])]
    }
    return h('div', { class: 'el-scrollbar' }, nodes)
  }
})
</script>
<style lang="scss">
@import "theme/scrollbar.scss";
</style>
