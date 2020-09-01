<template>
  <el-card shadow="hover">
    <template #header>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="">
    {{`<el-input v-model="input" placeholder="请输入内容"></el-input>

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
  name: 'ElInputBase',
  setup() {
    const input = ref('')
    return {
      input
    }
  }
})
</script>