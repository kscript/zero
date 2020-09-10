<template>
  <el-card shadow="hover">
    <template #header>
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是外面的 Drawer"
        v-model:visible="drawer"
        size="50%">
        <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          v-model:visible="innerDrawer">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
        </div>
      </el-drawer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是外面的 Drawer"
        v\-model:visible="drawer"
        size="50%">
        <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          v\-model:visible="innerDrawer">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
        </div>
      </el-drawer>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const outerVisible = ref(false)
          const innerVisible = ref(false)
          return {
            outerVisible,
            innerVisible
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
  name: 'Nest',
  setup() {
    const drawer = ref(false)
    const innerDrawer = ref(false)
    const handleClose = (done: Function) => {
      confirm('还有未保存的工作哦确定关闭吗？') && done()
    }
    return {
      drawer,
      innerDrawer,
      handleClose
    }
  }
})
</script>