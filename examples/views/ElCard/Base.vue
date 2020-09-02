<template>
  <el-card shadow="hover">
    <template #header>
      <div class="box-card-demo">
        <el-card class="box-card">
          <template #header>
          <div class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-card class="box-card">
        <template #header>
          <div class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          \{\{'列表内容 ' + o \}\}
        </div>
      </el-card>`}}
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

<style lang="scss">
.box-card-demo {
  .el-card__body {
    padding: 20px!important;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 5px;
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
}
</style>