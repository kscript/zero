<template>
  <el-card shadow="hover">
    <template #header>
      <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
      <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
      <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
      <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
      <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Inside'
})
</script>