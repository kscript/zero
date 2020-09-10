<template>
  <el-card shadow="hover">
    <template #header>
      <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
      <el-dialog title="外层 Dialog" v-model:visible="outerVisible">
        <el-dialog
          width="30%"
          title="内层 Dialog"
          v-model:visible="innerVisible"
          append-to-body>
        </el-dialog>
        <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
        </div>
        </template>
      </el-dialog>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
      <el-dialog title="外层 Dialog" v\-model:visible="outerVisible">
        <el-dialog
          width="30%"
          title="内层 Dialog"
          v\-model:visible="innerVisible"
          append-to-body>
        </el-dialog>
        <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
        </div>
        </template>
      </el-dialog>
      
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
    const outerVisible = ref(false)
    const innerVisible = ref(false)
    return {
      outerVisible,
      innerVisible
    }
  }
})
</script>