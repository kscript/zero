<template>
  <el-card shadow="hover">
    <template #header>
      <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
      <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-checkbox v-model="checked">备选项</el-checkbox>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const checked1 = ref(false)
          const checked2 = ref(true)
          return {
            checked1,
            checked2
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
  name: 'Disabled',
  setup() {
    const checked1 = ref(false)
    const checked2 = ref(true)
    return {
      checked1,
      checked2
    }
  }
})
</script>