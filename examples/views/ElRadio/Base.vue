<template>
  <el-card shadow="hover">
    <template #header>
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>

      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const radio = ref(1)
          return {
            radio
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
    const radio = ref('1')
    return {
      radio
    }
  }
})
</script>