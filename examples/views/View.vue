<script lang="ts">
import { defineComponent, computed, ref, h, PropType, watch, provide, ComponentOptions, VNode } from 'vue'
import ElTag from './ElTag'
import ElInput from './ElInput'
import ElAvatar from './ElAvatar'
import Layout from './Layout'
import { DemoEntry, Markdown } from './type'

const demos = [
  ElTag,
  ElInput,
  ElAvatar,
  Layout
]
const markdowns: anyObject<Markdown> = {}
const components: anyObject<ComponentOptions> = {}

const load = ({demoComponents, demoMarkdowns, name}: DemoEntry) => {
  demoComponents.forEach((item) => {
    Object.assign(components, {
      [item.name as string]: item
    })
  })
  demoMarkdowns.forEach((item) => {
    Object.assign(markdowns, {
      [name]: item
    })
  })
}
demos.forEach(demo => {
  load(demo)
})
export default defineComponent({
  components,
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
      return markdowns[props.id] || empty
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
    return () => h('div', {
      key: props.id,
      class: props.id.replace(/[A-Z]/g, (s, i) => {
        return (i === 0 ? '' : '-') + s.toLowerCase()
      }) + '-md demo-container'
    }, md.value.render?.() || [])
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
.el-input-md{
  .el-input {
    width: 180px;
  }
}
.el-avatar-md {
  .demo-basic {
    text-align: center;
    .demo-basic--circle,
    .demo-basic--square {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .block {
        flex: 1;
        &:not(:last-child) {
          border-right: 1px solid rgba(224,230,237,.5)
        }
      }
    }
  }

  .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6
  }

  .el-col:not(:last-child) {
    border-right: 1px solid rgba(224,230,237,.5)
  }

  .demo-type {
    display: flex
  }

  .demo-type>div {
    flex: 1;
    text-align: center
  }

  .demo-type>div:not(:last-child) {
    border-right: 1px solid rgba(224,230,237,.5)
  }

  .demo-fit {
    display: flex;
    text-align: center;
    justify-content: space-between;
    .block {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-grow: 0;
    }
    .title {
      margin-bottom: 10px;
      font-size: 14px;
      color: #8492a6
    }
  }
}
</style>
