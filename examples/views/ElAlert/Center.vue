<template>
  <el-card shadow="hover">
    <template #header>
      <el-alert
        title="成功提示的文案"
        type="success"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        center
        show-icon>
      </el-alert>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-alert
        title="成功提示的文案"
        type="success"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        center
        show-icon>
      </el-alert>`}}
      <template #desc><slot name="desc"></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Center'
})
</script>
