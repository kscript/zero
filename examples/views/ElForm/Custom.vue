<template>
  <el-card shadow="hover">
    <template #header>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      
      <script lang="ts">
      import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup(props) {
          const instance = getCurrentInstance() as ComponentInternalInstance
          const ruleForm = reactive({
            pass: '',
            checkPass: '',
            age: ''
          })
          const checkAge = (rule: RegExp, value: number | string, callback: Function) => {
            if (!value) {
              return callback(new Error('年龄不能为空'))
            }
            setTimeout(() => {
              if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'))
              } else {
                if (value < 18) {
                  callback(new Error('必须年满18岁'))
                } else {
                  callback()
                }
              }
            }, 1000)
          }
          const validatePass = (rule: RegExp, value: number | string, callback: Function) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (ruleForm.checkPass !== '') {
                (instance.refs.ruleForm as anyObject).validateField('checkPass')
              }
              callback()
            }
          }
          const validatePass2 = (rule: RegExp, value: number | string, callback: Function) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          }
          
          const rules = reactive({
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
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
            ruleForm,
            rules,
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
import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Custom',
  setup(props) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const ruleForm = reactive({
      pass: '',
      checkPass: '',
      age: ''
    })
    const checkAge = (rule: RegExp, value: number | string, callback: Function) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule: RegExp, value: number | string, callback: Function) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (ruleForm.checkPass !== '') {
          (instance.refs.ruleForm as anyObject).validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule: RegExp, value: number | string, callback: Function) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    
    const rules = reactive({
      pass: [
        { validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' }
      ],
      age: [
        { validator: checkAge, trigger: 'blur' }
      ]
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
      ruleForm,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>