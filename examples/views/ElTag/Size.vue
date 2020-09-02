<template>
  <el-card shadow="hover">
    <template #header>
      <el-tag closable>默认标签</el-tag>
      <el-tag size="medium" closable>中等标签</el-tag>
      <el-tag size="small" closable>小型标签</el-tag>
      <el-tag size="mini" closable>超小标签</el-tag>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-tag closable>默认标签</el-tag>
      <el-tag size="medium" closable>中等标签</el-tag>
      <el-tag size="small" closable>小型标签</el-tag>
      <el-tag size="mini" closable>超小标签</el-tag>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElTagSize'
})
</script>