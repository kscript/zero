<script lang="tsx">
import { computed, defineComponent, getCurrentInstance, h, provide, ref, watch, Fragment, VNode } from 'vue'

export default defineComponent({
  name: 'ElTimeline',

  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { slots }) {
    provide('ElTimeline', getCurrentInstance())
    const slot = ref([] as any[])
    const classes = computed(() => {
      return {
        'el-timeline': true,
        'is-reverse': props.reverse
      }
    })
    watch(() => props.reverse, (value) => {
      let items: any[] = []
      slots.default?.()!.forEach(item => {
        item.type === Fragment ? items = items.concat(item.children) : items.push(item)
      })
      slot.value = value ? items.reverse() : items
    }, {
      immediate: true
    })
    return () => h('ul', {
      class: classes.value
    }, slot.value)
  }
})
</script>

<style lang="scss">
@import 'theme/timeline.scss';
</style>
