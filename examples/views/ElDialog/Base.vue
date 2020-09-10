<template>
  <el-card shadow="hover">
    <template #header>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
        title="提示"
        v-model:visible="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-dialog
        title="提示"
        v-model:visible="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      
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
</script>