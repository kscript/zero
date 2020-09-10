<template>
  <el-card shadow="hover">
    <template #header>
      <el-checkbox v-model="checked">备选项</el-checkbox>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-checkbox v-model="checked">备选项</el-checkbox>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const checked = ref(true)
          return {
            checked
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Base',
  setup() {
    const checked = ref(true)
    return {
      checked
    }
  }
})
</script>