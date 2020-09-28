<template>
  <el-card shadow="hover">
    <template #header>
      <div class="block">
        <span class="demonstration">页数较少时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">大于 7 页时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="block">
        <span class="demonstration">页数较少时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">大于 7 页时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base'
})
</script>