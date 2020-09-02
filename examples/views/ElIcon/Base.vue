<template>
  <el-card shadow="hover">
    <template #header>
      <div class="source">
        <span>
          <i class="el-icon-edit"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-delete"></i>
        </span>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base'
})
</script>