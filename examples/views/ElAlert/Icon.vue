<template>
  <el-card shadow="hover">
    <template #header>
      <el-alert
        title="成功提示的文案"
        type="success"
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        show-icon>
      </el-alert>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-alert
        title="成功提示的文案"
        type="success"
        effect="dark">
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        effect="dark">
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        effect="dark">
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        effect="dark">
      </el-alert>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Icon'
})
</script>
