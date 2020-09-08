<template>
  <el-card shadow="hover">
    <template #header>
      <el-calendar v-model="value"></el-calendar>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-calendar v-model="value"></el-calendar>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const value = ref('')
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
    const value = ref('')
    return {
      value
    }
  }
})
</script>