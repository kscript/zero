<template>
  <el-card shadow="never">
    <template #header>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="文本域高度可通过 `rows` 属性控制">
    {{`<el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>

      <script>
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const textarea = ref('')
          return {
            textarea
          }
        }
      })
      </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElInputTextarea',
  setup() {
    const textarea = ref('')
    return {
      textarea
    }
  }
})
</script>

