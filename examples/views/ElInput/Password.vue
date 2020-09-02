<template>
  <el-card shadow="hover">
    <template #header>
      <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-input placeholder="请输入密码" v-model="input" show-password></el-input>

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
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElInputPassword',
  setup() {
    const input = ref('')
    return {
      input
    }
  }
})
</script>