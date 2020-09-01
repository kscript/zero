<template>
  <el-card shadow="never">
    <template #header>
      <div>
        <el-input placeholder="请输入内容" v-model="input1">
          <template #prepend>Http://</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input2">
          <template #append>.com</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <template #prepend>
          <el-select v-model="select" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="可通过 slot 来指定在 input 中前置或者后置内容。">
    {{`<div>
        <el-input placeholder="请输入内容" v-model="input1">
          <template #prepend>Http://</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input2">
          <template #append>.com</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <template #prepend>
          <el-select v-model="select" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>

      <script>
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        name: 'ElInputCompound',
        setup() {
          const state = reactive({
            input1: '',
            input2: '',
            input3: '',
            select: ''
          })
          return {
            ...toRefs(state)
          }
        }
      })
      </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'ElInputCompound',
  setup() {
    const state = reactive({
      input1: '',
      input2: '',
      input3: '',
      select: ''
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-input {
  width: 100%!important;
}
</style>