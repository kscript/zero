<template>
  <el-card shadow="hover">
    <template #header>
      <el-progress :percentage="50"></el-progress>
      <el-progress :percentage="100" :format="format"></el-progress>
      <el-progress :percentage="100" status="success"></el-progress>
      <el-progress :percentage="100" status="warning"></el-progress>
      <el-progress :percentage="50" status="exception"></el-progress>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-progress :percentage="50"></el-progress>
      <el-progress :percentage="100" :format="format"></el-progress>
      <el-progress :percentage="100" status="success"></el-progress>
      <el-progress :percentage="100" status="warning"></el-progress>
      <el-progress :percentage="50" status="exception"></el-progress>
      
      <script lang="ts">
      import { defineComponent } from 'vue'
      export default defineComponent({
        setup() {
          const format = (percentage: number) => {
            return percentage === 100 ? '满' : \`\${percentage}%\`;
          }
          return {
            format
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base',
  setup() {
    const format = (percentage: number) => {
      return percentage === 100 ? '满' : `${percentage}%`;
    }
    return {
      format
    }
  }
})
</script>