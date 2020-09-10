<template>
  <el-card shadow="hover">
    <template #header>
      
      <el-radio-group v-model="direction">
        <el-radio label="ltr">从左往右开</el-radio>
        <el-radio label="rtl">从右往左开</el-radio>
        <el-radio label="ttb">从上往下开</el-radio>
        <el-radio label="btt">从下往上开</el-radio>
      </el-radio-group>

      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是标题"
        v-model:visible="drawer"
        :direction="direction"
        :before-close="handleClose">
        <span>我来啦!</span>
      </el-drawer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-radio-group v-model="direction">
        <el-radio label="ltr">从左往右开</el-radio>
        <el-radio label="rtl">从右往左开</el-radio>
        <el-radio label="ttb">从上往下开</el-radio>
        <el-radio label="btt">从下往上开</el-radio>
      </el-radio-group>

      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是标题"
        v\-model:visible="drawer"
        :direction="direction"
        :before-close="handleClose">
        <span>我来啦!</span>
      </el-drawer>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const dialogVisible = ref(false)
          const handleClose = (done: Function) => {
            confirm('确认关闭？') && done()
          }
          return {
            dialogVisible,
            handleClose
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Base',
  setup() {
    const drawer = ref(false)
    const direction = ref('rtl')
    const handleClose = (done: Function) => {
      confirm('确认关闭？') && done()
    }
    return {
      drawer,
      direction,
      handleClose
    }
  }
})
</script>