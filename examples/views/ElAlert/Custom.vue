<template>
  <el-card shadow="hover">
    <template #header>
      <el-alert
        title="不可关闭的 alert"
        type="success"
        :closable="false">
      </el-alert>
      <el-alert
        title="自定义 close-text"
        type="info"
        close-text="知道了">
      </el-alert>
      <el-alert
        title="设置了回调的 alert"
        type="warning"
        @close="hello">
      </el-alert>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-alert
        title="不可关闭的 alert"
        type="success"
        :closable="false">
      </el-alert>
      <el-alert
        title="自定义 close-text"
        type="info"
        close-text="知道了">
      </el-alert>
      <el-alert
        title="设置了回调的 alert"
        type="warning"
        @close="hello">
      </el-alert>
      
      <script>
      import { defineComponent } from 'vue'
      export default defineComponent({
        setup() {
          const hello = () => alert('Hello World!')
          return {
            hello
          }
        }
      })
      </script>`}}
      <template #desc><slot name="desc"></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Custom',
  setup(props) {
    const hello = () => alert('Hello World!')
    return {
      hello
    }
  }
})
</script>