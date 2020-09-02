<template>
  <el-card shadow="hover">
    <template #header>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="text"
        maxlength="10"
        show-word-limit
      >
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
      >
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1">
    {{`<el-input
        type="text"
        placeholder="请输入内容"
        v-model="text"
        maxlength="10"
        show-word-limit
      >
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
      >
      </el-input>

      <script>
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const text = ref('')
          const textarea = ref('')
          return {
            text,
            textarea
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElInputLength',
  setup() {
    const text = ref('')
    const textarea = ref('')
    return {
      text,
      textarea
    }
  }
})
</script>

