<template>
  <el-card shadow="hover">
    <template #header>
      <el-progress type="circle" :percentage="0"></el-progress>
      <el-progress type="circle" :percentage="25"></el-progress>
      <el-progress type="circle" :percentage="100" status="success"></el-progress>
      <el-progress type="circle" :percentage="70" status="warning"></el-progress>
      <el-progress type="circle" :percentage="50" status="exception"></el-progress>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-progress type="circle" :percentage="0"></el-progress>
      <el-progress type="circle" :percentage="25"></el-progress>
      <el-progress type="circle" :percentage="100" status="success"></el-progress>
      <el-progress type="circle" :percentage="70" status="warning"></el-progress>
      <el-progress type="circle" :percentage="50" status="exception"></el-progress>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Circle'
})
</script>