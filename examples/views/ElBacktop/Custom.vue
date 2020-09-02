<template>
  <el-card shadow="hover">
    <template #header>
      <!-- Home.vue 已存在该实例 -->
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`Scroll down to see the bottom-right button.
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
        <div
          style="{
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0,0,0, .12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }"
        >
          UP
        </div>
      </el-backtop>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Custom'
})
</script>