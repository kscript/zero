<template>
  <el-card shadow="hover">
    <template #header>
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是标题"
        v-model:visible="drawer"
        :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer
        title="我是标题"
        v-model:visible="drawer"
        :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const drawer = ref(false)
          return {
            drawer
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
  name: 'Title',
  setup() {
    const drawer = ref(false)
    return {
      drawer
    }
  }
})
</script>