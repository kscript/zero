<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  h,
  PropType,
  watch,
  provide,
  ComponentOptions,
  VNode,
  inject,
  onUpdated,
  onMounted
} from 'vue'
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
import ElCarousel from './ElCarousel'
import ElCheckbox from './ElCheckbox'
import ElDialog from './ElDialog'
import ElDivider from './ElDivider'
import ElDrawer from './ElDrawer'
import ElDropdown from './ElDropdown'
import ElRadio from './ElRadio'
import ElRate from './ElRate'
import ElForm from './ElForm'
import ElSwitch from './ElSwitch'
import ElImage from './ElImage'
import ElPagination from './ElPagination'
import ElProgress from './ElProgress'
import ElSelect from './ElSelect'
import ElSteps from './ElSteps'
import ElTimeline from './ElTimeline'
import InfiniteScroll from './InfiniteScroll'
import { DemoEntry, Markdown } from './type'

const demos = [
  Installation,
  Container,
  ElAvatar,
  ElAlert,
  ElBadge,
  ElBacktop,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCollapse,
  ElCalendar,
  ElCarousel,
  ElCheckbox,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElForm,
  ElIcon,
  ElImage,
  ElInput,
  ElLink,
  ElPagination,
  ElProgress,
  ElRadio,
  ElRate,
  ElSelect,
  ElSteps,
  ElSwitch,
  ElTag,
  ElTimeline,
  InfiniteScroll,
  Layout,
]
const markdowns: anyObject<Markdown> = {}
const components: anyObject<ComponentOptions> = {}

const load = ({ demoComponents, demoMarkdowns, name }: DemoEntry) => {
  demoComponents.forEach((item: anyObject) => {
    const cname =
      (item.name.slice(0, name.length) !== name ? name : '') + item.name
    Object.assign(components, {
      [cname]: item
    })
  })
  demoMarkdowns.forEach(item => {
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
      render() {}
    }

    const accordion = ref(true)
    const md = computed(() => {
      return markdowns[props.id] || empty
    })
    const collapses = {} as anyObject<Function>
    const home = inject('home') as anyObject
    watch(
      () => props.id,
      () => {
        try {
          const scroll = home.instance.refs.scroll
          scroll && (scroll.$refs.wrap.scrollTop = 0)
        } catch (err) {
          console.log(err)
        }
      }
    )
    provide('docsView', {
      collapseNameChange(value: any, close: Function) {
        if (value) {
          collapses[value] = close
          if (accordion.value) {
            for (let name in collapses) {
              if (collapses[name] !== close) {
                collapses[name]()
              }
            }
          }
        }
      }
    })
    // @ts-ignore
    const highlight = () => window?.highlightProxy?.()
    onMounted(highlight)
    onUpdated(highlight)
    return () =>
      h(
        'div',
        {
          key: props.id,
          class:
            props.id.replace(/[A-Z]/g, (s, i) => {
              return (i === 0 ? '' : '-') + s.toLowerCase()
            }) + '-md demo-container'
        },
        md.value.render?.() || []
      )
  }
})
</script>
<style lang="scss">
@keyframes bgSize {
  0% {
    opacity: 0;
    background-size: 0%;
    transform: rotateX(180deg);
  }
  50% {
    opacity: 1;
    transform: rotateX(0deg);
  }
  100% {
    background-size: 50%;
  }
}
.demo-container {
  iframe {
    background: url('../assets/codepen.svg') center no-repeat #eee;
    background-size: 60%;
    border: 1px solid #fff;
    animation: bgSize 1s;
  }
  .markdown-body>p>.el-card>.el-card__body {
    padding: 0px;
    .el-code.is-open {
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
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, SimSun, sans-serif;
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
        max-width: 250px;
      }

      th {
        text-align: left;
        white-space: nowrap;
        color: #909399;
        font-weight: 400;
      }

      td {
        color: #606266;
      }

      td:first-child,
      th:first-child {
        padding-left: 10px;
      }
    }
    .el-card {
      ul,
      ol {
        padding-left: 0;
      }
    }
  }
}

.el-card {
  margin: 10px 0 20px;
  line-height: 18px;
}

.el-tag-md {
  .el-tag {
    margin-right: 10px;
  }
}

.el-input-md {
  .el-input {
    width: 180px;
  }
  .demo-autocomplete {
    text-align: center;
  }

  .demo-autocomplete .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
  }

  .demo-autocomplete .el-col:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.5);
  }

  .demo-autocomplete .el-autocomplete {
    text-align: left;
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
          border-right: 1px solid rgba(224, 230, 237, 0.5);
        }
      }
    }
  }

  .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
  }

  .el-col:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.5);
  }

  .demo-type {
    display: flex;
  }

  .demo-type > div {
    flex: 1;
    text-align: center;
  }

  .demo-type > div:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.5);
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
      color: #8492a6;
    }
  }
}

