<template>
  <div class="el-code line-numbers" :class="['el-code-' + mode, 'is-' + (show ? 'open' : 'close')]">
    <el-collapse @change="show = !show" v-if="collapse" v-model="collapseNameActive">
      <el-collapse-item>
        <div class="code-desc" v-if="slots.desc || desc">
          <slot name="desc" v-if="slots.desc"></slot>
          <template v-else-if="desc">{{desc}}</template>
        </div>
        <pre
          ref="codeRef"
          data-manual
          class="el-code-lines line-numbers"
          :class="'language-' + type"
          :data-start="start"
        ><code v-html="code"></code></pre>
        <template #title>
          <el-link type="primary" :underline="false">
            <el-icon class="animate" :name="show ? 'caret-top' : 'caret-bottom'"></el-icon>
            <span class="animate text">{{show ? '隐藏' : '显示'}}代码</span>
          </el-link>
        </template>
      </el-collapse-item>
    </el-collapse>
    <template v-else>
      <div class="code-desc" v-if="desc">{{desc}}</div>
      <pre
        ref="codeRef"
        data-manual
        class="el-code-lines line-numbers"
        :class="'language-' + type"
        :data-start="start"
      ><code v-html="code"></code></pre>
    </template>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref, watch, inject,
  onMounted, onUpdated,
  VNode, PropType
} from 'vue'
import ElLink from 'packages/link/src/index.vue'
import ElIcon from 'packages/icon/src/index.vue'
import ElCollapse from 'packages/collapse/src/index.vue'
import ElCollapseItem from 'packages/collapse/src/item.vue'
import { modelValueType, modelValueArray } from '../../collapse/src/type'
const win: anyObject = window
const highlightProxy = win.highlightProxy || ((html?: string, type?: string) => {
  const Prism = win.Prism
  if (html && type) {
    return Prism?.highlight(html, Prism.languages[type], type) || (html.replace(/\</g, '&lt;'))
  }
  Prism?.highlightAll()
})
export default defineComponent({
  name: 'ElCode',
  components: {
    ElLink,
    ElIcon,
    ElCollapse,
    ElCollapseItem
  },
  props: {
    mode: {
      type: String,
      default: 'block'
    },
    type: {
      type: String,
      default: 'html'
    },
    start: {
      type: Number,
      default: 1
    },
    collapse: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Number,
      default: 0
    },
    first: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: ''
    },
    collapseName: {
      type: [Array, String, Number] as PropType<modelValueType>,
      default: () => [] as modelValueArray
    }
  },
  setup(props, { slots }) {
    const code = ref('')
    const show = ref(false)
    const collapseNameActive = ref(props.collapseName)
    const docsView = inject('docsView') as anyObject
    const content = (slot: string | anyObject | anyObject[]): string => {
      if (typeof slot === 'string') {
        return slot
      } else if (Array.isArray(slot)){
        return slot.reduce((text, curr) => text + content(curr.children), '')
      } else {
        if (slot.children) {
          return content(slot.children.map((item: anyObject) => {
            return content(item.default())
          }))
        }
      }
      return ''
    }
    const close = () => {
      collapseNameActive.value = ''
      show.value = false
    }
    watch(() => collapseNameActive.value, (value) => {
      docsView?.collapseNameChange?.(value, close)
    })
    watch(() => show.value, (value) => {
      value && highlightProxy()
    })
    onMounted(() => {
      const slot = slots.default ? slots.default() : []
      let html = content(slot).replace(/^\n/, '')
      let lines = html.split('\n')
      if (props.first && lines.slice(0, props.first).join('').replace(/(\s|\n)/g, '') === '') {
        lines = lines.slice(props.first)
      }
      if (props.trim) {
        const start = (lines.length + props.trim) % lines.length
        const str = ((lines.slice(start, start + 1)[0] || '').match(/\s+/) || [''])[0]
        if (str) {
          html = lines
            .map((line) => {
              if (line.slice(0, str.length) === str) {
                return line.slice(str.length)
              }
              return line
            })
            .join('\n')
        }
      }
      code.value = highlightProxy(html, props.type)
    })
    onUpdated(() => {
      highlightProxy()
    })
    return {
      code,
      show,
      slots,
      collapseNameActive
    }
  }
})
</script>

<style lang="scss">
@import "theme/code.scss";
</style>
<style lang="scss" scoped>
.el-code {
  ::v-deep(.el-collapse){
    border: 0;
    .el-collapse-item {
      display: flex;
      flex-direction: column-reverse;
    }
    .el-collapse-item__header {
      position: relative;
      border: 0;
      display: block;
      text-align: center;
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-collapse-item__arrow {
      display: none;
    }
    .el-link {
      display: block;
      .animate {
        transition: .3s;
        transform: translateX(10px);
      }
      i {
        font-size: 16px;
      }
      .text{
        position: absolute;
        opacity: 0;
        font-size: 14px;
        display: inline-block;
      }
    }
    &:hover {
      .animate{
        opacity: 1;
        transform: translateX(-30px);
      }
    }
  }
}
</style>