<template>
  <el-card shadow="hover">
    <template #header>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'域名' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'域名' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      
      <script lang="ts">
      import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue'
      type Domain = { key?: number, value: string }
      type Form = {
        domains: Domain[]
        email: string
      }
      export default defineComponent({
        setup(props) {
          const instance = getCurrentInstance() as ComponentInternalInstance
          const domains = ref([] as Domain[])
          const dynamicValidateForm = reactive({
            domains: [{
              value: ''
            }],
            email: ''
          } as Form)
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
          const removeDomain = (item: Domain) => {
            var index = dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
              dynamicValidateForm.domains.splice(index, 1)
            }
          }
          const addDomain = () => {
            dynamicValidateForm.domains.push({
              value: '',
              key: Date.now()
            });
          }
          return {
            dynamicValidateForm,
            ...toRefs(dynamicValidateForm),
            submitForm,
            resetForm,
            removeDomain,
            addDomain
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue'
type Domain = {key?: number, value: string}
type Form = {
  domains: Domain[]
  email: string
}
export default defineComponent({
  name: 'Dynamic',
  setup(props) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const domains = ref([] as Domain[])
    const dynamicValidateForm = reactive({
      domains: [{
        value: ''
      }],
      email: ''
    } as Form)
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
    const removeDomain = (item: Domain) => {
      var index = dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1)
      }
    }
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
    return {
      dynamicValidateForm,
      ...toRefs(dynamicValidateForm),
      submitForm,
      resetForm,
      removeDomain,
      addDomain
    }
  }
})
</script>