.el-alert-md {
  .el-alert {
    margin: 20px 0 0;
  }
  .el-alert:first-child {
    margin: 0;
  }
}

.el-icon-md {
  .source {
    span {
      i {
        color: #606266;
        margin: 0 20px;
        font-size: 1.5em;
        vertical-align: middle;
      }
    }
    button {
      margin: 0 20px;
    }
  }

  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
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
        i,
        span {
          color: #5cb6ff;
        }
      }
      &:after {
        content: '';
        height: 100%;
      }
      &:after,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        line-height: normal;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, SimSun, sans-serif;
        color: #99a9bf;
        transition: color 0.15s linear;
      }
      i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color 0.15s linear;
      }
      .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em;
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
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}

.el-link-md {
  .el-link {
    margin-right: 5px;
  }
  .el-link [class*='el-icon-'] + span {
    margin-left: 5px;
  }
}

.el-calendar-md {
  .is-selected {
    color: #1989fa;
  }
  table {
    td,
    th {
      padding: 0;
    }
  }
}

.el-carousel-md {
  .block {
    padding: 30px;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
  }

  .block:last-child {
    border-right: none;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .el-carousel__container {
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #fff;
    font-size: 18px;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item h3.small {
    font-size: 14px;
    line-height: 150px;
  }

  .el-carousel__item h3.medium {
    font-size: 14px;
    line-height: 200px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(odd) {
    background-color: #d3dce6;
  }
}

.el-dropdown-md {
  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
}

.el-form-md {
  .el-form {
    width: 460px;
  }

  .line {
    text-align: center;
  }

  .el-checkbox-group {
    width: 320px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .el-checkbox-group:after,
  .el-checkbox-group:before {
    content: ' ';
    display: table;
  }

  .el-checkbox-group:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
  }

  .el-checkbox-group .el-checkbox {
    float: left;
    width: 160px;
    margin: 0;
    padding: 0;
  }

  .el-checkbox-group .el-checkbox + .el-checkbox {
    margin-left: 0;
  }

  .demo-form-normal {
    width: 460px;
  }

  .demo-form-inline {
    width: auto;
  }

  .demo-form-inline .el-input {
    width: 150px;
  }

  .demo-form-inline > * {
    margin-right: 10px;
  }

  .demo-ruleForm {
    width: 460px;
  }

  .demo-ruleForm .el-select .el-input {
    width: 360px;
  }

  .demo-dynamic .el-input {
    margin-right: 10px;
    width: 270px;
    vertical-align: top;
  }

  .fr {
    float: right;
  }
}

.el-image-md {
  @keyframes dot {
    0% {
      width: 0;
      margin-right: 1em;
    }

    to {
      width: 1em;
      margin-right: 0;
    }
  }

  .demo-image .block,
  .demo-image__error .block,
  .demo-image__placeholder .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }

  .demo-image .block:last-child,
  .demo-image__error .block:last-child,
  .demo-image__placeholder .block:last-child {
    border-right: none;
  }

  .demo-image .demonstration,
  .demo-image__error .demonstration,
  .demo-image__placeholder .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .demo-image__error .block,
  .demo-image__placeholder .block {
    width: 49%;
  }

  .demo-image__error .el-image,
  .demo-image__placeholder .el-image {
    width: 300px;
    height: 200px;
  }

  .demo-image__error .image-slot,
  .demo-image__placeholder .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
  }

  .demo-image__placeholder .dot {
    animation: dot 2s steps(3, start) infinite;
    overflow: hidden;
  }

  .demo-image__error .image-slot {
    font-size: 30px;
  }

  .demo-image__lazy {
    height: 400px;
    overflow-y: auto;
  }

  .demo-image__lazy .el-image {
    display: block;
    min-height: 200px;
    margin-bottom: 10px;
  }

  .demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
  }
}
.infinite-scroll-md {
  .infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
    .infinite-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #e8f3fe;
      margin: 10px;
      color: #7dbcfc;
    }
    .infinite-list-item + .list-item {
      margin-top: 10px;
    }
  }
  .infinite-list-wrapper {
    height: 300px;
    text-align: center;
    .list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #fff6f6;
      color: #ff8484;
    }

    .list-item + .list-item {
      margin-top: 10px;
    }
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.el-progress-md {
  .el-progress--line {
    width: 350px;
    margin-bottom: 15px;
  }
  .el-progress--circle {
    margin-right: 15px;
  }
}
.el-rate-md {
  .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    &:last-child {
      border-right: none;
    }
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px
  }
}
.el-timeline-md {
  .el-timeline {
    margin-top: 20px;
  }
}
.el-select-md {
  .el-select__input{
    margin-left: 15px;
  }
}
</style>
