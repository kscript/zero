<template>
  <el-card shadow="hover">
    <template #header>
      <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="使用`show-password`属性即可得到一个可切换显示隐藏的密码框">
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