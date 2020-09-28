<template>
  <el-card shadow="hover">
    <template #header>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Background'
})
</script>