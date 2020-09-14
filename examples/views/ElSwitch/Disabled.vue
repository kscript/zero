<template>
  <el-card shadow="hover">
    <template #header>
      <el-switch
        v-model="value1"
        disabled>
      </el-switch>
      <el-switch
        v-model="value2"
        disabled>
      </el-switch>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-switch
        v-model="value1"
        disabled>
      </el-switch>
      <el-switch
        v-model="value2"
        disabled>
      </el-switch>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const value1 = ref(true)
          const value2 = ref(true)
          return {
            value1,
            value2
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
    const value1 = ref(true)
    const value2 = ref(false)
    return {
      value1,
      value2
    }
  }
})
</script>