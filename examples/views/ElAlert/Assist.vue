<template>
  <el-card shadow="hover">
    <template #header>
      <el-alert
        title="带辅助性文字介绍"
        type="success"
        description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
      </el-alert>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-alert
        title="带辅助性文字介绍"
        type="success"
        description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
      </el-alert>`}}
      <template #desc><slot name="desc"></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Assist'
})
</script>
