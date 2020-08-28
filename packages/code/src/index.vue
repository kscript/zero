<template>
  <div class="el-code line-numbers" :class="'el-code-' + mode">
    <el-collapse @change="show = !show" v-if="collapse">
      <el-collapse-item>
        <pre
          ref="codeRef"
          data-manual
          class="el-code-lines line-numbers"
          :class="'language-' + type"
          :data-start="start"
        >
          <code v-html="code"></code>
        </pre>
        <template #title>
          <el-link type="primary" :underline="false">
            <el-icon class="animate" :name="show ? 'caret-top' : 'caret-bottom'"></el-icon>
            <span class="animate text">{{show ? '隐藏' : '显示'}}代码</span>
          </el-link>
        </template>
      </el-collapse-item>
    </el-collapse>
    <pre
      ref="codeRef"
      data-manual
      class="el-code-lines line-numbers"
      :class="'language-' + type"
      :data-start="start"
      v-else
    >
      <code v-html="code"></code>
    </pre>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted, onUpdated,
  getCurrentInstance,
  ComponentInternalInstance, VNode
} from 'vue'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
// @ts-ignore
// Prism.languages.html.br = /\n/

export default defineComponent({
  name: 'ElCode',
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
  },
  setup(props, cxt) {
    const code = ref('')
    const show = ref(false)
    const content = (slot: string | anyObject[]): string => {
      if (typeof slot === 'string') {
        return slot
      } else {
        return slot.reduce((text, curr) => text + content(curr.children), '')
      }
    }
    onMounted(() => {
      const slot = cxt.slots.default ? cxt.slots.default() : []
      let html = content(slot).replace(/^\n/, '')
      const lines = html.split('\n')
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
      // @ts-ignore
      code.value = Prism.highlight(html, Prism.languages[props.type], props.type)
    })
    onUpdated(() => {
      // @ts-ignore
      Prism.highlightAll()
    })
    return {
      code,
      show
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