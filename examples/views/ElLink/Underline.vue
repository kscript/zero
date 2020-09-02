<template>
  <el-card shadow="hover">
    <template #header>
      <el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Underline'
})
</script>