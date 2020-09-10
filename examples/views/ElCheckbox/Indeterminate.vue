<template>
  <el-card shadow="hover">
    <template #header>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">\{\{city\}\}</el-checkbox>
      </el-checkbox-group>
      
      <script lang="ts">
      import { defineComponent, reactive, toRefs, watch } from 'vue'
      const cityOptions = ['上海', '北京', '广州', '深圳'];
      export default defineComponent({
        setup() {
          const state = reactive({
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true
          })
          watch(() => state.checkedCities, () => {
            console.log(state.checkedCities)
          })
          const handleCheckAllChange = (val: boolean) => {
            state.checkedCities = val ? cityOptions : [];
            state.isIndeterminate = false;
          }
          const handleCheckedCitiesChange = (value: any[]) => {
            let checkedCount = value.length;
            state.checkAll = checkedCount === state.cities.length;
            state.isIndeterminate = checkedCount > 0 && checkedCount < state.cities.length;
          }
          return {
            ...toRefs(state),
            handleCheckAllChange,
            handleCheckedCitiesChange
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs, watch } from 'vue'
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default defineComponent({
  name: 'Indeterminate',
  setup() {
    const state = reactive({
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    })
    watch(() => state.checkedCities, () => {
      console.log(state.checkedCities)
    })
    const handleCheckAllChange = (val: boolean) => {
      state.checkedCities = val ? cityOptions : [];
      state.isIndeterminate = false;
    }
    const handleCheckedCitiesChange = (value: any[]) => {
      let checkedCount = value.length;
      state.checkAll = checkedCount === state.cities.length;
      state.isIndeterminate = checkedCount > 0 && checkedCount < state.cities.length;
    }
    return {
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedCitiesChange
    }
  }
})
</script>