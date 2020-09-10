<template>
  <el-card shadow="hover">
    <template #header>
      <el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
      <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
      <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const radio = ref('选中且禁用')
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
  name: 'Disabled',
  setup() {
    const radio = ref('选中且禁用')
    return {
      radio
    }
  }
})
</script>