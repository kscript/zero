<template>
  <el-card shadow="hover">
    <template #header>
      <el-switch
        v-model="value1"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
      <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-switch
        v-model="value1"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
      <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按月付费"
        inactive-text="按年付费">
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
  name: 'Desc',
  setup() {
    const value1 = ref(true)
    const value2 = ref(true)
    return {
      value1,
      value2
    }
  }
})
</script>