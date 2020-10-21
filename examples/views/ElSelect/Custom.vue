<template>
  <el-card shadow="hover">
    <template #header>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">\{\{ item.label \}\}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">\{\{ item.value \}\}</span>
        </el-option>
      </el-select>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Custom',
  setup() {
    const state = reactive({
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: ''
      })
      return {
        ...toRefs(state)
      }
  }
})
</script>