<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-type">
        <el-avatar :size="60" src="https://empty" @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="">
    {{`<div class="demo-type">
        <el-avatar :size="60" src="https://empty" @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </div>
      
      <script>
      import { defineComponent } from 'vue'
      export default defineComponent({
        setup() {
          const errorHandler = () => true
          return {
            errorHandler
          }
        }
      })
      </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElAvatarFallback',
  setup() {
    const errorHandler = () => true
    return {
      errorHandler
    }
  }
})
</script>