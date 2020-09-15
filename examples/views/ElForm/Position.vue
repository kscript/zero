<template>
  <el-card shadow="hover">
    <template #header>
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>

      <script lang="ts">
      import { defineComponent, reactive, ref, toRefs } from 'vue'
      export default defineComponent({
        setup(props) {
          const labelPosition = ref('right')
          const formLabelAlign = reactive({
            name: '',
            region: '',
            type: ''
          })
          const onSubmit = () => {
            console.log('submit!', formLabelAlign)
          }
          return {
            formLabelAlign,
            ...toRefs(formLabelAlign),
            labelPosition,
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
  name: 'Position',
  setup(props) {
    const labelPosition = ref('right')
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: ''
    })
    const onSubmit = () => {
      console.log('submit!', formLabelAlign)
    }
    return {
      formLabelAlign,
      ...toRefs(formLabelAlign),
      labelPosition,
      onSubmit
    }
  }
})
</script>