<template>
  <el-card shadow="hover">
    <template #header>
      <div>
        <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
        <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox v-model="checked3" label="备选项1" border size="medium"></el-checkbox>
        <el-checkbox v-model="checked4" label="备选项2" border size="medium"></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup1" size="small">
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border disabled></el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border></el-checkbox>
        </el-checkbox-group>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div>
        <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
        <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox v-model="checked3" label="备选项1" border size="medium"></el-checkbox>
        <el-checkbox v-model="checked4" label="备选项2" border size="medium"></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup1" size="small">
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border disabled></el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border></el-checkbox>
        </el-checkbox-group>
      </div>

      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
              checked1: true,
              checked2: false,
              checked3: false,
              checked4: true,
              checkboxGroup1: [],
              checkboxGroup2: []
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

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Border',
  setup() {
    const state = reactive({
        checked1: true,
        checked2: false,
        checked3: false,
        checked4: true,
        checkboxGroup1: [],
        checkboxGroup2: []
      })
    return {
      ...toRefs(state)
    }
  }
})
</script>