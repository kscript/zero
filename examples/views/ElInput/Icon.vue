<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-input-suffix">
        属性方式：
        <el-input
          placeholder="请选择日期"
          suffix-icon="el-icon-date"
          v-model="input1">
        </el-input>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        slot 方式：
        <el-input
          placeholder="请选择日期"
          v-model="input3">
          <template #suffix>
            <i class="el-input__icon el-icon-date"></i>
          </template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="input4">
          <template #prefix>
            <i class="el-input__icon el-icon-date"></i>
          </template>
        </el-input>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-input-suffix">
        属性方式：
        <el-input
          placeholder="请选择日期"
          suffix-icon="el-icon-date"
          v-model="input1">
        </el-input>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        slot 方式：
        <el-input
          placeholder="请选择日期"
          v-model="input3">
          <template #suffix>
            <i class="el-input__icon el-icon-date"></i>
          </template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="input4">
          <template #prefix>
            <i class="el-input__icon el-icon-date"></i>
          </template>
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
  name: 'ElInputIcon',
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
.demo-input-suffix {
  margin-bottom: 15px;
  .el-input {
    margin-right: 15px;
  }
}
</style>
