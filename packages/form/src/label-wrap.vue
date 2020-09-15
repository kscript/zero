<script lang="ts">
import { ComponentInternalInstance, defineComponent, Fragment, getCurrentInstance, h, inject, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'

export default defineComponent({
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },

  inject: ['elForm', 'elFormItem'],

  setup(props, { slots }) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const elForm = inject('elForm', {} as anyObject)
    const elFormItem = inject('elFormItem', {} as anyObject)
    const computedWidth = ref(0)
    const getLabelWidth = () => {
      const el = instance.vnode?.el as HTMLElement
      if (el?.firstElementChild) {
        const computedWidth = window.getComputedStyle(
          el.firstElementChild
        ).width
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    }
    const updateLabelWidth = (action = 'update') => {
      const el = instance.vnode?.el as HTMLElement
      if (
        slots.default &&
        props.isAutoWidth &&
        el?.firstElementChild
      ) {
        if (action === 'update') {
          computedWidth.value = getLabelWidth()
        } else if (action === 'remove') {
          elForm.deregisterLabelWidth(computedWidth.value)
        }
      }
    }

    watch(() => computedWidth.value, (val, oldVal) => {
      if (props.updateAll) {
        elForm.registerLabelWidth(val, oldVal)
        elFormItem.updateComputedLabelWidth(val)
      }
    })
    onMounted(() => {
      updateLabelWidth('update')
    })
    onUpdated(() => {
      updateLabelWidth('update')
    })
    onBeforeUnmount(() => {
      updateLabelWidth('remove')
    })
    return () => {
      if (!slots) return null
      if (props.isAutoWidth) {
        const autoLabelWidth = elForm.autoLabelWidth
        const style = {} as CSSStyleDeclaration
        if (autoLabelWidth && autoLabelWidth !== 'auto') {
          const marginLeft = parseInt(autoLabelWidth, 10) - computedWidth.value
          if (marginLeft) {
            style.marginLeft = marginLeft + 'px'
          }
        }
        return h('div', {
          class:"el-form-item__label-wrap",
          style
        }, slots)
      } else {
        return h(Fragment, {}, slots.default?.() || [])
      }
    }
  }
})
</script>
