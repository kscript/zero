<template>
  <el-card shadow="hover">
    <template #header>
      <el-badge is-dot class="item">数据查询</el-badge>
      <el-badge is-dot class="item">
        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
      </el-badge>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-badge is-dot class="item">数据查询</el-badge>
      <el-badge is-dot class="item">
        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
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
  name: 'Dot'
})
</script>
<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>