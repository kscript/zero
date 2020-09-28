<template>
  <el-card shadow="hover">
    <template #header>
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>

      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const value = ref(3.7)
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
  name: 'Disabled',
  setup() {
    const value = ref(3.7)
    return {
      value
    }
  }
})
</script>