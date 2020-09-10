<template>
  <el-card shadow="hover">
    <template #header>
      <div>
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup2" size="medium">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup3" size="small">
          <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div>
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{\{city\}\}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup2" size="medium">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{\{city\}\}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup3" size="small">
          <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">\{\{city\}\}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{\{city\}\}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      const cityOptions = ['上海', '北京', '广州', '深圳']
      export default defineComponent({
        setup() {
          const state = reactive({
            checkboxGroup1: ['上海'],
            checkboxGroup2: ['上海'],
            checkboxGroup3: ['上海'],
            checkboxGroup4: ['上海'],
            cities: cityOptions
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
const cityOptions = ['上海', '北京', '广州', '深圳']
export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    const state = reactive({
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      cities: cityOptions
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>