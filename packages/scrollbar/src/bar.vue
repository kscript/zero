<script lang="ts">
import { defineComponent, ref, reactive, h, getCurrentInstance, ComponentInternalInstance, PropType, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
// @ts-ignore
import { on, off } from '@/utils/dom'
import { renderThumbStyle, BAR_MAP, BaseMap } from './util'
import { EventType } from 'mitt'

export default defineComponent({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  setup(props) {
    const state = reactive({
      X: 0,
      Y: 0,
      cursorDown: false
    })
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal'] as BaseMap
    })
    const instance = getCurrentInstance() as ComponentInternalInstance 
    const wrap = instance.parent?.refs.wrap as HTMLElement
    const thumb = instance.refs.thumb as HTMLElement
    const clickTrackHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const { direction, offset, client, scroll, scrollSize} = bar.value
      const el = instance.vnode?.el as HTMLElement
      const newOffset = Math.abs(target.getBoundingClientRect()[direction] - e[client])
      const thumbHalf = (thumb[offset] / 2)
      const thumbPositionPercentage = ((newOffset - thumbHalf) * 100 / el[offset])

      wrap[scroll] = (thumbPositionPercentage * wrap[scrollSize] / 100)
    }

    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return
      }
      startDrag(e)
      const { axis, direction, offset, client } = bar.value
      const currentTarget = e.currentTarget as HTMLElement
      state[axis] = (currentTarget[offset] - (e[client] - currentTarget.getBoundingClientRect()[direction]))
    }

    const startDrag = (e: Event) => {
      e.stopImmediatePropagation()
      state.cursorDown = true

      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (state.cursorDown === false) return
      const { axis, offset, scroll, direction, client, scrollSize } = bar.value
      const prevPage = state[axis]

      if (!prevPage) return
      const el = instance.vnode.el as HTMLElement

      const newOffset = ((el.getBoundingClientRect()[direction] - e[client]) * -1)
      const thumbClickPosition = (thumb[offset] - prevPage)
      const thumbPositionPercentage = ((newOffset - thumbClickPosition) * 100 / el[offset])

      wrap[scroll] = (thumbPositionPercentage * wrap[scrollSize] / 100)
    }

    const mouseUpDocumentHandler = (e: Event) => {
      state.cursorDown = false
      state[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    return () => {
      const { size, move } = props
      return h('div', {
        class: ['el-scrollbar__bar', 'is-' + bar.value.key],
        onMousedown: clickTrackHandler
      }, [
        h('div', {
          ref: 'thumb',
          class: 'el-scrollbar__thumb',
          style: renderThumbStyle({ size, move, bar: bar.value }),
          onMousedown: clickThumbHandler
        })
      ])
    }
  },

  // destroyed() {
  //   off(document, 'mouseup', this.mouseUpDocumentHandler)
  // }
})
</script>