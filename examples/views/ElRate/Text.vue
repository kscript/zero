<template>
  <el-card shadow="hover">
    <template #header>
      <el-rate v-model="value" show-text> </el-rate>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-rate v-model="value" show-text> </el-rate>

      <script lang="ts">
        import { defineComponent, ref } from 'vue'
        export default defineComponent({
          setup() {
            const value = ref(null)
            return {
              value
            }
          }
        })
      </script>
      `}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Text',
  setup() {
    const value = ref(null)
    return {
      value
    }
  }
})
</script>