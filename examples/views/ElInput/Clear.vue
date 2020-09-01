<template>
  <el-card shadow="never">
    <template #header>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="使用clearable属性即可得到一个可清空的输入框">
    {{`<el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>

      <script>
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const input = ref('')
          return {
            input
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
  name: 'ElInputClear',
  setup() {
    const input = ref('')
    return {
      input
    }
  }
})
</script>