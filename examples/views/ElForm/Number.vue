<template>
  <el-card shadow="hover">
    <template #header>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="年龄"
          prop="age"
          :rules="[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]"
        >
          <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="年龄"
          prop="age"
          :rules="[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]"
        >
          <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <script lang="ts">
      import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue'
      export default defineComponent({
        setup(props) {
          const instance = getCurrentInstance() as ComponentInternalInstance
          const numberValidateForm = reactive({
            age: ''
          })
          const submitForm = (formName: string) => {
            (instance.refs[formName] as anyObject).validate((valid: boolean) => {
              if (valid) {
                alert('submit!')
              } else {
                console.log('error submit!!')
                return false
              }
            })
          }
          const resetForm = (formName: string) => {
            (instance.refs[formName] as anyObject).resetFields()
          }
          return {
            numberValidateForm,
            submitForm,
            resetForm
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'Number',
  setup(props) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const numberValidateForm = reactive({
      age: ''
    })
    const submitForm = (formName: string) => {
      (instance.refs[formName] as anyObject).validate((valid: boolean) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetForm = (formName: string) => {
      (instance.refs[formName] as anyObject).resetFields()
    }
    return {
      numberValidateForm,
      ...toRefs(numberValidateForm),
      submitForm,
      resetForm
    }
  }
})
</script>