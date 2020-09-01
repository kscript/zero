<template>
  <el-card shadow="hover">
    <template #header>
    <el-tag v-for="tag in tags"
      :key="tag.name"
      :type="tag.type"
      closable>{{tag.name}}</el-tag>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，*true* 为关闭。">
    {{
    `<el-tag
      v-for="tag in tags"
      closable
      :key="tag.name"
      :type="tag.type">
      \{\{tag.name\}\}
    </el-tag>

    <script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
      setup() {
        const tags = ref([
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ])
        return {
          tags
        }
      }
    })
    </script>`
    }}
    </el-code>
    </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElTagRemove',
  setup() {
    const tags = ref([
      { name: '标签一', type: '' },
      { name: '标签二', type: 'success' },
      { name: '标签三', type: 'info' },
      { name: '标签四', type: 'warning' },
      { name: '标签五', type: 'danger' }
    ])
    return {
      tags
    }
  }
})
</script>