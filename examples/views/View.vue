<script lang="ts">
import { defineComponent, computed, ref, h, PropType, watch, provide, ComponentOptions, VNode, inject, onUpdated, onMounted } from 'vue'
import Installation from './Installation'
import ElTag from './ElTag'
import ElInput from './ElInput'
import ElAvatar from './ElAvatar'
import Layout from './Layout'
import ElAlert from './ElAlert'
import ElIcon from './ElIcon'
import ElBadge from './ElBadge'
import ElButton from './ElButton'
import ElCard from './ElCard'
import ElCollapse from './ElCollapse'
import Container from './Container'
import ElBacktop from './ElBacktop'
import ElBreadcrumb from './ElBreadcrumb'
import ElLink from './ElLink'
import ElCalendar from './ElCalendar'
import { DemoEntry, Markdown } from './type'

const demos = [
  Installation,
  ElTag,
  ElInput,
  ElAvatar,
  ElAlert,
  Layout,
  ElIcon,
  ElBadge,
  ElButton,
  ElCard,
  ElCollapse,
  Container,
  ElBacktop,
  ElBreadcrumb,
  ElLink,
  ElCalendar
]
const markdowns: anyObject<Markdown> = {}
const components: anyObject<ComponentOptions> = {}

const load = ({demoComponents, demoMarkdowns, name}: DemoEntry) => {
  demoComponents.forEach((item: anyObject) => {
    const cname = (item.name.slice(0, name.length) !== name ? name : '') + item.name
    Object.assign(components, {
      [cname]: item
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
  setup(props, { slots }) {
    const empty = {
      render() {
      }
    }
    const accordion = ref(true)
    const md = computed(() => {
      return markdowns[props.id] || empty
    })
    const collapses = {} as anyObject<Function>
    const home = inject('home') as anyObject
    watch(() => props.id, () => {
      try {
        const scroll = home.instance.refs.scroll
        scroll && (scroll.$refs.wrap.scrollTop = 0)
      } catch (err) {
        console.log(err)
      }
    })
    provide('docsView', {
      collapseNameChange(value: any, close: Function) {
        if (value) {
          collapses[value] = close
          if (accordion.value) {
            for(let name in collapses) {
              if (collapses[name] !== close) {
                collapses[name]()
              }
            }
          }
        }
      }
    })
    // @ts-ignore
    const highlight = () => Prism.highlightAll()
    onMounted(highlight)
    onUpdated(highlight)
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
  .markdown-body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
  .el-card__body {
    padding: 0px;
    .el-code.is-open{
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
  .code-desc {
    padding: 15px;
    font-size: 14px;
    line-height: 26px;
    color: #5e6d82;
    p {
      margin: 0;
      line-height: 26px;
    }
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
    & > code {
      background-color: #f9fafc;
      padding: 0 4px;
      border: 1px solid #eaeefb;
      border-radius: 4px;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    display: table;
  }
  .markdown-body {
    
    & > table {
      border-collapse: collapse;
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 45px;
      line-height: 1.5em;
      display: table;
      td,
      th {
        border: 0;
        border-bottom: 1px solid #dcdfe6;
        padding: 15px;
        max-width: 250px
      }
  
      th {
        text-align: left;
        white-space: nowrap;
        color: #909399;
        font-weight: 400
      }
  
      td {
        color: #606266
      }
  
      td:first-child,
      th:first-child {
        padding-left: 10px
      }
    }
  }

}

.el-card {
  margin: 10px 0 20px;
  line-height: 18px;
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
  .demo-autocomplete {
    text-align: center
  }

  .demo-autocomplete .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6
  }

  .demo-autocomplete .el-col:not(:last-child) {
    border-right: 1px solid rgba(224,230,237,.5)
  }

  .demo-autocomplete .el-autocomplete {
    text-align: left
  }
}
.el-autocomplete-suggestion {
  &.my-autocomplete {
    li {
      line-height: normal;
      padding-top: 7px;
      padding-bottom: 7px;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }
      .highlighted .addr {
        color: #ddd;
      }
    }
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

.el-alert-md {
  .el-alert {
    margin: 20px 0 0
  }
  .el-alert:first-child {
    margin: 0
  }
}

.el-icon-md {
  .source {
    span{
      i {
        color: #606266;
        margin: 0 20px;
        font-size: 1.5em;
        vertical-align: middle
      }
    }
    button {
      margin: 0 20px
    }
  }


  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    li {
      float: left;
      width: 16.777%;
      text-align: center;
      height: 120px;
      line-height: 120px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      &:hover {
        i, span {
          color: #5cb6ff
        }
      }
      &:after {
        content: "";
        height: 100%;
      }
      &:after,
      span {
        display: inline-block;
        vertical-align: middle
      }
      span {
        line-height: normal;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        color: #99a9bf;
        transition: color .15s linear
      }
      i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color .15s linear
      }
      .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em
      }
    }
  }
}

.el-button-md {
  .el-row {
    margin-bottom: 15px;
  }
}

.layout-md {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px
  }
  .bg-purple-dark {
    background: #99a9bf
  }
  .bg-purple {
    background: #d3dce6
  }
  .bg-purple-light {
    background: #e5e9f2
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc
  }
}
.el-link-md {
  .el-link {
    margin-right: 5px;
  }
  .el-link [class*=el-icon-]+span {
    margin-left: 5px;
  }
}

.el-calendar-md {
   .is-selected {
    color: #1989fa
  }
  table {
    td,
    th {
      padding: 0;
    }
  }
}
</style>
