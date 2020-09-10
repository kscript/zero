<template>
  <el-card shadow="hover">
    <template #header>
      <el-radio-group v-model="radio">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-radio-group v-model="radio">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
      
      <el-dialog
        title="提示"
        v\-model:visible="centerDialogVisible"
        width="30%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </template>
      </el-dialog>

      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const radio = ref(3)
          return {
            radio
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
  name: 'GroupDemo',
  setup() {
    const radio = ref(3)
    return {
      radio
    }
  }
})
</script>