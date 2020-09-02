<template>
  <el-card shadow="hover">
    <template #header>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            从不显示
          </el-card>
        </el-col>
      </el-row>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            从不显示
          </el-card>
        </el-col>
      </el-row>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Shadow'
})
</script>
<style lang="scss" scoped>
.el-card {
  ::v-deep(.el-card__header) {
    .el-card__body {
      padding: 20px;
    }
  }
}
</style>