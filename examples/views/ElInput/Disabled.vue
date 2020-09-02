<template>
  <el-card shadow="hover">
    <template #header>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        :disabled="true">
      </el-input>
    </template>
    <el-code collapse :trim="-1" :first="1">
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
      <template #desc><slot></slot></template>
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