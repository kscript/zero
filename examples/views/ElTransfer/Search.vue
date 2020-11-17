<template>
  <el-card shadow="hover">
    <template #header>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="data">
      </el-transfer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="data">
      </el-transfer>
      
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const generateData = () => {
            const data = [];
            const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
            const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
            return cities.map((city, index) => {
              return {
                label: city,
                key: index,
                pinyin: pinyin[index]
              }
            })
          }
          const state = reactive({
            data: generateData(),
            value: [],
            filterMethod(query: string, item: any) {
              return item.pinyin.indexOf(query) > -1;
            }
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
  name: 'Search',
  setup() {
    const generateData = () => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      return cities.map((city, index) => {
        return {
          label: city,
          key: index,
          pinyin: pinyin[index]
        }
      })
    }
    const state = reactive({
      data: generateData(),
      value: [],
      filterMethod(query: string, item: any) {
        return item.pinyin.indexOf(query) > -1;
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>