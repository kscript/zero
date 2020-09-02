<template>
  <el-card shadow="hover">
    <template #header>
      <el-button type="primary" :loading="true">加载中</el-button>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button type="primary" :loading="true">加载中</el-button>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Loading'
})
</script>