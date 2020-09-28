<template>
  <el-card shadow="hover">
    <template #header>
      <el-switch v-model="value">
      </el-switch>
      <el-pagination
        :hide-on-single-page="value"
        :total="5"
        layout="prev, pager, next">
      </el-pagination>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-switch v-model="value">
      </el-switch>
      <el-pagination
        :hide-on-single-page="value"
        :total="5"
        layout="prev, pager, next">
      </el-pagination>
      
      <script lang="ts">
      import { defineComponent,ref } from 'vue'
      export default defineComponent({
        setup() {
          const value = ref(false)
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
import { defineComponent,ref } from 'vue'
export default defineComponent({
  name: 'Hide',
  setup() {
    const value = ref(false)
    return {
      value
    }
  }
})
</script>