<template>
  <el-card shadow="hover">
    <template #header>
      <el-button type="text">文字按钮</el-button>
      <el-button type="text" disabled>文字按钮</el-button>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button type="text">文字按钮</el-button>
      <el-button type="text" disabled>文字按钮</el-button>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Text'
})
</script>