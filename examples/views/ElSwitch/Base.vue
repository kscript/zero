<template>
  <el-card shadow="hover">
    <template #header>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const value = ref(true)
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
  name: 'Base',
  setup() {
    const value = ref(true)
    return {
      value
    }
  }
})
</script>