<template>
  <el-card shadow="hover">
    <template #header>
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="由type属性来选择tag的类型，也可以通过color属性来自定义背景色。">
    {{`<el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="warning">标签四</el-tag>
    <el-tag type="danger">标签五</el-tag>

    <script>
    import { defineComponent } from 'vue'
    export default defineComponent({
    })
    </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElTagBase'
})
</script>