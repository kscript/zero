<template>
  <el-card shadow="hover">
    <template #header>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
      </el-input>

      <script>
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const textarea1 = ref('')
          const textarea2 = ref('')
          return {
            textarea1,
            textarea2
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
  name: 'ElInputAutosize',
  setup() {
    const textarea1 = ref('')
    const textarea2 = ref('')
    return {
      textarea1,
      textarea2
    }
  }
})
</script>

