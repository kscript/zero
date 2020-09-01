<template>
  <el-card shadow="hover">
    <template #header>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        :disabled="true">
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="通过 disabled 属性指定是否禁用 input 组件">
    {{`<el-input
        placeholder="请输入内容"
        v-model="input"
        :disabled="true">
      </el-input>

      <script>
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        name: 'ElInputDisabled',
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
  name: 'ElInputDisabled',
  setup() {
    const input = ref('')
    return {
      input
    }
  }
})
</script>