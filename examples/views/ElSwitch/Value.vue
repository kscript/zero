<template>
  <el-card shadow="hover">
    <template #header>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="100"
        inactive-value="0">
      </el-switch>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="100"
        inactive-value="0">
      </el-switch>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const value = ref('100')
          return {
            value
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
  name: 'Value',
  setup() {
    const value = ref('100')
    return {
      value
    }
  }
})
</script>