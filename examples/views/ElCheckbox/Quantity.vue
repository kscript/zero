<template>
  <el-card shadow="hover">
    <template #header>
      <el-checkbox-group 
        v-model="checkedCities"
        :min="1"
        :max="2">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-checkbox-group 
        v-model="checkedCities"
        :min="1"
        :max="2">
        <el-checkbox v-for="city in cities" :label="city" :key="city">\{\{city\}\}</el-checkbox>
      </el-checkbox-group>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      const cityOptions = ['上海', '北京', '广州', '深圳']
      export default defineComponent({
        setup() {
          const checkedCities = ref(['上海', '北京'])
          const cities = ref(cityOptions)
          return {
            checkedCities,
            cities
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default defineComponent({
  name: 'Quantity',
  setup() {
    const checkedCities = ref(['上海', '北京'])
    const cities = ref(cityOptions)
    return {
      checkedCities,
      cities
    }
  }
})
</script>