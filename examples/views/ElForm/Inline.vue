<template>
  <el-card shadow="hover">
    <template #header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      
      <script lang="ts">
      import { defineComponent, reactive, ref, toRefs } from 'vue'
      export default defineComponent({
        setup(props) {
          const formInline = reactive({
            user: '',
            region: ''
          })
          const onSubmit = () => {
            console.log('submit!', formInline)
          }
          return {
            formInline,
            ...toRefs(formInline),
            onSubmit
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'Inline',
  setup(props) {
    const formInline = reactive({
      user: '',
      region: ''
    })
    const onSubmit = () => {
      console.log('submit!', formInline)
    }
    return {
      formInline,
      ...toRefs(formInline),
      onSubmit
    }
  }
})
</script>