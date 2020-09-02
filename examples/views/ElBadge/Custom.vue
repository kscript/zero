<template>
  <el-card shadow="hover">
    <template #header>
      <el-badge value="new" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge value="hot" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-badge value="new" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge value="hot" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
      
      <style lang="scss" scoped>
      .item {
        margin-top: 10px;
        margin-right: 40px;
      }
      </style>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Custom'
})
</script>
<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>