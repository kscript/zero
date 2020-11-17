<template>
  <el-card shadow="hover">
    <template #header>
      <el-transfer v-model="value" :data="data"></el-transfer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-transfer v-model="value" :data="data"></el-transfer>
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const generateData = () => {
            const data = []
            for (let i = 1; i <= 15; i++) {
              data.push({
                key: i,
                label: \`备选项 $\{i\}\`,
                disabled: i % 4 === 0
              })
            }
            return data
          }
          const state = reactive({
            data: generateData(),
            value: [1, 4]
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
  name: 'Base',
  setup() {
    const generateData = () => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    const state = reactive({
      data: generateData(),
      value: [1, 4]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>