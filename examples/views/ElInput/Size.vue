<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-input-size">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input1">
        </el-input>
        <el-input
          size="medium"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input2">
        </el-input>
        <el-input
          size="small"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input3">
        </el-input>
        <el-input
          size="mini"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input4">
        </el-input>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-input-size">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input1">
        </el-input>
        <el-input
          size="medium"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input2">
        </el-input>
        <el-input
          size="small"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input3">
        </el-input>
        <el-input
          size="mini"
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input4">
        </el-input>
      </div>

      <script>
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
            input1: '',
            input2: '',
            input3: '',
            input4: ''
          })
          return {
            ...toRefs(state)
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'ElInputSize',
  setup() {
    const state = reactive({
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss">
.demo-input-size .el-input {
  vertical-align: top;
  margin: 0 10px 10px 0;
}
</style>