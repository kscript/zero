<script lang="ts">
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
import { defineComponent, ref, reactive, h, getCurrentInstance, ComponentInternalInstance, PropType, onMounted, nextTick, onBeforeUnmount } from 'vue'
// @ts-ignore
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
// @ts-ignore
import scrollbarWidth from '@/utils/scrollbar-width'
// @ts-ignore
import { toObject } from '@/utils/util'
import Bar from './bar.vue'
import { anyObject } from 'packages/global'

/* istanbul ignore next */
export default defineComponent({
  name: 'ElScrollbar',

  components: { Bar },

  props: {
    native: Boolean,
    wrapStyle: {
      type: [Object, Array, String] as PropType<anyObject | (anyObject|String)[] | String>,
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
      state.moveY = ((wrap.value.scrollTop * 100) / wrap.value.clientHeight)
      state.moveX = ((wrap.value.scrollLeft * 100) / wrap.value.clientWidth)
    }
    const update = () => {
      let heightPercentage, widthPercentage
      if (!wrap.value) return

      heightPercentage = (wrap.value.clientHeight * 100 / wrap.value.scrollHeight)
      widthPercentage = (wrap.value.clientWidth * 100 / wrap.value.scrollWidth)

      state.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      state.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    }
    onMounted(() => {
      if (props.native) return
      nextTick(update)
      !props.noresize && addResizeListener(instance.refs.resize, update)
    })
    onBeforeUnmount(() => {
      if (props.native) return
      !props.noresize && removeResizeListener(instance.refs.resize, update)
    })
    return () => {
      const gutter = scrollbarWidth()
      let style = props.wrapStyle
      if (gutter) {
        const gutterWith = `-${gutter}px`
        const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

        if (Array.isArray(props.wrapStyle)) {
          style = toObject(props.wrapStyle) as anyObject
          style.marginRight = style.marginBottom = gutterWith
        } else if (typeof props.wrapStyle === 'string') {
          style += gutterStyle
        } else {
          style = gutterStyle
        }
      }

      const view = h(props.tag, {
        ref: 'resize',
        class: ['el-scrollbar__view', props.viewClass],
        style: props.viewStyle,
      }, cxt.slots.default?.() || [])
      const wrap = h('div', {
        ref: 'wrap',
        style,
        class: [props.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'],
        onScroll: handleScroll,
      }, [view])

      let nodes

      if (!props.native) {
        nodes = ([
          wrap,
          h('Bar', {
            move: state.moveX,
            size: state.sizeWidth
          }),
          h('Bar', {
            vertical: '',
            move: state.moveY,
            size: state.sizeHeight
          })
        ])
      } else {
        nodes = [h('div', {
          ref: 'wrap',
          style,
          class: [props.wrapClass, 'el-scrollbar__wrap']
        }, [view])]
      }
      return h('div', { class: 'el-scrollbar' }, nodes)
    }
  }
})

</script>>
