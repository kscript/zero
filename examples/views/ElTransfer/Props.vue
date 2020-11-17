<template>
  <el-card shadow="hover">
    <template #header>
      <el-transfer
        v-model="value"
        :props="{
          key: 'value',
          label: 'desc'
        }"
        :data="data">
      </el-transfer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-transfer
        v-model="value"
        :props="{
          key: 'value',
          label: 'desc'
        }"
        :data="data">
      </el-transfer>
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const generateData = () => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
              data.push({
                value: i,
                desc: \`备选项 $\{ i \}\`,
                disabled: i % 4 === 0
              });
            }
            return data;
          };
          const state = reactive({
            data: generateData(),
            value: []
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
  name: 'Props',
  setup() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    const state = reactive({
      data: generateData(),
      value: []
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>