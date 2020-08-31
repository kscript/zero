<script lang="ts">
import { defineComponent, computed, h, PropType, watch, provide } from 'vue'
const componets: anyObject = {
  ElTag: () => require('./Markdown/ElTag.md').default
}
export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const empty = {
      render() {
      }
    }
    const md = computed(() => {
      return componets[props.id]?.() || empty
    })
    const collapses = {} as anyObject<Function>
    let prevClose = null as Function | null
    provide('docsView', {
      collapseNameChange(value: any, close: Function) {
        if (value) {
          collapses[value] = close
          for(let name in collapses) {
            if (collapses[name] !== close) {
              collapses[name]()
            }
          }
        }
      }
    })
    return () => {
      return h('div',{
          class: props.id.replace(/[A-Z]/g, (s, i) => {
            return (i === 0 ? '' : '-') + s.toLowerCase()
          }) + '-md demo-container'
      }, md.value.render?.() || [])
    }
  }
})
</script>
<style lang="scss">
.demo-container {
  .el-card__body {
    padding: 0px;
    .el-code.is-open{
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
}
.el-tag-md{
  .el-tag {
    margin-right: 10px;
  }
}
</style>