<script lang="ts">
import { defineComponent, h, computed } from 'vue'
export default defineComponent({
  name: 'ElRow',

  componentName: 'ElRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  setup(props, { slots }) {
    const style = computed(() => {
      const ret:anyObject = {};
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret;
    })
    return () => {
      return h(props.tag, {
        class: [
          'el-row',
          props.justify !== 'start' ? `is-justify-${props.justify}` : '',
          props.align !== 'top' ? `is-align-${props.align}` : '',
          { 'el-row--flex': props.type === 'flex' }
        ],
        style: style.value
      }, slots.default?.() || [])
    }
  }
})

</script>
<style lang="scss">
@import 'theme/row.scss';
</style>
