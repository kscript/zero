<template>
  <el-card shadow="hover">
    <template #header>
      示例效果
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`示例源码`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '组件名'
})
</script>