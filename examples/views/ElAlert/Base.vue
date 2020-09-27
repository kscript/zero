<template>
  <el-card shadow="hover">
    <template #header>
      <el-alert
        title="成功提示的文案"
        type="success">
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info">
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning">
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error">
      </el-alert>
    </template>
    <el-code collapse :trim="-1" :first="1" link="//codepen.io/kscript/pen/qBZyYLb">
      {{`<el-alert
        title="成功提示的文案"
        type="success">
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info">
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning">
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error">
      </el-alert>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base'
})
</script>