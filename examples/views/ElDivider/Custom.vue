<template>
  <el-card shadow="hover">
    <template #header>
      <div>
        <span>头上一片晴天，心中一个想念</span>
        <el-divider content-position="left">少年包青天</el-divider>
        <span>饿了别叫妈, 叫饿了么</span>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <span>为了无法计算的价值</span>
        <el-divider content-position="right">阿里云</el-divider>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div>
        <span>头上一片晴天，心中一个想念</span>
        <el-divider content-position="left">少年包青天</el-divider>
        <span>饿了别叫妈, 叫饿了么</span>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <span>为了无法计算的价值</span>
        <el-divider content-position="right">阿里云</el-divider>
      </div>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Custom'
})
</script>